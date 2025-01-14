import React from "react";
import {Link, useNavigate} from "react-router-dom"
import styles from "./Header.module.css"
import Dogs from '../Assets/dogs.svg?react'
import {UserContext} from "../UserContext"

export default function Header(){
    const {data} = React.useContext(UserContext)
    return(
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link className={styles.logo} to="/" aria-label="Dogs - Home">
                <Dogs />
                </Link>
                {data ? (
                <Link className={styles.login} to="/conta">
                {data.nome}
                </Link>
                ) : (
                <Link className={styles.login} to="/login">
                    Login / Criar
                </Link>
                )}
            </nav>
    </header>
    )
}