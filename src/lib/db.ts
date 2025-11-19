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
    status: 'To Contact' | 'Contacted' | 'Shadowing' | 'Rejected';
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

const db = new Dexie('DentalTrackerDB') as Dexie & {
    clinics: EntityTable<Clinic, 'id'>;
    logs: EntityTable<Log, 'id'>;
};

db.version(1).stores({
    clinics: '++id, name, status',
    logs: '++id, clinicId, date, type'
});

export { db };
