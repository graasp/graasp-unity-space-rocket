import { useTranslation } from 'react-i18next';

import { Stack, TextField, Typography } from '@mui/material';

import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import {
  UNITY_SETTINGS_NAME,
  UnitySettings,
  UnitySettingsKeys,
} from '@/interfaces/settings';

import { useSettings } from '../../context/SettingsContext';

export interface CustomCheckboxProps {
  path: UnitySettingsKeys[]; // list of Keys defining path to the settings to update.
  label: string;
}

const Vector3Input = (props: CustomCheckboxProps): JSX.Element => {
  const { t } = useTranslation();

  const {
    [UNITY_SETTINGS_NAME]: settings = DEFAULT_UNITY_SETTINGS,
    saveSettings,
  } = useSettings();

  const getUnitySettingsCopy = (): UnitySettings =>
    JSON.parse(JSON.stringify(settings));

  const saveVector3 = (newNumber: string, k: UnitySettingsKeys): void => {
    // Save input number
    const settingsCopy = getUnitySettingsCopy();
    const settingToUpdate = props.path.reduce(
      (acc: object, currentKey: UnitySettingsKeys) =>
        acc[currentKey as keyof object],
      settingsCopy,
    );

    settingToUpdate[k as keyof object] = newNumber;

    saveSettings(UNITY_SETTINGS_NAME, settingsCopy);
  };

  const GetvectorValueFromKey = (k: UnitySettingsKeys): number => {
    const setting = props.path.reduce(
      (acc: object, currentKey) => acc[currentKey as keyof object],
      settings,
    );

    return setting[k as keyof object];
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    k: UnitySettingsKeys,
  ): void => {
    const { value } = e.target;
    if (!Number.isNaN(Number(value))) {
      saveVector3(value, k);
    } else if (value === '-') {
      saveVector3(value, k);
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
        InputLabelProps={{ shrink: true }}
        type="text"
        value={GetvectorValueFromKey(UnitySettingsKeys.X)}
        onChange={(e) => onInputChange(e, UnitySettingsKeys.X)}
        label={t('X')}
      />
      <TextField
        id="outlined-basic"
        InputLabelProps={{ shrink: true }}
        type="text"
        value={GetvectorValueFromKey(UnitySettingsKeys.Y)}
        onChange={(e) => onInputChange(e, UnitySettingsKeys.Y)}
        label={t('Y')}
      />
      <TextField
        id="outlined-basic"
        InputLabelProps={{ shrink: true }}
        type="text"
        value={GetvectorValueFromKey(UnitySettingsKeys.Z)}
        onChange={(e) => onInputChange(e, UnitySettingsKeys.Z)}
        label={t('Z')}
      />
    </Stack>
  );
};

export default Vector3Input;
