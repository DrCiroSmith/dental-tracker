import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Simple hash for local demo (In production use bcryptjs)
        const passwordHash = btoa(password);

        const success = await login(email, passwordHash);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 pt-12 pb-[500px] overflow-y-auto">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <div className="bg-teal-100 dark:bg-teal-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to your Dental Tracker account</p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                    >
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-teal-600 dark:text-teal-400 font-medium hover:underline">
                        Create Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
