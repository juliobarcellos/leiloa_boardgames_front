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

export interface UserType {
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
  image: string,
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
  rating?: number,
  logado: boolean
}

export interface AuctionType {
  id?: number,
  idUsuario: number,
  idJogo: string,
  productDetails: string,
  startDateTime: string,
  endDateTime: string,
  initialValue: number,
  actualBid?: number,
  winningBid?: number | null,
  bids?: number[],
  height: number,
  width: number,
  lenght: number,
  weight: number,
  shipmentOption?: string | null,
  shipmentValue?: number,
  taxValue?: number,
  valueToReceive?: number,
  image: string,
  name: string,
  gameCondition: string,
  edition: string,
  subtitle: string,
  price: number,
  increment: number,
  paymentMethod?: string,
  cardNumber?: string,
  parcelas?: string,
  tags: number[],
  leiloeiro: LeiloeiroType,
  fichaTecnica: string,
  images?: Array<PhotoType>,
  questions?: Array<any>
}

export const initialAuction = {
  id: undefined,
  idUsuario: 0,
  idJogo: '0',
  productDetails: 'string',
  startDateTime: 'string',
  endDateTime: 'string',
  initialValue: 0,
  actualBid: 0,
  winningBid: 0,
  bids: [],
  height: 0,
  width: 0,
  lenght: 0,
  weight: 0,
  shipmentOption: null,
  shipmentValue: 0,
  taxValue: 0,
  valueToReceive: 0,
  image: 'string',
  name: 'string',
  gameCondition: 'string',
  edition: 'string',
  subtitle: 'string',
  price: 0,
  increment: 0,
  paymentMethod: "string",
  cardNumber: "string",
  parcelas: "string",
  tags: [],
  leiloeiro: {
    name: 'string',
    profilePic: 'string',
    rating: 0
  },
  fichaTecnica: 'string',
  images: [],
  questions: []
}

export interface LeiloeiroType {
    name: string,
    profilePic: string,
    rating: number
}
export interface PhotoType {
  original: string | unknown;
}

export interface GameType {
    id: string,
    nome: string,
    fichaTecnica: string,
    edicao: string,
    categorias: string[],
    qtdJogadores: string,
    cover: string
}

export interface ImageCarouselType {
  original: string,
  originalWidth: number,
  originalHeight: number,
  thumbnail: string,
  thumbnailWidth: number,
  thumbnailHeight: number
}

export interface BidType {
  id?: number,
  idUser: number,
  idLeilao: number,
  value: number,
  dateTime: string
}

export interface NotificationType {
    image: string,
    name: string,
    text: string,
    notificationDateTime: string,
    idJogo: number,
    id?: number
}
