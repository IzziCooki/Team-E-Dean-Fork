export function editTask (title, task, type, dueDate, isRepeat, isComplete)
{
    const newTask = {
        title: title,
        task: task,
        type: type,
        dueDate: dueDate,
        isRepeat: isRepeat,
        isComplete: isComplete
    }
    return newTask
}

