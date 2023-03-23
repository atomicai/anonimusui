import { FC, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface LoaderProps {
  open: boolean;
  onClose: () => void;
  onExecute: () => Promise<void>;
  columnCandidates: string[];
}

export const Loader: FC<LoaderProps> = ({ open, onClose, onExecute, columnCandidates }) => {
  const handleProceed = useCallback(() => onExecute(), [onExecute]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Please, specify column names in your file to proceed</DialogTitle>
      <DialogContent>Dialog</DialogContent>
      <DialogActions>
        <Button onClick={handleProceed}>Proceed</Button>
      </DialogActions>
    </Dialog>
  );
};
