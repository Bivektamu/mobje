import { useState, useEffect, useDebugValue } from 'react'
import { useTaskContext } from '../../context'
import { numToMonthName } from '../../utils'
import PropTypes from 'prop-types'

const TaskCard = ({ task, startDrag, draggedId, setBtns, btns, setIsClicked, isClicked }) => {
    const [state, dispatch] = useTaskContext()
    const dueDate = {
        month: numToMonthName(task.due.split('-')[1]),
        day: task.due.split('-')[2],
        year: task.due.split('-')[0]
    }

    const onClick = (e, task) => {
        e.stopPropagation()
        e.preventDefault()

        const newTime = (new Date()).getTime()
        if (newTime - isClicked.time < 300) {
            return setIsClicked({ time: newTime, state: true, task: task })
        }
        return setIsClicked({ time: newTime, state: false, task: '' })
    }



    const markDone = (e) => {
        e.stopPropagation()
        setBtns((prev) => ({
            ...prev, isTaskOpBtnClicked: { isClicked: false, clickedTaskId: '' }
        }))
        dispatch({ type: 'TASK_DONE', payload: id })
    }


    const optionBtnHandler = (e, id) => {
        e.stopPropagation();

        setTimeout(() => { setBtns((prev) => ({ ...prev, isTaskOpBtnClicked: { isClicked: true, clickedTaskId: id } })) }, 1)
    }
    const editHandler = (e, id) => {
        e.stopPropagation()
        setBtns(prev => ({
            ...prev, editBtn: {
                isClicked: true,
                id: id
            }
        }))
    }


    const deleteHandler = (e, id) => {
        e.stopPropagation()
        const content = (
            <>
                <h3 className='font-semibold border-b-[1px] border-slate-300 px-4 py-4 text-center'>Are you sure you want to delete the task ?</h3>
                <div className="flex px-8  pt-4 justify-center items-center border-t-[1px] border-slate-300 gap-x-4 pb-6">
                    <button type='button' className='bg-slate-100 text-slate-1000 border-[1px] border-slate-400 rounded-md px-4 py-1'
                        onClick={() => dispatch({ type: 'MODAL', payload: {} })}>Cancel</button>
                    <button
                        className='bg-red-500 text-white rounded-md px-4 py-1'
                        onClick={() => {
                            dispatch({ type: 'DELETE', payload: id })
                            dispatch({ type: 'MODAL', payload: {} })
                        }}
                    >Delete</button>
                </div>
            </>
        )

        dispatch({
            type: 'MODAL',
            payload: content
        })
    }



    const { isTaskOpBtnClicked } = btns
    const { id, title, status, due } = task

    return (

        <div key={id} className={`select-none relative  w-[180px] mx-auto  bg-white  rounded-md text-black cursor-pointer  ${draggedId === id && 'opacity-0'}`} onClick={e => onClick(e, task)} onMouseDown={(e) => { startDrag(e, task) }}>
            <div className='flex justify-between items-center border-b-[1px] border-slate-300 py-2 px-4' >
                <p className='w-[130px] text-left' >{title.length < 14 ? title : title.slice(0, 14) + '...'}</p>
                <div className='relative' >
                    <button className='w-[20px] leading-[0px] h-[20px] rounded-full text-center  font-bold pb-2' onClick={(e) => optionBtnHandler(e, id)}>...</button>
                    {(isTaskOpBtnClicked.isClicked && isTaskOpBtnClicked.clickedTaskId === id) &&
                        <div className="absolute z-10 shadow-md shadow-slate-400 bg-white w-[140px] block  rounded-md text-xs flex flex-col  top-[30px] -right-[70px]">
                            {status !== 'done' &&
                                <>
                                    <button className='hover:bg-slate-200  px-5 py-3 flex gap-x-3 ' onClick={markDone}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" className='cursor-pointer' fill="#000"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                                        <span>Mark as done</span>
                                    </button>
                                </>
                            }

                            <button className='hover:bg-slate-200  cursor-pointer px-5 py-3 flex gap-x-3 ' onClick={(e) => editHandler(e, id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000" height="16" width="16" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                <span>Edit Task</span>
                            </button>
                            <button className='hover:bg-slate-200  px-5 py-3 flex gap-x-3 text-red-500 cursor-pointer' onClick={(e) => deleteHandler(e, id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='fill-red-500' height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                <span>Delete Task</span>
                            </button>
                        </div>
                    }
                </div>
            </div>

            <div className={` py-4 px-3 text-left`}>
                <div className="flex justify-between">
                    <svg xmlns="http://www.w3.org/2000/svg" fill='#000' width='14' viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
                    <p className='text-sm'>{dueDate.month} {dueDate.day}, {dueDate.year}</p>
                </div>
            </div>
        </div>
    )
}

TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
    startDrag: PropTypes.func,
    setBtns: PropTypes.func,
    btns: PropTypes.object,
    draggedId: PropTypes.string,
}
export default TaskCard