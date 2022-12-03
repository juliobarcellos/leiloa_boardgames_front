import { UserType } from "../types";
import http from "../utils/http";

class UserService{
    create(usuario:UserType){
        let jsonUsuario = JSON.stringify(usuario, null, '  ')
        return http.post("/usuarios", JSON.parse(jsonUsuario))
    }
}

export default new UserService();