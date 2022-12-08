
import { AuthArgs, UserType } from "../types"
import userService from "./userService";

const loginUser = ({ password, login }: AuthArgs): Promise<UserType> => new Promise((resolve, reject) => setTimeout(() => {
  userService.getByEmail(login).then(
    function (response){
      const usuario:UserType = response.data[0];
      if(usuario.senha === password) {
        resolve(usuario)
      } else {
        reject('O usuário e/ou senha digitados estão incorretos')
      }
    }
  );
  
}, 1500))


const registerUser = ({ login }: AuthArgs): Promise<boolean> => new Promise((resolve, reject) => setTimeout(() => {
  if (login === 'CyberPotato') {
    reject('Login already taken')
  } else {
    resolve(true)
  }
}, 1500))

const forgotPassword = (login: string): Promise<boolean> => new Promise((resolve, reject) => setTimeout(() => {
  if (login === 'CyberPotato') {
    resolve(true);
  }
}, 1500))

export {
  loginUser,
  registerUser,
  forgotPassword
}