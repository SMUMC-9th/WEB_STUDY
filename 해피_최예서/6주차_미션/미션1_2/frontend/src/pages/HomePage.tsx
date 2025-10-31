import useGetLpList from "../hooks/queries/useGetLpList.ts";
import { useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState("매튜");

  const { data, isPending, isError } = useGetLpList({ search }); // ??

  if (isPending) return <div className="mt-10">Loading...</div>;
  if (isError) return <div className="mt-10">Error occurred!</div>;

  return (
    <div className="mt-20">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {data?.map((lp) => (
        <h1>{lp.title}</h1>
      ))}
    </div>
  );
};

export default HomePage;
