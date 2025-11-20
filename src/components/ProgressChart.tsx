import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string; // Day name (e.g., "Mon")
    date: string; // ISO Date string
    Shadowing: number;
    'Dental Volunteering': number;
    'Non-Dental Volunteering': number;
    total: number;
}

interface ProgressChartProps {
    data: ChartData[];
    variant: 'stacked' | 'single';
    title?: string;
    subtitle?: string;
    activityType?: string; // Required if variant is 'single'
    onBarClick?: (date: string) => void;
}

const COLORS = {
    'Shadowing': '#3b82f6', // blue-500
    'Dental Volunteering': '#a855f7', // purple-500
    'Non-Dental Volunteering': '#f97316', // orange-500
};

export default function ProgressChart({ data, variant, title = "Weekly Progress", subtitle = "Last 7 Days", activityType, onBarClick }: ProgressChartProps) {
    return (
        <div className="h-[350px] w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <div className="text-sm text-gray-500">{subtitle}</div>
            </div>

            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                        onClick={(data: any) => {
                            if (data && data.activePayload && data.activePayload.length > 0) {
                                const date = data.activePayload[0].payload.date;
                                onBarClick?.(date);
                            }
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#f9fafb' }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg text-sm">
                                            <p className="font-medium text-gray-900 mb-2">{label}</p>
                                            {payload.map((entry: any) => (
                                                <div key={entry.name} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: entry.color }}
                                                        />
                                                        <span className="text-gray-600">{entry.name}</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900">{entry.value}h</span>
                                                </div>
                                            ))}
                                            {variant === 'stacked' && (
                                                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between gap-4 font-medium">
                                                    <span className="text-gray-900">Total</span>
                                                    <span className="text-teal-600">
                                                        {payload.reduce((acc: number, curr: any) => acc + (Number(curr.value) || 0), 0)}h
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '12px', color: '#374151' }}
                        />

                        {variant === 'stacked' ? (
                            <>
                                <Bar
                                    dataKey="Shadowing"
                                    stackId="a"
                                    fill={COLORS['Shadowing']}
                                    radius={[0, 0, 4, 4]}
                                    maxBarSize={50}
                                />
                                <Bar
                                    dataKey="Dental Volunteering"
                                    stackId="a"
                                    fill={COLORS['Dental Volunteering']}
                                    maxBarSize={50}
                                />
                                <Bar
                                    dataKey="Non-Dental Volunteering"
                                    stackId="a"
                                    fill={COLORS['Non-Dental Volunteering']}
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={50}
                                />
                            </>
                        ) : (
                            <Bar
                                dataKey={activityType || 'value'}
                                fill={COLORS[activityType as keyof typeof COLORS] || '#0d9488'}
                                radius={[4, 4, 0, 0]}
                                maxBarSize={50}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
