import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../../context'
import { EDIT_SHOPPING_LIST } from '../../context/types'

const EditForm = ({ setBtns, listSlug }) => {
    const { state, dispatch } = useTaskContext()
    const {shoppingList} = state
    const [showError, setShowError] = useState(false)


    const [formData, setFormData] = useState({
        title: '',
        slug: ''
    })

    const [errorsUI, setErrorsUI] = useState([])


    useEffect(() => {
        const list = shoppingList.filter(t => t.slug === listSlug)[0]
        console.log(listSlug)
        console.log(list)
        setFormData({
            title: list.title,
            slug: list.slug
        })
    }, [shoppingList])


    const {title, slug } = formData
    const submitHandler = e => {
        e.preventDefault()
        if (!showError)
            setShowError(true)

        if (errorsUI.length > 0) {
            return
        }
        dispatch({
            type: EDIT_SHOPPING_LIST,
            payload: formData
        })
        setBtns({})
    }

    const handleInputChange = e => {
        if (e.target.value === '') {
            setErrorsUI(prevErrors => [...prevErrors.filter(er => !er[e.target.name]), { [e.target.name]: `Please add ${e.target.name}` }])
        }

        else if (e.target.name === 'title' && e.target.value !== '') {
            const findIfTitleExists = shoppingList.filter(t => t.title === e.target.value)
            if (findIfTitleExists.length > 0) {
                setErrorsUI(prevErrors => [...prevErrors.filter(ele => !ele[e.target.name]), { title: 'Title already exists' }])
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
        <div className=' bg-white rounded-lg'>
           
            <form className='flex flex-col gap-y-6  mb-4 py-4' onSubmit={e => submitHandler(e)}>
                <div className='font-semibold border-b-[1px] border-slate-300 px-8 py-4 flex justify-between items-center'>
                    <span>Edit list</span>
                    <button className='cursor-pointer relative w-4 h-4  after:content-[""] after:absolute after:bg-slate-600 after:w-full after:h-[2px] after:left-0 after:rotate-45 before:content-[""] before:absolute before:bg-slate-600 before:w-full before:h-[2px] before:left-0 before:-rotate-45' onClick={() => setBtns(prev => ({ action:'' }))}></button>
                </div>
                <div className='relative px-8'>
                    <label className='text-sm mb-3 px-2 block capitalize' htmlFor="title"><span className="text-red-500">*</span> title</label>
                    <input type="text" name='title' value={title} className='rounded-md border-[1px] border-slate-300 p-2 w-full text-sm' onChange={e => handleInputChange(e)} />
                    {showError && errorsUI.filter(e => e.title).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e => e.title)[0].title}</span>}
                </div>
               
             
                <div className="flex px-8  pt-4 justify-end items-center border-t-[1px] border-slate-300 gap-x-4">
                    <button type='button' className='bg-slate-100 text-slate-1000 border-[1px] border-slate-400 rounded-md px-4 py-1' onClick={() => setBtns(prev => ({ action: '' }))}>Cancel</button>
                    <button className='bg-blue-500 text-white rounded-md px-4 py-1'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditForm