import React from 'react';
import {
  FaUmbrellaBeach,
  FaCalendarAlt,
  FaTree,
  FaPlane,
  FaFlag,
  FaStar,
  FaMosque
} from 'react-icons/fa';

const Vacation = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 rounded-3xl shadow-xl p-10">
        <div className="text-center mb-10">
          <FaUmbrellaBeach className="mx-auto text-teal-500 text-5xl mb-3" />
          <h1 className="text-4xl font-bold text-gray-900">Holiday & Vacation Schedule - 2025</h1>
          <p className="text-gray-600 mt-2">Plan ahead and enjoy your well-deserved breaks!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Existing Vacations */}
          <div className="bg-gradient-to-tr from-yellow-100 to-yellow-200 rounded-xl shadow-md p-6 hover:scale-105 transition-transform">
            <FaPlane className="text-3xl text-green-600 mb-4" />
            <h2 className="font-semibold text-lg text-gray-900">Summer Vacation</h2>
            <p className="text-gray-600">June 1 - July 10</p>
          </div>

          <div className="bg-gradient-to-tr from-green-200 to-green-300 rounded-xl shadow-md p-6 hover:scale-105 transition-transform">
            <FaTree className="text-3xl text-yellow-600 mb-4" />
            <h2 className="font-semibold text-lg text-gray-900">Eid Holidays</h2>
            <p className="text-gray-600">April 18 - April 25</p>
          </div>

          <div className="bg-gradient-to-tr from-blue-100 to-blue-200 rounded-xl shadow-md p-6 hover:scale-105 transition-transform">
            <FaCalendarAlt className="text-3xl text-blue-600 mb-4" />
            <h2 className="font-semibold text-lg text-gray-900">Winter Vacation</h2>
            <p className="text-gray-600">Dec 20 - Jan 3</p>
          </div>

          {/* New Holidays */}
          <div className="bg-gradient-to-tr from-pink-100 to-pink-200 rounded-xl shadow-md p-6 hover:scale-105 transition-transform">
            <FaFlag className="text-3xl text-red-500 mb-4" />
            <h2 className="font-semibold text-lg text-gray-900">Victory Day</h2>
            <p className="text-gray-600">December 16</p>
          </div>

          <div className="bg-gradient-to-tr from-indigo-100 to-indigo-200 rounded-xl shadow-md p-6 hover:scale-105 transition-transform">
            <FaFlag className="text-3xl text-indigo-600 mb-4" />
            <h2 className="font-semibold text-lg text-gray-900">Independence Day</h2>
            <p className="text-gray-600">March 26</p>
          </div>

          <div className="bg-gradient-to-tr from-blue-100 to-yellow-300 rounded-xl shadow-md p-6 hover:scale-105 transition-transform">
            <FaStar className="text-3xl text-yellow-500 mb-4" />
            <h2 className="font-semibold text-lg text-gray-900">Star Sunday</h2>
            <p className="text-gray-600">Every 1st Sunday of the month</p>
          </div>

          <div className="bg-gradient-to-tr from-purple-100 to-purple-200 rounded-xl shadow-md p-6 hover:scale-105 transition-transform">
            <FaMosque className="text-3xl text-purple-600 mb-4" />
            <h2 className="font-semibold text-lg text-gray-900">Eid-ul-Adha</h2>
            <p className="text-gray-600">June 16 - June 18</p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-700">
          <p>Note: The dates above may vary based on government and institutional decisions.</p>
        </div>
      </div>
    </div>
  );
};

export default Vacation;
