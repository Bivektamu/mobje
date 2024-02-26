import React, { useEffect, useState } from 'react'
import { useTaskContext } from '../../context'
import {ADD_SHOPPING_LIST} from '../../context/types'

const AddItem = ({ setBtns }) => {
    const {state, dispatch} = useTaskContext()
    const { shoppingList } = state
    const [errorsUI, setErrorsUI] = useState([])
    const [showError, setShowError] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
    })

    const { title} = formData

    useEffect(() => {
        let temp = []

        Object.entries(formData).forEach(([key, value]) => {
            if (value === '') {
                temp = [...temp, { [key]: `Please add ${key}` }]
            }
        })
        setErrorsUI([...temp])
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        
        if (!showError)
            setShowError(true)

        if (errorsUI.length > 0) {
            return
        }
        console.log(formData)
        dispatch({
            type: ADD_SHOPPING_LIST,
            payload: formData
        })
        setBtns({ ...btns, addBtn: false})
    }

    const handleInputChange = e => {
        if (e.target.value === '') {
             setErrorsUI(prevErrors => [...prevErrors.filter(er => !er[e.target.name]), { [e.target.name]: `Please add ${e.target.name}` }])
        }

        else if (e.target.name === 'title' && e.target.value !== '') {
            console.log(errorsUI)
            let slug = [...e.target.value]
            slug[0] = (slug[0]).toLowerCase()
            for (let i = 0; i < slug.length; i++) {
                if (slug[i] === ' ' && slug[i + 1]) {
                    slug[i + 1] = (slug[i + 1]).toUpperCase()
                }
            }
            slug = (slug.filter(s => s !== ' ').toString().replaceAll(',', ''))
            const slugExists = shoppingList.filter(t => t.slug === slug)
            if (slugExists.length > 0) {
                 setErrorsUI(prevErrors => [...prevErrors.filter(ele => !ele[e.target.name]), { title: 'List already exists' }])
            }
            else {
                 setErrorsUI(prevErrors => [...prevErrors.filter(ele => !(ele[e.target.name] || ele.slug) )])
                  setFormData({ ...formData, slug: slug })
            }
        }

        else {
             setErrorsUI(prevErrors => [...prevErrors.filter(ele => !ele[e.target.name])])
        }
        return setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className='w-full rounded-lg'>
            <h3 className='font-semibold border-b-[1px] border-slate-300 px-4 py-4 flex justify-between items-center'>
                <span>Add new shopping item</span>
                <button type='button' className='cursor-pointer relative w-4 h-4  after:content-[""] after:absolute after:bg-slate-600 after:w-full after:h-[2px] after:left-0 after:rotate-45 before:content-[""] before:absolute before:bg-slate-600 before:w-full before:h-[2px] before:left-0 before:-rotate-45' onClick={() => setBtns({action:''})
                }></button>
            </h3>
            <form className='flex flex-col gap-y-6  mb-4 py-4' onSubmit={e => submitHandler(e)}>
                <div className='relative px-4'>
                    <label className='text-sm mb-3 px-2 block capitalize' htmlFor="title"><span className="text-red-500">*</span> title</label>
                    <input type="text" name='title' value={title} className='outline-none rounded-md border-[1px] border-slate-300 p-2 w-full text-sm' onChange={e => handleInputChange(e)} />
                    {showError && errorsUI.filter(e => e.title).length > 0 && <span className='text-red-400 block mt-2 text-left text-xs'>{errorsUI.filter(e => e.title)[0].title}</span>}
                </div>

                <div className="flex px-8  pt-4 justify-end items-center border-t-[1px] border-slate-300 gap-x-4">
                    <button type='button' className='bg-slate-100 text-slate-1000 border-[1px] border-slate-400 rounded-md px-4 py-1' onClick={() => setBtns({ action: '' })
                    }>Cancel</button>
                    <button type='submit' className='bg-blue-500 text-white rounded-md px-4 py-1'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddItem