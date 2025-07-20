import Link from "next/link";

export function Hero() {
  return (
    <section className="flex-1 flex items-center justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container xl:max-w-7xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Unlock Actionable Insights with AI
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A-Insight transforms your data into clear, predictive
              analytics. Make smarter decisions, faster.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/signup"
            >
              Get Started
            </Link>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="#"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
