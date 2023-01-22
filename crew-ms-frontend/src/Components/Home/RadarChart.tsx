import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: ['Hours of Sleep', 'Number of Meals', 'Hours of Exercise', 'Workplace Organization', 'Mental Health'],
  datasets: [
    {
      label: 'Average statistics of the crew',
      data: [42, 21, 14, 4, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

export const RadarChart = () => {
  return <Radar data={data} />;
}
