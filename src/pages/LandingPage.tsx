import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, FileText, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useAuth();

    return (
        <div className="h-screen overflow-y-auto bg-white font-['Figtree'] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            D
                        </div>
                        <span className="font-bold text-xl tracking-tight">DentalTracker</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <Link
                                to="/"
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 flex items-center gap-2"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/20"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Now accepting new users
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                        Master your dental <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            shadowing journey
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Track hours, manage clinics, and generate professional reports for your dental school application. All in one beautiful place.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {user ? (
                            <Link
                                to="/"
                                className="group px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/20 flex items-center gap-2"
                            >
                                Go to Dashboard
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="group px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/20 flex items-center gap-2"
                                >
                                    Start Tracking Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-8 py-4 bg-white text-slate-700 text-lg font-semibold rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                                >
                                    View Demo
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Smart Logging</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Effortlessly log your shadowing hours with detailed procedure tracking and supervisor verification.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Clinic Mapping</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Visualize your shadowing locations on an interactive map and find new opportunities nearby.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Instant Reports</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Generate PDF reports formatted specifically for dental school applications (AADSAS ready).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats */}
            <section className="py-24 px-6 border-t border-slate-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Trusted by future dentists</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Hours Logged</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Schools</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Free</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                        Join hundreds of pre-dental students who are organizing their path to dental school.
                    </p>
                    {user ? (
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-lg font-bold rounded-full hover:bg-blue-50 transition-all duration-200"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-lg font-bold rounded-full hover:bg-blue-50 transition-all duration-200"
                        >
                            Create Free Account
                        </Link>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white border-t border-slate-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} DentalTracker. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Privacy</a>
                        <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Terms</a>
                        <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
