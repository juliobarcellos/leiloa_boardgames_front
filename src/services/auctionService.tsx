import { AuctionType } from "../types";
import http from "../utils/http";

class AuctionService{
    create(leilao:AuctionType){
        let jsonLeilao = JSON.stringify(leilao, null, '  ')
        return http.post("/auctions", JSON.parse(jsonLeilao))
    }

    getByID(id:string){
        return http.get(`/auctions/${id}`)
    }

    getAll(){
        return http.get('/auctions')
    }
}

export default new AuctionService();