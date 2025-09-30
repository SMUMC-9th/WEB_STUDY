import { useState } from "react";


function useError(){
    const [isError, setIsError] = useState(false);
    return {isError, setIsError}
}

export default useError;