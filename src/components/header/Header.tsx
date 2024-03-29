import Logo from "./Logo";

const Header = () => {
  return (
    <nav className="absolute top-0 z-50 flex flex-row justify-center items-center w-full px-8 md:px-12 h-24 bg-primary rounded-b-2xl shadow-md">
      <Logo />
    </nav>
  );
};

export default Header;
