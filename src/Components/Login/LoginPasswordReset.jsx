import React from "react";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Button from "../Forms/Button";
import { PASSWORD_RESET } from "../../Api";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

export default function LoginPasswordReset(){
    const [login, setLogin] = React.useState('');
    const [key, setKey] = React.useState('');
    const password = useForm();
    const { error, loading, request } = useFetch();
    const navigate = useNavigate();

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get('key');
        const login = params.get('login');
        if (key) setKey(key);
        if (login) setLogin(login);
      }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        if (password.validate()) {
          const { url, options } = PASSWORD_RESET({
            login,
            key,
            password: password.value,
          });
          const { response } = await request(url, options);
          if (response.ok) navigate('/login');
        }
      }

    return(
        <section className="animeLeft">
            <Head title="Resete a Senha"/>
            <h1 className="title">Resete a Senha</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                label="Nova Senha"
                type="text"
                name="password"
                {...password}
                />
                {
                    loading ? (
                        <Button disabled>Resetando. . .</Button>
                    ) : (
                        <Button>Resetar</Button>
                    )
                }
            </form>
            <Error error={error}/>
        </section>
    )
}