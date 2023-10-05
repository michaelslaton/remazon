import "./navbar.css";

type NavbarProps = {
  active: boolean;
  setActive: Function;
}

const Navbar: React.FC<NavbarProps> = ({ active, setActive }) => {

  return (
    <div className={`navbar__wrapper ${ active ? "active" : ""}`}>
      <button onClick={()=>setActive(!active)}>O</button>
    </div>
  );
};

export default Navbar;