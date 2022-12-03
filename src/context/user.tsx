import { createContext } from "react";
import { UserType } from "../types";

interface UserContextType {
    user: UserType,
    logado: boolean,
    isNotificationsVisible: boolean;
    setIsNotificationsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const userContext = createContext({} as UserContextType);
export const initialUser = {} as UserType;
const initialUserCtx: UserContextType = {
    user: initialUser,
    logado: false,
    isNotificationsVisible: false,
    setIsNotificationsVisible: () => {}
};

initialUserCtx.user = initialUser;
initialUserCtx.logado = false;
initialUserCtx.setIsNotificationsVisible(false);
export default initialUserCtx;