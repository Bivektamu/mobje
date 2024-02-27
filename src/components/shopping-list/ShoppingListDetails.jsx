import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegSquare, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { ADD_SHOPPING_ITEM, MODAL, DELETE_SHOPPING_ITEM, EDIT_SHOPPING_LIST, EDIT_SHOPPING_ITEM } from '../../context/types'
import { useEffect, useState } from 'react'
import { useTaskContext } from '../../context'


const ShoppingListDetails = props => {
  const { slug } = useParams()
  const { state, dispatch } = useTaskContext()
  const { shoppingList } = state
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState()
  const [modalCon, setModal] = useState(null)
  const [newItem, setNewItem] = useState('')
  const [updatedItem, setUpdatedItem] = useState(null)

  useEffect(() => {
    if (slug && shoppingList.length > 0) {
      setList(shoppingList.filter(list => list.slug === slug)[0])
    }
  }, [slug, shoppingList])

  useEffect(() => {
    if (list) {
      console.log(list)
      setIsLoading(false)
    }
  }, [list])

  const keyPressed = e => {
    if (e.key.toLowerCase() === 'enter') {
      onClick(e)
    }
  }

  const onClick = e => {
    // e.stopPropagation()
    const item = {
      title: newItem,
      bought: false,
      id: `${newItem.slice(0, 3)}_${(new Date()).getTime()}`
    }
    dispatch({
      type: ADD_SHOPPING_ITEM,
      payload: { item, slug }
    })

    e.stopPropagation()

    return setNewItem('')

  }
  // 
  useEffect(() => {
    if (modalCon) {
      dispatch({
        type: MODAL,
        payload: modalCon
      })
    }
  }, [modalCon])

  const onChange = (e, id) => {
    e.stopPropagation()
    console.log(id)
    const newList = { ...list }
    newList.items = [...newList.items.map(item => ({
      ...item,
      title: item.id === id ? e.target.value : item.title
    }))
    ]
    setList({ ...newList })
  }

  const statusHandler = (e, item) => {
    e.stopPropagation()
    console.log(item)
    const updatedItem = {
      ...item,
      bought: !item.bought
    }
    dispatch({
      type: EDIT_SHOPPING_ITEM,
      payload: { ...updatedItem }
    })
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
              dispatch({ type: DELETE_SHOPPING_ITEM, payload: { slug, id } })
              dispatch({ type: 'MODAL', payload: {} })
            }}
          >Delete</button>
        </div>
      </>
    )
    setModal(content)
  }
  const handleEvent = e => {
    e.stopPropagation()
    if (e.target.classList.value.indexOf('item-title') === -1) {
      setUpdatedItem({})
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    dispatch({
      type: EDIT_SHOPPING_ITEM,
      payload: { ...updatedItem }
    })
    setUpdatedItem({})
  }

  if (isLoading) {
    return <>Loading</>
  }
  const { title, items } = list

  return (
    <section id="shopping-list-details" className='w-full flex items-center justify-center py-10 flex-col gap-6  h-screen' onClick={handleEvent}>
      <div className="w-[400px] bg-white text-center rounded-lg shadow-lg">
        <h1 className="text-xl  font-semibold border-b-[1px] border-slate-300 px-8 py-4">{title}</h1>
        <div className="px-4 py-4">
          {items && items.length > 0 &&

            items.filter(item => !item.bought).map(i =>
              <div key={i.id} className={`grid grid-cols-10 gap-2 ${updatedItem && updatedItem.id === i.id ? '' : 'shadow-lg border-[1px]'}  mb-2  px-4 py-2 rounded-md  border-slate-300 w-full`}>
                <button type="button" onClick={e => statusHandler(e, i)} className=''><FaRegSquare className='text-lg' /></button>
                {updatedItem && updatedItem.id === i.id ?
                  <form className="col-span-8" onSubmit={onSubmit}>
                    <input type='text' className=' item-title text-left border-[1px] shadow-[-1px_1px_14px_2px_rgba(0,0,0,0.35)] px-4 py-2 rounded-md  border-slate-300 w-full text-sm capitalize' value={updatedItem.title} onChange={e => setUpdatedItem(prev => ({
                      ...prev,
                      title: e.target.value
                    }))} />
                  </form>
                  :
                  <p className='col-span-8  text-left  item-title text-sm capitalize' onClick={() => setUpdatedItem(i)} >{i.title}</p>
                }
                <button type="button" onClick={e => deleteHandler(e, i.id)} className=''><MdDelete className='text-lg' /></button>
              </div>
            )}
          <div className="grid grid-cols-8 gap-4">
            <input type="text" id="add-item" className='col-span-7 placeholder:text-slate-400 placeholder:text-sm placeholder:italic outline-none rounded-md border-[1px] border-slate-300 p-2 w-full text-sm' value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={keyPressed} placeholder={`${items && items.length > 0 ? 'Add new item' : 'There are no items. Please add first item.'}`} />
            <button type="button" onClick={onClick} className=''><FaCirclePlus className={`w-full h-full ${newItem ? '' : 'text-slate-400 pointer-events-none'} `} /></button>
          </div>

        </div>
      </div>
      {items && items.length > 0 && items.filter(item => item.bought).length > 0 &&

        <div className="w-[400px]">

          {items.filter(item => item.bought).map(i =>
            <div key={i.id} className="grid grid-cols-10 gap-2 mb-2 relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-red-500 after:top-0 after:bottom-0 after:my-auto">
              <button type="button" onClick={e => statusHandler(e, i)} className=''><FaCheck className='text-lg' /></button>
              <p className='col-span-7  text-left px-4 py-2 rounded-md  border-slate-300 w-full text-sm capitalize' >{i.title}</p>
              <button type="button" onClick={e => deleteHandler(e, i.id)} className=''><MdDelete className='text-lg' /></button>
            </div>)}
        </div>
      }

    </section>
  )
}

ShoppingListDetails.propTypes = {}

export default ShoppingListDetails