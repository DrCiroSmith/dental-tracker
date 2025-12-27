import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressChart from './ProgressChart';

// Mock Recharts to avoid rendering complex SVG in JSDOM
vi.mock('recharts', () => {
    const ResponsiveContainer = ({ children }: { children: any }) => <div>{children}</div>;
    const BarChart = ({ children }: { children: any }) => <div data-testid="bar-chart">{children}</div>;
    const Bar = () => <div data-testid="bar" />;
    const XAxis = () => <div data-testid="x-axis" />;
    const YAxis = () => <div data-testid="y-axis" />;
    const CartesianGrid = () => <div data-testid="cartesian-grid" />;
    const Tooltip = () => <div data-testid="tooltip" />;
    const Legend = () => <div data-testid="legend" />;
    return { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend };
});

describe('ProgressChart', () => {
    const mockData = [
        {
            name: 'Mon',
            date: '2023-01-01',
            Shadowing: 2,
            'Dental Volunteering': 0,
            'Non-Dental Volunteering': 0,
            total: 2
        },
        {
            name: 'Tue',
            date: '2023-01-02',
            Shadowing: 4,
            'Dental Volunteering': 0,
            'Non-Dental Volunteering': 0,
            total: 4
        },
    ];

    it('renders with title and subtitle', () => {
        render(<ProgressChart data={mockData} variant="stacked" title="Weekly Progress" subtitle="Last 7 Days" />);
        expect(screen.getByText('Weekly Progress')).toBeInTheDocument();
        expect(screen.getByText('Last 7 Days')).toBeInTheDocument();
    });

    it('renders chart components', () => {
        render(<ProgressChart data={mockData} variant="stacked" title="Weekly Progress" subtitle="Last 7 Days" />);
        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
});
