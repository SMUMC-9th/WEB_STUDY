import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Plus } from "lucide-react";

const ProtectedRoute = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  const handleClick = () => {
    navigate("/create");
  };

  return (
    <div className="relative min-h-screen">
      <Outlet />

      <button
        onClick={handleClick}
        className="
          fixed
          bottom-6
          right-6
          w-16
          h-16
          rounded-full
          bg-pink-500
          text-white
          flex
          items-center
          justify-center
          shadow-lg
          z-[1000]
          hover:bg-pink-600
          transition
        "
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default ProtectedRoute;
