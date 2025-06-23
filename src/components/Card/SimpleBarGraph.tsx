import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip } from "../ui/tooltip";

interface BarChartProps {
  data: { name: string; value: number }[];
}

export function SimpleBarChart({ data }: BarChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar 
            dataKey="value" 
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 2 ? '#4CAF50' : '#8884d8'} // Different color for verified sellers
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}