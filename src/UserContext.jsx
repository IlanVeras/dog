import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./Api";
import { useNavigate} from "react-router-dom";
import { Navigate } from "react-router-dom";

// const {<Object>} - [hook para criar um contexto]
export const UserContext = React.createContext()

// função que retorna as principais funções para o LoginForm.jsx
export default function UserStorage({children}){
    const [data,setData] = React.useState(null)
    const [login,setLogin] = React.useState(null)
    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState(null)
    const navigate = useNavigate();
    
    const userLogout = React.useCallback(
        async function () {
            setData(null)
            setError(null)
            setLoading(false)
            setLogin(false)
            window.localStorage.removeItem('token')
            // window.location.href = '/login'
    },[])

    /*
    *função que retorna um objeto com dados do usuáro a partir de um token
    *@params {String} - token do localStorage
    *response {Promise<Object>} @param: url => url de api.js
    *json {Prmise<Object>} objeto com informações de usuário
    */
    async function getUser(token) {
        const {url,options} = USER_GET(token)
        const response = await fetch(url,options)
        const json = await response.json()
        console.log(json)
        setData(json)
        setLogin(true)
    }

        /*
    *função de login
    *event {Object}
    */
    async function userLogin(username,password) {
        console.log(username)
        try {
            setError(null)
            setLoading(true)
            //guarda-se a url e options com a ajuda da função TOKEN_POST de api.js
            const {url,options} = TOKEN_POST({username,password})
            //const {<Promise> Object} - constante que faz fetch de login
            const tokenRes = await fetch(url,options)
            if (!tokenRes.ok){
                const errorMessage = `Error: usuário ou senha inválidos`;
                throw new Error(errorMessage);
            }
            //const {String}  - constante desestruturada para guardar a string do token
            const {token} = await tokenRes.json()
            //método de guardar o token com name 'token' no local storage
            window.localStorage.setItem('token', token)
            console.log(token)
            //chamada da função que valida o token
            await getUser(token)
            console.log("indo para conta")
            navigate('/conta')
            console.log("cheguei na conta")
        } catch (err) {
            console.log(err)
            setError(err.message)
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }

    /*
     *useEffect usado para verificar se existe um token no local storage e chama a função getUser se existir
     * @param {string} token - toke obtido do localStorage
     * @return {void}
     */
    React.useEffect(() => {
        async function autologin() {
            const token = window.localStorage.getItem('token')
            if(token){
                try {
                    setError(null)
                    setLoading(true)
                    const {url,options} = TOKEN_VALIDATE_POST(token)
                    const response = await fetch(url,options)
                    await getUser(token)
                    if(!response.ok) throw new Error("Token inválido!")
                    await getUser(token)
                } catch (error) {
                    userLogout()
                }finally{
                    setLoading(false)
                }
            }else{
                setLogin(false)
            }
        }
        autologin()
    },[userLogout])

    return(
        <UserContext.Provider value={{userLogin,userLogout,data,error,loading,login}}>
            {children}
        </UserContext.Provider>
    )
}
