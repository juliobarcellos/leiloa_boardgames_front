
import { AuthArgs } from "../types"


const loginUser = ({ auth_token, user }: AuthArgs): Promise<boolean> => new Promise((resolve, reject) => setTimeout(() => {
  if (user === 'CyberPotato' && auth_token === 'test1234') {
    resolve(true)
  } else {
    reject('Credentials are wrong')
  }
}, 1500))

const registerUser = ({ auth_token, user }: AuthArgs): Promise<boolean> => new Promise((resolve, reject) => setTimeout(() => {
  if (user === 'CyberPotato') {
    reject('Login already taken')
  } else {
    resolve(true)
  }
}, 1500))

const forgotPassword = (user: string): Promise<boolean> => new Promise((resolve, reject) => setTimeout(() => {
  if (user === 'CyberPotato') {
    resolve(true);
  }
}, 1500))

export {
  loginUser,
  registerUser,
  forgotPassword
}