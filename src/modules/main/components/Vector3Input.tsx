import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Stack, TextField, Typography } from '@mui/material';

import { PhysicsUnits } from '@/config/physicsUnits';
import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import {
  UNITY_SETTINGS_NAME,
  UnitySettings,
  UnitySettingsKeys,
} from '@/interfaces/settings';

import { useSettings } from '../../context/SettingsContext';

export interface Vector3InputProps {
  path: UnitySettingsKeys[]; // list of Keys defining path to the settings to update.
  label: string;
  unit?: PhysicsUnits;
}

const Vector3Input = (props: Vector3InputProps): JSX.Element => {
  const { t } = useTranslation();

  const {
    [UNITY_SETTINGS_NAME]: settings = DEFAULT_UNITY_SETTINGS,
    saveSettings,
  } = useSettings();

  const [unit, setUnit] = useState(props.unit);

  const toggleUnit = (): void => {
    if (unit === PhysicsUnits.Degree) {
      setUnit(PhysicsUnits.Radian);
    } else if (unit === PhysicsUnits.Radian) {
      setUnit(PhysicsUnits.Degree);
    }
  };

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

    let newValue = newNumber;
    // Unity take degree!
    if (unit === PhysicsUnits.Radian) {
      // Rad to Deg
      newValue = String((Number(newNumber) * 180) / Math.PI);
    }
    settingToUpdate[k as keyof object] = newValue;

    saveSettings(UNITY_SETTINGS_NAME, settingsCopy);
  };

  const GetvectorValueFromKey = (k: UnitySettingsKeys): number => {
    const setting = props.path.reduce(
      (acc: object, currentKey) => acc[currentKey as keyof object],
      settings,
    );

    const value = setting[k as keyof object];

    // If value is rotation: Unity keeps value in degree!
    if (unit === PhysicsUnits.Radian) {
      // Deg to Rad
      return (value * Math.PI) / 180;
    }

    return value;
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
        label={t('X')} // X = X_unity
      />
      <TextField
        id="outlined-basic"
        InputLabelProps={{ shrink: true }}
        type="text"
        value={GetvectorValueFromKey(UnitySettingsKeys.Z)} // Unity is left-handed, but display right-handed frame in interface!
        onChange={(e) => onInputChange(e, UnitySettingsKeys.Z)}
        label={t('Y')} // Y = Z_unity
      />
      <TextField
        id="outlined-basic"
        InputLabelProps={{ shrink: true }}
        type="text"
        value={GetvectorValueFromKey(UnitySettingsKeys.Y)}
        onChange={(e) => onInputChange(e, UnitySettingsKeys.Y)}
        label={t('Z')} // Z = Y_unity
      />
      <Button
        onClick={toggleUnit}
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

export default Vector3Input;
