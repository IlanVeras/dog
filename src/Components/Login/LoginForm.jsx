import React from "react"
import { Link } from "react-router-dom"
import Input from "../Forms/Input"
import Button from "../Forms/Button"
import useForm from "../../Hooks/useForm"

export default function LoginForm(){
    const username = useForm()
    const password = useForm()


    function handleSubmit(event) {
        event.preventDefault();
    
        if (username.validate() && password.validate()) {
          fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),            
          })
            .then((response) => {
              console.log(response);
              return response.json();
            })
            .then((json) => {
              console.log(json);
            });
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