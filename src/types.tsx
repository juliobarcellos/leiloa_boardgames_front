export interface AuthArgs {
    password: string;
    login: string;
  }
  
  export type AuthFunction = (args: AuthArgs) => Promise<void>;
  
  export type ResetPasswordFunction = (login: string) => Promise<void>;

  export interface AddressType {
    identificacao: string,
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    preferencial: boolean
  }

  export interface UserType{
    id?: number,
    nome: string,
    email: string,
    senha: string,
    dataNascimento: string,
    cpf: string,
    tipoDocumento: string,
    numDocumento: string,
    orgaoExpeditor: string,
    estadoExpeditor: string,
    dataEmissao: string,
    telefone: string,
    enderecos?: AddressType[],
    image?: string,
    favoritos?: number[],
    compras?: number[],
    vendas?: number[],
    conta?: {
      id?: number,
      numBanco: string,
      agencia: string,
      numConta: string,
      digito: string
    },
    cartoes?: number[],
    avaliacoes?: number[],
    logado: boolean
  }