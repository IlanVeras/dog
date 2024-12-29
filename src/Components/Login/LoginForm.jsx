import React from "react"
import { Link } from "react-router-dom"
import Input from "../Forms/Input"
import Button from "../Forms/Button"
import useForm from "../../Hooks/useForm"
import { TOKEN_POST, USER_GET } from "../../api"

export default function LoginForm(){
    const username = useForm()
    const password = useForm()

    /*
     *useEffect usado para verificar se existe um token no local storage e chama a função getUser se existir
     * @param {string} token - toke obtido do localStorage
     * @return {void}
     */
    React.useEffect(() => {
      const token = window.localStorage.getItem('token')
      if(token){
        getUser(token)
      }
      return
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
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (username.validate() && password.validate()) {
          const {url,options} = TOKEN_POST({
            username:username.value,
            password: password.value
          })
          console.log({url,options})
          const response = await fetch(url,options)
          const json = await response.json()
          console.log(response)
          console.log(json)
          //AQUI EU SALVO O TOKEN NO FRONT-END
          window.localStorage.setItem('token', json.token)
          getUser(json.token)
        }
    }
    return(
        <section>
            <h1>Login</h1>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <Input 
                    label="Usuário"
                    type="text"
                    name="username"
                    {...username}
                />
                <Input 
                    label="Senha"
                    type="text"
                    name="password"
                    {...password}
                />
                <Button>Entrar</Button>
            </form>
            <Link to="/login/criar">Cadastro</Link>
        </section>
    )
}