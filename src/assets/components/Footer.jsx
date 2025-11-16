const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400">© 2024 FanMeet. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="/about" className="text-gray-400 hover:text-white">About</a>
          <a href="/privacy" className="text-gray-400 hover:text-white">Privacy</a>
          <a href="/terms" className="text-gray-400 hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;