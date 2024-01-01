import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

type RoomType = {
  name: string;
  count: number;
};

type RoomTypeChartProps = {
  roomTypesData: RoomType[];
};

const RoomTypeChart: React.FC<RoomTypeChartProps> = ({ roomTypesData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#A4A4A4'];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={roomTypesData}
        dataKey="count"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {roomTypesData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default RoomTypeChart;
