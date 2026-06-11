const AdminNavbar = () => {
  return (
    <nav className="bg-black rounded-2xl text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
           Admin
        </h1>

        {/* Nav Items */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
        

          <li className="hover:text-gray-300 cursor-pointer">
            Products
          </li>

          

          <li className="hover:text-gray-300 cursor-pointer">
            Orders
          </li>

          <li className="hover:text-gray-300 cursor-pointer">
            Settings
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;