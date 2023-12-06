import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';

import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import { UNITY_SETTINGS_NAME } from '@/interfaces/settings';
import { useSettings } from '@/modules/context/SettingsContext';

const ResetAffordancesButton = (): JSX.Element => {
  const { t } = useTranslation();

  const { saveSettings } = useSettings();

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        m: 2,
        width: 'fit-content',
      }}
    >
      <Button
        color="error"
        variant="outlined"
        onClick={() =>
          saveSettings(UNITY_SETTINGS_NAME, DEFAULT_UNITY_SETTINGS)
        }
      >
        {t('ResetDefaultSettings')}
      </Button>
    </Stack>
  );
};
export default ResetAffordancesButton;
