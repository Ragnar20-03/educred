import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="bg-black p-3 m-3 flex flex-wrap justify-center gap-6 text-lg rounded-2xl text-white ">
      <Link to="/" className="block px-2 py-1 hover:text-gray-300">
        Home
      </Link>
      <Link to="/market" className="block px-2 py-1 hover:text-gray-300">
        Market
      </Link>
    </div>
  );
};
