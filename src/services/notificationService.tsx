import { NotificationType } from "../types";
import http from "../utils/http";

class NotificationService{
    create(notificacao:NotificationType){
        let jsonNotificacao = JSON.stringify(notificacao, null, '  ')
        return http.post("/notifications", JSON.parse(jsonNotificacao))
    }

    getAll(){
        return http.get('/notifications')
    }
}

export default new NotificationService();