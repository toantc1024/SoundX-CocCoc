import React from 'react';

import { BiHistory } from 'react-icons/bi';
import { FiBell, FiHome, FiSettings } from 'react-icons/fi';
import { DETECT_PAGE, HISTORY_PAGE } from '../constants';
const MenuBar = ({ page, setPage }) => {
  return (
    <div className="flex justify-between bg-red-400">
      {[
        { icon: <FiHome />, root: DETECT_PAGE },

        { icon: <BiHistory />, root: HISTORY_PAGE },

        { icon: <FiBell />, root: 0 },

        { icon: <FiSettings />, root: 0 },
      ].map(({ icon, root }) => {
        return (
          <button
            onClick={() => setPage(root)}
            className={`text-2xl  w-full bg-white hover:bg-gray-100 hover:text-portlandOrange py-8 px-4 flex items-center justify-center ${
              page == root ? 'text-portlandOrange' : 'text-ufoGreen'
            }`}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};

export default MenuBar;
