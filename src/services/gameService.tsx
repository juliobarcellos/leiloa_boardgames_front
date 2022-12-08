import http from "../utils/http";

class GameService{
    getByNome(nomeJogo: string){
        return http.get(`/games?nome=${nomeJogo}`)
    }
}

export default new GameService();