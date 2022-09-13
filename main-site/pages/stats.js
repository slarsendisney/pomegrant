import { useEffect, useState } from "react";
import AutoRefresh from "../components/assets/AutoRefresh";
import Logo from "../components/assets/Logo";
import Menu from "../components/main/Menu";

const statCard = (title, value, columnSpan) => {
  let colSpan = "col-span-2";
  switch (columnSpan) {
    case 1:
      colSpan = "col-span-1";
      break;
    case 3:
      colSpan = "col-span-3";
      break;

    case 6:
      colSpan = "col-span-6";
      break;
  }

  return (
    <div
      className={`${colSpan} bg-white rounded flex flex-col items-center justify-center p-4 space-y-4 w-full `}
    >
      <h1>{title}</h1>
      <p className="text-6xl font-medium">{value}</p>
    </div>
  );
};

const Stats = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    };
    getStats();
  }, []);

  if (loading) {
    return (
      <div className="full-page-wrapper text-pink-800 space-y-4">
        <AutoRefresh />
        <p className="text-2xl font-medium ">Loading stats...</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Pomegrant installs",
      value: "3",
    },
    {
      title: "Pomegrant users",
      value: "3",
    },
    {
      title: "Pomegrant creators",
      value: "1",
    },
    {
      title: "Sites Visited",
      value: "12",
      columnSpan: 3,
    },
    {
      title: "Carbon Saved",
      value: "120.5g",
      columnSpan: 3,
    },
    {
      title: "NEAR sent to Creators",
      value: "0.32 NEAR",
      columnSpan: 6,
    },
  ];

  return (
    <div className="full-page-wrapper text-pink-800 space-y-4">
      <Menu />
      <p className="text-2xl uppercase">Overall Stats</p>
      <div className="grid grid-cols-6 gap-4 w-full max-w-6xl">
        {stats.map((stat) => statCard(stat.title, stat.value, stat.columnSpan))}
      </div>
      <p className="text-2xl uppercase">Top Climate Heroes</p>
      <div className="grid grid-cols-1 gap-4 w-full max-w-6xl">
        {[
          {
            name: "sld.testnet",
            carbonSaved: "80.3g",
            donations: "0.22 NEAR",
          },

          {
            name: "sldcodes.testnet",
            carbonSaved: "40.2g",
            donations: "0.1 NEAR",
          },
        ].map((hero) => {
          return (
            <div className="bg-white rounded flex items-center justify-between p-4 w-full ">
              <h1 className="text-2xl font-medium">{hero.name}</h1>
              <p className="text-2xl ">
                {hero.carbonSaved} carbon saved | {hero.donations}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
