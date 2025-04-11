import Link from "next/link";
import React from "react";
import HandleLogout from "./HandleLogout";

const Header = () => {
  return (
    <header className="bg-primary shadow-2xl">
      <div className="mainContainer flex items-center justify-between h-[60px]">
        <div className="text-2xl font-bold">LMS</div>
        <nav>
          <ul className="flex items-center text-darkest gap-4">
            <li className="navItem smoothy">
              <Link href="/">Home</Link>
            </li>
            <li className="navItem smoothy">
              <Link href="/courses">Courses</Link>
            </li>
            <li className="navItem smoothy">
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <HandleLogout />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
