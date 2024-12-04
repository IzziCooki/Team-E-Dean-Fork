export function editTask (title, task, type, dueDate, isRepeat, points)
{
    let Title = title;
    let Task = task;
    let Type = type;
    let DueDate = dueDate
    let IsRepeat = isRepeat
    let Points = points

    const newTask = {
        title: Title,
        task: Task,
        type: Type,
        dueDate: DueDate,
        isRepeat: IsRepeat,
        isComplete: false,
        points: Points
    }
    return newTask
}

export function taskToString (task)
{
    return (
        task.title + "\n" + task.task + "\n" + task.type + "\n" + task.dueDate.toString() + "\n" + task.isRepeat.toString() + "\n" 
    )
}