import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user, error }) => {
  return (
    <div
      className="min-h-screen flex items-start
        justify-start bg-teal-100 p-4"
    >
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-lg text-center hover:shadow-lg transition-shadow duration-300">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Welcome, {user.username}
            </h2>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        ) : (
          <div>
            <p>Please log in to view your profile.</p>
            <div className="mt-4 space-x-4">
              <Link
                to="/login"
                className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center mt-4 space-y-4">
        <div>
        <Link
          to="/report"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Report a lost
        </Link>
        <Link
            to="/found"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Found a lost item
          </Link>
      </div>
      </div>
    </div>
  );
};

export default Home;
