import React, { useEffect, useState, useCallback } from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import Award from "./../Award.svg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { editTask } from "./TaskLogic"; //not yet implemented
import Calendar from "react-calendar";
import "react-calendar/dist/cjs";
import "./../App.css";
import { db } from "./firebase";
import { doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";

function TaskPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [type, setType] = useState("Healthy Eating");
  const [dueDate, setDueDate] = useState(new Date());
  const [dueHour, setDueHour] = useState(0);
  const [dueMinute, setDueMinute] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [repeatType, setRepeatType] = useState("");
  const [tasks, setTasks] = useState([]);
  //const [isComplete, setIsComplete] = useState(false); //not yet implemented
  const TASKTYPE = [
    "Healthy Eating",
    "Rest",
    "Knowledge",
    "Social",
    "Tidyness",
    "Mental",
  ];
  const REPEATTYPE = ["Daily", "Weekly", "Bi-Weekly", "Monthly"];
  const hours = [];
  const minutes = [];
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2;
  const [editingTask, setEditingTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  for (let i = 0; i < 60; i++) {
    minutes.push(i);
  }

  function updateType(event) {
    setType(event.target.value);
  }

  function updateRepeat(event) {
    setIsRepeat(event.target.checked);
  }

  function updateRepeatType(event) {
    setRepeatType(event.target.value);
  }

  function updateDueDate(event) {
    let newDueDate = new Date(event);
    newDueDate.setHours(dueDate.getHours(), dueDate.getMinutes());
    setDueDate(newDueDate);
  }
  function updateHour(event) {
    setDueHour(event.target.value);
  }

  function updateMinute(event) {
    setDueMinute(event.target.value);
  }

  function setTimeHour(event) {
    updateHour(event);
    let newDueDate = new Date(dueDate);
    newDueDate.setHours(event.target.value);
    setDueDate(newDueDate);
  }

  function setTimeMinute(event) {
    updateMinute(event);
    let newDueDate = new Date(dueDate);
    newDueDate.setMinutes(event.target.value);
    setDueDate(newDueDate);
  }

  function updateTasks(task) {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  }

  // Function to open the modal
  const openEditTask = () => {
    const modal = document.getElementById("editTask");
    if (modal) {
      modal.style.display = "block";
    }
  };

  // Function to close the modal on close
  const closeEditTask = () => {
    const modal = document.getElementById("editTask");
    if (modal) {
      modal.style.display = "none";
    }
    setTitle("");
    setTask("");
    setType("Healthy Eating");
    setDueDate(new Date());
    setDueHour(0);
    setDueMinute(0);
    setIsRepeat(false);
    setRepeatType("");
    setIsEditing(false);
    setEditingTask(null);
  };



  // Function to close the modal on close on submit
  const submitTask = () => {
    const modal = document.getElementById("editTask");
    if (modal) {
      modal.style.display = "none";
    }

    const taskData = {
      title,
      task,
      type,
      dueDate,
      isRepeat,
      repeatType
    };

    if (isEditing) {
      // Update existing task
      updateTaskInFirestore(taskData);
      setIsEditing(false);
      setEditingTask(null);
    } else {
      // Create new task
      let newTask = editTask(title, task, type, dueDate, isRepeat);
      updateTasks(newTask);
      saveTaskToFirestore(newTask);
    }

    // Reset form
    setTitle("");
    setTask("");
    setType("Healthy Eating");
    setDueDate(new Date());
    setDueHour(0);
    setDueMinute(0);
    setIsRepeat(false);
    setRepeatType("");
  };
  const saveTaskToFirestore = async (taskData) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("No user is signed in");
        return;
      }
  
      // Convert the date to an ISO string before saving
      const taskWithTimestamp = {
        ...taskData,
        dueDate: taskData.dueDate.toISOString()
      };
  
      const userDocRef = doc(db, "user", userId);
      await updateDoc(userDocRef, {
        tasks: arrayUnion(taskWithTimestamp)
      });
      console.log("Task successfully saved to Firestore");
    } catch (error) {
      console.error("Error saving task to Firestore:", error);
    }
  };
  
  // Add this helper function to check if a date is valid
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  // Wrap fetchTasksFromFirestore in useCallback
  const fetchTasksFromFirestore = useCallback(async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("No user is signed in");
        return;
      }
  
      const userDocRef = doc(db, "user", userId);
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.tasks) {
          console.log('Raw tasks from Firestore:', userData.tasks);
          const processedTasks = userData.tasks
            .map(task => ({
              ...task,
              dueDate: new Date(task.dueDate)
            }))
            .filter(task => isValidDate(task.dueDate));
          
          console.log('Processed tasks:', processedTasks);
          setTasks(processedTasks);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []); // Empty dependency array because it doesn't depend on any props or state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        console.log("uid", uid);
        console.log("email", email);
        fetchTasksFromFirestore();
      } else {
        console.log("user is logged out");
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [fetchTasksFromFirestore, navigate]); // Include fetchTasksFromFirestore and navigate

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const getDaySuffix = (day) => {
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const currentDate = new Date();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update the pagination calculations to use only valid tasks
  const validTasks = tasks.filter(task => isValidDate(task.dueDate));
  const reversedTasks = [...validTasks].reverse();
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = reversedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(validTasks.length / tasksPerPage);

  const startEditingTask = (task) => {
    setEditingTask(task);
    setIsEditing(true);
    setTitle(task.title);
    setTask(task.task);
    setType(task.type || "Healthy Eating");
    setDueDate(new Date(task.dueDate));
    setIsRepeat(task.isRepeat || false);
    setRepeatType(task.repeatType || "");
    openEditTask();
  };

  const updateTaskInFirestore = async (updatedTask) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("No user is signed in");
        return;
      }

      const userDocRef = doc(db, "user", userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const updatedTasks = userData.tasks.map(task => 
          task.title === editingTask.title ? {
            ...updatedTask,
            dueDate: updatedTask.dueDate.toISOString()
          } : task
        );

        await updateDoc(userDocRef, {
          tasks: updatedTasks
        });

        console.log("Task successfully updated in Firestore");
        fetchTasksFromFirestore(); // Refresh the tasks list
      }
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header2"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          <div className="App-buttons">
            <Button
              onClick={() => {
                navigate("/home");
              }}
              variant="neutral"
              size="small"
            >
              Home
            </Button>
            <Button onClick={handleLogout} variant="neutral" size="small">
              Sign Out
            </Button>
          </div>
        </header>
      </div>
      <div>
        <Col
          className="Col1"
          style={{
            position: "fixed",
            display: "flex",
            top: "12%",
            left: "8%",
            width: "60%",
            height: "74%",
            backgroundColor: "white",
            border: "2px solid lightgray",
            borderRadius: "5px",
          }}
        >
          <div
            className="InnerContent"
            style={{
              paddingLeft: "5%",
              width: "95%",
            }}
          >
            <p
              style={{
                fontSize: "110%",
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
            >
              Tasks
            </p>
            <p
              style={{
                color: "gray",
                fontSize: "90%",
                fontWeight: "400",
                lineHeight: "20%",
                paddingBottom: "5%",
              }}
            >
              Today's date: {monthName} {currentDate.getDate()}
              {getDaySuffix(currentDate.getDate())}
            </p>
            <div style={{ display: "table", width: "100%", height: "90%" }}>
              {currentTasks.map((t) => (
                <div
                  className="App-bordered"
                  style={{
                    position: "relative",
                    padding: "10px",
                    border: "2px solid gray",

                    marginBottom: "2%",
                  }}
                >
                  <Col
                    className="Col2"
                    style={{ width: "10%", position: "fixed", display: "flex" }}
                  >
                    <img
                      src={logo}
                      className="App-logo3"
                      alt="logo"
                      style={{ margin: "2%" }}
                    />
                  </Col>
                  <Col
                    className="Col3"
                    style={{
                      width: "50%",
                      position: "fixed",
                      display: "flex",
                      left: "25%",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "100%",
                          fontWeight: "600",
                          lineHeight: "50%",
                        }}
                      >
                        {t.title}
                      </p>
                      <p
                        style={{
                          color: "gray",
                          fontSize: "90%",
                          fontWeight: "600",
                          lineHeight: "50%",
                        }}
                      >
                        Description: {t.task}. Due date:{" "}
                        {t.dueDate instanceof Date && !isNaN(t.dueDate) 
                          ? t.dueDate.toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Invalid date'}
                      </p>
                      <p>
                        <Button
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            textDecorationLine: "underline",
                            padding: "0%",
                          }}
                          onClick={() => startEditingTask(t)}
                        >
                          Edit Task
                        </Button>
                      </p>
                      <Button style={{ top: "20%" }}>Done</Button>
                    </div>
                  </Col>
                </div>
              ))}
            </div>
          </div>
          <Button
            id="newTaskButton"
            data-testid="newTaskButton"
            onClick={openEditTask}
            style={{
              marginTop: "2%",
              marginRight: "5%",
              width: "12%",
              height: "10%",
              backgroundColor: "#606c38",
              border: "#606c38",
              color: "white",
              fontSize: "90%",
              borderRadius: "10px",
            }}
          >
            New Task
          </Button>
        </Col>
        <Col
          style={{
            position: "fixed",
            display: "flex",
            top: "12%",
            left: "72%",
            width: "20%",
            height: "30%",
            backgroundColor: "white",
            border: "2px solid lightgray",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              paddingTop: "10%",
              paddingLeft: "39%",
              textAlign: "center",
            }}
          >
            <img src={Award} alt="award" style={{}}></img>
            <p
              style={{
                fontSize: "110%",
                fontWeight: "600",
                lineHeight: "50%",
              }}
            >
              100%
            </p>
            <p style={{ lineHeight: "50%" }}>progress</p>
          </div>
        </Col>
        <Col
          style={{
            position: "fixed",
            display: "flex",
            top: "47%",
            left: "72%",
            width: "20%",
            height: "39%",
            backgroundColor: "white",
            border: "2px solid lightgray",
            borderRadius: "5px",
          }}
        >
          <div style={{ paddingLeft: "7%" }}>
            <p
              style={{
                fontSize: "100%",
                fontWeight: "600",
                lineHeight: "50%",
                textDecorationLine: "underline",
              }}
            >
              Upcoming Tasks
            </p>
            <p
              style={{
                fontSize: "90%",
                fontWeight: "400",
                lineHeight: "50%",
                color: "gray",
              }}
            >
              {currentDate.getMonth() + 1}/{currentDate.getDate()}
            </p>
            {reversedTasks.slice(0, 2).map((t) => (
              <div key={t.title}>
                <p style={{
                  fontSize: "90%",
                  fontWeight: "600",
                  lineHeight: "50%",
                  paddingTop: "20%",
                }}>
                  {t.title}
                </p>
                <p style={{
                  fontSize: "80%",
                  fontWeight: "400",
                  lineHeight: "50%",
                  color: "gray",
                }}>
                  {t.task}
                </p>
              </div>
            ))}
          </div>
        </Col>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-background">{}</div>

      {/* Modal */}
      <div id="editTask" data-testid="editTask" className="modal">
        <div className="modal-content">
          {/* Modal Title */}
          <div id="titleFrame" className="modalTitle">
            <div className="modalHeader">
              <div className="titleForm">
                <Form.Group controlId="formTitle" as={Row}>
                  <Form.Control
                    value={title}
                    placeholder={isEditing ? "Edit Task Name" : "Task Name"}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Form.Group>
              </div>
              <Button className="closeButton" onClick={closeEditTask}>
                Close
              </Button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="modalContentFrame">
            {/* Top Row */}
            <Form.Group
              controlId="formDescription"
              style={{ gridColumn: "1", gridRow: "1" }}
            >
              <Form.Label>Description:</Form.Label>
              <Form.Control
                size="lg"
                as="textarea"
                rows={3}
                value={task}
                onChange={(event) => setTask(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              controlId="taskType"
              style={{ gridColumn: "2", gridRow: "1" }}
            >
              <Form.Label>Task Type:</Form.Label>
              <Form.Select value={type} onChange={updateType}>
                {TASKTYPE.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              controlId="formDate"
              style={{ gridColumn: "3", gridRow: "1" }}
            >
              <Form.Label>Date:</Form.Label>
              <Form.Control value={dueDate.toString()} />
            </Form.Group>

            {/* Bottom Row */}
            <Col>
              <Form.Check
                type="checkbox"
                id="is-repeat-check"
                label="Repeat?"
                checked={isRepeat}
                onChange={updateRepeat}
                style={{ gridColumn: "1", gridRow: "2" }}
              />
              {isRepeat && (
                <Form.Group controlId="tasktype">
                  <Form.Label>How often?</Form.Label>
                  <Form.Select value={repeatType} onChange={updateRepeatType}>
                    {REPEATTYPE.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
            </Col>

            <div style={{ gridColumn: "2", gridRow: "2" }}>
              <Form.Label>Time:</Form.Label>
              <div className="timeDropdowns">
                <Form.Select value={dueHour} onChange={setTimeHour}>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select value={dueMinute} onChange={setTimeMinute}>
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <Calendar
              onChange={updateDueDate}
              value={dueDate}
              className="calendar"
              style={{ gridColumn: "3", gridRow: "2" }}
            />
          </div>
          {/* Modal Footer*/}
          <div className="modalFooter">
            <Button className="smallButton">Set Reminder</Button>
            <Button onClick={submitTask} className="largeButton">
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        marginTop: '20px' 
      }}>
        <Button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          style={{
            backgroundColor: '#606c38',
            border: 'none',
            padding: '5px 10px'
          }}
        >
          Previous
        </Button>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: '#606c38',
            border: 'none',
            padding: '5px 10px'
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default TaskPage;
