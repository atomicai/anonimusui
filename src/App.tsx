import { FC } from 'react';

import { Uploader } from './components/Uploader';

export const App: FC = () => {
  return (
    <div className="relative text-primary w-screen h-screen bg-dark">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Uploader />
      </div>
    </div>
  );
};
