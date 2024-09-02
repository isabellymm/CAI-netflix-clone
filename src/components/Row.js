import { useEffect, useRef } from 'react';
import './Row.css'
import {getData, getDataRating} from '../backend/api'
import { useState } from 'react'

export default function Row({title, path, isLarge, age}) {
    const [filmes, setFilmes] = useState([]);
    const imageHost = 'https://image.tmdb.org/t/p/original/';
    const rowRef = useRef(null);

    let fetchData = async () => {
        let result = await getData(path);
        return result;
    }

    useEffect(() => {
        const fetchAndSetMovies = async () => {
            try {
                let data = await fetchData();
                if (data?.results) {
                    const filteredMovies = await getDataRating(data.results, age);
                    setFilmes(filteredMovies);
                }
            } catch (error) {
                console.error("Erro ao carregar os filmes:", error.message);
            }
        };

        fetchAndSetMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    const handleScrollLeft = () => {
        rowRef.current.scrollBy({
            left: -300, 
            behavior: 'smooth'
        });
    };

    const handleScrollRight = () => {
        rowRef.current.scrollBy({
            left: 300, 
            behavior: 'smooth'
        });
    };

    return (
        <div className='row-container'>
            <h2 className='row-header'>{title}</h2>
            <div className="row-navigation">
                <button className="scroll-button left" onClick={handleScrollLeft}>‹</button>
                <div className='row-cards' ref={rowRef}>
                    {filmes?.map(filme => (
                        <img
                            className={`movie-card ${isLarge && "movie-card-large"}`}
                            key={filme.id} 
                            src={imageHost + (isLarge ? filme.backdrop_path : filme.poster_path)} 
                            alt={filme.name} 
                        />
                    ))}
                </div>
                <button className="scroll-button right" onClick={handleScrollRight}>›</button>
            </div>
        </div>
    )
}