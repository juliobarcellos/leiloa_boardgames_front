import React, { createContext, useContext, ReactNode, useReducer } from "react";
import { actionType, AuthReducer, initialState } from "./reducer";

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext<React.Dispatch<actionType> | undefined>(undefined);

export function useAuthState() {
    const context = useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error("useAuthState must be used within an AuthProvider");
    }
    return context;
}

export function useAuthDispatch() {
    const context = useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within an AuthProvider");
    }
    return context;
}



interface AuthProviderProps {
    children: ReactNode
}
