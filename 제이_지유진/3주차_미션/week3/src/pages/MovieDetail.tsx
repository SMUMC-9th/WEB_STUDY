import Credit from "./Credit";
import Detail from "./Detail";

export default function MovieDetail() {
  return (
    <div className="bg-black min-h-screen overflow-y-auto py-15">
      <Detail />
      <Credit />
    </div>
  );
}
