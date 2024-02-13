import React from 'react'
import PropTypes from 'prop-types'
import { numToMonthName } from '../../utils'

const TaskDetail = ({ task: { title, stage, description, due }, closeModal }) => {

  const dueDate = {
    month: numToMonthName(due.split('-')[1]),
    day: due.split('-')[2],
    year: due.split('-')[0]
  }

  return (
    <div className=' bg-white  w-full rounded-lg'>

      <h3 className='font-semibold border-b-[1px] border-slate-300 px-4 py-4 flex justify-between items-center'>
        <span>{title}</span>
        <button className='cursor-pointer relative w-4 h-4  after:content-[""] after:absolute after:bg-slate-600 after:w-full after:h-[2px] after:left-0 after:rotate-45 before:content-[""] before:absolute before:bg-slate-600 before:w-full before:h-[2px] before:left-0 before:-rotate-45' onClick={() => closeModal({
          state: false,
          task: '',
          time: (new Date()).getTime()
        })}></button>
      </h3>

      <p className='border-b-[1px] border-slate-300 px-4 py-4 flex gap-x-4 '>
        <svg xmlns="http://www.w3.org/2000/svg" width={15} viewBox="0 0 448 512"><path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24V64 350.5 400v88c0 13.3 10.7 24 24 24s24-10.7 24-24V388l80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52V24zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8V334.7l-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5v-237z" /></svg>
        <span className='capitalize'>{stage}</span>
      </p>

      <div className="border-b-[1px] border-slate-300 px-4 py-4 flex gap-x-4 flex-col gap-y-4">
        <p className='flex items-center gap-x-2'>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="align-left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M120 230h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm0 424h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm784 140H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg>
          <span>Task: {title}</span>
        </p>
        <p className='pl-6'>
          Description: {description}
        </p>
      </div>
      <div className="border-b-[1px] border-slate-300 px-4 py-4 flex gap-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill='#000' width='14' viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
        <p className='text-sm'>{dueDate.month} {dueDate.day}, {dueDate.year}</p>
      </div>

    </div>
  )
}

TaskDetail.propTypes = {}

export default TaskDetail