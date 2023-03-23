import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import { Uploader } from './components/Uploader';
import { ApiProvider } from './context';

export const App: FC = () => {
  return (
    <ApiProvider>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="relative text-primary w-screen h-screen bg-dark">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Uploader />
        </div>
      </div>
    </ApiProvider>
  );
};
