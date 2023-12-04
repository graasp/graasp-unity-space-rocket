import { Button, Stack, TextField, Typography } from '@mui/material';

import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import {
  UNITY_SETTINGS_NAME,
  UnitySettings,
  UnitySettingsKeys,
} from '@/interfaces/settings';

import { useSettings } from '../../context/SettingsContext';

export interface NumberInputProps {
  path: UnitySettingsKeys[]; // list of Keys defining path to the settings to update.
  label: string;
  unit?: string;
}

const NumberInput = (props: NumberInputProps): JSX.Element => {
  const {
    [UNITY_SETTINGS_NAME]: settings = DEFAULT_UNITY_SETTINGS,
    saveSettings,
  } = useSettings();

  const getUnitySettingsCopy = (): UnitySettings =>
    JSON.parse(JSON.stringify(settings));

  const UpdateSettingsValue = (newValue: string): void => {
    const settingsCopy = getUnitySettingsCopy();

    const settingToUpdate = props.path
      .slice(0, -1)
      .reduce(
        (acc: object, currentKey: UnitySettingsKeys) =>
          acc[currentKey as keyof object],
        settingsCopy,
      );

    settingToUpdate[props.path.slice(-1)[0] as keyof object] = newValue;

    saveSettings(UNITY_SETTINGS_NAME, settingsCopy);
  };

  const GetValue = (): string => {
    const val = props.path.reduce(
      (acc: object, currentKey) => acc[currentKey as keyof object],
      settings,
    );

    return `${val}`;
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value } = e.target;
    if (!Number.isNaN(Number(value))) {
      UpdateSettingsValue(value);
    } else if (value === '-') {
      UpdateSettingsValue(value);
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
        type="number"
        value={GetValue()}
        onChange={onInputChange}
      />
      <Button
        color="primary"
        sx={{
          borderRadius: '50%',
          minWidth: 0,
          width: '50px',
          height: '50px',
          p: '2px',
        }}
      >
        {props.unit}
      </Button>
    </Stack>
  );
};

export default NumberInput;
