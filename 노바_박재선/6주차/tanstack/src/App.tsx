import { useEffect, useState } from 'react'
import './App.css'

interface User {
  id : number;
  name : string;
  email : string;
}


function App() {
  const [data, setData] = useState();

  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      //fetch 같은 경우에는 await로 한번 풀어줘야함
      const data = await response.json();
      setData(data);
    };
    fetchData();    
  },[])

  return (
    <>
      <h1>Tanstack.Query</h1>
      {JSON.stringify(data)}
    </>
  )
}

export default App
