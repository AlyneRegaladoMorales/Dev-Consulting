import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { useGetCharactersByAffiliationQuery } from "../api/postsApi";

const arrAffiliation =[
    "Z Fighter",
    "Red Ribbon Army",
    "Namekian Warrior Freelancer",
    "Army of Frieza",
    "Pride Troopers",
    "Assistant of Vermoud",
    "God Assistant of Beerus",
    "Villain",
    "Other"
]


const AffiliationChart = () => {

  const getAffiliation = (affiliation : string) => useGetCharactersByAffiliationQuery(affiliation);
   
  const affiliationQueries = arrAffiliation.map((arrAffiliation) => ({
        arrAffiliation,
        afiliacion: getAffiliation(arrAffiliation),
    }));

    const getCount = (resp: any): number => {
        if (!resp) return 0;
        if (Array.isArray(resp)) return resp.length;
        return 0;
    };
    const data = affiliationQueries.map(({ arrAffiliation, afiliacion }) => (

        { name: arrAffiliation, afiliacion: getCount(afiliacion.data),}
         
    ));

  return (
    <>
      <div className="flex justify-center text-gray-700  items-center">
        <h2 className=" text-lg">Gráficos de Afiliación</h2>
      </div>
    
    <BarChart
      style={{ width: '100%', height: '95%', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip  />
      <Bar dataKey="afiliacion" barSize={20} fill="#8884d8"  />
    </BarChart>
    </>
  )
}

export default AffiliationChart
