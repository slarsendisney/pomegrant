import { useState } from "react";
import { m } from "framer-motion";
import Bars from "../assets/Bars";
import Logo from "../assets/Logo";
import Close from "../assets/Close";
import Exit from "../assets/Exit";
import { useAuth } from "../../context/auth/auth-context";

const variants = {
  open: { y: 0, height: "auto" },
  closed: { y: -50, height: 0 },
};

const Menu = ({ withLogo, pageSupported }) => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="w-full">
      <m.div
        initial={{ y: -50, height: 0 }}
        animate={!menuOpen ? "closed" : "open"}
        variants={variants}
        transition={{ type: "spring", duration: 0.5, bounce: 0.6 }}
      >
        <div className={`w-full pb-4 ${!menuOpen ? "hidden" : "block"}`}>
          <button
            onClick={logout}
            className="text-pink-600 hover:bg-pink-100 rounded p-2 w-full flex justify-start items-center space-x-2"
          >
            <Exit className="h-6 w-6" />
            <p>Logout</p>
          </button>
        </div>
      </m.div>

      <div className="flex w-full items-center justify-between">
        {withLogo ? (
          <Logo className="h-10 w-10 text-pink-400 hover:text-pink-600" />
        ) : (
          <div />
        )}
        {pageSupported && (
          <div className="flex items-center justify-center space-x-0.5 bg-gray-100 rounded-full px-3 py-1 text-gray-800 w-full mx-4 text-center">
            <p className="text-base">{pageSupported}</p>
          </div>
        )}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <Close className="h-7 w-7 transform hover:scale-125 text-gray-500 hover:text-gray-800" />
          ) : (
            <Bars className="h-7 w-7 transform hover:scale-125 text-gray-500 hover:text-gray-800" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Menu;
