import React, { useEffect, useState } from 'react';
import { getData } from '../api';
import './Home.css';

export default function Home() {
    const [tvs, setTVs] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData('/genre/tv/list');
            setTVs(result);
        };
        fetchData();
    }, []);

    const showTvs = () => {
        let html = [];

        tvs?.genres.forEach(element => {
            html.push(
                <div key={element.id} className='tvs'>
                    <p><label>Id:</label> {element.id}</p>
                    <p><label>Name:</label> {element.name}</p>
                </div>
            );
        });

        return html;
    };

    return (
        <div>
            <h1>Teste</h1>
            {showTvs()}
        </div>
    );
}
