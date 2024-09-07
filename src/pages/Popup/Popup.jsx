import React, { useEffect } from 'react';
import IMAGE_COCCOC from '../../assets/img/coccoc.png';
import MenuBar from './Components/MenuBar';
import Waiting from './Components/Waiting';
import History from './Components/History';
import { DETECT_PAGE, HISTORY_PAGE } from './constants.js';
import SongDetail from './Components/SongDetail.jsx';

const Popup = () => {
  const [isDetecting, setIsDetecting] = React.useState(false);

  const [response, setResponse] = React.useState(null);
  let mediaRecorder = null;
  let chunks = [];
  function startCapture() {
    chrome.tabCapture.capture(
      {
        audio: true,
        video: false,
      },
      (stream) => {
        let context = new AudioContext();
        let tstream = context.createMediaStreamSource(stream);
        tstream.connect(context.destination);
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/mp3' });

          const audioUrl = URL.createObjectURL(audioBlob);
          const formData = new FormData();
          formData.append('file', audioBlob);
          const response = await fetch('http://localhost:8000/identify/', {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          setResponse(result);
          setIsDetecting(false);

          chunks = [];
        };

        mediaRecorder.start();
      }
    );
  }

  function stopCapture() {
    mediaRecorder.stop();
  }

  const getAudio = async () => {
    startCapture();
    setTimeout(() => {
      stopCapture();
    }, 4000);
  };

  useEffect(() => {
    if (isDetecting) {
      getAudio();
    }
  }, [isDetecting]);

  useEffect(() => {
    setIsDetecting(true);
  }, []);

  const [currentPage, setCurrentPage] = React.useState(DETECT_PAGE);

  return (
    <div className="h-[480px]  bg-white flex flex-col justify-between">
      <div className="p-4">
        <img src={IMAGE_COCCOC} width={100} height={'auto'} alt="coccoc" />
      </div>

      <div className="h-full flex justify-between flex-col">
        {HISTORY_PAGE !== currentPage &&
          (isDetecting ? (
            <div className="h-full">
              <Waiting />
            </div>
          ) : response &&
            response?.metadata &&
            response?.metadata?.music &&
            response?.metadata?.music?.length > 0 ? (
            <SongDetail song={response?.metadata?.music[0]} />
          ) : (
            <div>
              <div className="flex justify-center">
                <h2>
                  Click Detect to find out what song is playing around you
                </h2>
                <button
                  className="bg-portlandOrange text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setIsDetecting(true);
                  }}
                >
                  Detect
                </button>
              </div>
            </div>
          ))}
        <div className="h-[full]">
          <History
            fullSize={HISTORY_PAGE === currentPage}
            showHistory={() => {
              if (HISTORY_PAGE !== currentPage) {
                setCurrentPage(HISTORY_PAGE);
              } else {
                setCurrentPage(DETECT_PAGE);
              }
            }}
          />
        </div>
      </div>
      <MenuBar page={currentPage} setPage={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default Popup;
