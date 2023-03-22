import { FC } from 'react';
import { ReactComponent as AnonymousImage } from '../assets/anonymous.svg';

export const Uploader: FC = () => {
  return (
    <button className="w-36 h-36">
      <AnonymousImage />
    </button>
  );
};
