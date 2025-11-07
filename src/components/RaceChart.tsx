import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { useGetCharactersByRaceQuery } from "../api/postsApi";

const races = [
    "Human",
    "Saiyan",
    "Namekian",
    "Majin",
    "Frieza Race",
    "Android",
    "Jiren Race",
    "God Angel",
    "Evil",
    "Nucleico",
    "Nucleico benigno",
    "Unknown"
];


const RaceChart = () => {

    const getRaceData = (race: string) => useGetCharactersByRaceQuery(race);
    
    const raceQueries = races.map((race) => ({
        race,
        query: getRaceData(race),
    }));

    const getCount = (resp: any): number => {
        if (!resp) return 0;
        if (Array.isArray(resp)) return resp.length;
        return 0;
    };

    const data = raceQueries.map(({ race, query }) => (
        { name: race, raza: getCount(query.data) }
    ));

    return (
        <>
        <div className="flex justify-center text-gray-700  items-center">
        <h2 className=" text-lg">Gráficos de Raza</h2>
      </div>
        
        <BarChart
            style={{ width: '100%', height: '95%', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 25,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />
            <Bar dataKey="raza" fill="#82ca9d" />
        </BarChart>
        </>
    );
}
export default RaceChart;


