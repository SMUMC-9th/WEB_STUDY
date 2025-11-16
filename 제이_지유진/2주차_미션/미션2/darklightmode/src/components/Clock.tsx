import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-2xl">
      <h1>유진아 지금 몇시야? 지금은.....</h1>
      <h1>{time.toLocaleTimeString()} 🌍</h1>
    </div>
  );
}
