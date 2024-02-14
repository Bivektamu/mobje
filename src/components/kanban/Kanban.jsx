import React, { useState, useEffect, useRef } from 'react'
import AddForm from './AddForm'
import EditForm from './EditForm'
import { useTaskContext } from '../../context'
import TaskCard from '../ui/TaskCard'
import DraggedTask from './DraggedTask'
import { sortTasks } from '../../utils'
import TaskDetail from './TaskDetail'

const Kanban = () => {
    const [totalTasks, setTotalTasks] = useState(0)
    const {state, dispatch} = useTaskContext()
    const { taskList } = state
    const dndRefs = useRef([])
    const [cords, setCords] = useState({ x: 0, y: 0 })
    const [draggedTask, setDraggedTask] = useState({ ...cords, task: {} })
    const [isDragged, setDragged] = useState(false)
    const [activeCol, setActiveCol] = useState()
    const [isClicked, setIsClicked] = useState({
        state: false,
        task: '',
        time: (new Date()).getTime()
    })

    const [modal, setModal] = useState({})

    useEffect(() => {
        if (modal && Object.keys(modal).length > 0) {
            dispatch({
                type: 'MODAL',
                payload: modal
            })
        }
        else {
            dispatch({
                type: 'MODAL',
                payload: {}
            })
        }
    }, [modal])

    useEffect(() => {
        if (taskList && taskList.length > 0) {
            const total = taskList.reduce((s, t) =>  {return s + t.tasks.length}, 0)
                setTotalTasks(total)
        }
    }, [taskList])


    const [btns, setBtns] = useState({
        isTaskOpBtnClicked: {
            isClicked: false,
            clickedTaskId: ''
        },
        editBtn: {
            isClicked: false,
            id: ''
        },
        addBtn: {
            isClicked: false,
            stage: 'todo'
        }
    })

    //     useEffect(() => {
    //         if (tasks) {
    //             let tempTaskList = { toDo: [], inProgress: [], done: [] }
    // 
    //             const sortedTasks = sortTasks(tasks)
    //             sortedTasks.map(t => {
    //                 tempTaskList = { ...tempTaskList, [t.stage]: [...(tempTaskList[t.stage] || []), t] }
    //             })
    //             setTaskList(tempTaskList)
    //         }
    //     }, [tasks])

    const { editBtn, addBtn } = btns

    useEffect(() => {
        if (addBtn.isClicked) {
            setModal(<AddForm stage='toDo' btns={btns} setBtns={setBtns} />)
        }
        else if (editBtn.isClicked) {
            setModal(<EditForm taskId={editBtn.id} btns={btns} setBtns={setBtns} />)
        }
        else {

            setModal({})
        }

    }, [addBtn, editBtn])

    const { task } = isClicked

    useEffect(() => {
        if (task && task !== '') {
            console.log(task)
            setModal(<TaskDetail closeModal={setIsClicked} task={task} />)
        }
        else {
            setModal({})
        }
    }, [task])


    const dragStop = e => {
        setCords({ ...cords, x: e.clientX, y: e.clientY })
        setDragged(false)
        if (activeCol === '' || !activeCol) {
            return setDraggedTask({ ...draggedTask, task: {} })

        }
        if (activeCol === draggedTask.task.stage) {
            setDraggedTask({ ...draggedTask, task: {} })
            return setActiveCol('')
        }
        const newTask = draggedTask.task
        newTask.stage = activeCol
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
        const diff = { x: e.clientX - cords.x, y: e.clientY - cords.y }

        // if(diff.x == 0 && diff.y== 0) {
        //     return
        // }

        const kanban = document.getElementById('kanban-board').getBoundingClientRect()

        if (diff.x == 0 && diff.y == 0) {
            return
        }

        if (e.clientX > kanban.right || e.clientX < kanban.left || e.clientY < kanban.top || e.clientY > kanban.bottom) {
            setActiveCol('')
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


        setCords({ ...cords, x: e.clientX, y: e.clientY })
        setDraggedTask({ ...draggedTask, x: draggedTask.x + diff.x, y: draggedTask.y + diff.y })
    }

    const startDrag = (e, task) => {
        e.preventDefault()
        e.stopPropagation()
        setIsClicked((prev) => ({ ...prev, time: (new Date()).getTime() }))
        setDragged(true)
        setDraggedTask({ ...draggedTask, x: (e.currentTarget).getBoundingClientRect().left, y: (e.currentTarget).getBoundingClientRect().top, task })
        setCords({ ...cords, x: e.clientX, y: e.clientY })
    }

    const handleAllBtns = (e) => {
        setTimeout(() => {
            if (e.target.nodeName !== 'Button') {
                setBtns((prev) => ({ ...prev, isTaskOpBtnClicked: { isClicked: false, clickedTaskId: '' } }))
            }
        }, 1)
    }

    return (
        <div className='mx-auto flex items-center justify-center py-10  h-screen' onMouseMove={e => mouseTracker(e)} onMouseUp={e => dragStop(e)} onClick={handleAllBtns}>
            <div className='w-[700px]'>

                {totalTasks < 1 ?
                    <div className="bg-white text-center rounded-lg shadow-lg p-6">
                        <h1 className='text-xl mb-6'>There are no tasks. Please add new task.</h1>
                        <button className='bg-blue-400 py-2 px-4 rounded-md text-lg font-medium text-white shadow-lg shadow-blue-500/50' onClick={() => setBtns({ ...btns, addBtn: { isClicked: true, stage: 'toDo' } })}>Add Task</button>
                    </div>
                    :
                    <>
                        <div id="kanban-board" className=" py-10 rounded-lg grid grid-cols-3 w-full gap-x-4" >
                            {isDragged &&
                                <div className="dragEle fixed cursor-pointer" style={{ top: `${draggedTask.y}px`, left: `${draggedTask.x}px` }}>
                                    <DraggedTask task={draggedTask.task} />
                                </div>
                            }

                            {taskList.map((k,i) =>
                                <div key={i} className={`select-none flex flex-col gap-y-6 pb-4 ${(isDragged && activeCol === k) && 'border-[1px] border-dashed border-slate-400'}`} ref={e => dndRefs.current[0] = e} >
                                    <h2 className='flex justify-between  text-lg mb-2 font-semibold border-b-[1px] border-slate-300 p-2'>
                                        <p>
                                            <span className='mr-4'>{k.slug === 'toDo' ? 'To do' : k.slug === 'inProgress' ? 'In Progress': 'Done'}</span>
                                            <span className='text-sm text-slate-500'>{k.tasks.length}</span>
                                        </p>
                                        {k.slug !== 'complete' &&
                                            <button type='button' className="flex items-center justify-center text-slate-800 pb-[3px] w-6 h-6 rounded-full border-[1px] border-slate-400" onClick={() => setBtns({ ...btns, addBtn: { isClicked: true, stage: k.slug } })}>+</button>
                                        }
                                    </h2>
                                    {k.tasks.length > 0 &&k.tasks.map((task) =>
                                        <TaskCard key={task.id} btns={btns} setBtns={setBtns} isClicked={isClicked} setIsClicked={setIsClicked} draggedId={draggedTask.task.id} startDrag={startDrag} task={task} />
                                    )}

                                </div>)}
                        </div>
                    </>
                }

            </div>
        </div>
    )
}
export default Kanban