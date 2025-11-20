import { Search, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface School {
    name: string;
    location: string;
    prerequisites: string[];
    recommended: string[];
    recommendations: string;
    cycle: string;
    fee: string;
    info: string[];
}

const schools: School[] = [
    {
        name: "Columbia University College of Dental Medicine",
        location: "New York, NY",
        prerequisites: [
            "English – 6 credits",
            "Math – 6 credits",
            "Physics – 1 year (8 cr.)",
            "Biology – 1 year (8 cr.)",
            "Gen. Chem – 1 year (8 cr.)",
            "Org. Chem – 1 year (8 cr.)",
            "Biochemistry – 1 sem. (no lab required)"
        ],
        recommended: [
            "Sociology",
            "History",
            "Fine or industrial arts",
            "One or more foreign language"
        ],
        recommendations: "Three letters from science professors OR Committee Letter",
        cycle: "June 1 – December 31",
        fee: "$75 (Fee waiver available)",
        info: [
            "Desirable GPA: 3.0 and above",
            "Review starts in August on a rolling basis",
            "Interviews: Fridays from September to February"
        ]
    },
    {
        name: "New York University College of Dentistry",
        location: "New York, NY",
        prerequisites: [
            "English – 6-8 sem. hours",
            "Biology – Minimum of 8 sem. hours",
            "Physics – 6-8 sem. hours",
            "Gen. Chem – 6-8 sem. hours",
            "Org. Chem – 6-8 sem. hours"
        ],
        recommended: [
            "Anatomy", "Biochemistry", "Cell biology", "Microbiology", "Genetics",
            "Histology", "Embryology", "Physiology", "Sociology", "Psychology", "Mathematics"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – February 1",
        fee: "$80 (Fee waiver available)",
        info: [
            "100 hours of shadowing is recommended",
            "Class size ~375 students",
            "Mean GPA (2017): 3.5",
            "Interviews: Mon, Thu, Fri from October to April"
        ]
    },
    {
        name: "University of Buffalo School of Dental Medicine",
        location: "Buffalo, NY",
        prerequisites: [
            "English – 2 sem. (6 cr.)",
            "Gen. Chem – 2 sem. (8 cr.)",
            "Org. Chem – 2 sem. (8 cr.)",
            "Biology – 2 sem. (8 cr.)",
            "Physics – 2 sem. (8 cr., algebra or calculus based)",
            "Biochemistry – 1 sem. (3 cr., no lab required)"
        ],
        recommended: [
            "Histology", "Psychology", "Sociology", "Public speaking", "Composition", "Humanities"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75 (Fee waiver available)",
        info: [
            "GPA requirement: minimum of 2.70",
            "Min. DAT score: 16 reading, 15 others",
            "Shadowing experience: minimum of 75-100 hours",
            "Class size ~95"
        ]
    },
    {
        name: "Stony Brook School of Dental Medicine",
        location: "Stony Brook, NY",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem. (no lab required)",
            "Math – Calculus I & II OR Calculus I & Statistics"
        ],
        recommended: ["Social sciences", "Biochemistry", "Physiology"],
        recommendations: "Committee Letter is required (3 letters from science faculty accepted with explanation)",
        cycle: "June 1 – December 1",
        fee: "$100",
        info: [
            "GPA of 3.0 or greater preferred",
            "DAT score of 17 or greater preferred",
            "Class size ~46"
        ]
    },
    {
        name: "Touro College of Dental Medicine",
        location: "Hawthorne, NY",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 1 sem.",
            "Biochemistry – 1 sem. (without lab)",
            "Physics – 2 sem."
        ],
        recommended: ["N/A"],
        recommendations: "Three letters (two from science faculty, one from major) OR Committee Letter",
        cycle: "June 1 – February 1",
        fee: "$100",
        info: [
            "GPA requirement: minimum of 2.7",
            "Interviews: November through March",
            "Class size ~110"
        ]
    },
    {
        name: "University of Pennsylvania School of Dental Medicine",
        location: "Philadelphia, PA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 1 sem.",
            "Math – 1 sem. (Calculus preferred)",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem. (no lab required)"
        ],
        recommended: ["Anatomy", "Microbiology", "Physiology", "Physical Chemistry", "Organic Chemistry"],
        recommendations: "Minimum of two letters from professors OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$60",
        info: [
            "Desirable GPA: 3.2 and higher",
            "Mean DAT (2016): 21",
            "Interviews: Weekly from September through March"
        ]
    },
    {
        name: "Temple University Kornberg School of Dentistry",
        location: "Philadelphia, PA",
        prerequisites: [
            "English – 6 sem. hours",
            "Biology – 8 sem. hours",
            "Physics – 8 sem. hours",
            "Gen. Chem – 8 sem. hours",
            "Org. Chem – 8 sem. hours"
        ],
        recommended: ["Biochemistry", "Physiology", "Anatomy", "Histology"],
        recommendations: "Two letters from science faculty OR Committee Letter",
        cycle: "June 1 – January 15",
        fee: "$50",
        info: [
            "Class size: 140",
            "Mean GPA: 3.53",
            "Mean DAT: 20.6"
        ]
    },
    {
        name: "University of Maryland School of Dentistry",
        location: "Baltimore, MD",
        prerequisites: [
            "English – 6 sem. hours",
            "Biology – 8 sem. hours",
            "Physics – 8 sem. hours",
            "Gen. Chem – 8 sem. hours",
            "Org. Chem – 8 sem. hours",
            "Biochemistry – 3 sem. hours (no lab required)"
        ],
        recommended: ["Social sciences", "Humanities", "Arts"],
        recommendations: "Two letters from science faculty (Bio & Chem) OR Committee Letter",
        cycle: "June 1 – December 31",
        fee: "$90",
        info: [
            "Community college credits limited to 60",
            "Interviews: Selected Tuesdays and Wednesdays"
        ]
    },
    {
        name: "Tufts University School of Dental Medicine",
        location: "Boston, MA",
        prerequisites: [
            "Writing-intensive Humanities/Social Science – 1 sem.",
            "Biology – 2 sem. (8 cr.)",
            "Upper level Bio – 1 sem. (3 cr.)",
            "Gen. Chem – 2 sem. (8 cr.)",
            "Org. Chem – 1 sem. (4 cr.)",
            "Physics – 2 sem. (8 cr.)",
            "Biochemistry – 1 sem. (3 cr.)"
        ],
        recommended: ["Anatomy", "Genetics", "Physiology", "Microbiology", "Immunology", "Pharmacology", "Histology"],
        recommendations: "Three letters (two professors, one dental/research) OR Committee Letter",
        cycle: "June 1 – January 1",
        fee: "$75",
        info: [
            "Minimum 75 hours shadowing (40 with general dentist)",
            "Competitive DAT: 19-20",
            "Mean GPA: 3.41"
        ]
    },
    {
        name: "Boston University Henry M Goldman School of Dental Medicine",
        location: "Boston, MA",
        prerequisites: [
            "English – 2 sem. (6-8 cr.)",
            "Biology – 3 sem. (9-12 cr.)",
            "Gen. Chem – 2 sem. (6-8 cr.)",
            "Org. Chem – 2 sem. (6-8 cr.)",
            "Physics – 2 sem. (6-8 cr.)",
            "Math – 2 sem. (Calculus + Stats preferred)"
        ],
        recommended: ["Anatomy", "Biochemistry", "Cell biology", "Embryology", "Genetics", "Histology", "Immunology", "Microbiology", "Physiology"],
        recommendations: "Two or three letters (two science) + One dentist mentor OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "Supplemental materials by Jan 1",
        info: [
            "Competitive GPA: 3.3 and above",
            "Competitive DAT: 18 and above",
            "Class size ~115"
        ]
    },
    {
        name: "University of Pittsburgh School of Dental Medicine",
        location: "Pittsburgh, PA",
        prerequisites: [
            "English – 6 sem. hours",
            "Biology – 8 sem. hours",
            "Physics – 6 sem. hours",
            "Gen. Chem – 8 sem. hours",
            "Org. Chem – 8 sem. hours",
            "Biochemistry – 3 sem. hours"
        ],
        recommended: ["Anatomy"],
        recommendations: "Three letters (two from professor/advisor) OR Committee Letter",
        cycle: "June 1 – November 1",
        fee: "$75",
        info: [
            "Competitive GPA: 3.2",
            "Competitive DAT: 19",
            "Class size ~80"
        ]
    },
    {
        name: "Rutgers School of Dental Medicine",
        location: "Newark, NJ",
        prerequisites: [
            "English – 6 credits",
            "Biology – 8 credits",
            "Gen. Chem – 8 credits",
            "Org. Chem – 8 credits",
            "Physics – 8 credits"
        ],
        recommended: ["N/A"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 4 – January 15",
        fee: "$95",
        info: [
            "Average science GPA: 3.6",
            "Average DAT: 21"
        ]
    }
];

export default function AdmissionsGuide() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Dental School Admissions Guide</h1>
                <p className="text-gray-500">
                    A comprehensive guide to requirements for top dental schools.
                </p>

                <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-2">
                            <p>
                                <strong>Important Disclaimers:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>US Focus:</strong> This guide focuses exclusively on dental schools in the United States.</li>
                                <li><strong>Non-Exhaustive List:</strong> The schools listed here represent a sample of US dental programs. Your target school may not appear in this list. For a complete directory of CAAPID-participating programs, visit <a href="https://programs.adea.org/CAAPID/programs" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700">ADEA CAAPID Program Finder</a>.</li>
                                <li><strong>International Dentist Requirements:</strong> Requirements may differ significantly between first-year applicants and internationally-trained dentists seeking advanced standing or certification programs. Always verify the specific pathways and prerequisites for your situation.</li>
                                <li><strong>Subject to Change:</strong> University requirements may change without notice. Always verify details on the official school websites.</li>
                                <li><strong>Not Affiliated:</strong> We are not affiliated with any of these institutions.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-6 relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    <input
                        type="text"
                        placeholder="Search schools or locations..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredSchools.map((school, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{school.name}</h2>
                                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                                        {school.location}
                                    </p>
                                </div>
                                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                                    Cycle: {school.cycle}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Prerequisites</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                    {school.prerequisites.map((req, i) => (
                                        <li key={i}>{req}</li>
                                    ))}
                                </ul>

                                <h3 className="font-semibold text-gray-900 mt-6 mb-3">Recommended Courses</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                    {school.recommended.map((req, i) => (
                                        <li key={i}>{req}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Letters of Recommendation</h3>
                                    <p className="text-sm text-gray-600">{school.recommendations}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Application Fee</h3>
                                    <p className="text-sm text-gray-600">{school.fee}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Additional Info</h3>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        {school.info.map((info, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-teal-500 mt-1">•</span>
                                                {info}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
