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


export const sortLists = (lists, order) => {
    if(order==='d') {
        return lists.sort((a,b)=> (b.priority - a.priority))
    }
    else {
        return lists.sort((a,b)=> (a.priority - b.priority))

    }
}