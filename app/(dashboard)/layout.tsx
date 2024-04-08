import HeaderItems from '@/components/HeaderItems';
import SideNav from '@/components/SideNav';
import Layout from './_components/Layout';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <header>
        <HeaderItems />
      </header>
      <aside className="row-span-full overflow-hidden">
        <SideNav />
      </aside>
      <main className="p-9">{children}</main>
    </Layout>
  );
}

export default layout;
