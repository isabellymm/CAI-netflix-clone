//Componente Inicial
import { useEffect } from 'react';
import '../frontend/Home.css';
import React, { useState } from 'react';

export default function Home() {
    const [tvs, setTVs] = useState()

    let getData = async () => {
        const API_KEY = "76bd8a2f7dd676fbf2a87971267b91e8"
        let URI = 'https://api.themoviedb.org/3/genre/tv/list?api_key='+API_KEY

        let data = await fetch(URI)
        let result = data.json()
        return result
    }

    useEffect(()=>{
        getData().then((data)=>{
            console.log(data)
            setTVs(data)
        })
    },[])

    let showTvs = () => {
        let html = []

        tvs?.genres.forEach(element => {
            html.push(<div key={element.id} className='tvs'>
                <p> <label>Id:</label> {element.id}</p>
                <p> <label>Name:</label> {element.name}</p>
            </div>
            )
        });

        return html
    }

    return (
        <div>
            {/*Navegar*/}
            {/*Conteudo*/}
            {/*Rodapé*/}
            <h1>Teste</h1>
            {showTvs()}

        </div>
    )
}