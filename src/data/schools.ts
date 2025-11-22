export interface School {
    name: string;
    location: string;
    prerequisites: string[];
    recommended: string[];
    recommendations: string;
    cycle: string;
    fee: string;
    info: string[];
}

export const schools: School[] = [
    // New York
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
            "Calculus I – 1 sem.",
            "Statistics – 1 sem."
        ],
        recommended: [
            "Microbiology", "Genetics", "Physiology", "Anatomy", "Cell Biology"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – January 15",
        fee: "$100",
        info: [
            "Small class size (~45 students)",
            "Strong research focus",
            "Pass/Fail grading system",
            "Interviews: December to February"
        ]
    },
    {
        name: "Touro College of Dental Medicine",
        location: "Hawthorne, NY",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: [
            "Histology", "Immunology", "Microbiology", "Physiology", "Genetics"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – February 1",
        fee: "$100",
        info: [
            "Newer school with modern facilities",
            "Large class size (~110)",
            "Digital dentistry focus",
            "Interviews: October to March"
        ]
    },
    // New Jersey
    {
        name: "Rutgers School of Dental Medicine",
        location: "Newark, NJ",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem."
        ],
        recommended: [
            "Biochemistry", "Microbiology", "Physiology", "Anatomy", "Histology"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$95",
        info: [
            "Strong clinical program",
            "Diverse patient population",
            "Interviews: September to March"
        ]
    },
    // Pennsylvania
    {
        name: "University of Pennsylvania School of Dental Medicine",
        location: "Philadelphia, PA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Math – 1 sem."
        ],
        recommended: [
            "Microbiology", "Genetics", "Physiology", "Anatomy", "Immunology"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: [
            "Ivy League institution",
            "Strong research and clinical training",
            "Interviews: September to February"
        ]
    },
    {
        name: "Temple University Kornberg School of Dentistry",
        location: "Philadelphia, PA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem."
        ],
        recommended: [
            "Biochemistry", "Microbiology", "Anatomy", "Physiology", "Histology"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: [
            "Strong clinical focus",
            "Community service emphasis",
            "Interviews: September to March"
        ]
    },
    {
        name: "University of Pittsburgh School of Dental Medicine",
        location: "Pittsburgh, PA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Microbiology", "Anatomy", "Physiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Research intensive", "Interviews: September to January"]
    },
    // Massachusetts
    {
        name: "Boston University Henry M. Goldman School of Dental Medicine",
        location: "Boston, MA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: [
            "Microbiology", "Immunology", "Physiology", "Anatomy", "Genetics"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: [
            "Advanced Standing Program available",
            "Strong clinical emphasis",
            "Interviews: September to February"
        ]
    },
    {
        name: "Tufts University School of Dental Medicine",
        location: "Boston, MA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: [
            "Microbiology", "Anatomy", "Physiology", "Histology", "Immunology"
        ],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$80",
        info: [
            "Large clinical program",
            "Diverse student body",
            "Interviews: September to March"
        ]
    },
    {
        name: "Harvard School of Dental Medicine",
        location: "Boston, MA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Math – 2 sem. (Calculus & Statistics)"
        ],
        recommended: ["Cell Biology", "Molecular Biology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 15",
        fee: "$80",
        info: ["Problem-Based Learning (PBL) curriculum", "Small class size (~35)", "Pass/Fail"]
    },
    // California
    {
        name: "University of California, San Francisco (UCSF)",
        location: "San Francisco, CA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Psychology", "Spanish"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Top-tier research", "Pass/Fail grading", "Interviews: October to February"]
    },
    {
        name: "University of California, Los Angeles (UCLA)",
        location: "Los Angeles, CA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Microbiology", "Anatomy", "Physiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Highly competitive", "Strong clinical and research", "Interviews: January to February"]
    },
    {
        name: "University of the Pacific Arthur A. Dugoni School of Dentistry",
        location: "San Francisco, CA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology", "Biochemistry"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["3-year accelerated DDS program", "Humanistic model of education", "Interviews: October to March"]
    },
    {
        name: "Herman Ostrow School of Dentistry of USC",
        location: "Los Angeles, CA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem."
        ],
        recommended: ["Biochemistry", "Molecular Biology", "Philosophy", "History"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – February 1",
        fee: "$85",
        info: ["PBL curriculum", "Strong community service", "Interviews: Rolling"]
    },
    {
        name: "Loma Linda University School of Dentistry",
        location: "Loma Linda, CA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem."
        ],
        recommended: ["Biochemistry", "Histology", "Anatomy", "Physiology"],
        recommendations: "Three letters (two from science faculty) + Spiritual Leader letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Faith-based institution", "Service learning focus", "Interviews: October to March"]
    },
    {
        name: "Western University of Health Sciences",
        location: "Pomona, CA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology", "Biochemistry"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Interprofessional education", "Community based clinical education"]
    },
    // Florida
    {
        name: "University of Florida College of Dentistry",
        location: "Gainesville, FL",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Immunology", "Genetics"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 1",
        fee: "$75",
        info: ["State resident preference", "Strong clinical training", "Interviews: September to December"]
    },
    {
        name: "Nova Southeastern University College of Dental Medicine",
        location: "Fort Lauderdale, FL",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Private institution", "Large clinical network", "Interviews: September to March"]
    },
    {
        name: "LECOM School of Dental Medicine",
        location: "Bradenton, FL",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 1 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$50",
        info: ["PBL curriculum", "Community outreach focus", "Interviews: September to March"]
    },
    // Illinois
    {
        name: "University of Illinois at Chicago College of Dentistry",
        location: "Chicago, IL",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology", "Histology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$85",
        info: ["Strong public health focus", "Diverse patient base", "Interviews: September to February"]
    },
    {
        name: "Midwestern University College of Dental Medicine (IL)",
        location: "Downers Grove, IL",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Anatomy & Physiology – 1 sem."
        ],
        recommended: ["Microbiology", "Immunology", "Genetics"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – January 1",
        fee: "$75",
        info: ["Integrated curriculum", "Modern facilities", "Interviews: September to March"]
    },
    // Michigan
    {
        name: "University of Michigan School of Dentistry",
        location: "Ann Arbor, MI",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem.",
            "Psychology/Sociology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – October 15",
        fee: "$75",
        info: ["Top ranked dental school", "Strong research", "Interviews: September to January"]
    },
    {
        name: "University of Detroit Mercy School of Dentistry",
        location: "Detroit, MI",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$100",
        info: ["Jesuit tradition", "Community service focus", "Interviews: September to March"]
    },
    // Texas
    {
        name: "Texas A&M College of Dentistry",
        location: "Dallas, TX",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Statistics – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "May 1 – November 1 (TMDSAS)",
        fee: "$185 (TMDSAS)",
        info: ["Texas residents preference", "Strong clinical program", "Interviews: August to January"]
    },
    {
        name: "UT Health San Antonio School of Dentistry",
        location: "San Antonio, TX",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Statistics – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "May 1 – November 1 (TMDSAS)",
        fee: "$185 (TMDSAS)",
        info: ["Texas residents preference", "Research opportunities", "Interviews: August to December"]
    },
    {
        name: "UT Health Houston School of Dentistry",
        location: "Houston, TX",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Statistics – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "May 1 – November 1 (TMDSAS)",
        fee: "$185 (TMDSAS)",
        info: ["Texas residents preference", "Medical center location", "Interviews: August to December"]
    },
    // Colorado
    {
        name: "University of Colorado School of Dental Medicine",
        location: "Aurora, CO",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Immunology", "Genetics"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – October 15",
        fee: "$75",
        info: ["Advanced Clinical Training", "Interviews: September to February"]
    },
    // Arizona
    {
        name: "A.T. Still University Arizona School of Dentistry & Oral Health",
        location: "Mesa, AZ",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Human Physiology – 1 sem."
        ],
        recommended: ["Anatomy", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 15",
        fee: "$75",
        info: ["Public health focus", "Certificate in Public Health included", "Interviews: September to March"]
    },
    {
        name: "Midwestern University College of Dental Medicine (AZ)",
        location: "Glendale, AZ",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Anatomy – 1 sem."
        ],
        recommended: ["Microbiology", "Physiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Clinical excellence focus", "Modern campus", "Interviews: August to April"]
    },
    // Washington
    {
        name: "University of Washington School of Dentistry",
        location: "Seattle, WA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Immunology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 1",
        fee: "$75",
        info: ["Top ranked", "Regional preference (WICHE)", "Interviews: October to January"]
    },
    // Maryland
    {
        name: "University of Maryland School of Dentistry",
        location: "Baltimore, MD",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["First dental school in the world", "Strong clinical program", "Interviews: September to March"]
    },
    // Virginia
    {
        name: "Virginia Commonwealth University School of Dentistry",
        location: "Richmond, VA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology", "Immunology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 1",
        fee: "$80",
        info: ["Service learning", "Digital dentistry", "Interviews: September to February"]
    },
    // North Carolina
    {
        name: "University of North Carolina at Chapel Hill Adams School of Dentistry",
        location: "Chapel Hill, NC",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology", "Genetics"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 1",
        fee: "$84",
        info: ["Top ranked", "Holistic review", "Interviews: September to January"]
    },
    {
        name: "East Carolina University School of Dental Medicine",
        location: "Greenville, NC",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["NC residents only", "Rural health focus", "Interviews: August to December"]
    },
    // Ohio
    {
        name: "The Ohio State University College of Dentistry",
        location: "Columbus, OH",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem.",
            "Anatomy & Physiology – 1 sem."
        ],
        recommended: ["Histology", "Immunology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Large clinical program", "Research opportunities", "Interviews: September to February"]
    },
    {
        name: "Case Western Reserve University School of Dental Medicine",
        location: "Cleveland, OH",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology", "Cell Biology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Small class size", "Research focus", "Interviews: September to March"]
    },
    // Kentucky
    {
        name: "University of Kentucky College of Dentistry",
        location: "Lexington, KY",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 15",
        fee: "$75",
        info: ["Small class size", "Digital dentistry", "Interviews: August to January"]
    },
    {
        name: "University of Louisville School of Dentistry",
        location: "Louisville, KY",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology", "Histology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Humanistic culture", "Clinical focus", "Interviews: August to February"]
    },
    // Tennessee
    {
        name: "University of Tennessee Health Science Center College of Dentistry",
        location: "Memphis, TN",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Histology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – September 30",
        fee: "$75",
        info: ["State resident preference", "Clinical excellence", "Interviews: September to December"]
    },
    {
        name: "Meharry Medical College School of Dentistry",
        location: "Nashville, TN",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 15",
        fee: "$75",
        info: ["HBCU", "Underserved communities focus", "Interviews: September to April"]
    },
    // Georgia
    {
        name: "Dental College of Georgia at Augusta University",
        location: "Augusta, GA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – September 30",
        fee: "$75",
        info: ["State resident preference", "Modern facilities", "Interviews: August to December"]
    },
    // Alabama
    {
        name: "University of Alabama at Birmingham School of Dentistry",
        location: "Birmingham, AL",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Calculus – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Research intensive", "Clinical excellence", "Interviews: September to March"]
    },
    // Louisiana
    {
        name: "LSU Health New Orleans School of Dentistry",
        location: "New Orleans, LA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Microbiology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["State resident preference", "Clinical focus", "Interviews: September to February"]
    },
    // Iowa
    {
        name: "University of Iowa College of Dentistry",
        location: "Iowa City, IA",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 1",
        fee: "$75",
        info: ["Research focus", "Specialty programs", "Interviews: August to December"]
    },
    // Minnesota
    {
        name: "University of Minnesota School of Dentistry",
        location: "Minneapolis, MN",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Psychology – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$85",
        info: ["Research intensive", "Clinical outreach", "Interviews: September to December"]
    },
    // Missouri
    {
        name: "University of Missouri-Kansas City School of Dentistry",
        location: "Kansas City, MO",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Anatomy – 1 sem.",
            "Physiology – 1 sem."
        ],
        recommended: ["Microbiology", "Histology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 1",
        fee: "$75",
        info: ["Clinical focus", "Combined BA/DDS program", "Interviews: August to November"]
    },
    {
        name: "A.T. Still University Missouri School of Dentistry & Oral Health",
        location: "Kirksville, MO",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem.",
            "Human Physiology – 1 sem."
        ],
        recommended: ["Anatomy", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – November 15",
        fee: "$75",
        info: ["Public health focus", "Community service", "Interviews: September to March"]
    },
    // Nebraska
    {
        name: "Creighton University School of Dentistry",
        location: "Omaha, NE",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Jesuit values", "Service focus", "Interviews: September to March"]
    },
    {
        name: "University of Nebraska Medical Center College of Dentistry",
        location: "Lincoln, NE",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Small class size", "Clinical focus", "Interviews: September to January"]
    },
    // Nevada
    {
        name: "University of Nevada, Las Vegas School of Dental Medicine",
        location: "Las Vegas, NV",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["State resident preference", "Clinical focus", "Interviews: September to March"]
    },
    // Utah
    {
        name: "Roseman University of Health Sciences College of Dental Medicine",
        location: "South Jordan, UT",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – December 1",
        fee: "$75",
        info: ["Block curriculum", "Pass/Fail grading", "Interviews: October to March"]
    },
    {
        name: "University of Utah School of Dentistry",
        location: "Salt Lake City, UT",
        prerequisites: [
            "English – 2 sem.",
            "Biology – 2 sem.",
            "Gen. Chem – 2 sem.",
            "Org. Chem – 2 sem.",
            "Physics – 2 sem.",
            "Biochemistry – 1 sem."
        ],
        recommended: ["Anatomy", "Physiology", "Microbiology"],
        recommendations: "Three letters (two from science faculty) OR Committee Letter",
        cycle: "June 1 – October 1",
        fee: "$75",
        info: ["Small class size", "State resident preference", "Interviews: September to January"]
    }
];
