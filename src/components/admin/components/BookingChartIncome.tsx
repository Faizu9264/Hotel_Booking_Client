import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface BookingIncomeChartProps {
  data: number[]; 
}

const BookingIncomeChart: React.FC<BookingIncomeChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Today', 'This Week', 'This Month', 'This Year'],
    datasets: [
      {
        data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default BookingIncomeChart;
