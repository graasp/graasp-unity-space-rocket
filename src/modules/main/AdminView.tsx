import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

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

      <Stack direction="column" spacing={2}>
        {/* #################################################################################  */}
        {/* General Settings  */}
        {/* #################################################################################  */}
        <Divider
          textAlign="left"
          variant="middle"
          sx={{ fontWeight: 'medium' }}
        >
          {t('General Settings')}
        </Divider>
        <Stack
          direction="column"
          alignItems="center" // Alignement vertical au centre
          justifyContent="center" // Alignement horizontal au centre
          spacing={2}
        >
          <Box>
            <CustomCheckbox
              path={[UnitySettingsKeys.ShowPlayButton]}
              label={t('ShowPlayButton')}
            />
            <CustomCheckbox
              path={[UnitySettingsKeys.ShowPauseButton]}
              label={t('ShowPauseButton')}
            />
            <CustomCheckbox
              path={[UnitySettingsKeys.ShowResetButton]}
              label={t('ShowResetButton')}
            />
          </Box>
        </Stack>

        {/* #################################################################################  */}
        {/* CameraSettings  */}
        {/* #################################################################################  */}
        <Divider
          textAlign="left"
          variant="middle"
          sx={{ fontWeight: 'medium' }}
        >
          {t('CameraSettings')}
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
          />
          <Box>
            <CustomCheckbox
              path={[
                UnitySettingsKeys.Camera,
                UnitySettingsKeys.ShowCameraControl,
              ]}
              label={t('ShowCameraControl')}
            />
            <Tooltip title={t('TooltipIsLockedOnTarget')}>
              <div>
                <CustomCheckbox
                  path={[
                    UnitySettingsKeys.Camera,
                    UnitySettingsKeys.IsLockedOnTarget,
                  ]}
                  label={t('IsLockedOnTarget')}
                />
              </div>
            </Tooltip>
          </Box>
        </Stack>

        {/* #################################################################################  */}
        {/* PhysicsObjectSettings  */}
        {/* #################################################################################  */}

        <Divider
          textAlign="left"
          variant="middle"
          sx={{ fontWeight: 'medium' }}
        >
          {t('PhysicsObjectSettings')}
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

          <Box>
            <CustomCheckbox
              path={[
                UnitySettingsKeys.PhysicsObject,
                UnitySettingsKeys.ShowTrace,
              ]}
              label={t('ShowTrace')}
            />
            <CustomCheckbox
              path={[
                UnitySettingsKeys.PhysicsObject,
                UnitySettingsKeys.TraceIsInteractive,
              ]}
              label={t('ShowTraceButton')}
            />
          </Box>
          <Vector3Input
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.InitialPosition,
            ]}
            label={t('InitialPosition')}
          />
          <Vector3Input
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.InitialRotation,
            ]}
            label={t('InitialRotation')}
          />
          <Vector3Input
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.InitialVelocity,
            ]}
            label={t('InitialVelocity')}
          />

          <Box>
            <CustomCheckbox
              path={[
                UnitySettingsKeys.PhysicsObject,
                UnitySettingsKeys.ShowVelocityVector,
              ]}
              label={t('ShowVelocityVector')}
            />
            <Tooltip title={t('TooltipVelocity')}>
              <div>
                <CustomCheckbox
                  path={[
                    UnitySettingsKeys.PhysicsObject,
                    UnitySettingsKeys.VelocityVectorIsInteractive,
                  ]}
                  label={t('VelocityVectorIsInteractive')}
                />
              </div>
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
          </Box>
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
          <Box>
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
          </Box>
          <NumberInput
            path={[
              UnitySettingsKeys.ThrustForce,
              UnitySettingsKeys.InitialMagnitude,
            ]}
            label={t('InitialMagnitude')}
          />
          <Box>
            <CustomCheckbox
              path={[
                UnitySettingsKeys.ThrustForce,
                UnitySettingsKeys.ShowVector,
              ]}
              label={t('ShowVector')}
            />
            <CustomCheckbox
              path={[
                UnitySettingsKeys.ThrustForce,
                UnitySettingsKeys.ShowLabel,
              ]}
              label={t('ShowLabel')}
            />
            <CustomCheckbox
              path={[
                UnitySettingsKeys.ThrustForce,
                UnitySettingsKeys.ShowEquation,
              ]}
              label={t('ShowEquation')}
            />
          </Box>
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
          />
        </Stack>
      </Stack>
    </div>
  );
};
export default AdminView;
