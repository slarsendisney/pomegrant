import Logo from "../assets/Logo";
import NEARLogo from "../assets/NEARLogo";

const Login = () => {
  return (
    <div className="login background-grad w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center space-y-2 text-center p-6">
        <div className="flex items-center">
          <p className="text-5xl text-pink-600">P</p>
          <Logo className="-mb-1 -mx-0.5 h-9 w-9 text-pink-600" />
          <p className="text-5xl text-pink-600">megrant</p>
        </div>
        <div>
          <p className="text 3xl py-4">
            👋 <span className="font-bold">Hey there stranger!</span><br/> You're moments away from supporting your
            favorite creators while avoiding those pesky ads.
          </p>
        </div>
        <button
          className="btn-primary w-full"
          onClick={() =>
            chrome.tabs.create({ url: "https://sld.localhost/login" })
          }
        >
          <div className="flex space-x-2 items-center justify-center">
            <NEARLogo className="h-4 w-4" />
            <p>Sign in with NEAR</p>
          </div>
        </button>
        <button
          className="btn-secondary w-full"
          onClick={() => chrome.tabs.create({ url: "https://sld.localhost" })}
        >
          How it works
        </button>
      </div>
    </div>
  );
};
export default Login;
