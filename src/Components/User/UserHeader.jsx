import React from "react";
import UserHeaderNav from "./UserHeaderNav";

export default function UserHeader(){
    return(
        <header>
            <h1 className="title">Título</h1>
            <UserHeaderNav/>
        </header>
    )
}