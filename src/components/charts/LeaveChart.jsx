// LeaveChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LeaveChart = ({ chartData }) => {
    return (
        <div className="card border-0 shadow-sm ">
            <div className="card-body mb-4">
                <div className="chart-container bg-white">
                    <h6 className='text-center text-primary text-opacity-50 mb-4'>Leave Types Chart</h6>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                            barThickness: 10,
                            
                        }}
                    />
                </div>
            </div>
        </div>  
    );
};

export default LeaveChart;
