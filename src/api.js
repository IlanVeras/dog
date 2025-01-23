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

// Função que cria user
export function USER_POST(body) {
    return {
      url: API_URL + '/api/user',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    };
}

//função que posta uma foto
export function PHOTO_POST(formData,token){
    return{
        url: API_URL + '/api/photo',
        options: {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            body: formData,
        }
    }
}

//função que pega um total de fotos específico de um user específico
export function PHOTOS_GET({page,total,user}){
    return{
        url: `${API_URL}/api/photo/?page=${page}&_total=${total}&-user=${user}`,
        options: {
            method: 'GET',
            cache: 'no-store'
        },
    }
}

//função que mostra uma foto específica
export function PHOTO_GET(id){
    return{
        url: `${API_URL}/api/photo/${id}`,
        options: {
            method: 'GET',
            cache: 'no-store'
        }
    }
}

//função que posta comentário
export function COMMENT_POST(id,body){
    return{
        url: `${API_URL}/api/comment/${id}`,
        options: {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        }
    }
}