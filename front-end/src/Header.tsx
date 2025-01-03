const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <div className="logo">Logo</div>
      <nav>
        <a href="#home" className="mx-2">Home</a>
        <a href="#about" className="mx-2">About</a>
      </nav>
      <button className="btn">Button</button>
    </header>
  );
}

export default Header;
