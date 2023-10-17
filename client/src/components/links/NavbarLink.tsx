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
      className="bg-indigo-500 p-2 rounded text-sm tablet:text-base"
    >
      {content}
    </Link>
  );
};

export default NavbarLink;
