export const numToMonthName = (month) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[parseInt(month)-1]
}
export const sortTasks = (tasks, order) => {
    if(order==='d') {
        return tasks.sort((a,b)=> (new Date(b.due) - new Date(a.due)))
    }
    else {
        return tasks.sort((a,b)=> (new Date(a.due) - new Date(b.due)))

    }
}