import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children }) => {
    return (
        <dialog open className='w-screen h-screen top-0 fixed bg-black/50 flex items-center z-20 justify-center'>
            <div className=' bg-white py-4 px-3  w-[400px] rounded-lg'>
                {children}
            </div>
        </dialog>
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired
}

export default Modal