import React from 'react';
import { FiChevronUp, FiTrash } from 'react-icons/fi';

const HistoryItem = () => {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-slate-200 justify-between">
      <div className="w-[48px] h-[48px] rounded-sm  flex items-center justify-center">
        <img src="https://via.placeholder.com/48" alt="song" />
      </div>
      <div className="w-full">
        <p className="text-sm font-bold">Title</p>
        <p className="text-xs">Artist</p>
      </div>

      <div>
        <button>
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

const History = ({ fullSize, showHistory }) => {
  return (
    <div className="bg-slate-100 h-full rounded-t-lg p-1 flex flex-col justify-between">
      <div
        className="flex items-center gap-2 text-portlandOrange font-bold"
        onClick={() => {
          showHistory();
        }}
      >
        <FiChevronUp />
        <h2>History</h2>
      </div>

      <div className={`h-[${fullSize ? '150px' : '100px'}] overflow-auto`}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <HistoryItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default History;
