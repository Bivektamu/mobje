import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../../context'

const EditForm = ({ setBtns, taskId }) => {
    const [{ tasks }, dispatch] = useTaskContext()
    const [showError, setShowError] = useState(false)
    

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        desc: '',
        assignee: '',
        due: '',
        status: ''
    })

    const [errorsUI, setErrorsUI] = useState([])


    useEffect(() => {
        const task = tasks.filter(t => t.id === taskId)[0]
        setFormData({
            id: task.id,
            title: task.title,
            desc: task.desc,
            assignee: task.assignee,
            due: task.due,
            status: task.status
        })
    }, [])

    
    const { id, title, desc, assignee, due, status } = formData
    const submitHandler = e => {
        e.preventDefault()
        if(!showError)
            setShowError(true)

        if(errorsUI.length > 0) {
            return
        }
        dispatch({
            type: 'EDIT',
            payload: formData
        })
        dispatch({ type: 'SET' })
        setBtns(prev=>({...prev, editBtn: {isClicked: false, id:''}}))
    }

    const handleInputChange = e => {
        if (e.target.value === '') {
            setErrorsUI(prevErrors=>[...prevErrors.filter(er=>!er[e.target.name]), {[e.target.name]: `Please add ${e.target.name}`}] )
        }

        else if (e.target.name === 'title' && e.target.value !== '') {
            const findIfTitleExists = tasks.filter(t => t.title === e.target.value)
            if (findIfTitleExists.length > 0) {
                setErrorsUI(prevErrors=>[...prevErrors.filter(ele=>!ele[e.target.name]), {title: 'Title already exists'}])
            }
            else {
                setErrorsUI(prevErrors=>[...prevErrors.filter(ele=>!ele[e.target.name])])
            }
        }
        else if (e.target.name === 'due' && e.target.value !== '') {
            console.log()
            const currDate = new Date()
            const inputDateArr = e.target.value.split('-')
            const selectedDate = new Date(inputDateArr[0], inputDateArr[1] - 1, inputDateArr[2])
            if (selectedDate.getTime() < currDate.getTime()) {
                setErrorsUI(prevErrors=>[...prevErrors.filter(ele=>!ele.due), {due: 'Please select valid date'}])
            }
            else {
                setErrorsUI(prevErrors=>[...prevErrors.filter(ele=>!ele[e.target.name])])
            }
        }
        else {
            setErrorsUI(prevErrors=>[...prevErrors.filter(ele=>!ele[e.target.name])])
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='w-screen z-10 h-screen fixed bg-black/50 flex items-center justify-center'>
                <span className='absolute top-10 text-white text-4xl cursor-pointer' onClick={() => setBtns(prev=>({...prev, editBtn: {isClicked: false, id:''}}))}>x</span>

                <form className='flex flex-col gap-y-6 bg-slate-800 p-10 w-[400px] rounded-lg' onSubmit={e => submitHandler(e)}>
                    <div className='relative'>
                        <input type="text" name='title' value={title} placeholder='Title' className='rounded-md py-2 px-4 w-full' onChange={e => handleInputChange(e)} />
                        {showError && errorsUI.filter(e=>e.title).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e=>e.title)[0].title}</span>}
                    </div>
                    <div className='relative'>
                        <input type="text" name='desc' value={desc} placeholder='Decription' className='rounded-md py-2 px-4 w-full' onChange={e => handleInputChange(e)} />
                        {showError && errorsUI.filter(e=>e.desc).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e=>e.desc)[0].desc}</span>}
                    </div>
                    <div className='relative'>
                        <input type="text" name='assignee' value={assignee} placeholder='Assignee' className='rounded-md py-2 px-4 w-full' onChange={e => handleInputChange(e)} />
                        {showError && errorsUI.filter(e=>e.assignee).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e=>e.assignee)[0].assignee}</span>}
                    </div>
                    <div className='relative'>
                        <input type="date" name='due' value={due} placeholder='Due Date' className='rounded-md py-2 px-4 w-full' onChange={e => handleInputChange(e)} />
                        {showError && errorsUI.filter(e=>e.due).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e=>e.due)[0].due}</span>}
                    </div>
                    <div className='relative'>
                        <select value={status} name="status" id="" className='rounded-md py-2 px-4 w-full' onChange={e => handleInputChange(e)}>
                            <option value="">Status</option>
                            <option value="toDo">To Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                        </select>

                        {showError && errorsUI.filter(e=>e.status).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e=>e.status)[0].status}</span>}
                    </div>
                    <button className='bg-blue-500 text-white rounded-md px-4 py-2'>Save</button>
                </form>
            </div>
        </>
    )
}

export default EditForm