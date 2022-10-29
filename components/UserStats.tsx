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

interface UserStatsProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor: string;
      pointBorderColor: string;
      pointHoverBackgroundColor: string;
      pointHoverBorderColor: string;
    }[];
  };
}

export default function UserStats({ data }: UserStatsProps) {
  return <Radar data={data} />;
}
