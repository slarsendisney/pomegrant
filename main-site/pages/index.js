import Link from "next/link";
import Logo from "../components/assets/Logo";
import GettingStarted from "../components/hero/GettingStarted";
import Features from "../components/hero/Features";

export default function Home() {
  return (
    <div>
      <div className="bg-pink-100 w-full py-64 flex flex-col items-center justify-center relative">
        <Logo className="absolute top-0 right-0 h-96 w-96 -mr-48 -mt-48 text-pink-200" />
        <Logo className="absolute bottom-0 left-0 h-96 w-96 -ml-48 -mb-36 text-pink-200" />
        <div className="flex items-center mb-4 font-medium">
          <p className="text-8xl text-pink-600">P</p>
          <Logo className="-mb-2.5 -mx-0.5 h-16 w-16 text-pink-600" />
          <p className="text-8xl text-pink-600">megrant</p>
        </div>
        <div className="space-y-4">
          <p className="text-pink-800 text-xl">
            A Web3 alternative to adblockers that reduces carbon emissions and
            supports a creator economy.
          </p>

          <div className="flex items-center justify-center space-x-2">
            <Link href="/pre-use">
              <a className="btn-primary">Get Started</a>
            </Link>
            <a className="btn-secondary">How it works</a>
          </div>
        </div>
      </div>
      <Features />
      <GettingStarted />
    </div>
  );
}
