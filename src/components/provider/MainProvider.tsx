"use client";

import ReduxProvider from "./ReduxProvider";

const MainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default MainProvider;