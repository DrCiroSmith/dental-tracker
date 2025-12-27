import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('hasSeenWelcome', 'true');
        setIsOpen(false);
    };

    const steps = [
        {
            title: "Welcome to Dental Tracker!",
            description: "Your all-in-one companion for tracking dental shadowing and volunteering hours for CAAPID applications.",
            icon: <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-2xl">🦷</div>
        },
        {
            title: "Track Your Progress",
            description: "Log your hours for Shadowing, Dental Volunteering, and Non-Dental Volunteering. Watch your progress bars grow!",
            icon: <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><CheckCircle2 className="w-6 h-6" /></div>
        },
        {
            title: "Export for Applications",
            description: "Generate comprehensive reports and export your logs as a ZIP file with all attachments ready for your application.",
            icon: <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">📂</div>
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 text-center space-y-6">
                    <div className="flex justify-center">
                        {steps[step].icon}
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">{steps[step].title}</h2>
                        <p className="text-gray-500">{steps[step].description}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={clsx(
                                    "w-2 h-2 rounded-full transition-colors",
                                    i === step ? "bg-teal-600" : "bg-gray-200"
                                )}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (step < steps.length - 1) {
                                setStep(step + 1);
                            } else {
                                handleClose();
                            }
                        }}
                        className="w-full py-3 px-4 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                    >
                        {step < steps.length - 1 ? (
                            <>
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </>
                        ) : (
                            "Get Started"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
