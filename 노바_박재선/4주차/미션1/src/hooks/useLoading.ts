import { useState } from "react";


function useLoading() {
    const [isPending, setIsPending] = useState(false);
    return {isPending, setIsPending};
}

export default useLoading;