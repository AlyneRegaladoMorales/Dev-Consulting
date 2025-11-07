import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useGetPlanetsByIdQuery } from "../api/planetApi";

const idPlanets = [ 
    1,2,3,4,5,6,7,11,13,14,15,16,18,19,20,21,22,23,24,25
]

const CharacterChartPlanet = () => {
    const getIdPlanets = (id:number) => useGetPlanetsByIdQuery(id);
    const planetsQuery = idPlanets.map(id => ({
        idPlanets,
        idPlanet: getIdPlanets(id)
    }));
    const getCount = (resp: any): number => {
        if (!resp) return 0;
        if (Array.isArray(resp)) return resp.length;
        return 0;
    };
    const data = planetsQuery.map(({ idPlanet }) => (

        { name: `Planeta ${idPlanet.data?.name}`, Habitantes: getCount(idPlanet.data?.characters) }

    ));

  return (
    <>
    <div className="flex justify-center text-gray-700  items-center">
        <h2 className=" text-lg">Gráficos de Habitantes por Planeta</h2>
      </div>

        <AreaChart
      style={{ width: '100%', height: '95%', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Area type="monotone" dataKey="Habitantes" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
    </AreaChart>
    </>

  )
}

export default CharacterChartPlanet


