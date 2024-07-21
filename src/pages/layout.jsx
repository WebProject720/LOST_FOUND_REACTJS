import { Outlet } from "react-router";
import { Header, Footer } from "../components/components";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="mt-20 min-h-16 p-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
