import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <span className="nav-logo">MOONFLEX</span>

            <ul className="nav-links">
                <li><a href="#" className="active">Home</a></li>
                <li><a href="#">TV Shows</a></li>
                <li><a href="#">Movies</a></li>
                <li><a href="#">My List</a></li>
            </ul>

            <div className="nav-right">
                <div className="nav-user">
                    <User size={18} />
                    <span>{user?.uname}</span>
                </div>
                <button className="logout-btn" onClick={logout}>
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </nav>
    );
}
