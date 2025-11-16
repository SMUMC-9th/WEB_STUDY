const Footer = () => {
  return (
    <footer className="h-[60px] flex items-center justify-center bg-gray-100 text-gray-600 text-xs">
      <div>
        <p>
          &copy;{new Date().getFullYear()} Spinning Dolimpan. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
