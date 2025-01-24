import React from "react";
import UserPost from "../api/endpoints/UserPost";
import Api from "../api/Api";
import Feed from "./Feed/Feed";
import Loading from "./Helper/Loading";

export default function Home(){
    return(
        <section className="container mainContainer">
            <Feed/>
            {/* <Loading/> */}
        </section>
    )
}