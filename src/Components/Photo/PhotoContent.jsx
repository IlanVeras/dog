import React from "react";
import styles from "./PhotoContent.module.css"
import { Link } from "react-router-dom";
import PhotoComments from "./PhotoComments";
import { UserContext } from "../../UserContext";
import PhotoDelete from "./PhotoDelete";
import Image from "../Helper/Image";

export default function PhotoContent({data,single}){
    //user do userContext sempre será o usuário logado
    const user = React.useContext(UserContext)
    const {photo,comments} = data
    console.log(photo)
    return(
        <div className={`${styles.photo} ${single ? styles.single : ''}`}>
            <div className={styles.img}>
                <Image src={photo.src} alt={photo.title}/>
            </div>
            <div className={styles.details}>
                <div>
                    <p className={styles.author}>
                        {
                        user.data && user.data.username === photo.author 
                        ?
                        <PhotoDelete id={photo.id}/> 
                        : 
                        <Link to={`/perfil/${photo.authot}`}>@{photo.author}</Link>} 
                        <span className={styles.visualizacoes}>{photo.acessos}</span>
                    </p>
                    <h1 className="title">
                        <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
                    </h1>
                    <ul className={styles.attributes}>
                        <li>{photo.peso} Kg</li>
                        <li>{
                        Number(photo.idade) === 1 ? `${photo.idade} ano` : `${photo.idade} anos`
                        }</li>
                    </ul>
                    <PhotoComments single={single} id={photo.id} comments={comments}/>
                </div>
            </div>
        </div>
    )
}