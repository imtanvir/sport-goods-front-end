import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import CartBadge from "./home/CartBadge";
import CartPreview from "./home/CartPreview";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <nav className="w-full shadow">
        <Card className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 shadow-none">
          <div className="text-primary cursor-pointer">
            <img src="/src/assets/logo.svg" alt="logo" />
          </div>

          <ul className="hidden md:flex items-center gap-10 text-card-foreground">
            <li className="text-primary font-medium">
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"#features"}>Manage Product</Link>
            </li>
            <li>
              <Link to={"#pricing"}>All Product</Link>
            </li>
            <li>
              <Link to={"/about-us"}>About Us</Link>
            </li>
          </ul>

          <div className="flex items-center">
            <Button
              onClick={toggleCart}
              className="hidden z-20 md:block ml-2 mr-2 bg-transparent hover:bg-transparent p-0"
            >
              <CartBadge />
            </Button>

            <div className="flex md:hidden mr-2 items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5 rotate-0 scale-100" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to={"#home"}>Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"#features"}>Manage Product</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"#pricing"}>All Product</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"#faqs"}>About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem></DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button className="w-full text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                      </svg>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
      </nav>
      <CartPreview toggleCart={toggleCart} isCartOpen={isCartOpen} />
    </>
  );
};

export default Navbar;
