import { ReactNode } from 'react';

import { Box, Checkbox, Divider, Stack, Typography } from '@mui/material';

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
  icon?: ReactNode;
  divider?: boolean; // defaut is true.
}

const CustomCheckbox = (props: CustomCheckboxProps): JSX.Element => {
  const {
    [UNITY_SETTINGS_NAME]: settings = DEFAULT_UNITY_SETTINGS,
    saveSettings,
  } = useSettings();

  const showDivider: boolean =
    props?.divider === undefined ? true : props.divider;

  const getUnitySettingsCopy = (): UnitySettings => {
    const duplicateUnitySettings = JSON.parse(JSON.stringify(settings));

    return duplicateUnitySettings;
  };

  const UpdateSettingsValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const settingsCopy = getUnitySettingsCopy();

    const settingToUpdate = props.path
      .slice(0, -1)
      .reduce(
        (acc: object, currentKey: UnitySettingsKeys) =>
          acc[currentKey as keyof object],
        settingsCopy,
      );

    settingToUpdate[props.path.slice(-1)[0] as keyof object] =
      event.target.checked;

    saveSettings(UNITY_SETTINGS_NAME, settingsCopy);
  };

  const GetSettingFromPath = (): boolean => {
    const setting = props.path.reduce(
      (acc: object, currentKey) => acc[currentKey as keyof object],
      settings,
    );

    return !!setting;
  };

  return (
    <Box width="100%">
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {props.icon}
        <Typography width="80%" sx={{ wordWrap: 'break-word' }}>
          {props.label}
        </Typography>
        <Checkbox
          checked={GetSettingFromPath()}
          onChange={UpdateSettingsValue}
          sx={{ marginRight: 0 }}
        />
      </Stack>
      {showDivider && (
        <Divider
          variant="middle"
          sx={{ paddingTop: '5px', marginLeft: '10px' }}
        />
      )}
    </Box>
  );
};

export default CustomCheckbox;
