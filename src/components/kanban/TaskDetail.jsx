import React from 'react'
import PropTypes from 'prop-types'

const TaskDetail = ({task, closeModal}) => {
  return (
    <div>
        <button type="button" onClick={()=>closeModal('')}>Close</button>
        <h1>Task Detail</h1>
    </div>
  )
}

TaskDetail.propTypes = {}

export default TaskDetail