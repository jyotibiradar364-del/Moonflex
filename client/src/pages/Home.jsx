import { useState, useEffect } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Row from '../components/Row';
import MovieModal from '../components/MovieModal';
import Footer from '../components/Footer';

export default function Home() {
    const [heroMovie, setHeroMovie] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const { data } = await API.get('/movies/trending/');
                const results = data.results || [];
                if (results.length) {
                    // Pick a random movie with a backdrop
                    const moviesWithBackdrop = results.filter((m) => m.backdrop_path);
                    const pick =
                        moviesWithBackdrop[
                        Math.floor(Math.random() * moviesWithBackdrop.length)
                        ];
                    setHeroMovie(pick || results[0]);
                }
            } catch {
                // Hero simply won't show
            }
        };
        fetchHero();
    }, []);

    return (
        <div>
            <Navbar />
            <Hero movie={heroMovie} onInfo={(id) => setSelectedMovieId(id)} />

            <div style={{ marginTop: -40, position: 'relative', zIndex: 1 }}>
                <Row
                    title="Trending Now"
                    fetchUrl="/movies/trending/"
                    onMovieClick={(id) => setSelectedMovieId(id)}
                />
                <Row
                    title="Popular"
                    fetchUrl="/movies/popular/"
                    onMovieClick={(id) => setSelectedMovieId(id)}
                />
                <Row
                    title="Top Rated"
                    fetchUrl="/movies/top-rated/"
                    onMovieClick={(id) => setSelectedMovieId(id)}
                />
                <Row
                    title="Upcoming"
                    fetchUrl="/movies/upcoming/"
                    onMovieClick={(id) => setSelectedMovieId(id)}
                />
                <Row
                    title="TV Shows"
                    fetchUrl="/movies/tv/popular/"
                    onMovieClick={(id) => setSelectedMovieId(id)}
                />
            </div>

            <Footer />

            {selectedMovieId && (
                <MovieModal
                    movieId={selectedMovieId}
                    onClose={() => setSelectedMovieId(null)}
                />
            )}
        </div>
    );
}
