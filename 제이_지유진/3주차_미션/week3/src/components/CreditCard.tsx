import type { TCredit } from "../types/credit";

function CreditCard(credit: TCredit) {
  const URL = credit.profile_path;
  return (
    <div className="flex flex-col items-center justify-between">
      <img
        className="rounded-full h-[80px] w-[80px] object-cover border-white border-2"
        src={
          URL
            ? `https://image.tmdb.org/t/p/w500${URL}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU6qxvaanw0gI1HMNRdtIbIBQ9L9STrF2G-w&s"
        }
        alt={credit.name}
      />
      <div className="text-white font-bold text-[12px] mt-2 flex-grow text-center overflow-hidden">
        {credit.character || "no character"}
      </div>
      <div className="text-gray-100 text-[10px] mt-1 flex-grow text-center overflow-hidden">
        {credit.name}
      </div>
    </div>
  );
}

export default CreditCard;
