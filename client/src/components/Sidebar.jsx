
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  function getLinkClass({ isActive }) {
    return isActive ? 'sidebar-link active' : 'sidebar-link';
  }

  return (
    <aside className="app-sidebar">
      <NavLink className="sidebar-logo" to="/dashboard">
        Skill<span>Swap</span>
      </NavLink>

      <p className="sidebar-label">WORKSPACE</p>

      <NavLink to="/dashboard" className={getLinkClass} end>
        <span>⌂</span> Dashboard
      </NavLink>

      <NavLink to="/dashboard" className={getLinkClass}>
        <span>◎</span> Explore learners
      </NavLink>

      <NavLink to="/dashboard" className={getLinkClass}>
        <span>⇄</span> Skill matches
      </NavLink>

      <p className="sidebar-label">ACCOUNT</p>

      <NavLink to="/profile" className={getLinkClass}>
        <span>◉</span> My profile
      </NavLink>

      <button
        type="button"
        className="sidebar-link sidebar-logout"
        onClick={handleLogout}
      >
        <span>↪</span> Log out
      </button>
    </aside>
  );
}

export default Sidebar;
