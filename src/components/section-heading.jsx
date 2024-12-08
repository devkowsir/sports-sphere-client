import React from "react";

export const SectionHeading = ({ heading, subHeading, className }) => {
  return (
    <div className={className ?? ""}>
      <h2 className="mb-2 text-2xl font-display font-semibold">{heading}</h2>
      <p className="text-gray-500">{subHeading}</p>
    </div>
  );
};
