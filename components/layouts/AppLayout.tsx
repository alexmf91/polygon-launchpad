import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type AppLayoutProps = { children: React.ReactNode };

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
