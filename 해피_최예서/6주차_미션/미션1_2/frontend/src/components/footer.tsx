import { Link } from "react-router-dom";

// 푸터 컴포넌트
const Footer = () => {
  return (
    <footer className="bg-[#3086d9] py-5">
      <div className="container mx-auto text-center text-black">
        {/* 저작권 표시 */}
        <p>
          &copy; {new Date().getFullYear()} SpinningSpinning Dolimpan. All
          rights reserved.
        </p>

        {/* 하단 링크 */}
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
