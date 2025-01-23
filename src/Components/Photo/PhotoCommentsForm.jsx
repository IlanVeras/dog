import React from "react";
import useFetch from "../../Hooks/useFetch";
import Enviar from '../../Assets/enviar.svg?react';
import { COMMENT_POST } from "../../Api";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css"

export default function PhotoCommentsForm({id,setComments}){
    const [comment,setComment] = React.useState('')
    const {request,error} = useFetch()

    async function handleSubmit(e){
        e.preventDefault()
        const {url,options} =COMMENT_POST(id,{comment})
        const {response,json} = await request(url,options)
        if(response.ok){
            setComment('')
            setComments((comments) => [...comments, json])
        }
    }
    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
            className={styles.textarea}
            id="comment"
            name="comment"
            placeholder="Comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}/>
            <button className={styles.button}>
                <Enviar/>
            </button>
            <Error error={error}/>
        </form>
    )
}