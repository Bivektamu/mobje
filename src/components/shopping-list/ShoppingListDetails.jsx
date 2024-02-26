import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
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
  const [newTitle, seNewTitle] = useState('')

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


  const onChange = e => {
    e.stopPropagation()
    setNewItem(e.target.value)
  }

  const statusHandler = (e, item) => {
    e.stopPropagation()
    console.log('asdf')
    const updatedItem = {
      ...item,
      bought: true
    }
    dispatch({
      type:EDIT_SHOPPING_ITEM,
      payload: updatedItem
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
  if (isLoading) {
    return <>Loading</>
  }
  const { title, items } = list

  return (
    <section id="shopping-list-details" className='w-full flex items-center justify-center py-10 flex-col gap-6  h-screen'>
      <div className="w-[400px] bg-white text-center rounded-lg shadow-lg">
        <h1 className="text-xl  font-semibold border-b-[1px] border-slate-300 px-8 py-4">{title}</h1>
        <div className="px-4 py-4">
          {items && items.length > 0 &&

            items.map(i =>
              <div key={i.id} className="grid grid-cols-10 gap-2  mb-2">
                <button type="button" onClick={e=>statusHandler(e, i)} className=''><FaRegSquare className='text-lg' /></button>
                <p className='col-span-7  text-left border-[1px] shadow-lg px-4 py-2 rounded-md  border-slate-300 w-full text-sm' >{i.title}</p>
                <button type="button" onClick={deleteHandler} className=''><CiEdit className='text-lg' /></button>
                <button type="button" onClick={e => deleteHandler(e, i.id)} className=''><MdDelete className='text-lg' /></button>
              </div>
            )}
          <div className="grid grid-cols-8 gap-4">
            <input type="text" id="add-item" className='col-span-7 placeholder:text-slate-400 placeholder:text-sm placeholder:italic outline-none rounded-md border-[1px] border-slate-300 p-2 w-full text-sm' value={newItem} onChange={onChange} placeholder={`${items && items.length > 0 ? 'Add new item' : 'There are no items. Please add first item.'}`} />
            <button type="button" onClick={onClick} className=''><FaCirclePlus className={`w-full h-full ${newItem ? '' : 'text-slate-400 pointer-events-none'} `} /></button>
          </div>

        </div>
      </div>

    </section>
  )
}

ShoppingListDetails.propTypes = {}

export default ShoppingListDetails