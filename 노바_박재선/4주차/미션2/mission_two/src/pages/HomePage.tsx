

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img 
                className="w-32 h-32 relative animate-spin -top-7"
                src="./public/Lp_img_icon.png"
            />
            <h1 className="text-6xl font-bold">환영합니다</h1>
            <p className="mt-4 text-2xl text-gray-500 animate-pulse">💽돌려돌려 LP판~</p>
            
        </div>
    )
}

export default HomePage;