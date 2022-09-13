/* This example requires Tailwind CSS v2.0+ */
const posts = [
  {
    title: "Install the extension",
    description:
      'Install the Pomegrant extension for free via chrome webstore.',
  },
  {
    title: "Connect with NEAR",
    description:
      "Connect your NEAR wallet and link it to the extension.",
  },
  {
    title: "You're all set",
    description:
      "You're ready to start supporting your favorite creators - navigate the web ad free.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GettingStarted() {
  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-16 lg:px-32">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-pink-700 text-3xl tracking-tight font-extrabold sm:text-4xl">
            Getting Started
          </h2>
          <p className="mt-3 text-xlsm:mt-4">
            Follow these steps to get started with Pomegrant. We will have you up and running in no time!
          </p>
        </div>
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {posts.map((post, index) => (
            <div key={post.title}>
              <div>
                <div className="inline-block">
                  <span className="text-pink-800 inline-flex items-center px-3 py-0.5 rounded-full text-lg font-medium bg-pink-100">
                    {index + 1}
                  </span>
                </div>
              </div>
              <a href={post.href} className="block mt-4">
                <p className="text-xl font-semibold text-pink-700">{post.title}</p>
                <p className="mt-3 text-base ">{post.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
