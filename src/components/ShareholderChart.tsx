import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { TooltipProps } from 'recharts';
import './ShareholderChart.scss';

interface Shareholder {
    holder: string;
    share_percent: number;
}

interface ShareholderChartProps {
    data: Shareholder[];
}

type TooltipValue = number | string | Array<number | string>;
type TooltipPayload = {
    payload: Shareholder;
    value: TooltipValue;
    name: string;
    color: string;
}[];

interface PieActiveShapeProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    payload: Shareholder;
    percent: number;
    value: number;
}

const COLORS = ['#0088FE', '#FF6B6B', '#00C49F', '#45B7D1', '#FFBB28', '#645c43', '#DDA0DD', '#FF8042'];

const ShareholderChart: React.FC<ShareholderChartProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const onPieEnter = (_: PieActiveShapeProps, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(null);
    };

    interface CustomTooltipProps extends TooltipProps<TooltipValue, string> {
        active?: boolean;
        payload?: TooltipPayload;
    }

    const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <div className="tooltip-holder">{data.holder}</div>
                    <div className="tooltip-percent">{data.share_percent} %</div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-wrapper">
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                            data={data}
                            innerRadius="60%"
                            outerRadius="100%"
                            paddingAngle={0}
                            dataKey="share_percent"
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke="none"
                                    strokeWidth={0}
                                    style={{
                                        opacity: activeIndex !== null ? (activeIndex === index ? 1 : 0.5) : 1,
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="custom-legend">
                {data.map((entry, index) => (
                    <div key={`legend-${index}`} className="legend-item">
                        <div
                            className="legend-color"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <div className="legend-text">{entry.holder}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShareholderChart;