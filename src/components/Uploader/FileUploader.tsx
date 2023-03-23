import { FC, useCallback, useState } from 'react';
import { FileUploader as DragDropFile } from 'react-drag-drop-files';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

interface FileUploaderProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
}

export const FileUploader: FC<FileUploaderProps> = ({ open, onClose, onUpload }) => {
  const [file, setFile] = useState<File>();

  const handleChange = useCallback((file: File) => setFile(file), []);
  const handleCancel = useCallback(() => {
    setFile(undefined);
    onClose();
  }, [onClose]);
  const handleUpload = useCallback(() => file && onUpload(file), [onUpload, file]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DragDropFile handleChange={handleChange}>
          <div className="w-96 h-64 flex flex-col justify-center items-center border-primary border-dashed border-2 rounded group hover:cursor-pointer">
            <ArrowDownTrayIcon className="h-16 w-16 text-primary mb-4" />
            {file ? (
              <div>{file.name}</div>
            ) : (
              <div>
                <span className="text-primary group-hover:text-dark">Choose a file </span>
                or drag it here.
              </div>
            )}
          </div>
        </DragDropFile>
      </DialogContent>
      <DialogActions>
        <div className="w-full flex justify-center mt-[-1em]">
          <Button onClick={handleUpload} disabled={!file}>
            Apply
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
