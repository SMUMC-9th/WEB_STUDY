import { NavLink } from "react-router-dom"

const LINKS = [
    {to: '/', label: '홈'},
    {to: '/movies/popular', label: '인기 영화', category:'popular'},
    {to: '/movies/now_playing', label: '상영 중', category:'now_playing'},
    {to: '/movies/top_rated', label: '평점 높은 영화', category:'top_rated'},
    {to: '/movies/upcoming', label: '개봉 예정', category:'upcoming'},
]

const Navbar = () => {
    return (
        <div className="flex gap-4 p-5 ">
            {LINKS.map(({to, label}) => (
                <NavLink 
                    
                    key={to} 
                    to={to}
                    className={({isActive})=>{
                        return isActive ? "text-[#6dafff] font-bold" : "text-[#969696] hover:text-[#606060]"
                    }}
                >
                    {label}
                </NavLink>
            ))}
        </div>
    )
}

export default Navbar