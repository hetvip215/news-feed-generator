function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-white">NewsBite</span>. All rights reserved.
          </p>
          <p className="mt-2">Built for the future of news consumption.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  
  
  