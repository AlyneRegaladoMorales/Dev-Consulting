import { Cell, Pie, PieChart, Tooltip, type PieLabelRenderProps } from "recharts";
import { useGetPlanetsByIsDestroyedQuery } from "../api/planetApi";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((Number(percent) ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};


const PlanetDistroyed = ({ isAnimationActive = true }: { isAnimationActive?: boolean }) => {
    const isDistroyed = useGetPlanetsByIsDestroyedQuery(true);
    const notDistroyed = useGetPlanetsByIsDestroyedQuery(false);

    const getCount = (resp: any): number => {
        if (!resp) return 0;
        if (Array.isArray(resp)) return resp.length;
        return 0;
    };
    const data = [
        { name: "Destruido", value: getCount(isDistroyed.data) },
        { name: "No Destruido", value: getCount(notDistroyed.data) },
    ]


  return (
    <>
      <div className="flex justify-center text-gray-700  items-center">
        <h2 className=" text-lg">Gráficos de Planetas Destruidos</h2>
      </div>
    <PieChart style={{ width: '100%', height: '95%', aspectRatio: 1 }} responsive>
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}

        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </>
  )
}

export default PlanetDistroyed
