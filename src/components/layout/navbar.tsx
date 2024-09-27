import type { PageFragment } from "@/codegen/graphql";
import { useEffect, useState } from "react";

type NavBarProps = {
  pages: PageFragment[];
};

const NavBar = (props: NavBarProps) => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav className="flex gap-6">
      {props.pages.map((page) => {
        const isActive = currentPath === `/${page.slug}`;
        return (
          <a
            key={page.slug}
            href={`/${page.slug}`}
            className={`whitespace-nowrap ${isActive ? "text-orange-500" : "text-slate-500 hover:text-slate-900"}`}
          >
            {page.navigationLabel}
          </a>
        );
      })}
    </nav>
  );
};

export default NavBar;
