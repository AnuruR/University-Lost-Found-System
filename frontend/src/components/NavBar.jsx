import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-teal-50 text-teal-800"
      : "text-slate-600 hover:bg-teal-50/80 hover:text-teal-800"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-white/70 bg-white/65 shadow-sm shadow-teal-950/5 backdrop-blur-xl">
    <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
      <Link to="/" className="group flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-teal-700 text-sm font-bold tracking-wide text-white shadow-lg shadow-teal-900/15 transition-transform group-hover:-rotate-3">
          LF
        </span>
        <span className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-slate-900">
            Campus Find
          </span>
          <span className="text-xs font-medium text-slate-500">
            Lost &amp; found
          </span>
        </span>
      </Link>

      <div className="order-3 flex w-full items-center justify-center gap-1 sm:order-2 sm:w-auto">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/report" className={linkClass}>
          Report lost
        </NavLink>
        <NavLink to="/found" className={linkClass}>
          Report found
        </NavLink>
      </div>

      <div className="order-2 flex items-center gap-2 sm:order-3">
        {user ? (
          <>
            <span className="hidden text-sm font-medium text-slate-600 md:inline">
              Hi, {user.username}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-teal-900/15 transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Create account
            </Link>
          </>
        )}
      </div>
    </nav>
    </header>
  );
};

export default NavBar;