import { FC, useCallback, useState } from 'react';
import cn from 'classnames';

import { ReactComponent as AnonymousImage } from '../../assets/anonymous.svg';

import { FileUploader } from './FileUploader';

export const Uploader: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploaderOpened, setIsFileUploaderOpened] = useState(false);

  const handleClick = () => {
    setIsFileUploaderOpened(true);
  };

  const handleFileUploaderClose = useCallback(() => setIsFileUploaderOpened(false), []);

  const handleUpload = useCallback(() => {
    setIsLoading(true);
    setIsFileUploaderOpened(false);
    return Promise.resolve();
  }, []);

  return (
    <>
      <button className={cn('w-36 h-36 hover:text-white', { 'animate-blinking': isLoading })} onClick={handleClick}>
        <AnonymousImage />
      </button>
      {isLoading && <div className="text-center animate-blinking">Depersonalization ...</div>}
      <FileUploader open={isFileUploaderOpened} onClose={handleFileUploaderClose} onUpload={handleUpload} />
    </>
  );
};
