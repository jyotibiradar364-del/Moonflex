import { Play, Info } from 'lucide-react';

const TMDB_IMG = 'https://image.tmdb.org/t/p/original';

export default function Hero({ movie, onInfo }) {
    if (!movie) return null;

    return (
        <section className="hero">
            <div className="hero-backdrop">
                <img
                    src={`${TMDB_IMG}${movie.backdrop_path}`}
                    alt={movie.title || movie.name}
                />
            </div>

            <div className="hero-content">
                <h1>{movie.title || movie.name}</h1>
                <p className="overview">{movie.overview}</p>
                <div className="hero-buttons">
                    <button className="hero-btn play">
                        <Play size={20} />
                        Play
                    </button>
                    <button className="hero-btn info" onClick={() => onInfo(movie.id)}>
                        <Info size={20} />
                        More Info
                    </button>
                </div>
            </div>
        </section>
    );
}
