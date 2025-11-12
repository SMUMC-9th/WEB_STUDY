import Credit from "../components/Credit";
import Detail from "../components/Detail";
import Similar from "../components/Similar";

export default function MovieDetail() {
  return (
    <div className="bg-black min-h-screen overflow-y-auto py-15">
      <Detail />
      <Credit />
      <Similar />
    </div>
  );
}
