import React, { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import { useTaskContext } from '../../context'
import PropTypes from 'prop-types'
import AddForm from '../kanban/AddForm'
import AddList from './AddList'
import EditList from './EditList'

const ShoppingList = props => {
    const [btns, setBtns] = useState({
        action: '',
        payload: ''

    })
    const [modal, setModal] = useState({})
    const { state, dispatch } = useTaskContext()

    const {shoppingList} = state

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
                payload: ''
            })
        }
    }, [modal])

    const { action, payload } = btns

    useEffect(() => {

        switch (action) {
            case 'ADD':
                setModal(<AddList setBtns={setBtns} />)
                break;
                
            case 'EDIT':
                console.log(payload)
                setModal(<EditList setBtns={setBtns} listSlug={payload} />)
                break;
            default:
                setModal({})
                break;

            // setModal({})
        }
    }, [action, payload])


    const editHandler = (e, slug) => {
        e.stopPropagation()
        setBtns({ action:'EDIT', payload: slug })
    }
    const onClickHandler = (e, data) => {
        e.stopPropagation()
        setBtns({ ...data })
    }

    return (
        <div className='mx-auto flex items-center justify-center py-10  h-screen' onClick={(e) => onClickHandler(e, { action: '', payload: '' })}>
            <div>
                <h1 className="text-4xl font-semibold mb-8 text-center">Shopping List</h1>
                <div className="flex gap-x-10">
                    {shoppingList.length > 0 && shoppingList.map((s, i) =>

                        <NavLink to={`/shopping/${s.slug}`} key={i} className={`grocery-list select-none relative  w-[180px] mx-auto  bg-white  rounded-md text-black cursor-pointer text-center p-6 shadow-lg shadow-slate-500/50 flex items-center justify-center`}
                        >
                            {s.title}

                            <div className='absolute top-0 right-3' >
                                <button className='w-[20px] leading-[0px] h-[20px] rounded-full text-center  font-bold pb-2' onClick={(e) => onClickHandler(e, { action: 'OPTIONS', payload: s.slug })}>...</button>
                                {(action === 'OPTIONS' && payload === s.slug) &&
                                    <div className="absolute z-10 shadow-md shadow-slate-400 bg-white w-[140px] block  rounded-md text-xs flex flex-col  top-[30px] -right-[70px]">

                                        <button className='hover:bg-slate-200  cursor-pointer px-5 py-3 flex gap-x-3 ' onClick={(e) => editHandler(e, s.slug)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000" height="16" width="16" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                            <span>Edit List</span>
                                        </button>
                                        <button className='hover:bg-slate-200  px-5 py-3 flex gap-x-3 text-red-500 cursor-pointer' onClick={(e) => deleteHandler(e, id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='fill-red-500' height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                            <span>Delete List</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </NavLink>
                    )}

                    <button type='button'
                        onClick={(e) => onClickHandler(e, { action: 'ADD', payload: '' })}
                        className={`select-none relative  w-[180px] mx-auto  bg-white  rounded-md text-black cursor-pointer text-center p-6 shadow-lg shadow-slate-500/50`} >
                        <h2 className='text-md mb-4 font-light'>Add Shopping list</h2>
                        <span className='w-8 m-auto h-8 block relative after:content-[""] after:absolute after:w-1 after:h-full after:bg-slate-300 after:left-0 after:right-0 after:m-auto before:content-[""] before:absolute before:h-1 before:w-full before:bg-slate-300 before:left-0 before:right-0 before:top-0 before:bottom-0 before:m-auto after:shadow after:shadow-slate-500/50 before:shadow before:shadow-slate-500/50 '></span>
                    </button>
                </div>
            </div>

        </div>
    )
}

ShoppingList.propTypes = {}

export default ShoppingList