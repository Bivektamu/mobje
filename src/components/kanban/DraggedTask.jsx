import PropTypes from 'prop-types'
import {numToMonthName} from '../../utils'

const DraggedTask = ({task}) => {
    const dueDate = {
        month: numToMonthName(task.due.split('-')[1]),
        day: task.due.split('-')[2],
        year: task.due.split('-')[0]

    }
    return (
        <div  className={`relative  w-[180px] mx-auto  bg-white  rounded-md text-black cursor-pointer`}>
            <div className='flex justify-between items-center border-b-[1px] border-slate-300 py-2 px-4' >
                <p className='w-[130px] text-left' >{task.title.length < 14 ? task.title:task.title.slice(0,14)+'...'}</p>
            </div>

            <div className={` py-4 px-3 text-left`}>
                <div className="flex justify-between">
                    <svg xmlns="http://www.w3.org/2000/svg" fill='#000' width='14' viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
                    <p className='text-sm'>{dueDate.month} {dueDate.day}, {dueDate.year}</p>
                    
                </div>
            </div>
        </div>
    )
}

DraggedTask.propTypes = {
    task: PropTypes.object.isRequired,
}

export default DraggedTask