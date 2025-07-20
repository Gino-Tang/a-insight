import Link from "next/link";
import { FOOTER_NAV_LINKS } from "@/constants/site";

export function Footer() {
  return (
    <footer className="px-4 lg:px-6 h-14 flex items-center">
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} A-Insight Inc. All rights reserved.
        </p>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {FOOTER_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              className="text-xs hover:underline underline-offset-4"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
