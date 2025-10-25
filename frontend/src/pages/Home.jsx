import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-10">
        GPS Tracking System
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white py-2 px-4 rounded cursor-pointer">
            Login
          </button>
        </Link>
        <Link to="/add-device">
          <button className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white py-2 px-4 rounded cursor-pointer">
            Add Device
          </button>
        </Link>
        <Link to="/add-client">
          <button className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white py-2 px-4 rounded cursor-pointer">
            Add Client
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
