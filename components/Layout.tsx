import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout(props: ILayoutProps) {
  const { children } = props;
  return (
    <>
      <Header />
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <main className="min-h-full bg-gray-100">
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto  bg-gray-100 py-6 sm:px-6 lg:px-8">
            <div className="  -mt-20 md:gap-0 rounded-lg bg-white   ">
              <div className="px-2 py-2 min-h-screen  ">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Layout;
