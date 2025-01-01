import React from "react";

export default function useFetch(){
    const [data,setData] = React.useState(null)
    const [error,setError] = React.useState(null)
    const [loading,setLoading] = React.useState(false)

    const request = React.useCallback(async (url,options) => {
        let response;
        let json;
        //inicia-se o fetch
        try {
            //caso exista um erro anterior esse é removido
            setError(null)
            //como aindaa não temos uma resposta o loading fica para true
            setLoading(true)
            //faz-se um fetch
            response = await fetch(url,options)
            json = await response.json()
            //caso response não tenha uma resposta positiva lança-se um erro
            if(response.ok === false) throw new Error(json.message)
            console.log(json)
        //caso erro seja identificado
        } catch (error) {
            //o json será nulo
            json = null
            //e o erro aparecerá
            setError(error.message)
        //em todo caso
        } finally{
            //data ficará com o valor de json que pode conter as informações do usuário ou nada como resposta
            setData(json)
            //loging será falso
            setLoading(false)
            //será retornado o objeto response {url,options} e o json
            return {response,json}
        }
    },[])
    return{
        data,
        loading,
        error,
        request
    }
}