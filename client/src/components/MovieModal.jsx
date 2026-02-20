import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import API from '../api/axios';

const TMDB_IMG = 'https://image.tmdb.org/t/p/original';
const TMDB_IMG_W = 'https://image.tmdb.org/t/p/w185';

export default function MovieModal({ movieId, onClose }) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!movieId) return;

        const fetchDetails = async () => {
            setLoading(true);
            try {
                const { data } = await API.get(`/movies/${movieId}/`);
                setMovie(data);
            } catch {
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [movieId]);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    if (!movieId) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    // Find YouTube trailer
    const trailer = movie?.videos?.results?.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );

    const cast = movie?.credits?.cast?.slice(0, 12) || [];
    const similar = movie?.similar?.results?.slice(0, 6) || [];

    const runtime = movie?.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={20} />
                </button>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
                        <div className="loader"></div>
                    </div>
                ) : movie ? (
                    <>
                        {/* Hero backdrop */}
                        <div className="modal-hero">
                            <img
                                src={`${TMDB_IMG}${movie.backdrop_path || movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h2 className="modal-hero-title">{movie.title}</h2>
                        </div>

                        <div className="modal-body">
                            {/* Meta */}
                            <div className="modal-meta">
                                <span className="match">
                                    {Math.round(movie.vote_average * 10)}% Match
                                </span>
                                <span className="year">
                                    {movie.release_date?.split('-')[0]}
                                </span>
                                {runtime && <span className="runtime">{runtime}</span>}
                            </div>

                            {/* Overview */}
                            <p className="modal-overview">{movie.overview}</p>

                            {/* Trailer */}
                            {trailer && (
                                <>
                                    <h3 className="modal-section-title">Trailer</h3>
                                    <div className="modal-trailer">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
                                            title="Trailer"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                                            allowFullScreen
                                        />
                                    </div>
                                </>
                            )}

                            {/* Cast */}
                            {cast.length > 0 && (
                                <>
                                    <h3 className="modal-section-title">Cast</h3>
                                    <div className="modal-cast">
                                        {cast.map((person) => (
                                            <div className="cast-card" key={person.id}>
                                                <img
                                                    src={
                                                        person.profile_path
                                                            ? `${TMDB_IMG_W}${person.profile_path}`
                                                            : 'https://via.placeholder.com/64x64?text=?'
                                                    }
                                                    alt={person.name}
                                                />
                                                <div className="cast-name">{person.name}</div>
                                                <div className="cast-char">{person.character}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Similar Movies */}
                            {similar.length > 0 && (
                                <>
                                    <h3 className="modal-section-title">More Like This</h3>
                                    <div className="similar-grid">
                                        {similar.map((s) => (
                                            <div className="similar-card" key={s.id}>
                                                <img
                                                    src={
                                                        s.poster_path
                                                            ? `${TMDB_IMG_W}${s.poster_path}`
                                                            : 'https://via.placeholder.com/185x278?text=No+Image'
                                                    }
                                                    alt={s.title || s.name}
                                                    loading="lazy"
                                                />
                                                <div className="similar-title">
                                                    {s.title || s.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <div style={{ padding: 48, textAlign: 'center', color: '#888' }}>
                        Failed to load movie details.
                    </div>
                )}
            </div>
        </div>
    );
}
