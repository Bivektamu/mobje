import { useEffect, useState } from 'react'
import { useTaskContext } from '../../context'
import PropTypes from 'prop-types'
import {ADD_TASK} from '../../context/types'

const AddForm = ({ setBtns, btns }) => {
    const { state,  dispatch} = useTaskContext()
    const [errorsUI, setErrorsUI] = useState([])
    const [showError, setShowError] = useState(false)
    const {taskList} = state
    const [tasks, setTasks] = useState([])
    useEffect(()=> {
        if(taskList) {
            let temp = []
            taskList.map(t=>{
                if(t.tasks.length > 0) {
                    temp = [...temp, ...tasks]
                }
            })
            if(temp.length>0) {
                setTasks(...temp)
            }
        }
    }, [taskList])

    const [formData, setFormData] = useState({
        id: `${btns.addBtn.stage.slice(0, 1)}_${(new Date()).getTime()}`,
        title: '',
        due: '',
    })

    const { title, due } = formData

    useEffect(() => {
        let temp = []

        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'id' && value === '') {
                temp = [...temp, { [key]: `Please add ${key}` }]
            }
        })
        setErrorsUI([...temp])
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        if (!showError)
            setShowError(true)

        if (errorsUI.length > 0) {
            return
        }
        dispatch({
            type: ADD_TASK,
            payload: {formData, stage: btns.addBtn.stage}
        })
        return setBtns({ ...btns, addBtn: { isClicked: false, stage: '' } })
    }

    const handleInputChange = e => {
        if (e.target.value === '' && e.target.name !=='description') {
            setErrorsUI(prevErrors => [...prevErrors.filter(er => !er[e.target.name]), { [e.target.name]: `Please add ${e.target.name}` }])
        }
      
        else if (e.target.name === 'due' && e.target.value !== '') {
            const currDate = new Date()
            const inputDateArr = e.target.value.split('-')
            const selectedDate = new Date(inputDateArr[0], inputDateArr[1] - 1, inputDateArr[2])
            if (selectedDate.getTime() < currDate.getTime()) {
                setErrorsUI(prevErrors => [...prevErrors.filter(ele => !ele.due), { due: 'Please select valid date' }])
            }
            else {
                setErrorsUI(prevErrors => [...prevErrors.filter(ele => !ele[e.target.name])])
            }
        }
        else {
            setErrorsUI(prevErrors => [...prevErrors.filter(ele => !ele[e.target.name])])
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className=' bg-white  w-full rounded-lg'>
            <h3 className='font-semibold border-b-[1px] border-slate-300 px-8 py-4 flex justify-between items-center'>
                <span>Add new Task</span>
                <button className='cursor-pointer relative w-4 h-4  after:content-[""] after:absolute after:bg-slate-600 after:w-full after:h-[2px] after:left-0 after:rotate-45 before:content-[""] before:absolute before:bg-slate-600 before:w-full before:h-[2px] before:left-0 before:-rotate-45' onClick={() => setBtns({ ...btns, addBtn: { isClicked: false, stage: 'toDo' } })
                }></button>
            </h3>
            <form className='flex flex-col gap-y-6  mb-4 py-4' onSubmit={e => submitHandler(e)}>
                <div className='relative px-8'>
                    <label className='text-sm mb-3 px-2 block capitalize' htmlFor="title"><span className="text-red-500">*</span> title</label>
                    <input type="text" name='title' value={title} className='outline-none rounded-md border-[1px] border-slate-300 p-2 w-full text-sm' onChange={e => handleInputChange(e)} />
                    {showError && errorsUI.filter(e => e.title).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e => e.title)[0].title}</span>}
                </div>
               
                <div className='relative px-8'>
                    <label className='text-sm mb-3 px-2 block capitalize' htmlFor="due"><span className="text-red-500">*</span> due date</label>
                    <input type="date" name='due' value={due} className='outline-none rounded-md border-[1px] border-slate-300 p-2 w-full text-sm' onChange={e => handleInputChange(e)} />
                    {showError && errorsUI.filter(e => e.due).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e => e.due)[0].due + ' date'}</span>}
                </div>
                <div className="flex px-8  pt-4 justify-end items-center border-t-[1px] border-slate-300 gap-x-4">
                    <button type='button' className='bg-slate-100 text-slate-1000 border-[1px] border-slate-400 rounded-md px-4 py-1' onClick={() => setBtns({ ...btns, addBtn: { isClicked: false, stage: 'toDo' } })
                    }>Cancel</button>
                    <button className='bg-blue-500 text-white rounded-md px-4 py-1'>Save</button>
                </div>
            </form>
        </div>
    )
}

AddForm.propTypes =  {
    setBtns:PropTypes.func.isRequired,
    btns: PropTypes.object.isRequired
}

export default AddForm