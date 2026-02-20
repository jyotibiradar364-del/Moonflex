import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import API from '../api/axios';

const TMDB_IMG = 'https://image.tmdb.org/t/p/w342';

export default function Row({ title, fetchUrl, onMovieClick }) {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await API.get(fetchUrl);
                setMovies(data.results || []);
            } catch {
                setMovies([]);
            }
        };
        fetchData();
    }, [fetchUrl]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const amount = scrollRef.current.clientWidth * 0.75;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    if (!movies.length) return null;

    return (
        <section className="row-section">
            <h2>{title}</h2>
            <div className="row-container">
                <button className="row-arrow left" onClick={() => scroll('left')}>
                    <ChevronLeft size={28} />
                </button>

                <div className="row-scroll" ref={scrollRef}>
                    {movies.map((movie) => (
                        <div
                            className="movie-card"
                            key={movie.id}
                            onClick={() => onMovieClick(movie.id)}
                        >
                            {movie.poster_path ? (
                                <img
                                    src={`${TMDB_IMG}${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    loading="lazy"
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: 300,
                                        background: '#2a2a3e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#555',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    No Image
                                </div>
                            )}
                            <div className="card-overlay">
                                <div className="card-title">{movie.title || movie.name}</div>
                                <div className="card-rating">
                                    ★ {movie.vote_average?.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="row-arrow right" onClick={() => scroll('right')}>
                    <ChevronRight size={28} />
                </button>
            </div>
        </section>
    );
}
