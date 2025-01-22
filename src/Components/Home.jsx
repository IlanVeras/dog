import React from "react";
import UserPost from "../api/endpoints/UserPost";
import Api from "../api/Api";
import Feed from "./Feed/Feed";

export default function Home(){
    return(
        <section className="container mainContainer">
            <Feed/>
        </section>
    )
}