import { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

import { ReactComponent as AnonymousImage } from '../../assets/anonymous.svg';
import { useApi } from '../../context';

import { FileUploader } from './FileUploader';
import { Loader } from './Loader';

export const Uploader: FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDepersonalizing, setIsDepersonalizing] = useState(false);
  const [isFileUploaderOpened, setIsFileUploaderOpened] = useState(false);
  const [isLoaderOpened, setIsLoaderOpened] = useState(false);
  const [downloadFilename, setDownloadFilename] = useState('');
  const [columnCandidates, setColumnCandidates] = useState<string[]>([]);
  const apiService = useApi();

  const handleClick = () => {
    setIsFileUploaderOpened(true);
  };

  const handleFileUploaderClose = useCallback(() => setIsFileUploaderOpened(false), []);
  const handleLoaderClose = useCallback(() => {
    setIsLoaderOpened(false);
    setDownloadFilename('');
  }, []);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setIsFileUploaderOpened(false);

      try {
        const response = await apiService.uploadFile(file);
        const { is_suffix_ok, is_file_corrupted, text_columns } = response;

        if (!is_suffix_ok) {
          toast.error('File is corrupted. Please, upload a new one.');
        } else if (is_file_corrupted) {
          toast.error('Incorrect file format, please upload available one.');
        } else {
          toast.success('Request has been processed, please, specify details');
          setColumnCandidates(text_columns || []);
          setIsLoaderOpened(true);
        }
      } catch (e) {
        toast.error((e as Error).message);
      }

      setIsUploading(false);
    },
    [apiService]
  );

  const handelExecute = useCallback(async () => {
    setIsDepersonalizing(true);
    await Promise.resolve();
    setDownloadFilename('some file');
    setIsDepersonalizing(false);
  }, []); // @TODO: add dependencies

  const handleDownload = useCallback(() => {}, []); // @TODO: add dependencies

  return (
    <>
      <button
        className={cn('w-36 h-36 hover:text-white', { 'animate-blinking': isUploading || isDepersonalizing })}
        onClick={handleClick}
      >
        <AnonymousImage />
      </button>
      {isUploading && <div className="text-center animate-blinking">Uploading ...</div>}
      {isDepersonalizing && <div className="text-center animate-blinking">Depersonalization ...</div>}
      {downloadFilename && (
        <div className="text-center animate-blinking">
          Download {downloadFilename}{' '}
          <button onClick={handleDownload}>
            <ArrowDownTrayIcon className="w-8 h-8" />
          </button>
        </div>
      )}
      <FileUploader open={isFileUploaderOpened} onClose={handleFileUploaderClose} onUpload={handleUpload} />
      <Loader
        open={isLoaderOpened}
        onClose={handleLoaderClose}
        onExecute={handelExecute}
        columnCandidates={columnCandidates}
      />
    </>
  );
};
