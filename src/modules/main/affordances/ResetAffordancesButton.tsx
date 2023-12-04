import { useTranslation } from 'react-i18next';

import { Box, Button } from '@mui/material';

import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import { UNITY_SETTINGS_NAME } from '@/interfaces/settings';
import { useSettings } from '@/modules/context/SettingsContext';

const ResetAffordancesButton = (): JSX.Element => {
  const { t } = useTranslation();

  const { saveSettings } = useSettings();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', m: 2 }}>
      <Button
        color="error"
        variant="outlined"
        onClick={() =>
          saveSettings(UNITY_SETTINGS_NAME, DEFAULT_UNITY_SETTINGS)
        }
      >
        {t('ResetDefaultSettings')}
      </Button>
    </Box>
  );
};
export default ResetAffordancesButton;
