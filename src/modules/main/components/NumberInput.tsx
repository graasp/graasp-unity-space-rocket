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
  restricted?: boolean;
  minValue?: number;
  maxValue?: number;
}

const NumberInput = ({
  path,
  label,
  unit,
  restricted = false,
  minValue = 0,
  maxValue = 100,
}: NumberInputProps): JSX.Element => {
  const {
    [UNITY_SETTINGS_NAME]: settings = DEFAULT_UNITY_SETTINGS,
    saveSettings,
  } = useSettings();

  const getUnitySettingsCopy = (): UnitySettings =>
    JSON.parse(JSON.stringify(settings));

  const UpdateSettingsValue = (newValue: string): void => {
    const settingsCopy = getUnitySettingsCopy();

    const settingToUpdate = path
      .slice(0, -1)
      .reduce(
        (acc: object, currentKey: UnitySettingsKeys) =>
          acc[currentKey as keyof object],
        settingsCopy,
      );

    settingToUpdate[path.slice(-1)[0] as keyof object] = newValue;

    saveSettings(UNITY_SETTINGS_NAME, settingsCopy);
  };

  const GetValue = (): string => {
    const val = path.reduce(
      (acc: object, currentKey) => acc[currentKey as keyof object],
      settings,
    );

    return `${val}`;
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value } = e.target;
    const nbVal = Number(value);
    if (!Number.isNaN(nbVal)) {
      if (!restricted) {
        UpdateSettingsValue(value);
      }
      if (minValue <= nbVal && nbVal <= maxValue) {
        UpdateSettingsValue(value);
      }
    } else if (value === '-' && !restricted) {
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
      <Typography>{label}: </Typography>
      <TextField
        id="outlined-basic"
        // InputLabelProps={{ shrink: true }}
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
        {unit}
      </Button>
    </Stack>
  );
};

export default NumberInput;
