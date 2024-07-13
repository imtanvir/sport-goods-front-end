import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111111] py-8 md:py-12 text-[#F9FAFC]">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:gap-12 lg:max-w-7xl">
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <nav className="grid gap-2">
            <Link to={"#"} className="text-sm hover:underline">
              Home
            </Link>
            <Link to={"#"} className="text-sm hover:underline">
              About
            </Link>
            <Link to={"#"} className="text-sm hover:underline">
              Services
            </Link>
            <Link to={"#"} className="text-sm hover:underline">
              Contact
            </Link>
          </nav>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold">Category</h4>
          <nav className="grid gap-2">
            <Link to={"#"} className="text-sm hover:underline">
              Blog
            </Link>
            <Link to={"#"} className="text-sm hover:underline">
              Documentation
            </Link>
            <Link to={"#"} className="text-sm hover:underline">
              Tutorials
            </Link>
            <Link to={"#"} className="text-sm hover:underline">
              FAQs
            </Link>
          </nav>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <Link
            to={"/"}
            className="bg-[#F9FAFC] md:w-1/2 w-full inline-block p-2 rounded-md"
          >
            <img src="/src/assets/logo.svg" alt="logo" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to={"#"} className="text-white ">
              <RiTwitterXLine />
            </Link>
            <Link to={"#"} className="text-white ">
              <FaInstagram />
            </Link>
            <Link to={"#"} className="text-white ">
              <FaFacebook />
            </Link>
            <Link to={"#"} className="text-white ">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-4 text-center text-sm">
        &copy; 2024{" "}
        <span className=" font-semibold">
          Sport<span className=" text-[#FB5733]">X</span>
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
