import React, { useState } from 'react';

// Generate 15 dummy users
const dummyUsers = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  phone: `+91 98${index}765432`,
  location: "India",
  image: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`
}));

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
      
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Users Community
      </h2>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10">
        {dummyUsers.map(user => (
          <div
            key={user.id}
            className="backdrop-blur-lg  bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-center  mb-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full -mt-10  object-cover border-4 border-white dark:border-gray-700 shadow"
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {user.email}
              </p>
            </div>

           <div   className="mt-4 text-center">
             <button
              onClick={() => setSelectedUser(user)}
              className="mt-4 w-full max-w-50 py-2 cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium hover:opacity-90 transition"
            >
              View Profile
            </button>
           </div>



          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">

            {/* Close */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>

            {/* Profile */}
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedUser.image}
                alt=""
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200"
              />

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {selectedUser.name}
              </h2>

              <p className="text-gray-500 text-sm">{selectedUser.email}</p>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">User ID</span>
                <span className="font-medium">{selectedUser.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{selectedUser.phone}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="font-medium">{selectedUser.location}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Users;