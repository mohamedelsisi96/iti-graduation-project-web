'use client';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer"
      // onClick={toggleDropdown}
      >
        <div className="rounded-full bg-primary w-9 h-9 text-center text-white text-2xl leading-9">
          E
        </div>
        {isOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleDropdown}
          ></div>
          <div
            className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50"
          >
            {/* Add your dropdown content here */}
            <div className="p-4">
              <h3 className="font-bold mb-2">User Profile</h3>
              <ul>
                <li>Edit Profile</li>
                <li>Settings</li>
                <li>Logout</li>
                {/* Add more options as needed */}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
