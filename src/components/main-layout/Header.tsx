import { BarChart } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <BarChart className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold">A-Insight</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
