import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { history } from '../redux'

import { getLogs, clearLogs } from '../redux/reducers/logsReducer'

const Logs = () => {
  const dispatch = useDispatch()
  const logs = useSelector((s) => s.logsReducer.logs)

  useEffect(() => {
    setTimeout(() => dispatch(getLogs()), 100)
  }, [dispatch])

  const navigate = () => {
    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to main page`
      }
    })
  }

  const onClick = () => {
    navigate()
    history.push('/')
  }

  return (
    <div>
      <div>
        <button type="button" className="border-black border-2" onClick={onClick}>
          Back to Main
        </button>
      </div>
      <button type="button" className="border-black border-2" onClick={() => dispatch(clearLogs())}>
        Clear Logs
      </button>
      <div>Number of Logs: {logs.length}</div>
      {logs.map((it) => {
        return (
          <div key={it.time}>
            {Date(it.time)} ------ {it.action}
          </div>
        )
      })}
    </div>
  )
}

Logs.propTypes = {}

export default Logs
