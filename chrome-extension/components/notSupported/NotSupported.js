import Logo from "../assets/Logo";
import NEARLogo from "../assets/NEARLogo";
import Menu from "../shared/Menu";

const NotSupported = () => {
  return (
    <div className="login background-grad w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center space-y-2 text-center p-6">
        <Menu />
        <div className="flex items-center">
          <Logo className="-mb-1 -mx-0.5 h-9 w-9 text-pink-400 hover:text-pink-600" />
        </div>
        <div>
          <h1 className="text-2xl">
            {" "}
            <span className="font-bold">Site not supported</span>
          </h1>
          <p className="text 3xl pb-4">
            <br /> It looks like this site is not ready for use with pomegrant.
          </p>
        </div>

        <button
          className="btn-secondary w-full"
          onClick={() => chrome.tabs.create({ url: "https://sld.localhost" })}
        >
          Suggest this site
        </button>
      </div>
    </div>
  );
};
export default NotSupported;
