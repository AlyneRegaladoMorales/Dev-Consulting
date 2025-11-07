import { useState } from "react";
import Navbar from "../components/Navbar";
import GenreChart from "../components/GenreChart";
import RaceChart from "../components/RaceChart";
import AffiliationChart from "../components/AffiliationChart";
import CharacterChartPlanet from "../components/CharacterChartPlanet";
import PlanetDistroyed from "../components/PlanetDistroyed";


const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <>
      <Navbar />

      <div className="flex justify-center mt-18 mb-2 ">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all" >Todos los gráficos</option>
          <option value="characters">Gráficos de personajes</option>
          <option value="planets">Gráficos de planetas</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-8 pb-10 ">
        {(selectedFilter === "all" || selectedFilter === "characters") && (
          <>
            <div className="col-span-1 lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-2xl border h-[40vh]">
              <GenreChart />
            </div>

            <div className="col-span-1 lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-2xl border h-[40vh]">
              <RaceChart />
            </div>

            <div className="col-span-1 lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-2xl border h-[40vh]">
              <AffiliationChart />
            </div>
          </>
        )}

        {(selectedFilter === "all" || selectedFilter === "planets") && (
          <>
            <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-2xl border h-[40vh]">
              <CharacterChartPlanet />
            </div>
            <div className="col-span-1  bg-white dark:bg-gray-800 p-4 rounded-2xl border h-[40vh]">
              <PlanetDistroyed />
            </div>

            
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
