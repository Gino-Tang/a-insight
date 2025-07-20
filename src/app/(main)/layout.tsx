import { Footer } from '@/components/main-layout/Footer';
import { Header } from '@/components/main-layout/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
}
