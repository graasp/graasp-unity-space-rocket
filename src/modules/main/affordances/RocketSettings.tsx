import { useTranslation } from 'react-i18next';

import { RouteOutlined } from '@mui/icons-material';
import { Icon, Stack, Tooltip, Typography } from '@mui/material';

import { PhysicsUnits } from '@/config/physicsUnits';
import { UnitySettingsKeys } from '@/interfaces/settings';

import CustomCheckbox from '../components/CustomCheckbox';
import Vector3Input from '../components/Vector3Input';

const RocketSettings = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      width="100%"
    >
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
              divider={false}
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
              divider={false}
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
              divider={false}
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
              divider={false}
            />
          </div>
        </Tooltip>
      </Stack>

      <CustomCheckbox
        path={[UnitySettingsKeys.PhysicsObject, UnitySettingsKeys.ShowTrace]}
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
        icon={<Icon />}
      />
      <Tooltip title={t('TooltipVelocity')}>
        <Stack width="100%">
          <CustomCheckbox
            path={[
              UnitySettingsKeys.PhysicsObject,
              UnitySettingsKeys.VelocityVectorIsInteractive,
            ]}
            label={t('VelocityVectorIsInteractive')}
            icon={<Icon />}
          />
        </Stack>
      </Tooltip>
      <CustomCheckbox
        path={[
          UnitySettingsKeys.PhysicsObject,
          UnitySettingsKeys.ShowVelocityLabel,
        ]}
        label={t('ShowVelocityLabel')}
        icon={<Icon />}
      />
      <CustomCheckbox
        path={[
          UnitySettingsKeys.PhysicsObject,
          UnitySettingsKeys.ShowVelocityEquation,
        ]}
        label={t('ShowVelocityEquation')}
        icon={<Icon />}
      />
      <CustomCheckbox
        path={[UnitySettingsKeys.ShowReferenceFrame]}
        label={t('RocketReferenceFrame')}
        icon={<Icon />}
      />
    </Stack>
  );
};
export default RocketSettings;
