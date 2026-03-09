import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

export default function Login() {
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(uname, password);
            navigate('/');
        } catch (err) {
            let msg = 'Invalid credentials. Please try again.';
            const data = err.response?.data;
            if (data && typeof data === 'object' && !Array.isArray(data)) {
                msg = data.detail || data.uname?.[0] || msg;
            } else if (typeof data === 'string') {
                msg = `Server Error: ${err.response?.statusText || 'Unable to connect'}`;
            } else if (err.message) {
                msg = err.message;
            }
            console.error("Full login error:", err);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="logo">MOONFLEX</div>
                <h2>Sign In</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-uname">Username</label>
                        <input
                            id="login-uname"
                            type="text"
                            placeholder="Enter your username"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Signing in…' : (
                            <>
                                <LogIn size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <p className="switch-link">
                    New to Moonflex? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </div>
    );
}
