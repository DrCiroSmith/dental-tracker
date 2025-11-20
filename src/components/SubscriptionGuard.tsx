import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubscriptionGuardProps {
    children: ReactNode;
}

export default function SubscriptionGuard({ children }: SubscriptionGuardProps) {
    const { isSubscribed } = useAuth();

    if (isSubscribed) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8 text-amber-600" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Premium Feature</h2>
                    <p className="text-gray-500">
                        This feature is available exclusively to premium subscribers. Upgrade your plan to unlock unlimited access.
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl text-left space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                        <CreditCard className="w-5 h-5 text-teal-600" />
                        <span className="font-medium">Unlimited Activity Logs</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <CreditCard className="w-5 h-5 text-teal-600" />
                        <span className="font-medium">Advanced Analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <CreditCard className="w-5 h-5 text-teal-600" />
                        <span className="font-medium">Priority Support</span>
                    </div>
                </div>

                <Link
                    to="/settings"
                    className="block w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                    Manage Subscription
                </Link>
            </div>
        </div>
    );
}
