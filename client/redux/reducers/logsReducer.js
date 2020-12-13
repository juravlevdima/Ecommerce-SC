import axios from 'axios'

const GET_LOGS = 'GET_LOGS'

const initialState = {
  logs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS: {
      return {
        ...state,
        logs: action.logs
      }
    }
    default:
      return state
  }
}

export function getLogs() {
  return (dispatch) => {
    axios.get('/api/v1/logs').then(({ data: logs }) => {
      dispatch({ type: GET_LOGS, logs })
    })
  }
}

export function clearLogs() {
  return (dispatch) => {
    axios.delete('/api/v1/logs').then(() => {
      axios.get('/api/v1/logs').then(({ data: logs }) => {
        dispatch({ type: GET_LOGS, logs })
      })
    })
  }
}
