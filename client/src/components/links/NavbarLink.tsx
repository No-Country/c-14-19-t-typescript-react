import Link from "next/link";
import React from "react";

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
      className="bg-indigo-500 p-2 rounded text-sm tablet:text-base desktop:w-[180px] text-center font-bold hover:bg-indigo-600 hover:text-white transition-all ease-in duration-200 capitalize"
    >
      {content}
    </Link>
  );
};

export default NavbarLink;
