import {
  SparklesIcon,
  ScaleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import NEARLogo from "../assets/NEARLogo";

const features = [
  {
    name: "Say goodbye to ads",
    description:
      "Ads can make up to 70% of a website's pageweight. Every MB you download, requires more energy to process. We're here to help you reduce that carbon footprint.",
    icon: SparklesIcon,
  },
  {
    name: "Fair to creators",
    description:
      "We believe that creators should be paid for their work. When using Pomegrant you are paying for the content you are consuming.",
    icon: ScaleIcon,
  },
  {
    name: "Utilise your NEAR",
    description:
      "Our extension is built on the NEAR blockchain. A carbon neutral blockchain that is 200,000x more energy efficient than Bitcoin.",
    icon: NEARLogo,
  },
];

export default function Features() {
  return (
    <div className="py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-pink-700 text-3xl tracking-tight font-extrabold sm:text-4xl">
          Together we can reduce our digital carbon footprint, all while
          promoting a creator economy.
        </h2>
        <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-background text-pink-600">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg  font-medium text-accent-text">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 text-base">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
