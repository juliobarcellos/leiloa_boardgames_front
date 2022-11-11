
import { AuthArgs } from "../types"

const loginUser = ({ password, login }: AuthArgs): Promise<boolean> => new Promise((resolve, reject) => setTimeout(() => {
  if (login === 'admin' && password === 'admin') {
    resolve(true)
  } else {
    reject('O usuário e/ou senha digitados estão incorretos')
  }
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