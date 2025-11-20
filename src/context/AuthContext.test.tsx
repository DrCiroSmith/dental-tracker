import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Mock Dexie
vi.mock('../lib/db', () => ({
    db: {
        profiles: {
            get: vi.fn(),
            put: vi.fn(),
            add: vi.fn(),
        },
        logs: {
            where: vi.fn(() => ({
                toArray: vi.fn().mockResolvedValue([]),
            })),
        },
    },
}));

const TestComponent = () => {
    const { user, login, logout, isSubscribed } = useAuth();
    return (
        <div>
            <div data-testid="user-id">{user?.id}</div>
            <div data-testid="is-subscribed">{isSubscribed ? 'true' : 'false'}</div>
            <button onClick={() => login('test@example.com', 'password')}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    it('provides default values', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        expect(screen.getByTestId('user-id')).toBeEmptyDOMElement();
        expect(screen.getByTestId('is-subscribed')).toHaveTextContent('false');
    });
});
