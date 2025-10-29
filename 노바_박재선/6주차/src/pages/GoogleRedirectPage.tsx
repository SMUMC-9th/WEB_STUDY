import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const GoogleRedirectPage = () => {
    const nav = useNavigate();

    useEffect(()=>{
        const searchParams = new URLSearchParams(window.location.search);
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        console.log(accessToken);
        console.log(refreshToken);
        if(accessToken && refreshToken){
            localStorage.setItem('accessToken',accessToken);
            localStorage.setItem('refreshToken',refreshToken);
            nav('/');
        }
    },[nav])
    
    return (
        <div></div>
    )
}

export default GoogleRedirectPage