import React from "react"
import { Link } from "react-router-dom"
import Input from "../Forms/Input"
import Button from "../Forms/Button"
import useForm from "../../Hooks/useForm"
import { UserContext } from "../../UserContext"
import Error from "../Helper/Error"
import styles from "./LoginForm.module.css"
import stylesBtn from "../Forms/Button.module.css"
import Head from "../Helper/Head"

export default function LoginForm(){
    //o hook do useForm é passado junto com suas propriedades
    const username = useForm()
    const password = useForm()

    const {userLogin,error,loading} = React.useContext(UserContext)
    

    /*
    *função de login
    *event {Object}
    */
    async function handleSubmit(event) {
        event.preventDefault();
        //condição que verifica com o método validate que vem do hook useForm
        //verifica-se se username e password pasam o validate
        if (username.validate() && password.validate()) {
          userLogin(username.value, password.value)
        }
    }
    return(
        <section className="animeLeft">
            <Head title="Login"/>
            <h1 className="title">Login</h1>
            <form action="" onSubmit={(e) => handleSubmit(e)} className={styles.form}>
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
                {loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
                {error && <Error error={error && 'Dados incorretos'}></Error>}
            </form>
            <Link to='/login/perdeu' className={styles.perdeu}>Perdeu a Senha</Link>
           <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                <Link className={stylesBtn.button} to="/login/criar">Cadastro</Link>
           </div>
            
        </section>
    )
}