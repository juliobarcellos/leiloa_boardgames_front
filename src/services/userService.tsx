import { UserType } from "../types";
import http from "../utils/http";

class UserService{
    create(usuario:UserType){
        let jsonUsuario = JSON.stringify(usuario, null, '  ')
        return http.post("/users", JSON.parse(jsonUsuario))
    }

    getByEmail(email: string){
        return http.get(`/users?email=${email}`)
    }
}

export default new UserService();