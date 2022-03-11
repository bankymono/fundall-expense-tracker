import api from "../../api"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_COMPLETE, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"


export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const {data} = await api.post('/register', userData)
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_REGISTER_COMPLETE
        })

    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response.data.error.message
        })
    }
}


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })


        const {data} = await api.post('/login',{email, password})
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response.data.error.message
        })
    }
}


export const getUserDetail = (id) => async (dispatch) => {

    try {

        dispatch({
            type: USER_PROFILE_REQUEST
        })

        const { data } = await api.get(`/base/profile`)
        console.log('i worked', data)
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data.success.data
        })

    } catch (error) {
        console.log('profile err',error.response)
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response
        })
    }
}