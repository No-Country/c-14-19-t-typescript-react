import Link from "next/link";
import React from "react";
import "../../app/custom.css";

const NavbarLink = ({
  route,
  content,
}: {
  route: string;
  content: string;
}): React.ReactElement => {
  return (
    <Link
      href={route}
      className="p-2 rounded text-sm tablet:text-base desktop:w-[180px] text-center font-bold  hover:text-white transition-all ease-in duration-200 capitalize desktop:p-3 bg-[#759C2C]"
    >
      {content}
    </Link>
  );
};

export default NavbarLink;
