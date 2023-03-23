import { ChangeEvent, FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';

interface LoaderProps {
  open: boolean;
  onClose: () => void;
  onExecute: (columnName: string, email: string | null) => Promise<void>;
  columnCandidates: string[];
}

export const Loader: FC<LoaderProps> = ({ open, onClose, onExecute, columnCandidates }) => {
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [checkedResults, setCheckedResults] = useState(false);
  const [checkedSubscription, setCheckedSubscription] = useState(false); // appropriate control is hidden as it is not used on backend

  useEffect(() => setTextValue(''), [columnCandidates]);

  const handleChangeResults = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setCheckedResults(checked);
    setCheckedSubscription(checked);
  }, []);

  const handleChangeSubscription = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setCheckedSubscription(event.target.checked),
    []
  );

  const handleChangeColumn = useCallback((e: SyntheticEvent, v: string) => setTextValue(v || ''), []);
  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value), []);

  const handleProceed = useCallback(() => onExecute(textValue, emailValue || null), [onExecute, textValue, emailValue]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Please, specify column names in your file to proceed</DialogTitle>
      <DialogContent>
        <div className="flex flex-row items-center mb-4">
          <span className="text-xl inline-block w-48 mr-2">Text column name: </span>
          <Autocomplete
            freeSolo
            value={textValue}
            onInputChange={handleChangeColumn}
            options={columnCandidates}
            renderInput={(params) => <TextField {...params} />}
            size="small"
            sx={{ width: '15rem' }}
          />
        </div>

        <div className="flex flex-row items-center">
          <FormControlLabel
            control={<Checkbox checked={checkedResults} onChange={handleChangeResults} />}
            label="Send processing results via email"
          />
        </div>

        {checkedResults && (
          <div className="flex flex-row items-center">
            <span className="text-xl inline-block w-48 mr-2">Type in your email: </span>{' '}
            <TextField value={emailValue} onChange={handleChangeEmail} size="small" sx={{ width: '15rem' }} />
          </div>
        )}

        <div className="flex flex-row items-center hidden">
          <FormControlLabel
            control={
              <Checkbox checked={checkedSubscription} onChange={handleChangeSubscription} disabled={!checkedResults} />
            }
            label="Subscribe to receive notifications"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProceed}>Proceed</Button>
      </DialogActions>
    </Dialog>
  );
};
