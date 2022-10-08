export interface AuthArgs {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>;
    auth_token: string;
    user: string;
  }
  
  export type AuthFunction = (args: AuthArgs) => Promise<void>;
  
  export type ResetPasswordFunction = (login: string) => Promise<void>;