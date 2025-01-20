import React from "react";

//esse hook identifica o tamanho da tela e passa as informações desse tamanho

export default function useMedia(media){
    const [match,setMatch] = React.useState(null)

    React.useEffect(() => {
        function changeMatch(){
            const {matches} = window.matchMedia(media)
            setMatch(matches)
        }
        //existe um bug que quando o user está na tela mobile o estilo para esse tipo de tela não é aplicado, então rodar essa função resolve esse problema
        changeMatch()
        window.addEventListener('resize', changeMatch)
    },[media])
    return match
}