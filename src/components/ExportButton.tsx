import { Download, Lock } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface ExportButtonProps {
    isSubscribed: boolean;
    hasLogs: boolean;
    onExport: () => void;
}

export default function ExportButton({ isSubscribed, hasLogs, onExport }: ExportButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => {
                if (!isSubscribed) {
                    navigate('/settings');
                    return;
                }
                onExport();
            }}
            disabled={!hasLogs}
            className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shrink-0",
                !isSubscribed
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    : "bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
        >
            {!isSubscribed ? (
                <>
                    <Lock className="w-4 h-4" />
                    Export (Premium)
                </>
            ) : (
                <>
                    <Download className="w-4 h-4" />
                    Export ZIP
                </>
            )}
        </button>
    );
}
