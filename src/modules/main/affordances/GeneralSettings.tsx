import { useTranslation } from 'react-i18next';

import { PlayCircle, ReplayCircleFilled } from '@mui/icons-material';
import { Stack } from '@mui/material';

import { UnitySettingsKeys } from '@/interfaces/settings';

import CustomCheckbox from '../components/CustomCheckbox';

const GeneralSettings = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      alignItems="center" // Alignement vertical au centre
      justifyContent="center" // Alignement horizontal au centre
      spacing={2}
      width="100%"
    >
      <CustomCheckbox
        path={[UnitySettingsKeys.ShowPlayPauseButton]}
        label={t('ShowPlayButton')}
        icon={<PlayCircle />}
      />
      <CustomCheckbox
        path={[UnitySettingsKeys.ShowResetButton]}
        label={t('ShowResetButton')}
        icon={<ReplayCircleFilled />}
      />
    </Stack>
  );
};
export default GeneralSettings;
