import React, { useEffect } from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css"
import { useLocation } from "react-router-dom";

export default function UserHeader(){
    const [title,setTitle] = React.useState('')
    const location = useLocation()

    //toda vez que o location mudar o valor do header deve mudar junto dependendo da url de location
    useEffect(() => {
        const {pathname} = location
        switch(pathname){
            case '/conta/postar':
                setTitle("Poste Sua Foto")
                break;
            case '/conta/estatisticas':
                setTitle("Estatísticas")
                break;
            default:
                setTitle("Minha Conta")
        }
    },[location])
    return(
        <header className={styles.header}>
            <h1 className="title">{title}</h1>
            <UserHeaderNav/>
        </header>
    )
}