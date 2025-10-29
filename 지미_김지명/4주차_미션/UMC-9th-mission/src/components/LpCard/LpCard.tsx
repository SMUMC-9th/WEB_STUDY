interface LpCardProps {
    id: number;
    title: string;
    thumbnail: string;
  }
  
  const LpCard = ({ id, title, thumbnail }: LpCardProps) => {
    return (
      <div
        className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-48"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
          <h3 className="text-white text-sm font-semibold">{title}</h3>
        </div>
      </div>
    );
  };
  
  export default LpCard;