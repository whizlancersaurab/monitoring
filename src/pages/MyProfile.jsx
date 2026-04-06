import React, { useState } from 'react';

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Saurabh Agrahari",
    email: "saurabh@example.com",
    phone: "+91 9876543210",
    location: "Lucknow, India",
    bio: "Frontend Developer who loves clean UI & smooth UX.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  });

  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Cover */}
      <div className="h-40"></div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 -mt-20 relative">

          {/* Avatar */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <img
              src={user.image}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-16"
            />

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {user.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-gray-800 dark:text-white">{user.phone}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-800 dark:text-white">{user.location}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800 dark:text-white">{user.email}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {user.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">

            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Profile
            </h3>

            {/* Form */}
            <div className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 rounded-lg border dark:bg-gray-700"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 rounded-lg border dark:bg-gray-700"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 rounded-lg border dark:bg-gray-700"
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-2 rounded-lg border dark:bg-gray-700"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full p-2 rounded-lg border dark:bg-gray-700"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;