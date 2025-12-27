import { X, Trophy } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CongratulationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

export default function CongratulationsModal({ isOpen, onClose, title, message }: CongratulationsModalProps) {
    useEffect(() => {
        if (isOpen) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full bg-teal-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-teal-700 transition-colors"
                    >
                        Awesome!
                    </button>
                </div>
            </div>
        </div>
    );
}
