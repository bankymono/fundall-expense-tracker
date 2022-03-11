import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_COMPLETE, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

export const userRegisterReducer = (state={success:false}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                loading:true
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading:false,
                success:true,
                userReg:action.payload
            }
        case USER_REGISTER_COMPLETE:
            return {
                loading:false,
                success:false,
            }
        case USER_REGISTER_FAIL:
            return {
                loading:false,
                error:action.payload,
            }

        default:
            return state
    }
}



export const userLoginReducer = (state={}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading:true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL:
            return { loading:false, error: action.payload}


        case USER_LOGOUT:
            return {}
        default:
                return state;

    }
}

export const userDetailReducer = (state = { userProfile: {} }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true, userProfile: {} }
        case USER_PROFILE_SUCCESS:
            return { loading: false, userProfile: action.payload }
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        // case INVESTORS_DETAIL_RESET:
        //     return { investorsDetail: {}, loading: true }
        default:
            return state;
    }
}