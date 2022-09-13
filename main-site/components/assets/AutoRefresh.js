import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { m } from "framer-motion";

const AutoRefresh = () => {
  return (
    <m.div
      className="h-12 w-12"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ArrowPathIcon className="h-12 w-12 text-pink-600" />
    </m.div>
  );
};

export default AutoRefresh;