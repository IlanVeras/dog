import React from "react";
import styles from "./UserStatsGraphs.module.css"
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

export default function UserStatsGraphs({data}){
    const [graph,setGraph] = React.useState([])
    const [total,setTotal] = React.useState(0)

    //useEffect que toda vez que data mudar mudará o numero total de acessos
    React.useEffect(() => {
        const graphData = data.map(item => {
            return{
                x: item.title,
                y: Number(item.acessos)
            }
        })
        //faço um array de todos os itens data.acessos
        const acessosArr = (data.map(({acessos}) => Number(acessos)))

        //reduzo esse array a apenas um número
        //o ',0' é para que caso eu não tenha postagens o total fique como zero
        setTotal(acessosArr.reduce((a,b) => a + b,0))
        setGraph(graphData)
    },[data])

    return(
        <section className={`${styles.graph} animeLeft`}>
            <div className={`${styles.total} ${styles.graphItem}`}>
                <p>Acessos: {total}</p>
            </div>
            <div className={styles.graphItem}>
                <VictoryPie className={styles.victoryPie} data={graph} innerRadius={50} style={{
                    data: {
                        fillOpacity: 0.9,
                        stroke: "#fff",
                        strokeWidth: 2,
                    },
                    labels: {
                        fontSize: 14,
                        fill: '#333'
                    }
                }}></VictoryPie>
            </div>
            <div className={styles.graphItem}>
                <VictoryChart>
                    <VictoryChart>
                        <VictoryBar alignment="start" data={graph}></VictoryBar>
                    </VictoryChart>
                </VictoryChart>
            </div>
        </section>
    )
}