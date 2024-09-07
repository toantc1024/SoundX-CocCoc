import React from 'react';

const SongDetail = ({ song }) => {
  return (
    <div>
      <div className="flex justify-between gap-2 items-center">
        <div className="w-[148px] h-[148px]  rounded-sm flex items-center justify-center px-4">
          <img
            src={`https://img.youtube.com/vi/${song?.external_metadata?.youtube?.vid}/1.jpg`}
            width={'148px'}
            height={'148px'}
          />
        </div>
        <div className="w-full text-sm flex flex-col gap-1 ">
          <p className="font-bold">{song.title || song.album.name}</p>
          <p>{song.artists.map((obj) => obj.name).join(', ')}</p>
          <p>{song?.genres?.length > 0 && song?.genres[0]?.name}</p>

          <div>
            <button
              className="p-2 rounded-xl bg-red-600 text-white"
              onClick={() => {
                window.open(
                  `https://www.youtube.com/watch?v=${song?.external_metadata?.youtube?.vid}`,
                  '_blank'
                );
              }}
            >
              Play on Youtube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
