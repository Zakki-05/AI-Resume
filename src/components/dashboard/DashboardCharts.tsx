import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    PieChart, Pie, Cell, Tooltip
} from 'recharts';
import { Card } from '../ui';

interface SkillDataPoint {
    subject: string;
    A: number;
    fullMark: number;
}

interface SkillRadarProps {
    data?: SkillDataPoint[];
    title?: string;
}

const defaultSkillData: SkillDataPoint[] = [
    { subject: 'Leadership', A: 85, fullMark: 100 },
    { subject: 'Communication', A: 75, fullMark: 100 },
    { subject: 'Technical', A: 90, fullMark: 100 },
    { subject: 'Strategy', A: 65, fullMark: 100 },
    { subject: 'Problem Solving', A: 80, fullMark: 100 },
    { subject: 'Teamwork', A: 85, fullMark: 100 },
];

const COLORS = ['#8b5cf6', '#e2e8f0'];
const DARK_COLORS = ['#8b5cf6', '#1e293b'];

export const SkillRadar: React.FC<SkillRadarProps> = ({ data = defaultSkillData, title = "Skill Strength Analysis" }) => (
    <Card className="h-full">
        <h3 className="font-bold mb-4">{title}</h3>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
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

interface ScoreDoughnutProps {
    score?: number;
    title?: string;
}

export const ScoreDoughnut: React.FC<ScoreDoughnutProps> = ({ score = 78, title = "Overall Resume Match" }) => {
    const scoreData = [
        { name: 'Completed', value: score },
        { name: 'Remaining', value: 100 - score },
    ];

    return (
        <Card className="h-full flex flex-col items-center justify-center relative">
            <h3 className="font-bold w-full mb-4">{title}</h3>
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
                    <span className="text-4xl font-bold">{score}%</span>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Score</span>
                </div>
            </div>
        </Card>
    );
};
