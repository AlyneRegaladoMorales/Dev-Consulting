import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { useGetCharactersByGenderQuery } from '../api/postsApi';

const COLORS = ["#0088FE", "#FF69B4"];


const GenreChart = () => {

    const male = useGetCharactersByGenderQuery("Male");
    const female = useGetCharactersByGenderQuery("Female");


    const getCount = (resp: any): number => {
        if (!resp) return 0;
        if (Array.isArray(resp)) return resp.length;
        return 0;
    };

    const data = [
        { name: "Masculino", value: getCount(male.data) },
        { name: "Femenino", value: getCount(female.data) },
    ];
    return (
        <>
        <div className="flex justify-center text-gray-700  items-center">
        <h2 className=" text-lg">Gráficos de Género</h2>
      </div>
      <PieChart width="100%" height="95%">
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
        </>

        
    )
}

export default GenreChart
