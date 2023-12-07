import { useTranslation } from 'react-i18next';

import { PanToolOutlined } from '@mui/icons-material';
import { Stack, Tooltip } from '@mui/material';

import { PhysicsUnits } from '@/config/physicsUnits';
import { UnitySettingsKeys } from '@/interfaces/settings';

import CustomCheckbox from '../components/CustomCheckbox';
import NumberInput from '../components/NumberInput';

const AsteroidSettings = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      alignItems="center" // Alignement vertical au centre
      justifyContent="center" // Alignement horizontal au centre
      spacing={2}
      width="100%"
    >
      <Tooltip title={t('TooltipAsteroid')}>
        <Stack width="100%">
          <CustomCheckbox
            path={[UnitySettingsKeys.ShowAsteroidButton]}
            label={t('ShowAsteroidButton')}
            icon={<PanToolOutlined />}
          />
        </Stack>
      </Tooltip>
      <NumberInput
        path={[UnitySettingsKeys.AsteroidCollisionForce]}
        label={t('AsteroidCollisionForce')}
        unit={PhysicsUnits.Velocity}
        restricted
      />
    </Stack>
  );
};
export default AsteroidSettings;
