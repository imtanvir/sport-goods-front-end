import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "/src/assets/logo.svg";
const Footer = () => {
  return (
    <footer className="bg-[#111111] py-8 md:py-12 text-[#F9FAFC]">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:gap-12 lg:max-w-7xl">
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <nav className="grid gap-2">
            <Link to={"/about-us"} className="text-sm hover:underline">
              About us
            </Link>
            <Link to={"/all-products/all"} className="text-sm hover:underline">
              All Products
            </Link>
            <Link to={"/manage-products"} className="text-sm hover:underline">
              Product Management
            </Link>
          </nav>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold">Top Pick Category</h4>
          <nav className="grid gap-2">
            <Link
              to={"/all-products/cricket & football"}
              className="text-sm hover:underline"
            >
              Cricket & Football
            </Link>
            <Link to={"/all-products/Ball"} className="text-sm hover:underline">
              Ball
            </Link>
            <Link
              to={"/all-products/Apparel"}
              className="text-sm hover:underline"
            >
              Apparel
            </Link>
            <Link
              to={"/all-products/Bicycle"}
              className="text-sm hover:underline"
            >
              Bicycle
            </Link>
          </nav>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <Link
            to={"/"}
            className="bg-[#F9FAFC] md:w-1/2 w-full inline-block p-2 rounded-md"
          >
            <img src={Logo} alt="logo" />
          </Link>
          <div className="flex items-center gap-4">
            <a
              target="_blank"
              href="https://www.twitter.com"
              className="text-white "
            >
              <RiTwitterXLine />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com"
              className="text-white "
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com"
              className="text-white "
            >
              <FaFacebook />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com"
              className="text-white "
            >
              <FaLinkedin />
            </a>
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
