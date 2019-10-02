import React, { Component, useContext, useState, useEffect } from 'react';
import CompGraficos from './CompGraficos';
import Axios from 'axios';
import config from './config.json';
import AppContext from './AppContext'


class CompSection extends Component {
    render() {
        return (
            <div className="contenido">
                <LanguageGraph />
                <DatabaseGraph />
            </div>
        );
    }
}

const LanguageGraph = () => {
    const context = useContext(AppContext)
    const [data, setData] = useState([])

    useEffect(() => {
        Axios
            .post(config.urlGraphQL, {
                query: `{
                    LaboralAgrupadoPorMes(where: {field: "pais",value: "${context.pais}"}){
                        skill
                        datos{
                            fecha
                            cantidad
                        }
                    }
                }`
            })
            .then(res => {
                const dataLenguaje = res.data.data.LaboralAgrupadoPorMes.filter(iter =>
                    iter.skill === "C" ||
                    iter.skill === "C#" ||
                    iter.skill === "C++" ||
                    iter.skill === "Go" ||
                    iter.skill === "Golang" ||
                    iter.skill === "Java" ||
                    iter.skill === "JavaScript" ||
                    iter.skill === "Objetive-C" ||
                    iter.skill === "PHP" ||
                    iter.skill === "Python" ||
                    iter.skill === "R" ||
                    iter.skill === "C++" ||
                    iter.skill === "Ruby" ||
                    iter.skill === "Scala" ||
                    iter.skill === "Swift" ||
                    iter.skill === "TypeScript" ||
                    iter.skill === "Kotlin"
                ).map(iter => {
                    return {
                        "id": iter.skill,
                        "data": iter.datos.sort().map(i => {
                            let fec = i.fecha.split("-")
                            return {
                                "x": `${fec[0]}${fec[1]}`,
                                "y": i.cantidad
                            }
                        })
                    }
                })
                setData(dataLenguaje)
            })
            .catch(error => {
                console.log(error)
            })
    }, [context.pais])

    return ( 
        <CompGraficos data={data}/>
    )
}

const DatabaseGraph = () => {
    const context = useContext(AppContext)
    const [data, setData] = useState([])

    useEffect(() => {
        Axios
            .post(config.urlGraphQL, {
                query: `{
                    LaboralAgrupadoPorMes(where: {field: "pais",value: "${context.pais}"}){
                        skill
                        datos{
                            fecha
                            cantidad
                        }
                    }
                }`
            })
            .then(res => {
                let dataBaseDeDatos = res.data.data.LaboralAgrupadoPorMes.filter(iter =>
                    iter.skill === "MongoDB" ||
                    iter.skill === "MySQL" ||
                    iter.skill === "NoSQL" ||
                    iter.skill === "Oracle" ||
                    iter.skill === "Oracle DB" ||
                    iter.skill === "PostgreSQL" ||
                    iter.skill === "Redis" ||
                    iter.skill === "SQL"
                ).map(iter => {
                    return {
                        "id": iter.skill,
                        "data": iter.datos.sort().map(i => {
                            let fec = i.fecha.split("-")
                            return {
                                "x": `${fec[0]}${fec[1]}`,
                                "y": i.cantidad
                            }
                        })
                    }
                })
                setData(dataBaseDeDatos)
            })
            .catch(error => {
                console.log(error)
            })
    }, [context.pais])

    return ( 
        <CompGraficos data={data}/>
    )
}

export default CompSection;