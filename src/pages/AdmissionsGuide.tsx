import { Search, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { schools } from '../data/schools';

export default function AdmissionsGuide() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admissions Guide</h2>
                    <p className="text-gray-500 dark:text-gray-400">Requirements for CAAPID dental programs</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
                    <input
                        type="text"
                        placeholder="Search schools..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h3 className="font-medium text-yellow-900 dark:text-yellow-200">Important Disclaimer</h3>
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        Prerequisites and requirements can change. Always verify directly with the school's official website.
                        This guide focuses on Advanced Standing (CAAPID) programs for international dentists, but some requirements listed may overlap with traditional DDS/DMD programs.
                        Please consult the official CAAPID directory for the most up-to-date and specific requirements for international applicants.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSchools.map((school, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{school.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{school.location}</p>
                                </div>
                                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-xs font-medium rounded-full whitespace-nowrap">
                                    {school.cycle}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Prerequisites</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    {school.prerequisites.map((req, i) => (
                                        <li key={i}>{req}</li>
                                    ))}
                                </ul>
                            </div>

                            {school.recommended.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Recommended Courses</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {school.recommended.map((rec, i) => (
                                            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                                                {rec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Application Fee</span>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{school.fee}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Letters of Rec</span>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2" title={school.recommendations}>
                                        {school.recommendations}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 space-y-2">
                                {school.info.map((info, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500" />
                                        {info}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSchools.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No schools found matching your search.</p>
                </div>
            )}
        </div>
    );
}
