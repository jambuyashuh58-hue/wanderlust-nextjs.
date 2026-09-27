import AdminChrome from '@/components/admin/AdminChrome';

export const metadata = {
  title: 'Admin | Move to Istanbul',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminChrome>{children}</AdminChrome>;
}
