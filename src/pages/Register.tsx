import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Register() {
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleRegister = async () => {
        try {
            // Simple hash for local demo
            const passwordHash = btoa(formData.password);

            await register({
                name: formData.name,
                email: formData.email,
                passwordHash,
                targetHours: 350,
                targetHoursShadowing: 100,
                targetHoursDental: 100,
                targetHoursNonDental: 150
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12 overflow-y-auto">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Progress Bar */}
                <div className="bg-gray-100 h-1.5 w-full">
                    <div
                        className="bg-teal-500 h-full transition-all duration-300"
                        style={{ width: step === 1 ? '50%' : '100%' }}
                    />
                </div>

                <div className="p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {step === 1 ? 'Create Profile' : 'Payment Method'}
                        </h1>
                        <p className="text-gray-500">
                            {step === 1 ? 'Start your journey to dental school' : 'Secure checkout for premium access'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={handleNext} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                            >
                                Continue to Payment
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-teal-600 font-medium hover:underline">
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            {/* Mock Payment UI */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-900">Monthly Subscription</span>
                                    <span className="font-bold text-xl text-blue-600">$6.99<span className="text-sm font-medium text-gray-500">/mo</span></span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                    <span className="font-semibold text-gray-900">Yearly Subscription</span>
                                    <div className="text-right">
                                        <span className="font-bold text-xl text-green-600">$59<span className="text-sm font-normal text-gray-500">/year</span></span>
                                        <p className="text-xs text-green-700 font-medium">Save $24.88</p>
                                    </div>
                                </div>
                                <ul className="space-y-2 text-sm text-blue-800 pt-2 border-t border-blue-200">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Unlimited Activity Logs</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Advanced Analytics</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Cloud Backup (Coming Soon)</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="h-6" />
                                    <span className="font-medium text-gray-700">Pay with PayPal</span>
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or pay with card</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <input type="text" placeholder="Card Number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" disabled />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 rounded-lg" disabled />
                                        <input type="text" placeholder="CVC" className="w-full px-3 py-2 border border-gray-300 rounded-lg" disabled />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    onClick={handleRegister}
                                    className="flex-[2] flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 font-medium"
                                >
                                    Complete Registration
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            <p className="text-xs text-center text-gray-500">
                                By clicking complete, you agree to our Terms of Service.
                                <br />(This is a mock payment for demonstration)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
