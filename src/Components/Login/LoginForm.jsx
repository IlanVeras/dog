import React from "react"
import { Link } from "react-router-dom"
import Input from "../Forms/Input"
import Button from "../Forms/Button"
import useForm from "../../Hooks/useForm"
import { TOKEN_POST, USER_GET } from "../../api"

export default function LoginForm(){
    //o hook do useForm é passado junto com suas propriedades
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

    /*
    *função de login
    *event {Object}
    */
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(event)
        //condição que verifica com o método validate que vem do hook useForm
        //verifica-se se username e password pasam o validate
        if (username.validate() && password.validate()) {
          //guarda-se a url e options com a ajuda da função TOKEN_POST de api.js
          const {url,options} = TOKEN_POST({
            username:username.value,
            password: password.value
          })
          console.log({url,options})
          //faz-se o fetch
          /*
          *const {<Promise>} faz um fetch com
          *@params {String} - valor do endpoint de login
          *@params {Object} - valor das opções do header da requisição do fetch
          */
          const response = await fetch(url,options)
          // const {<Promise>} pega o valor do fetch e mostra um objeto com as informações do user
          const json = await response.json()
          console.log(response)
          console.log(json)
          //AQUI EU SALVO O TOKEN NO FRONT-END
          window.localStorage.setItem('token', json.token)
          //verifica-se se o token já exsite no localstore
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