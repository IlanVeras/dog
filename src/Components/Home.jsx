import React from "react";
import UserPost from "../api/endpoints/UserPost";
import Api from "../api/Api";
import Feed from "./Feed/Feed";
import Loading from "./Helper/Loading";
import Head from "./Helper/Head";

export default function Home(){
    return(
        <section className="container mainContainer">
            <Head 
            title="fotos"
            description="Home do site Dogs, com o feed de fotos"/>
            <Feed/>
        </section>
    )
}