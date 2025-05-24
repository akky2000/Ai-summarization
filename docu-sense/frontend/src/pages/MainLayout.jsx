import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import Sidebar from '../pages/Sidebar';

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

