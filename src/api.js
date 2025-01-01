//const {String} - url básica
export const API_URL = "https://dogsapi.origamid.dev/json";

/*
*função que retorna um objeto com url e options para uma requisição de login
*@params TOKEN_POST [recebe username e password e retorna a url e options]
*/
export function TOKEN_POST(body){
    return{
        url: API_URL + '/jwt-auth/v1/token',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function TOKEN_VALIDATE_POST(token){
    return{
        url: API_URL + '/jwt-auth/v1/token/validate',
        options: {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    }
  };

/*
*função que recebe o token de altorização e passa a url com autorização
*/
export function USER_GET(token){
    return{
        url: API_URL + '/api/user',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
    }
}