import React, { useEffect, useState } from 'react'
import { useTaskContext } from '../../context'

const AddForm = ({ setAddBtn, status }) => {
    const [{ tasks }, dispatch] = useTaskContext()
    const [errorsUI, setErrorsUI] = useState([])
    const [showError, setShowError] = useState(false)

    const [formData, setFormData] = useState({
        id: `${status.slice(0, 1)}_${(new Date()).getTime()}`,
        title: '',
        description: '',
        due: '',
        status: status
    })

    const { title, description, due } = formData

    useEffect(() => {
        let temp = []

        Object.entries(formData).forEach(([key, value]) => {
            if(key !== 'id' && key !== 'status' && value === ''){
                console.log(value)
                temp = [...temp, { [key]: `Please add ${key}` }]
            } 
        })
        // console.log(temp.length)
        setErrorsUI([...temp])
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        if(!showError)
            setShowError(true)

        console.log(errorsUI)
        if(errorsUI.length > 0) {
            return
        }
        dispatch({
            type: 'ADD',
            payload: formData
        })
        dispatch({ type: 'SET' })
        setAddBtn(false)
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

            <div className='w-screen h-screen fixed bg-black/50 flex items-center z-20 justify-center'>
                <span className='absolute top-10 text-white text-4xl cursor-pointer' onClick={() => setAddBtn(false)}>x</span>

                <form className='flex flex-col gap-y-6 bg-slate-800 p-10 w-[400px] rounded-lg' onSubmit={e => submitHandler(e)}>
                    <div className='relative'>
                        <label className='mb-3 block capitalize' htmlFor="title">title</label>
                        <input type="text" name='title' value={title}  className='rounded-md py-2 px-4 w-full' onChange={e => handleInputChange(e)} />
                        {showError && errorsUI.filter(e=>e.title).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e=>e.title)[0].title}</span>}
                    </div>
                    <div className='relative'>
                        <label className='mb-3 block capitalize' htmlFor="description">description</label>
                        <input type="text" name='description' value={description}  className='rounded-md py-2 px-4 w-full' onChange={e => handleInputChange(e)} />
                        {showError && errorsUI.filter(e=>e.description).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e=>e.description)[0].description}</span>}
                    </div>
                    <div className='relative'>
                        <label className='mb-3 block capitalize' htmlFor="due">due date</label>
                        <input type="date" name='due' value={due}  className='rounded-md py-2 px-4 w-full' onChange={e => handleInputChange(e)} />
                        {showError && errorsUI.filter(e=>e.due).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e=>e.due)[0].due+' date'}</span>}
                    </div>
                    <button className='bg-blue-500 text-white rounded-md px-4 py-2'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddForm