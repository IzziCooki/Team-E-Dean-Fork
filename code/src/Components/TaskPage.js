import React, { useEffect, useState, useCallback } from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import Award from "./../Award.svg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TASK_TYPES, REPEAT_TYPES, generateTimeOptions, getDaySuffix, editTask } from "./TaskLogic";
import Calendar from "react-calendar";
import "react-calendar/dist/cjs";
import "./../App.css";
import { db } from "./firebase";
import { doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";

function TaskPage({ points, setPoints }) {
  const navigate = useNavigate();
  const [taskForm, setTaskForm] = useState({
    title: "",
    task: "",
    type: TASK_TYPES[0],
    dueDate: new Date(),
    dueHour: 0,
    dueMinute: 0,
    isRepeat: false,
    repeatType: "",
    points: 15,
  });
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

  function resetForm() {
    setTaskForm({
      title: "",
      task: "",
      type: TASK_TYPES[0],
      dueDate: new Date(),
      dueHour: 0,
      dueMinute: 0,
      isRepeat: false,
      repeatType: "",
      points: 15,
    });
  }

  const saveTaskToFirestore = async (taskData) => {
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
        let updatedTasks = [...(userData.tasks || [])];
        
        // If editing, remove the old task
        if (editingTask) {
          updatedTasks = updatedTasks.filter(t => 
            t.title !== editingTask.title || 
            t.task !== editingTask.task || 
            t.dueDate !== editingTask.dueDate.toISOString()
          );
        }
        
        // Add the new/updated task
        updatedTasks.push({
          ...taskData,
          dueDate: taskData.dueDate.toISOString()
        });

        // Update with the new array instead of using arrayUnion
        await updateDoc(userDocRef, {
          tasks: updatedTasks
        });
      }
      
      console.log("Task successfully saved to Firestore");
    } catch (error) {
      console.error("Error saving task to Firestore:", error);
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
  };

  // Function to close the modal on close on submit
  const submitTask = () => {
    const modal = document.getElementById("editTask");
    if (modal) {
      modal.style.display = "none";
    }
    let newTask = editTask(title, task, type, dueDate, isRepeat);
    updateTasks(newTask);
    setTitle("");
    setTask("");
    setType("");
    setDueDate(new Date());
    setDueHour(0);
    setDueMinute(0);
    setIsRepeat(false);
    setRepeatType("");
  };

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
  });

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

  const currentDate = new Date();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  return (
    <>
      <div className="App">
        <header className="App-header2"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          {/* Points Display */}
          <div
            className="points-display"
            style={{
              padding: '10px',
              backgroundColor: "white",
              fontWeight: "bold",
              color: "darkgreen",
            }}
          >
            Points: {points} {/* Dynamically show points */}
          </div>
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
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <p
              style={{
                fontSize: "110%",
                fontWeight: "600",
                textDecorationLine: "underline",
                marginBottom: "10px"
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
                paddingBottom: "2%"
              }}
            >
              Today's date: {monthName} {currentDate.getDate()}
              {getDaySuffix(currentDate.getDate())}
            </p>
            <div style={{ display: "table", width: "100%", height: "90%" }}>
              {tasks.slice(tasks.length - 2, tasks.length).map((t) => (
                <div
                  className="App-bordered"
                  style={{
                    position: "relative",
                    padding: "10px",
                    border: "2px solid gray",
                    marginBottom: "2%",
                    display: "flex",
                    minHeight: "fit-content",  // Added to ensure box expands
                    height: "auto",            // Added to allow dynamic height
                    flexWrap: "wrap"          // Added to handle content wrapping
                  }}
                >
                  <Col
                    className="Col2"
                    style={{ 
                      width: "10%",
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-start"  // Added to align content to top
                    }}
                  >
                    <img
                      src={logo}
                      className="App-logo3"
                      alt="logo"
                      style={{ 
                        margin: "2%",
                        width: "125px",     // Increased from 40px
                        height: "125px"     // Increased from 40px
                      }}
                    />
                  </Col>
                  <Col
                    className="Col3"
                    style={{
                      width: "50%",
                      position: "relative",
                      display: "flex",
                      marginLeft: "15%",
                      height: "auto"           // Added to allow dynamic height
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "100%",
                          fontWeight: "600",
                          lineHeight: "1.2",
                          marginBottom: "8px"
                        }}
                      >
                        {t.title}
                      </p>
                      <p
                        style={{
                          color: "gray",
                          fontSize: "90%",
                          fontWeight: "600",
                          lineHeight: "1.2",
                          marginBottom: "8px"
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
                      <p style={{ marginBottom: "8px" }}>
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
                      <Button style={{ top: "20%" }} onClick={() => completeTask(t)}>Done</Button>

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
            {tasks.slice(tasks.length - 2, tasks.length).map((t) => (
              <div>
                <p
                  style={{
                    fontSize: "90%",
                    fontWeight: "600",
                    lineHeight: "50%",
                    paddingTop: "20%",
                  }}
                >
                  {t.title}
                </p>
                <p
                  style={{
                    fontSize: "80%",
                    fontWeight: "400",
                    lineHeight: "50%",
                    color: "gray",
                  }}
                >
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
                    placeholder="Task Name"
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
                value={taskForm.task}
                onChange={(e) => updateTaskForm('task', e.target.value)}
              />
            </Form.Group>

            <Form.Group
              controlId="taskType"
              style={{ gridColumn: "2", gridRow: "1" }}
            >
              <Form.Label>Task Type:</Form.Label>
              <Form.Select value={taskForm.type} onChange={(e) => updateTaskForm('type', e.target.value)}>
                {TASK_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              controlId="formDate"
              style={{ gridColumn: "3", gridRow: "1" }}
            >
              <Form.Label>Date:</Form.Label>
              <Form.Control value={taskForm.dueDate.toString()} />
            </Form.Group>

            {/* Bottom Row */}
            <Col>
              <Form.Check
                type="checkbox"
                id="is-repeat-check"
                label="Repeat?"
                checked={taskForm.isRepeat}
                onChange={(e) => updateTaskForm('isRepeat', e.target.checked)}
                style={{ gridColumn: "1", gridRow: "2" }}
              />
              {taskForm.isRepeat && (
                <Form.Group controlId="tasktype">
                  <Form.Label>How often?</Form.Label>
                  <Form.Select value={taskForm.repeatType} onChange={(e) => updateTaskForm('repeatType', e.target.value)}>
                    {REPEAT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
            </Col>

            <div style={{ gridColumn: "2", gridRow: "2" }}>
              <Form.Label>Time:</Form.Label>
              <div className="timeDropdowns">
                <Form.Select value={taskForm.dueHour} onChange={(e) => updateTime('dueHour', e.target.value)}>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select value={taskForm.dueMinute} onChange={(e) => updateTime('dueMinute', e.target.value)}>
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
              value={taskForm.dueDate}
              className="calendar"
              style={{ gridColumn: "3", gridRow: "2" }}
            />
          </div>
          {/* Modal Footer*/}
          <div className="modalFooter">
            <Button className="smallButton">Set Reminder</Button>
            <Button onClick={handleSubmit} className="largeButton">
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
