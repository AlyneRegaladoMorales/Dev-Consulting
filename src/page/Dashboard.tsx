
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useGetCharactersByGenderQuery } from "../api/postsApi";
import Navbar from "../components/Navbar";

const COLORS = ["#0088FE", "#FF69B4", "#AAAAAA"];

const Dashboard = () => {
  const male = useGetCharactersByGenderQuery("Male");
  const female = useGetCharactersByGenderQuery("Female");
  const unknown = useGetCharactersByGenderQuery("Unknown");

    if (male.isLoading || female.isLoading || unknown.isLoading)
    return <p className="text-center text-gray-500">Cargando...</p>;

  if (male.error || female.error || unknown.error)
    return <p className="text-center text-red-500">Error al cargar los datos</p>;

  const getCount = (resp: unknown): number => {
    if (!resp) return 0;
    if (Array.isArray(resp)) return resp.length;
    const anyResp = resp as any;
    const arr = anyResp.results ?? anyResp.characters ?? anyResp.data;
    if (Array.isArray(arr)) return arr.length;
    return 0;
  };

  const data = [
    { name: "Male", value: getCount(male.data) },
    { name: "Female", value: getCount(female.data) },
    { name: "Unknown", value: getCount(unknown.data) },
  ];

  console.log(data);

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Distribución por género</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
    </>
    
  );
}

export default Dashboard
