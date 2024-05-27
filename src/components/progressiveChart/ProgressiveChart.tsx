import React from 'react';

interface CircularProgressProps {
    startDate: string;
    endDate: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ startDate, endDate }) => {
    const size = 100;           // Fixed size of the circle
    const strokeWidth = 10;     // Fixed width of the stroke

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const completedDays = Math.ceil((today.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const progress = (completedDays / totalDays) * 100;

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex justify-center items-center" >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="text-teal-300"
            >
                <circle
                    className="text-gray-600"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-teal-300"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.35s' }}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center h-full w-full">
                {/* <span className="text-xl font-semibold text-teal-100">
                    {`${progress.toFixed(1)}%`}
                </span> */}
                <span className="text-sm font-medium text-teal-100">
                    {`${completedDays}/${totalDays}`}
                </span>
                <span className="text-sm font-medium text-teal-100">
                    Days
                </span>
            </div>
        </div>
    );
};

export default CircularProgress;
