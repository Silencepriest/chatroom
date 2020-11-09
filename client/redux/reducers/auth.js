import Cookies from 'universal-cookie'

const SET_USERNAME = 'SET_USERNAME'
const SET_PASSWORD = 'SET_PASSWORD'
const SET_LOGIN = 'SET_LOGIN'

const cookies = new Cookies()

const initValues = {
  username: '',
  password: '',
  token: cookies.get('token'),
  user: {}
}

export function setUsername(username) {
  return {
    type: SET_USERNAME,
    payload: username
  }
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    payload: password
  }
}

export function addUser(isReg) {
  return (dispatch, getState) => {
    const uri = isReg ? '/api/v1/reg' : '/api/v1/auth'
    const { username, password } = getState().auth
    fetch(uri, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: SET_LOGIN, token: data, user: data.user })
      })
  }
}


export function validateUser() {
  return (dispatch) => {
    fetch('/api/v1/auth', {
      method: 'GET',
      credentials: 'include'
    })
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: SET_LOGIN, token: data, user: data.user })
      })
  }
}

function Auth(store = initValues, action) {
  switch (action.type) {
    case SET_LOGIN: {
      return {
        ...store,
        token: action.token,
        user: action.user,
        password: ''
      }
    }
    case SET_USERNAME: {
      return {
        ...store,
        username: action.payload
      }
    }
    case SET_PASSWORD: {
      return {
        ...store,
        password: action.payload
      }
    }
    default:
      return { ...store }
  }
}

export default Auth
