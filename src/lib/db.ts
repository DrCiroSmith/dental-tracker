import Dexie, { type EntityTable } from 'dexie';

export interface Clinic {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    phone?: string;
    email?: string;
    website?: string;
    status: 'To Contact' | 'Contacted' | 'Shadowing' | 'Dental Volunteering' | 'Non-Dental Volunteering' | 'Rejected';
    notes?: string;
}

export interface Log {
    id: number;
    clinicId?: number; // Optional for non-dental volunteering
    date: string; // ISO string
    duration: number; // in hours
    type: 'Shadowing' | 'Dental Volunteering' | 'Non-Dental Volunteering';
    supervisor?: string;
    procedures?: string;
    notes?: string;
    attachment?: Blob; // For invoices/signatures
    attachmentName?: string;
}

export interface Profile {
    id?: number;
    name: string;
    email: string;
    passwordHash: string; // Simple hash for local auth
    targetHours: number; // Kept for backward compatibility/total
    targetHoursShadowing: number;
    targetHoursDental: number;
    targetHoursNonDental: number;
    role: 'primary_admin' | 'admin' | 'user';
    subscriptionStatus: 'active' | 'inactive';
}

const db = new Dexie('DentalTrackerDB') as Dexie & {
    clinics: EntityTable<Clinic, 'id'>;
    logs: EntityTable<Log, 'id'>;
    profile: EntityTable<Profile, 'id'>;
};

db.version(1).stores({
    clinics: '++id, name, status',
    logs: '++id, clinicId, date, type',
    profile: '++id, email'
});

export { db };
