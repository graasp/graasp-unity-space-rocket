import { useTranslation } from 'react-i18next';

import { Icon, Stack } from '@mui/material';

import { PhysicsUnits } from '@/config/physicsUnits';
import { UnitySettingsKeys } from '@/interfaces/settings';

import CustomCheckbox from '../components/CustomCheckbox';
import NumberInput from '../components/NumberInput';

const ThrustSettings = (): JSX.Element => {
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
        path={[UnitySettingsKeys.ThrustForce, UnitySettingsKeys.IsActive]}
        label={t('IsActive')}
        icon={<Icon />}
      />
      <CustomCheckbox
        path={[UnitySettingsKeys.ThrustForce, UnitySettingsKeys.IsInteractive]}
        label={t('IsInteractive')}
        icon={<Icon />}
      />
      <NumberInput
        path={[
          UnitySettingsKeys.ThrustForce,
          UnitySettingsKeys.InitialMagnitude,
        ]}
        label={t('InitialMagnitude')}
        unit={PhysicsUnits.Force}
      />
      <CustomCheckbox
        path={[UnitySettingsKeys.ThrustForce, UnitySettingsKeys.ShowVector]}
        label={t('ShowVector')}
        icon={<Icon />}
      />
      <CustomCheckbox
        path={[UnitySettingsKeys.ThrustForce, UnitySettingsKeys.ShowLabel]}
        label={t('ShowLabel')}
        icon={<Icon />}
      />
      <CustomCheckbox
        path={[UnitySettingsKeys.ThrustForce, UnitySettingsKeys.ShowEquation]}
        label={t('ShowEquation')}
        icon={<Icon />}
      />
    </Stack>
  );
};
export default ThrustSettings;
