import { BarChart, BrainCircuit, Zap } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: Zap,
    title: "Real-time Analytics",
    description:
      "Connect your data sources and get instant analysis. No more waiting for batch reports.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Predictions",
    description:
      "Leverage our AI models to forecast trends and identify opportunities before they happen.",
  },
  {
    icon: BarChart,
    title: "Intuitive Dashboards",
    description:
      "Visualize your data with our easy-to-use, customizable dashboards. Share insights with your team.",
  },
];

export function Features() {
  return (
    <section id="features" className="flex-1 w-full bg-muted flex items-center justify-center py-12 md:py-24 lg:py-32">
      <div className="container xl:max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background/80 px-3 py-1 text-sm dark:bg-muted-foreground/10">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Why Choose A-Insight?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is built to provide you with the most advanced tools
              for data analysis and business intelligence.
            </p>
          </div>
        </div>
        <div className="grid items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
