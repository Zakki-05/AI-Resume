import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    PieChart, Pie, Cell, Tooltip
} from 'recharts';
import { Card } from '../ui';

const skillData = [
    { subject: 'Frontend', A: 85, fullMark: 100 },
    { subject: 'Backend', A: 65, fullMark: 100 },
    { subject: 'Database', A: 70, fullMark: 100 },
    { subject: 'DevOps', A: 45, fullMark: 100 },
    { subject: 'UI/UX', A: 90, fullMark: 100 },
    { subject: 'DSA', A: 60, fullMark: 100 },
];

const scoreData = [
    { name: 'Completed', value: 78 },
    { name: 'Remaining', value: 22 },
];

const COLORS = ['#8b5cf6', '#e2e8f0'];
const DARK_COLORS = ['#8b5cf6', '#1e293b'];

export const SkillRadar: React.FC = () => (
    <Card className="h-full">
        <h3 className="font-bold mb-4">Skill Strength Analysis</h3>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                    <PolarGrid stroke="#94a3b8" strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    </Card>
);

export const ScoreDoughnut: React.FC = () => (
    <Card className="h-full flex flex-col items-center justify-center relative">
        <h3 className="font-bold w-full mb-4">Overall Resume Match</h3>
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={scoreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        <Cell fill={COLORS[0]} />
                        <Cell fill={DARK_COLORS[1]} />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <span className="text-4xl font-bold">78%</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Score</span>
            </div>
        </div>
    </Card>
);
