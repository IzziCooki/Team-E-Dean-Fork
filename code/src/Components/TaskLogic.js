export function editTask (title, task, type, dueDate, dueTime, isRepeat, isComplete)
{
    const newTask = {
        title: title,
        task: task,
        type: type,
        dueDate: dueDate,
        dueTime: dueTime,
        isRepeat: isRepeat,
        isComplete: isComplete
    }
    return newTask
}
