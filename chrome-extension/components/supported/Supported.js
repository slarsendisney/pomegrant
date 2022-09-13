import { useState } from "react";
import Globe from "../assets/Globe";
import Logo from "../assets/Logo";
import NEARLogo from "../assets/NEARLogo";
import Menu from "../shared/Menu";

const TitledDivider = ({ title }) => {
  return (
    <div className="relative">
      <div className="w-full h-0.5 bg-gray-300" />
      <p className="text-gray-500 bg-white text-xs pr-1 absolute top-0 left-0 -mt-2 uppercase">
        {title}
      </p>
    </div>
  );
};

const Supported = ({ pageSupported }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="login background-grad w-full h-full">
      <div className="w-full h-full flex flex-col  justify-center space-y-4  p-6">
        <Menu withLogo pageSupported={pageSupported} />
        <TitledDivider title="Support" />
        <div class="flex space-x-2 items-center">
          <label class="relative inline-block w-10 h-6 rounded-full">
            <input
              type="checkbox"
              class="peer opacity-0 w-0 h-0"
              onChange={() => setActive(!active)}
              checked={active}
            />
            <span
              class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full duration-300 before:content-[''] before:absolute before:w-4 before:h-4 before:bottom-1 before:left-1 before:rounded-full
                before:bg-white before:duration-300 peer-checked:before:translate-x-4 peer-checked:bg-pink-600"
            ></span>
          </label>
          <p>Support {active ? "enabled" : "disabled"}.</p>
        </div>
        <p className="text-xs pb-4">
          When enabled you will stream 0.1 NEAR to the publisher of this page
          per minute of viewing.
        </p>
        <TitledDivider title="Stats" />
        <div className="grid gap-4">
          <div className="bg-pink-100 text-pink-800 p-1 rounded flex space-x-2 items-center px-2">
            <Globe className="h-6 w-6" />
            <p>
              <span className="font-bold">0.1g</span> of carbon saved
            </p>
          </div>
          <div className="bg-pink-100 text-pink-800 p-1 rounded flex space-x-2 items-center px-2">
            <NEARLogo className="h-4 w-4 mx-1" />
            <p>
              <span className="font-bold">0.9</span> NEAR donated to creators
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Supported;
