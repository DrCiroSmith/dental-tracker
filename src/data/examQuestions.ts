export interface ExamQuestion {
    id: number;
    category: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    imageUrl?: string;
}

export const examCategories = [
    'Anatomy',
    'Physiology',
    'Biochemistry',
    'Microbiology',
    'Pathology',
    'Pharmacology',
    'Dental Materials',
    'Oral Medicine'
];

export const examQuestions: ExamQuestion[] = [
    // Anatomy Questions
    {
        id: 1,
        category: 'Anatomy',
        question: 'Which muscle is the primary elevator of the mandible?',
        options: ['Temporalis', 'Masseter', 'Lateral pterygoid', 'Medial pterygoid'],
        correctAnswer: 1,
        explanation: 'The masseter muscle is the most powerful muscle of mastication and is the primary elevator of the mandible. It originates from the zygomatic arch and inserts into the lateral surface of the mandibular ramus.',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        category: 'Anatomy',
        question: 'The inferior alveolar nerve is a branch of which division of the trigeminal nerve?',
        options: ['Ophthalmic (V1)', 'Maxillary (V2)', 'Mandibular (V3)', 'None of the above'],
        correctAnswer: 2,
        explanation: 'The inferior alveolar nerve is a branch of the mandibular division (V3) of the trigeminal nerve. It provides sensory innervation to the lower teeth and the lower lip.',
        imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        category: 'Anatomy',
        question: 'Which foramen transmits the maxillary artery into the pterygopalatine fossa?',
        options: ['Foramen rotundum', 'Foramen ovale', 'Pterygomaxillary fissure', 'Inferior orbital fissure'],
        correctAnswer: 2,
        explanation: 'The pterygomaxillary fissure connects the infratemporal fossa with the pterygopalatine fossa and transmits the maxillary artery and accompanying veins.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        category: 'Anatomy',
        question: 'The parotid duct opens into the oral cavity opposite which tooth?',
        options: ['Maxillary first molar', 'Maxillary second molar', 'Mandibular first molar', 'Maxillary first premolar'],
        correctAnswer: 1,
        explanation: 'The parotid duct (Stensen\'s duct) opens into the oral cavity through a small papilla located opposite the maxillary second molar.',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        category: 'Anatomy',
        question: 'Which muscle protrudes the mandible?',
        options: ['Masseter', 'Temporalis', 'Lateral pterygoid', 'Medial pterygoid'],
        correctAnswer: 2,
        explanation: 'The lateral pterygoid muscle is responsible for protruding the mandible. When both lateral pterygoid muscles contract together, the mandible moves forward.',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    },
    // Physiology Questions
    {
        id: 6,
        category: 'Physiology',
        question: 'What is the normal pH of saliva?',
        options: ['5.0-5.5', '6.2-7.4', '7.5-8.0', '8.0-8.5'],
        correctAnswer: 1,
        explanation: 'Normal saliva pH ranges from 6.2 to 7.4, with an average of about 6.7. This slightly acidic to neutral pH helps maintain oral health and aids in digestion.',
        imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        category: 'Physiology',
        question: 'Which salivary gland produces the most serous secretion?',
        options: ['Parotid gland', 'Submandibular gland', 'Sublingual gland', 'Minor salivary glands'],
        correctAnswer: 0,
        explanation: 'The parotid gland produces almost entirely serous (watery) secretion rich in amylase. The submandibular gland produces mixed secretion, while the sublingual produces mainly mucous secretion.',
        imageUrl: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        category: 'Physiology',
        question: 'The primary function of enamel is:',
        options: ['Sensory perception', 'Protection of underlying tissues', 'Nutrient transport', 'Immune defense'],
        correctAnswer: 1,
        explanation: 'Enamel is the hardest tissue in the human body and its primary function is to protect the underlying dentin and pulp from mechanical, thermal, and chemical damage.',
        imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop'
    },
    // Biochemistry Questions
    {
        id: 9,
        category: 'Biochemistry',
        question: 'Which mineral is the most abundant in enamel?',
        options: ['Calcium', 'Phosphorus', 'Fluoride', 'Magnesium'],
        correctAnswer: 0,
        explanation: 'Calcium is the most abundant mineral in enamel, forming the primary component of hydroxyapatite crystals (Ca10(PO4)6(OH)2), which makes up about 96% of enamel by weight.',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop'
    },
    {
        id: 10,
        category: 'Biochemistry',
        question: 'Fluoride strengthens teeth by:',
        options: ['Increasing enamel thickness', 'Converting hydroxyapatite to fluorapatite', 'Stimulating odontoblast activity', 'Enhancing saliva production'],
        correctAnswer: 1,
        explanation: 'Fluoride strengthens teeth by converting hydroxyapatite to fluorapatite, which is more resistant to acid dissolution. This process helps prevent dental caries.',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop'
    },
    // Microbiology Questions
    {
        id: 11,
        category: 'Microbiology',
        question: 'Which bacteria is most commonly associated with dental caries?',
        options: ['Porphyromonas gingivalis', 'Streptococcus mutans', 'Actinomyces israelii', 'Fusobacterium nucleatum'],
        correctAnswer: 1,
        explanation: 'Streptococcus mutans is the primary bacteria associated with dental caries. It produces lactic acid through fermentation of dietary carbohydrates, leading to demineralization of tooth enamel.',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop'
    },
    {
        id: 12,
        category: 'Microbiology',
        question: 'Porphyromonas gingivalis is primarily associated with:',
        options: ['Dental caries', 'Periodontal disease', 'Oral candidiasis', 'Herpetic stomatitis'],
        correctAnswer: 1,
        explanation: 'Porphyromonas gingivalis is a gram-negative anaerobic bacterium strongly associated with chronic periodontitis. It produces enzymes that destroy periodontal tissues.',
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop'
    },
    // Pathology Questions
    {
        id: 13,
        category: 'Pathology',
        question: 'Ameloblastoma most commonly occurs in which location?',
        options: ['Maxillary anterior region', 'Mandibular posterior region', 'Maxillary posterior region', 'Mandibular anterior region'],
        correctAnswer: 1,
        explanation: 'Ameloblastoma is a benign odontogenic tumor that most commonly occurs in the posterior mandible, particularly in the molar-ramus area. It accounts for about 80% of cases.',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    },
    {
        id: 14,
        category: 'Pathology',
        question: 'The most common type of oral cancer is:',
        options: ['Adenocarcinoma', 'Melanoma', 'Squamous cell carcinoma', 'Basal cell carcinoma'],
        correctAnswer: 2,
        explanation: 'Squamous cell carcinoma accounts for approximately 90% of all oral cancers. Risk factors include tobacco use, alcohol consumption, and HPV infection.',
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop'
    },
    // Pharmacology Questions
    {
        id: 15,
        category: 'Pharmacology',
        question: 'Which local anesthetic has the longest duration of action?',
        options: ['Lidocaine', 'Articaine', 'Bupivacaine', 'Mepivacaine'],
        correctAnswer: 2,
        explanation: 'Bupivacaine (Marcaine) has the longest duration of action among commonly used local anesthetics, lasting up to 8 hours. It is often used for post-operative pain control.',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
    },
    {
        id: 16,
        category: 'Pharmacology',
        question: 'Epinephrine is added to local anesthetics primarily to:',
        options: ['Increase anesthetic potency', 'Prolong duration by vasoconstriction', 'Reduce allergic reactions', 'Improve taste'],
        correctAnswer: 1,
        explanation: 'Epinephrine causes vasoconstriction, which reduces blood flow to the area, slowing the absorption of the anesthetic and prolonging its duration of action.',
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop'
    },
    // Dental Materials Questions
    {
        id: 17,
        category: 'Dental Materials',
        question: 'Which type of cement has the highest fluoride release?',
        options: ['Zinc phosphate cement', 'Glass ionomer cement', 'Resin cement', 'Zinc oxide eugenol'],
        correctAnswer: 1,
        explanation: 'Glass ionomer cement has the highest fluoride release capability among dental cements. This fluoride release helps prevent secondary caries around restorations.',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop'
    },
    {
        id: 18,
        category: 'Dental Materials',
        question: 'The setting reaction of amalgam is called:',
        options: ['Polymerization', 'Crystallization', 'Amalgamation', 'Sintering'],
        correctAnswer: 2,
        explanation: 'The setting reaction of dental amalgam is called amalgamation. It involves the dissolution of silver-tin alloy particles in mercury, forming new crystalline phases.',
        imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop'
    },
    // Oral Medicine Questions
    {
        id: 19,
        category: 'Oral Medicine',
        question: 'Aphthous ulcers are characterized by:',
        options: ['Vesicles that rupture', 'White striae pattern', 'Painful round ulcers with red halo', 'Raised white plaques'],
        correctAnswer: 2,
        explanation: 'Aphthous ulcers (canker sores) are characterized by painful, round or oval ulcers with a white or yellow center and a red halo. They occur on non-keratinized oral mucosa.',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop'
    },
    {
        id: 20,
        category: 'Oral Medicine',
        question: 'Oral lichen planus most commonly presents as:',
        options: ['Red patches', 'White reticular striae', 'Vesicles', 'Nodules'],
        correctAnswer: 1,
        explanation: 'Oral lichen planus most commonly presents as white reticular striae (Wickham striae) on the buccal mucosa. It is a chronic inflammatory condition of unknown etiology.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop'
    },
    // Additional Anatomy Questions
    {
        id: 21,
        category: 'Anatomy',
        question: 'The lingual nerve is a branch of which nerve?',
        options: ['Facial nerve', 'Glossopharyngeal nerve', 'Mandibular nerve (V3)', 'Hypoglossal nerve'],
        correctAnswer: 2,
        explanation: 'The lingual nerve is a branch of the mandibular division (V3) of the trigeminal nerve. It provides sensory innervation to the anterior two-thirds of the tongue.',
        imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=300&fit=crop'
    },
    {
        id: 22,
        category: 'Anatomy',
        question: 'Which artery supplies the pulp of maxillary molars?',
        options: ['Inferior alveolar artery', 'Posterior superior alveolar artery', 'Greater palatine artery', 'Facial artery'],
        correctAnswer: 1,
        explanation: 'The posterior superior alveolar artery, a branch of the maxillary artery, supplies the pulp of maxillary molars through apical foramina.',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop'
    },
    {
        id: 23,
        category: 'Physiology',
        question: 'What is the average daily production of saliva?',
        options: ['0.5-1 liter', '1-1.5 liters', '2-3 liters', '0.1-0.5 liters'],
        correctAnswer: 1,
        explanation: 'The average daily production of saliva is approximately 1-1.5 liters. Production varies throughout the day, being highest during meals and lowest during sleep.',
        imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop'
    },
    {
        id: 24,
        category: 'Pathology',
        question: 'A dentigerous cyst is associated with:',
        options: ['A non-vital tooth', 'An unerupted tooth crown', 'Root resorption', 'Periodontal pocket'],
        correctAnswer: 1,
        explanation: 'A dentigerous cyst (follicular cyst) forms around the crown of an unerupted tooth, most commonly third molars. It arises from the reduced enamel epithelium.',
        imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop'
    },
    {
        id: 25,
        category: 'Pharmacology',
        question: 'Which antibiotic is the first choice for dental infections?',
        options: ['Metronidazole', 'Amoxicillin', 'Erythromycin', 'Clindamycin'],
        correctAnswer: 1,
        explanation: 'Amoxicillin is typically the first-choice antibiotic for dental infections due to its broad spectrum of activity against oral bacteria and good tissue penetration.',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
    },
    {
        id: 26,
        category: 'Dental Materials',
        question: 'Composite resins are polymerized by:',
        options: ['Heat', 'Light activation', 'Chemical reaction only', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'Composite resins can be polymerized by light activation (photo-polymerization), chemical reaction (self-curing), or dual-curing (combination of both methods).',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop'
    },
    {
        id: 27,
        category: 'Microbiology',
        question: 'Which organism causes oral thrush?',
        options: ['Streptococcus mutans', 'Candida albicans', 'Actinomyces naeslundii', 'Lactobacillus acidophilus'],
        correctAnswer: 1,
        explanation: 'Candida albicans is a fungus that causes oral candidiasis (thrush). It is an opportunistic infection that commonly affects immunocompromised patients.',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop'
    },
    {
        id: 28,
        category: 'Biochemistry',
        question: 'Dentin is composed of approximately what percentage of organic matter?',
        options: ['5%', '20%', '50%', '70%'],
        correctAnswer: 1,
        explanation: 'Dentin is composed of approximately 20% organic matter (mainly type I collagen), 70% inorganic matter (hydroxyapatite), and 10% water by weight.',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop'
    },
    {
        id: 29,
        category: 'Oral Medicine',
        question: 'Geographic tongue is also known as:',
        options: ['Hairy tongue', 'Benign migratory glossitis', 'Fissured tongue', 'Median rhomboid glossitis'],
        correctAnswer: 1,
        explanation: 'Geographic tongue (benign migratory glossitis) is characterized by irregular, smooth red patches on the tongue surface with white borders. The pattern changes over time.',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop'
    },
    {
        id: 30,
        category: 'Anatomy',
        question: 'The TMJ is classified as which type of joint?',
        options: ['Hinge joint', 'Gliding joint', 'Ginglymoarthrodial joint', 'Ball and socket joint'],
        correctAnswer: 2,
        explanation: 'The temporomandibular joint (TMJ) is classified as a ginglymoarthrodial joint, meaning it has both hinge (ginglymus) and gliding (arthrodial) movements.',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop'
    }
];
