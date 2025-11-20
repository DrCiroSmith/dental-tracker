import { Filter } from 'lucide-react';
import clsx from 'clsx';

interface LogFiltersProps {
    currentFilter: string;
    onFilterChange: (type: string) => void;
}

export default function LogFilters({ currentFilter, onFilterChange }: LogFiltersProps) {
    const activityTypes = ['All', 'Shadowing', 'Dental Volunteering', 'Non-Dental Volunteering'];

    return (
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="w-5 h-5 text-gray-400 shrink-0" />
            {activityTypes.map(type => (
                <button
                    key={type}
                    onClick={() => onFilterChange(type)}
                    className={clsx(
                        "px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors",
                        currentFilter === type
                            ? "bg-teal-100 text-teal-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                >
                    {type}
                </button>
            ))}
        </div>
    );
}
