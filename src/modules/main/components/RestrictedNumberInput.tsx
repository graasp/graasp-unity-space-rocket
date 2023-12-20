import { useState } from 'react';

import { InputAdornment, Stack, TextField, Typography } from '@mui/material';

export interface RestrictedNumberInputProps {
  label: string;
  unit?: string;
  regex: RegExp;
  defaultValue: string;
  minValue: number;
  maxValue: number;
  onUpdateValue: (i: string) => void;
}

const RestrictedNumberInput = (
  props: RestrictedNumberInputProps,
): JSX.Element => {
  const [inputValue, setInputValue] = useState(props.defaultValue);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value } = e.target;
    if (props.regex.test(value)) {
      const nbValue = Number(value);
      if (props.minValue <= nbValue && nbValue <= props.maxValue) {
        setInputValue(value);
        props.onUpdateValue(value);
      }
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Typography>{props.label}: </Typography>
      <TextField
        id="outlined-basic"
        // InputLabelProps={{ shrink: true }}
        type="text"
        value={inputValue}
        onChange={onInputChange}
        size="small"
        sx={{ width: '40%', minWidth: '80px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{props.unit}</InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default RestrictedNumberInput;
