import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { db, type Profile } from '../lib/db';

interface AuthContextType {
    user: Profile | null;
    login: (email: string, passwordHash: string) => Promise<boolean>;
    logout: () => void;
    register: (profile: Omit<Profile, 'id' | 'role' | 'subscriptionStatus'>) => Promise<void>;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isPrimaryAdmin: boolean;
    isSubscribed: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Profile | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check for existing session with 7-day expiration
    useEffect(() => {
        const checkSession = async () => {
            try {
                const storedId = localStorage.getItem('userId');
                const loginTimestamp = localStorage.getItem('loginTimestamp');

                if (storedId && loginTimestamp) {
                    const now = Date.now();
                    const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
                    const elapsed = now - parseInt(loginTimestamp);

                    // Check if session has expired (more than 7 days)
                    if (elapsed > sevenDays) {
                        // Session expired, clear storage
                        localStorage.removeItem('userId');
                        localStorage.removeItem('loginTimestamp');
                    } else {
                        // Session still valid, restore user
                        const profile = await db.profile.get(Number(storedId));
                        if (profile) {
                            setUser(profile);
                            setIsAuthenticated(true);
                        }
                    }
                }
            } catch (error) {
                console.error('Session check failed:', error);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = async (email: string, passwordHash: string) => {
        const profile = await db.profile.where('email').equals(email).first();
        if (profile && profile.passwordHash === passwordHash) {
            setUser(profile);
            setIsAuthenticated(true);
            localStorage.setItem('userId', profile.id!.toString());
            localStorage.setItem('loginTimestamp', Date.now().toString());
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('userId');
        localStorage.removeItem('loginTimestamp');
    };

    const register = async (newProfile: Omit<Profile, 'id' | 'role' | 'subscriptionStatus'>) => {
        // First user is primary_admin, others are users
        const count = await db.profile.count();
        const role = count === 0 ? 'primary_admin' : 'user';

        const profileData: Omit<Profile, 'id'> = {
            ...newProfile,
            role,
            subscriptionStatus: 'active' // Default to active for now (mock payment)
        };

        const id = await db.profile.add(profileData);
        const profile = await db.profile.get(id);
        if (profile) {
            setUser(profile);
            setIsAuthenticated(true);
            localStorage.setItem('userId', String(id));
            localStorage.setItem('loginTimestamp', Date.now().toString());
        }
    };

    const isAdmin = user?.role === 'primary_admin' || user?.role === 'admin';
    const isPrimaryAdmin = user?.role === 'primary_admin';
    const isSubscribed = user?.subscriptionStatus === 'active';

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated, isAdmin, isPrimaryAdmin, isSubscribed, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
