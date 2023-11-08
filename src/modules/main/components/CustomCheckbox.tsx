import { Checkbox, FormControlLabel } from '@mui/material';

import { ADMIN_VIEW_CY } from '@/config/selectors';
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

const CustomCheckbox = (props: CustomCheckboxProps): JSX.Element => {
  const {
    [UNITY_SETTINGS_NAME]: settings = DEFAULT_UNITY_SETTINGS,
    saveSettings,
  } = useSettings();

  const getUnitySettingsCopy = (): UnitySettings => {
    // const duplicateUnitySettings = JSON.parse(JSON.stringify(settings));
    // const duplicateUnitySettings = {
    //   ...settings,
    //   [UnitySettingsKeys.Camera]: {
    //     ...settings[UnitySettingsKeys.Camera],
    //     [UnitySettingsKeys.Position]: {
    //       ...settings[UnitySettingsKeys.Camera][UnitySettingsKeys.Position]
    //     }
    //   }
    // };

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
    <div data-cy={ADMIN_VIEW_CY}>
      <FormControlLabel
        control={
          <Checkbox
            checked={GetSettingFromPath()}
            onChange={UpdateSettingsValue}
          />
        }
        label={props.label}
      />
    </div>
  );
};

export default CustomCheckbox;
