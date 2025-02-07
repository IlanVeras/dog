import React from "react";
import styles from "./FeedModal.module.css"
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../Api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";

export default function FeedModal({photo,setModalPhoto}){
    const {data,error,loading,request} = useFetch()

    React.useEffect(() => {
        const {url,options} = PHOTO_GET(photo.id)
        request(url,options)
    },[photo,request])
    
    //função que quando o user clicar fora do modal será tirado da tela este mesmo modal
    function handleOutsideClick(event){
        if(event.target === event.currentTarget){
            setModalPhoto(null)
        }
    }

    return(
        <div className={styles.modal} onClick={handleOutsideClick}>
            {error && <Error error={error}/>}
            {loading && <Loading/>}
            {data && <PhotoContent data={data}/>}
        </div>
    )
}