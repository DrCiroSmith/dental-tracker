import { useState, useEffect } from 'react';
import { db, type Profile } from '../lib/db';
import { Download, Upload, AlertTriangle, CheckCircle2, User, CreditCard, Shield, Trash2, UserCog, LogOut } from 'lucide-react';
import { saveAs } from 'file-saver';
import { useLiveQuery } from 'dexie-react-hooks';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

function ProfileSettings() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const profile = useLiveQuery(async () => {
        if (user?.id) {
            return await db.profile.get(user.id);
        }
        return undefined;
    }, [user?.id]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        targetHoursShadowing: 100,
        targetHoursDental: 100,
        targetHoursNonDental: 150
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                targetHoursShadowing: profile.targetHoursShadowing || 100,
                targetHoursDental: profile.targetHoursDental || 100,
                targetHoursNonDental: profile.targetHoursNonDental || 150
            });
        }
    }, [profile]);

    useEffect(() => {
        if (location.hash === '#subscription') {
            const element = document.getElementById('subscription');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSave = async () => {
        if (profile) {
            const totalTarget = (formData.targetHoursShadowing || 0) + (formData.targetHoursDental || 0) + (formData.targetHoursNonDental || 0);
            await db.profile.update(profile.id!, {
                name: formData.name,
                targetHoursShadowing: formData.targetHoursShadowing,
                targetHoursDental: formData.targetHoursDental,
                targetHoursNonDental: formData.targetHoursNonDental,
                targetHours: totalTarget // Update total for backward compatibility
            });
            setIsEditing(false);
        }
    };

    if (!profile) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-100 rounded-full">
                    <User className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold text-gray-900">User Profile</h2>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className="text-sm text-teal-600 font-medium hover:underline"
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shadowing Target</label>
                            <input
                                type="number"
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                                value={formData.targetHoursShadowing}
                                onChange={e => setFormData({ ...formData, targetHoursShadowing: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dental Volunteering Target</label>
                            <input
                                type="number"
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                                value={formData.targetHoursDental}
                                onChange={e => setFormData({ ...formData, targetHoursDental: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Non-Dental Volunteering Target</label>
                            <input
                                type="number"
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                                value={formData.targetHoursNonDental}
                                onChange={e => setFormData({ ...formData, targetHoursNonDental: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Target (Calculated)</label>
                            <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500">
                                {(formData.targetHoursShadowing || 0) + (formData.targetHoursDental || 0) + (formData.targetHoursNonDental || 0)} hours
                            </div>
                        </div>
                    </div>

                    <div id="subscription" className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Account Tier:</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${profile.role === 'primary_admin'
                            ? 'bg-purple-100 text-purple-800'
                            : profile.role === 'admin'
                                ? 'bg-blue-100 text-blue-800'
                                : profile.subscriptionStatus === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                            {profile.role === 'primary_admin'
                                ? 'Primary Admin'
                                : profile.role === 'admin'
                                    ? 'Admin'
                                    : profile.subscriptionStatus === 'active'
                                        ? 'Premium'
                                        : 'Free Plan'}
                        </span>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-red-800 mb-4">Danger Zone</h3>
                        <button
                            onClick={async () => {
                                if (confirm('WARNING: This will delete ALL data (logs, clinics, profile) and reset the app. This action cannot be undone. Are you sure?')) {
                                    await db.delete();
                                    localStorage.clear();
                                    window.location.reload();
                                }
                            }}
                            className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                        >
                            Factory Reset (Clear All Data)
                        </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                        <a
                            href="mailto:support@dentaltracker.com?subject=App Feedback"
                            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors mt-2 text-sm font-medium"
                        >
                            Send Feedback
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdminPanel() {
    const { user, isPrimaryAdmin } = useAuth();
    const users = useLiveQuery(() => db.profile.toArray());

    const toggleAdmin = async (targetUser: Profile) => {
        if (!isPrimaryAdmin) return;
        if (targetUser.role === 'primary_admin') return; // Cannot change primary admin

        const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
        await db.profile.update(targetUser.id!, { role: newRole });
    };

    const toggleSubscription = async (targetUser: Profile) => {
        if (!isPrimaryAdmin && user?.role !== 'admin') return;

        const newStatus = targetUser.subscriptionStatus === 'active' ? 'inactive' : 'active';
        await db.profile.update(targetUser.id!, { subscriptionStatus: newStatus });
    };

    const deleteUser = async (targetUser: Profile) => {
        if (!isPrimaryAdmin) return;
        if (targetUser.role === 'primary_admin') return;
        if (!confirm(`Are you sure you want to delete ${targetUser.name}?`)) return;

        await db.profile.delete(targetUser.id!);
    };

    const seedTestUsers = async () => {
        if (!isPrimaryAdmin) return;
        if (!confirm('This will create test users (Admin, Premium User, Free User). Continue?')) return;

        const testUsers: Omit<Profile, 'id'>[] = [
            {
                name: 'Test Admin',
                email: 'admin_test@example.com',
                passwordHash: btoa('password'), // Match Login.tsx hashing
                targetHoursShadowing: 100,
                targetHoursDental: 100,
                targetHoursNonDental: 150,
                targetHours: 350,
                role: 'admin',
                subscriptionStatus: 'active'
            },
            {
                name: 'Premium User',
                email: 'premium_user@example.com',
                passwordHash: btoa('password'),
                targetHoursShadowing: 100,
                targetHoursDental: 100,
                targetHoursNonDental: 150,
                targetHours: 350,
                role: 'user',
                subscriptionStatus: 'active'
            },
            {
                name: 'Free User',
                email: 'free_user@example.com',
                passwordHash: btoa('password'),
                targetHoursShadowing: 100,
                targetHoursDental: 100,
                targetHoursNonDental: 150,
                targetHours: 350,
                role: 'user',
                subscriptionStatus: 'inactive'
            }
        ];

        try {
            for (const user of testUsers) {
                const existing = await db.profile.where('email').equals(user.email).first();
                if (!existing) {
                    await db.profile.add(user);
                } else {
                    // Update password to ensure it's correct (fixes previously seeded broken users)
                    await db.profile.update(existing.id!, { passwordHash: user.passwordHash });
                }
            }
            alert('Test users created successfully! \n\nPasswords are "password" for all test accounts.');
        } catch (error) {
            console.error('Failed to seed users:', error);
            alert('Failed to create test users.');
        }
    };

    if (!users) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                    <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage users and permissions.</p>
                        </div>
                        {isPrimaryAdmin && (
                            <button
                                onClick={seedTestUsers}
                                className="text-sm text-purple-600 font-medium hover:underline"
                            >
                                Seed Test Users
                            </button>
                        )}
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="pb-2 font-medium text-gray-500">User</th>
                                    <th className="pb-2 font-medium text-gray-500">Role</th>
                                    <th className="pb-2 font-medium text-gray-500">Subscription</th>
                                    <th className="pb-2 font-medium text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map(u => (
                                    <tr key={u.id} className="group">
                                        <td className="py-3">
                                            <div className="font-medium text-gray-900">{u.name}</div>
                                            <div className="text-gray-500 text-xs">{u.email}</div>
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'primary_admin' ? 'bg-purple-100 text-purple-800' :
                                                u.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {u.role === 'primary_admin' ? 'Primary Admin' : u.role === 'admin' ? 'Admin' : 'User'}
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <button
                                                onClick={() => toggleSubscription(u)}
                                                className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${u.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {u.subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {isPrimaryAdmin && u.role !== 'primary_admin' && (
                                                    <>
                                                        <button
                                                            onClick={() => toggleAdmin(u)}
                                                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                            title={u.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                                                        >
                                                            <UserCog className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(u)}
                                                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Settings() {
    const { isAdmin } = useAuth();
    const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleBackup = async () => {
        try {
            const clinics = await db.clinics.toArray();
            const logs = await db.logs.toArray();

            const backupData = {
                version: 1,
                timestamp: new Date().toISOString(),
                clinics,
                logs
            };

            const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
            saveAs(blob, `dental_tracker_backup_${new Date().toISOString().split('T')[0]}.json`);
        } catch (error) {
            console.error('Backup failed:', error);
            alert('Backup failed. Please try again.');
        }
    };

    const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!confirm('WARNING: Restoring a backup will REPLACE all current data. This cannot be undone. Are you sure?')) {
            e.target.value = ''; // Reset input
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const json = event.target?.result as string;
                const data = JSON.parse(json);

                if (!data.clinics || !data.logs) {
                    throw new Error('Invalid backup file format');
                }

                await db.transaction('rw', db.clinics, db.logs, async () => {
                    await db.clinics.clear();
                    await db.logs.clear();
                    await db.clinics.bulkAdd(data.clinics);
                    await db.logs.bulkAdd(data.logs);
                });

                setImportStatus('success');
                setStatusMessage(`Successfully restored ${data.clinics.length} clinics and ${data.logs.length} logs.`);
            } catch (error) {
                console.error('Restore failed:', error);
                setImportStatus('error');
                setStatusMessage('Failed to restore backup. Invalid file or data error.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

            {/* Profile Section */}
            <ProfileSettings />

            {/* Admin Panel (Only for Admins) */}
            {isAdmin && <AdminPanel />}

            {/* Backup Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Backup Data</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Download a secure copy of all your clinics and logs. Save this file to your computer, Google Drive, or email it to yourself.
                        </p>
                        <button
                            onClick={handleBackup}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download Backup (.json)
                        </button>
                    </div>
                </div>
            </div>

            {/* Restore Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                        <Upload className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Restore Data</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Restore your data from a previously saved backup file.
                        </p>

                        <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-orange-800">
                                <strong>Warning:</strong> Restoring will <u>delete all current data</u> on this device and replace it with the backup.
                            </p>
                        </div>

                        <div className="mt-4">
                            <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <Upload className="w-4 h-4" />
                                Select Backup File
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleRestore}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {importStatus === 'success' && (
                            <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-sm font-medium">{statusMessage}</span>
                            </div>
                        )}

                        {importStatus === 'error' && (
                            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                                <AlertTriangle className="w-5 h-5" />
                                <span className="text-sm font-medium">{statusMessage}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
