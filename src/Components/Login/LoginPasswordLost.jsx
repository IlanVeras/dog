import React from "react";
import Input from "../Forms/Input";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { PASSWORD_LOST } from "../../Api";
import Head from "../Helper/Head";

export default function LoginPasswordLost(){
    const login = useForm()
    const {data,loading,error,request} = useFetch()

    async function handleSubmit(event){
        event.preventDefault()
        if(login.validate()){
            const {url,options} = PASSWORD_LOST({
                login:login.value,
                url: window.location.href.replace('perdeu','resetar')
            })
            const {json} = await request(url,options)
            console.log(json)
        }
    }
    return(
        <section className="animeLeft">
            <Head title='Perdeu a Senha'/>
            <h1 className="title">Perdeu a senha?</h1>
            {data ? <p style={{color:'#4c1'}}>{data}</p> : (
                <form onSubmit={handleSubmit}>
                    <Input 
                    label="Email / Usuário"
                    type="text"
                    name="login"
                    {...login}/>
                    {
                        loading ? (
                            <Button disabled>Enviando. . .</Button>
                        ) : (
                            <Button>Enviar Email</Button>
                        )
                    }
                </form>
            )}
            <Error error={error}></Error>
        </section>
    )
}