import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import PropTypes from "prop-types";

export default function Feed({user}){
    const [modalPhoto,setModalPhoto] = React.useState(null)
    //estado que divide as fotos em páginas
    const [pages,setPages] = React.useState([1])
    //estado que controla se será recarregado mais uma página ou não
    const [infinite,setInfinite] = React.useState(true)

    React.useEffect(() => {
        let wait = false
        function inifiniteScroll(){
            if(infinite){
                const scroll = window.scrollY
                const height = document.body.offsetHeight - window.innerHeight
                if(scroll > height * 0.75 && !wait){
                    setPages((pages) => [...pages,pages.length + 1])
                    wait = true
                    setTimeout(() => {
                        wait = false
                    },500)
                }
            }
        }
        window.addEventListener('wheel', inifiniteScroll)
        window.addEventListener('scroll', inifiniteScroll)

        return () => {
            window.removeEventListener('wheel', inifiniteScroll)
            window.removeEventListener('scroll', inifiniteScroll)
        }
    },[infinite])

    return(
        <div>
            {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>}
            {
                pages.map((page) => (
                    <FeedPhotos
                    key={page}
                    user={user}
                    page={page}
                    setModalPhoto={setModalPhoto}
                    setInfinite={setInfinite}
                    />
                ))
            }
            {
                !infinite && !user && (
                    <p
                    style={{
                        textAlign:'center',
                        padding: '2rem 0 4rem 0',
                        color: '#888'
                    }}
                    >Não existem mais postagens.
                    </p>
                )
            }
        </div>
    )
}

Feed.defaultProps = {
    user: 0,
}

Feed.propTypes = {
    user: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ])
}