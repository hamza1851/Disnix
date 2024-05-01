import React from "react";
import "./style.scss";

// Higher Order Comp for centering any comp or divs...
const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
