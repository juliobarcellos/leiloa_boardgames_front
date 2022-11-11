import { createContext } from "react";
import { UserT } from "../types";

export const userContext = createContext({} as UserT);
export const initialUser = {} as UserT;