import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white mt-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#FF007F] mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-2">페이지를 찾을 수 없습니다</p>
        <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
        
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#FF007F] text-white text-lg rounded-md hover:bg-pink-600 transition cursor-pointer"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;