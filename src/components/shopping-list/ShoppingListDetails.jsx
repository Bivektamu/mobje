import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaCirclePlus  } from "react-icons/fa6";

import { MODAL } from '../../context/types'
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
    e.stopPropagation()
    setModal(<>Add Item Form</>)
  }

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


  if (isLoading) {
    return <>Loading</>
  }
  const { title, items } = list

  return (
    <section id="shopping-list-details" className='w-full flex items-center justify-center py-10 flex-col gap-6  h-screen'>
      <div className="w-[400px] bg-white text-center rounded-lg shadow-lg">
        <h1 className="text-xl  font-semibold border-b-[1px] border-slate-300 px-8 py-4">{title}</h1>
        <div className="px-8 py-4">
          {items && items.length > 0 && ''}
          <div className="grid grid-cols-8 gap-4">
            <input type="text" id="add-item" className='col-span-7 placeholder:text-slate-400 placeholder:text-sm placeholder:italic outline-none rounded-md border-[1px] border-slate-300 p-2 w-full text-sm' value={newItem} onChange={onChange} placeholder='There are no items. Please add first item.' />
            <button type="button" onClick={onClick} className=''><FaCirclePlus className={`w-full h-full ${newItem ? '':'text-slate-400' } `} /></button>
          </div>

        </div>
      </div>

    </section>
  )
}

ShoppingListDetails.propTypes = {}

export default ShoppingListDetails