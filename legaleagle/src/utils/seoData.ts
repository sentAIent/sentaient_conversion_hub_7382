export interface SEOData {
    title: string;
    description: string;
    h1: string;
    subtitle: string;
}

export const seoData: Record<string, SEOData> = {
    'nda': {
        title: 'Free AI NDA Reviewer & Analyzer | Legal Eagle',
        description: 'Upload your Non-Disclosure Agreement (NDA) and our AI will instantly flag critical risks, missing clauses, and unfair terms in seconds.',
        h1: 'AI Non-Disclosure Agreement (NDA) Reviewer',
        subtitle: 'Instantly identify hidden risks and missing protections in any NDA before you sign.'
    },
    'employment': {
        title: 'Free AI Employment Contract Analyzer | Legal Eagle',
        description: 'Review employment agreements, non-competes, and severance packages using AI to ensure fair terms and compliance with labor laws.',
        h1: 'AI Employment Contract Analyzer',
        subtitle: 'Don\'t sign away your rights. Instantly scan employment agreements for aggressive non-competes and unfair terms.'
    },
    'saas': {
        title: 'SaaS Agreement AI Reviewer | Legal Eagle',
        description: 'Scan SaaS and software licensing agreements for liability traps, auto-renewal clauses, and unfair data usage policies.',
        h1: 'SaaS Agreement AI Reviewer',
        subtitle: 'Instantly flag auto-renewals, SLA loopholes, and liability traps in any software contract.'
    },
    'lease': {
        title: 'Commercial Lease Agreement AI Analyzer | Legal Eagle',
        description: 'Upload your commercial or residential lease. Our AI finds hidden fees, unfair termination clauses, and maintenance liabilities.',
        h1: 'AI Lease Agreement Analyzer',
        subtitle: 'Protect your business. Instantly scan commercial leases for hidden fees and unfair termination clauses.'
    },
    'freelance': {
        title: 'Freelance & Contractor Agreement Reviewer | Legal Eagle',
        description: 'Scan independent contractor agreements for IP ownership clauses, payment terms, and scope creep risks.',
        h1: 'Freelance Agreement AI Reviewer',
        subtitle: 'Ensure you own your work and get paid on time. Instantly analyze contractor agreements for red flags.'
    },
    'default': {
        title: 'AI Contract Review & Legal Document Analyzer | Legal Eagle',
        description: 'Upload any contract or legal document. Legal Eagle\'s AI instantly flags critical risks, unfair terms, and missing clauses to protect you before you sign.',
        h1: 'AI Legal Document Review',
        subtitle: 'Drop any contract below. Our AI instantly finds the hidden risks and unfair terms that humans miss.'
    }
};

export const getSEOData = (contractType?: string): SEOData => {
    if (!contractType) return seoData['default'];
    
    // Normalize to handle mixed case or slight variations
    const normalized = contractType.toLowerCase().trim();
    
    if (seoData[normalized]) {
        return seoData[normalized];
    }
    
    // Attempt fuzzy matching for common aliases
    if (normalized.includes('nda') || normalized.includes('non-disclosure') || normalized.includes('confidentiality')) {
        return seoData['nda'];
    }
    if (normalized.includes('employ') || normalized.includes('offer') || normalized.includes('non-compete')) {
        return seoData['employment'];
    }
    if (normalized.includes('saas') || normalized.includes('software') || normalized.includes('license')) {
        return seoData['saas'];
    }
    if (normalized.includes('lease') || normalized.includes('rental')) {
        return seoData['lease'];
    }
    if (normalized.includes('freelance') || normalized.includes('contractor') || normalized.includes('consulting')) {
        return seoData['freelance'];
    }
    
    return seoData['default'];
};
