import { useTranslation } from 'react-i18next';

import {
  FilterCenterFocusOutlined,
  PlayCircle,
  ReplayCircleFilled,
  RouteOutlined,
  Tune,
  Videocam,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Icon,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { PhysicsUnits } from '@/config/physicsUnits';
import { ADMIN_VIEW_CY } from '@/config/selectors';
import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import { UNITY_SETTINGS_NAME, UnitySettingsKeys } from '@/interfaces/settings';

import { useSettings } from '../context/SettingsContext';
import CustomCheckbox from './components/CustomCheckbox';
import NumberInput from './components/NumberInput';
import Vector3Input from './components/Vector3Input';

const AdminView = (): JSX.Element => {
  const { t } = useTranslation();

  const { saveSettings } = useSettings();

  return (
    <div data-cy={ADMIN_VIEW_CY}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
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

      <Stack direction="column" spacing={5}>
        {/* #################################################################################  */}
        {/* General Settings  */}
        {/* #################################################################################  */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography sx={{ fontWeight: 'medium' }}>
            {t('General Settings')}
          </Typography>
          <Tune />
        </Stack>
        <Stack
          direction="column"
          alignItems="center" // Alignement vertical au centre
          justifyContent="center" // Alignement horizontal au centre
          spacing={2}
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

        {/* #################################################################################  */}
        {/* CameraSettings  */}
        {/* #################################################################################  */}
        <Divider
          textAlign="left"
          variant="middle"
          sx={{ fontWeight: 'medium' }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography sx={{ fontWeight: 'medium' }}>
              {t('CameraSettings')}
            </Typography>
            <Videocam />
          </Stack>
        </Divider>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
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
            path={[
              UnitySettingsKeys.Camera,
              UnitySettingsKeys.ShowCameraControl,
            ]}
            label={t('ShowCameraControl')}
            icon={<Icon />}
          />
          <Tooltip title={t('TooltipIsLockedOnTarget')}>
            <Box width="100%">
              <CustomCheckbox
                path={[
                  UnitySettingsKeys.Camera,
                  UnitySettingsKeys.IsLockedOnObject,
                ]}
                label={t('IsLockedOnTarget')}
                icon={<FilterCenterFocusOutlined />}
              />
            </Box>
          </Tooltip>
        </Stack>

        {/* #################################################################################  */}
        {/* PhysicsObjectSettings  */}
        {/* #################################################################################  */}

        <Divider textAlign="left" variant="middle">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography sx={{ fontWeight: 'medium' }}>
              {t('PhysicsObjectSettings')}
            </Typography>
            <Icon fontSize="large">
              <img
                src="/graphics/rocket.svg"
                alt=""
                width="100%"
                height="100%"
              />
            </Icon>
          </Stack>
        </Divider>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography sx={{ pr: 2 }}>{t('PhysicObjectKeyInputs')}</Typography>
            <Tooltip title={t('TooltipUp')}>
              <div>
                <CustomCheckbox
                  path={[
                    UnitySettingsKeys.PhysicsObject,
                    UnitySettingsKeys.IsInteractiveUp,
                  ]}
                  label={t('IsInteractiveUp')}
                />
              </div>
            </Tooltip>

            <Tooltip title={t('TooltipDown')}>
              <div>
                <CustomCheckbox
                  path={[
                    UnitySettingsKeys.PhysicsObject,
                    UnitySettingsKeys.IsInteractiveDown,
                  ]}
                  label={t('IsInteractiveDown')}
                />
              </div>
            </Tooltip>

            <Tooltip title={t('TooltipLeft')}>
              <div>
                <CustomCheckbox
                  path={[
                    UnitySettingsKeys.PhysicsObject,
                    UnitySettingsKeys.IsInteractiveLeft,
                  ]}
                  label={t('IsInteractiveLeft')}
                />
              </div>
            </Tooltip>

            <Tooltip title={t('TooltipRight')}>
              <div>
                <CustomCheckbox
                  path={[
                    UnitySettingsKeys.PhysicsObject,
                    UnitySettingsKeys.IsInteractiveRight,
                  ]}
                  label={t('IsInteractiveRight')}
                />
              </div>
            </Tooltip>
          </Stack>

          <CustomCheckbox
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.ShowTrace,
            ]}
            label={t('ShowTrace')}
            icon={<Icon />}
          />
          <CustomCheckbox
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.TraceIsInteractive,
            ]}
            label={t('ShowTraceButton')}
            icon={<RouteOutlined />}
          />
          <Vector3Input
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.InitialPosition,
            ]}
            label={t('InitialPosition')}
            unit={PhysicsUnits.Meters}
          />
          <Vector3Input
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.InitialRotation,
            ]}
            label={t('InitialRotation')}
            unit={PhysicsUnits.Degree}
          />
          <Vector3Input
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.InitialVelocity,
            ]}
            label={t('InitialVelocity')}
            unit={PhysicsUnits.Velocity}
          />

          <CustomCheckbox
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.ShowVelocityVector,
            ]}
            label={t('ShowVelocityVector')}
          />
          <Tooltip title={t('TooltipVelocity')}>
            <Box width="100%">
              <CustomCheckbox
                path={[
                  UnitySettingsKeys.PhysicsObject,
                  UnitySettingsKeys.VelocityVectorIsInteractive,
                ]}
                label={t('VelocityVectorIsInteractive')}
              />
            </Box>
          </Tooltip>
          <CustomCheckbox
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.ShowVelocityLabel,
            ]}
            label={t('ShowVelocityLabel')}
          />
          <CustomCheckbox
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.ShowVelocityEquation,
            ]}
            label={t('ShowVelocityEquation')}
          />
        </Stack>

        {/* #################################################################################  */}
        {/* ForceSettings  */}
        {/* #################################################################################  */}

        <Divider
          textAlign="left"
          variant="middle"
          sx={{ fontWeight: 'medium' }}
        >
          {t('ForceSettings')}
        </Divider>
        <Stack direction="column" alignItems="center" spacing={2}>
          <CustomCheckbox
            path={[UnitySettingsKeys.ThrustForce, UnitySettingsKeys.IsActive]}
            label={t('IsActive')}
          />
          <CustomCheckbox
            path={[
              UnitySettingsKeys.ThrustForce,
              UnitySettingsKeys.IsInteractive,
            ]}
            label={t('IsInteractive')}
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
          />
          <CustomCheckbox
            path={[UnitySettingsKeys.ThrustForce, UnitySettingsKeys.ShowLabel]}
            label={t('ShowLabel')}
          />
          <CustomCheckbox
            path={[
              UnitySettingsKeys.ThrustForce,
              UnitySettingsKeys.ShowEquation,
            ]}
            label={t('ShowEquation')}
          />
        </Stack>

        {/* #################################################################################  */}
        {/* AsteroidSettings  */}
        {/* #################################################################################  */}

        <Divider
          textAlign="left"
          variant="middle"
          sx={{ fontWeight: 'medium' }}
        >
          {t('AsteroidSettings')}
        </Divider>
        <Stack direction="column" alignItems="center" spacing={2}>
          <CustomCheckbox
            path={[UnitySettingsKeys.ShowAsteroidButton]}
            label={t('ShowAsteroidButton')}
          />
          <NumberInput
            path={[UnitySettingsKeys.AsteroidCollisionForce]}
            label={t('AsteroidCollisionForce')}
            unit={PhysicsUnits.Velocity}
          />
        </Stack>
      </Stack>
    </div>
  );
};
export default AdminView;
