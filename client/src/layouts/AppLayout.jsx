
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-layout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
