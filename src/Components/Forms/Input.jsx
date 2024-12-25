import React from "react"
import styles from "./Input.module.css"

export default function Input({label,type,name,value,setValue,onChange,error, onBlur}){
    return (
        <div className="wrapper">
            <label htmlFor={name}>{label}</label>
            <input 
            id={name}
            name={name}
            className={styles.input}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}