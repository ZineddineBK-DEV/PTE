import React from "react";

const Header = ({ title }) => (
  <div className="mx-2 mb-10">
    <p className="text-3xl font-base font-light tracking-wide text-slate-900">
      {title}
    </p>
  </div>
);

export default Header;
