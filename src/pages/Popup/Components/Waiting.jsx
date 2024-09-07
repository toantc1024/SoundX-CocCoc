import React, { useEffect } from 'react';

const Waiting = () => {
  let scripts = ['Listening', 'Matching'];

  const [currentScript, setCurrentScript] = React.useState(scripts[0]);

  useEffect(() => {
    //  wait for 2 seconds
    setTimeout(() => {
      setCurrentScript(scripts[1]);
    }, 2000);
  }, [currentScript]);

  return (
    <div className="flex justify-between flex-col items-center gap-4 p-4">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="w-full flex justify-center text-2xl text-graniteGray">
        <h2>{currentScript}...</h2>
      </div>
    </div>
  );
};

export default Waiting;
