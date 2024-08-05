// src/components/Heatmap.js
import React from 'react';
import { Chart as ChartJS, Tooltip, Title, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useUser } from '../context/UserContext';

ChartJS.register(Tooltip, Title, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Heatmap = () => {
  const { userData } = useUser();

  if (!userData) {
    return null;
  }

  const data = {
    labels: userData.dates,
    datasets: [
      {
        label: 'Problems Solved',
        data: userData.problemsSolved,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={data} />;
};

export default Heatmap;
