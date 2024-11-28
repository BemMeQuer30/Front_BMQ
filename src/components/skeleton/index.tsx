import React from "react";
import "./styles.css";

const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={`skeleton ${className}`}></div>;
};

export default Skeleton;
