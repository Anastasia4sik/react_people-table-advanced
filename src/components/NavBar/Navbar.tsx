import { NavBarItems } from './NavBarItems';

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="container">
          <div className="navbar-brand">
            <NavBarItems to="/" title="Home" />
            <NavBarItems to="/people" title="People" />
          </div>
        </div>
      </div>
    </nav>
  );
};
