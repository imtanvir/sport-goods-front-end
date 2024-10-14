import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const _404 = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div
        className={`text-center transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative">
          <h1 className="text-9xl font-extrabold tracking-widest text-white">
            404
          </h1>
          <div className="absolute -bottom-4 left-0 right-0 h-1.5 w-full animate-pulse bg-orange-500"></div>
        </div>
        <h2 className="mt-8 text-3xl font-semibold tracking-wide">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Oops! The page you're looking for hasn't been found.
        </p>
        <div className="mt-10 flex justify-center">
          <Link to="/">
            <Button className="inline-flex items-center space-x-2 rounded-full bg-white px-8 py-3 text-lg font-medium text-black shadow-lg transition-all hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black">
              <Home className="mr-2 h-5 w-5" />
              <span>Go Back</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default _404;
