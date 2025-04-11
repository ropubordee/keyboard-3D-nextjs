import Link from "next/link";
import React from "react";

const Sale = () => {
  return (
    <div className="flex flex-col container items-center gap-8 pt-32 mx-auto relative mt-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        Limited colletion
      </h2>
      <p className="uppercase text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        {" "}
        discounts up to 30%
      </p>
      <Link
        href="#catalog"
        className="w-36 flex flex-col items-center py-3 rounded-xl text-xs bg-gradient-to-r from-purple-600 to-indigo-600"
      >
        Buy keyboard
      </Link>
    </div>
  );
};

export default Sale;
