import axios from "axios";

const deslocamentoApi = axios.create({
  baseURL: 'https://api-deslocamento.herokuapp.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

export default deslocamentoApi;