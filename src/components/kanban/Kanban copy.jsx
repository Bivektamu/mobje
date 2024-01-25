import React, { useState, useEffect, useRef } from 'react'
import AddForm from './AddForm'
import EditForm from './EditForm'
import { useTaskContext } from '../../context'
import TaskCard from '../ui/TaskCard'

const Kanban = () => {
    const [addBtn, setAddBtn] = useState(false)
    const [taskId, setTaskId] = useState()
    const [state, dispatch] = useTaskContext()
    const [taskList, setTaskList] = useState({ toDo: [], inProgress: [], done: [] })
    const { tasks } = state
    const dndRefs = useRef([])
    const [cords, setCords] = useState({ x: 0, y: 0 })
    const [draggedTask, setDraggedTask] = useState({ ...cords, task: {} })
    const [isDragged, setDragged] = useState(false)
    const [activeCol, setActiveCol] = useState()

    const [btns, setBtns] = useState({
        isTaskOpBtnClicked: false,
        editBtn: {
            isClicked: false,
            id: ''
        }
    })

    useEffect(() => {
        if (tasks) {
            let tempTaskList = { toDo: [], inProgress: [], done: [] }
            tasks.map(t => {
                tempTaskList = { ...tempTaskList, [t.status]: [...(tempTaskList[t.status] || []), t] }
            })
            setTaskList(tempTaskList)
        }
    }, [tasks])


    const dragStop = e => {
        setCords({ ...cords, x: e.clientX, y: e.clientY })
        setDragged(false)
        if (activeCol === '') {
            return setDraggedTask({ ...draggedTask, task: {} })

        }
        if (activeCol === draggedTask.task.status) {
            setDraggedTask({ ...draggedTask, task: {} })
            return setActiveCol('')
        }
        console.log(draggedTask.task, activeCol)
        const newTask = draggedTask.task
        newTask.status = activeCol
        dispatch({
            type: 'DND',
            payload: newTask
        })
        setActiveCol('')
        setDraggedTask({ ...draggedTask, task: {} })
        dispatch({
            type: 'SET'
        })
    }

    const mouseTracker = e => {
        if (!isDragged) {
            return
        }
        const kanban = document.getElementById('kanban-board').getBoundingClientRect()

        if (e.clientX > kanban.right || e.clientX < kanban.left || e.clientY < kanban.top || e.clientY > kanban.bottom) {
            setActiveCol('')
            // return dragStop(e)
        }

        else if (e.clientX < kanban.left + kanban.width / 3) {
            setActiveCol('toDo')
        }
        else if (e.clientX < kanban.right - kanban.width / 3) {
            setActiveCol('inProgress')
        }
        else {
            setActiveCol('done')
        }

        const diff = { x: e.clientX - cords.x, y: e.clientY - cords.y }
        setCords({ ...cords, x: e.clientX, y: e.clientY })
        setDraggedTask({ ...draggedTask, x: draggedTask.x + diff.x, y: draggedTask.y + diff.y })
    }

    const startDrag = (e, task) => {
        setDraggedTask({ ...draggedTask, x: (e.currentTarget.parentElement).getBoundingClientRect().left, y: (e.currentTarget.parentElement).getBoundingClientRect().top, task })
        setCords({ ...cords, x: e.clientX, y: e.clientY })
        setDragged(true)
    }



    const handleAllBtns = (e) => {
        console.log(e.target.nodeName)
        setTimeout(() => {
            if (e.target.nodeName !== 'Button') {
                setBtns((prev) => ({ ...prev, isTaskOpBtnClicked: false }))
            }
            // if(e.current)
        }, 1)
    }


    const { editBtn } = btns

    // return <>asdf</>
    return (
        <>
            {addBtn && <AddForm status='to do' setAddBtn={(isClicked) => setAddBtn(isClicked)} />}
            {editBtn.isClicked && <EditForm taskId={editBtn.id} setBtns={setBtns} />}


            <div className='mx-auto flex items-center justify-center py-10  h-screen' onMouseMove={e => mouseTracker(e)} onMouseUp={e => dragStop(e)} onClick={handleAllBtns}>
                <div className='w-[700px]'>

                    {tasks.length === 0 ?
                        <div className="bg-white text-center rounded-lg shadow-lg p-6">
                            <h1 className='text-xl mb-6'>There are no tasks. Please add new task.</h1>
                            <button className='bg-blue-400 py-2 px-4 rounded-md text-lg font-medium text-white shadow-lg shadow-blue-500/50' onClick={() => setAddBtn(true)}>Add Task</button>
                        </div>
                        :
                        <>
                            <button className='mb-8 bg-blue-400 py-2 px-4 rounded-md text-lg font-medium text-white shadow-lg shadow-blue-500/50' onClick={() => setAddBtn(true)}>Add Task</button>

                            <div id="kanban-board" className=" p-10 rounded-lg grid grid-cols-3 w-full gap-x-8" >
                                {isDragged && 
                                <span className={`dragEle fixed cursor-pointer text-white w-[180px] h-[35px] px-4 z-20 flex shadow-lg rounded-md items-center text-left ${draggedTask.task.status === 'toDo' && 'bg-blue-500 shadow-blue-500/50'} ${draggedTask.task.status === 'inProgress' && 'bg-yellow-500 shadow-yellow-500/50'} ${draggedTask.task.status === 'done' && 'bg-green-500 shadow-green-500/50'}`} style={{ top: `${draggedTask.y}px`, left: `${draggedTask.x}px` }}>{draggedTask.task.title}</span>}

                                {Object.keys(taskList).map((k, i) =>
                                    <div key={i} className=' pb-4' ref={e => dndRefs.current[0] = e} >
                                        <h2 className='text-lg font-semibold border-b-[1px] border-slate-300 p-2'>{k === 'toDo' ? 'To do' : k === 'done' ? 'Done' : 'In Progress'}</h2>
                                        {taskList[k].map((task) =>
                                            <TaskCard btns={btns} setBtns={setBtns} draggedId={draggedTask.task.id} startDrag={startDrag} key={task.id} task={task} />
                                        )}

                                    </div>)}
                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    )
}
export default Kanban