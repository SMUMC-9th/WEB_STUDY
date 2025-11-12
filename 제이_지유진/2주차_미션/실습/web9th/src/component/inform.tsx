type informProps = {
  label: string;
  value: string;
  isDarkmode?: boolean;
};

export default function Inform({ label, value, isDarkmode }: informProps) {
  return (
    <div className="flex text-center items-center mb-2 justify-between gap-[30px]">
      <span>{label}</span>
      <span
        className={`ml-2 ${
          isDarkmode ? "bg-gray text-black" : "bg-black text-white"
        } p-[10px] rounded-[50px] w-[100px]`}
      >
        {value}
      </span>
    </div>
  );
}
