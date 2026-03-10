import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

export default function Register() {
    const [form, setForm] = useState({
        uname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await register(form.uname, form.email, form.phone, form.password);
            navigate('/login');
        } catch (err) {
            const data = err.response?.data;
            if (data && typeof data === 'object' && !Array.isArray(data)) {
                const firstKey = Object.keys(data)[0];
                const msg = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
                setError(msg || 'Registration failed.');
            } else if (typeof data === 'string') {
                const status = err.response?.status;
                if (status === 504 || status === 502 || data.includes('504 Gateway Timeout') || data.includes('502 Bad Gateway')) {
                    setError('The backend server is waking up. Please wait 15-30 seconds and click Sign Up again.');
                } else {
                    setError(`Server returned an error: ${err.response.statusText || 'Unable to connect'}`);
                }
            } else {
                console.error("Full registration error:", err);
                setError(err.message || 'Network error: Backend server is unreachable.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="logo">MOONFLEX</div>
                <h2>Create Account</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="reg-uname">Username</label>
                        <input
                            id="reg-uname"
                            type="text"
                            name="uname"
                            placeholder="Choose a username"
                            value={form.uname}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-email">Email</label>
                        <input
                            id="reg-email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-phone">Phone (optional)</label>
                        <input
                            id="reg-phone"
                            type="tel"
                            name="phone"
                            placeholder="e.g. +91 9876543210"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-password">Password</label>
                        <input
                            id="reg-password"
                            type="password"
                            name="password"
                            placeholder="At least 8 characters"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-confirm">Confirm Password</label>
                        <input
                            id="reg-confirm"
                            type="password"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Creating account…' : (
                            <>
                                <UserPlus size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
                                Sign Up
                            </>
                        )}
                    </button>
                </form>

                <p className="switch-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
