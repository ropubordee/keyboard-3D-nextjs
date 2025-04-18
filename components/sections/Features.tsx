"use client";
import React from "react";
import FeaturesCard from "../FeaturesCard";
import { features } from "@/mockdata/featuresdata";

const Features = () => {
  return (
    <div id="features" className="max-w-5xl mx-auto pt-8">
      <h2 className="text-2xl font-semibold pl-4 md:pl-16 pb-16">
        <span className="animate-ping">/</span>
        features
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl">
        {features.map((feature, index) => (
          <FeaturesCard
            key={index}
            index={index}
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
