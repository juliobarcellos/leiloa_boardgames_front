let user = "";
let token = "";

if (localStorage.getItem("currentUser") != null) {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        user = JSON.parse(currentUser).user;
        token = JSON.parse(currentUser).auth_token;
    }
}

export const initialState: User = {
    userDetails: "" || user,
    token: "" || token,
    loading: false,
    errorMessage: null
  };

export type User = {
    userDetails: string | null
    token: string | null,
    loading: boolean,
    errorMessage: string | null,
};

enum actionOptions {
    REQUEST_LOGIN= "REQUEST_LOGIN",
    LOGIN_SUCCESS= "LOGIN_SUCCESS",
    LOGOUT= "LOGOUT",
    LOGIN_ERROR= "LOGIN_ERROR"
}

export type actionType = {
    type: actionOptions,
    payload: {
        user: string,
        auth_token: string
    },
    error: string
}

export const AuthReducer: React.Reducer<User, actionType> = (initialState, action) => {
    switch (action.type) {
        case actionOptions.REQUEST_LOGIN:
            return {
                ...initialState,
                loading: true
            };
        case actionOptions.LOGIN_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.auth_token,
                loading: false
            };
        case actionOptions.LOGOUT:
            return {
                ...initialState,
                user: "",
                token: ""
            };
        case actionOptions.LOGIN_ERROR:
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};