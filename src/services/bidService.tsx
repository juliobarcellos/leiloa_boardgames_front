import { BidType } from "../types";
import http from "../utils/http";

class BidService{
    create(lance:BidType){
        let jsonLance = JSON.stringify(lance, null, '  ')
        return http.post("/bids", JSON.parse(jsonLance))
    }
}

export default new BidService();