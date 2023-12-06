import { useTranslation } from 'react-i18next';

import { FilterCenterFocusOutlined } from '@mui/icons-material';
import { Icon, Stack, Tooltip } from '@mui/material';

import { PhysicsUnits } from '@/config/physicsUnits';
import { UnitySettingsKeys } from '@/interfaces/settings';

import CustomCheckbox from '../components/CustomCheckbox';
import Vector3Input from '../components/Vector3Input';

const CameraSettings = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      width="100%"
    >
      <Vector3Input
        path={[UnitySettingsKeys.Camera, UnitySettingsKeys.Position]}
        label={t('InitialPosition')}
        unit={PhysicsUnits.Meters}
      />
      <Vector3Input
        path={[UnitySettingsKeys.Camera, UnitySettingsKeys.Rotation]}
        label={t('InitialRotation')}
        unit={PhysicsUnits.Degree}
      />
      <CustomCheckbox
        path={[UnitySettingsKeys.Camera, UnitySettingsKeys.ShowCameraControl]}
        label={t('ShowCameraControl')}
        icon={<Icon />}
      />
      <Tooltip title={t('TooltipIsLockedOnTarget')}>
        <Stack width="100%">
          <CustomCheckbox
            path={[
              UnitySettingsKeys.Camera,
              UnitySettingsKeys.IsLockedOnObject,
            ]}
            label={t('IsLockedOnTarget')}
            icon={<FilterCenterFocusOutlined />}
          />
        </Stack>
      </Tooltip>
    </Stack>
  );
};
export default CameraSettings;
