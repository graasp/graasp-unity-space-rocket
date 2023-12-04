import { useTranslation } from 'react-i18next';

import {
  InfoOutlined,
  Tune,
  VideoCameraBackOutlined,
} from '@mui/icons-material';
import { Avatar } from '@mui/material';

import AsteroidSettings from '@/modules/main/affordances/AsteroidSettings';
import CameraSettings from '@/modules/main/affordances/CameraSettings';
import GeneralSettings from '@/modules/main/affordances/GeneralSettings';
import RocketSettings from '@/modules/main/affordances/RocketSettings';
import ThrustSettings from '@/modules/main/affordances/ThrustSettings';
import UnityTipsView from '@/modules/main/affordances/UnityTipsView';

export interface ListAffordances {
  label: string;
  icon: React.ReactNode;
  components: React.ReactNode;
}

const imgFilterRed = `brightness(0) saturate(100%) invert(30%) sepia(69%) saturate(5898%) hue-rotate(350deg) brightness(88%) contrast(136%)`;
const imgFilterBlue = `brightness(0) saturate(100%) invert(27%) sepia(68%) saturate(1232%) hue-rotate(216deg) brightness(98%) contrast(86%)`;

export function GetAffordancesList(): ListAffordances[] {
  const { t } = useTranslation();
  return [
    {
      label: t('SimulationInf'),
      icon: <InfoOutlined />,
      components: <UnityTipsView />,
    },
    {
      label: t('General Settings'),
      icon: <Tune />,
      components: <GeneralSettings />,
    },
    {
      label: t('CameraSettings'),
      icon: <VideoCameraBackOutlined />,
      components: <CameraSettings />,
    },
    {
      label: t('PhysicsObjectSettings'),
      icon: (
        <Avatar
          variant="square"
          sx={{ width: 24, height: 30, backgroundColor: 'transparent' }}
        >
          <img
            src="/graphics/rocket.svg"
            alt="rocket img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: imgFilterRed,
            }}
          />
        </Avatar>
      ),
      components: <RocketSettings />,
    },
    {
      label: t('ForceSettings'),
      icon: (
        <Avatar
          variant="square"
          sx={{ width: 24, height: 24, backgroundColor: 'transparent' }}
        >
          <img
            src="/graphics/force_vector.svg"
            alt="vector img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: imgFilterBlue,
            }}
          />
        </Avatar>
      ),
      components: <ThrustSettings />,
    },
    {
      label: t('AsteroidSettings'),
      icon: (
        <Avatar
          variant="square"
          sx={{ width: 26, height: 24, backgroundColor: 'transparent' }}
        >
          <img
            src="/graphics/asteroid_small2.png"
            alt="asteroid img"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Avatar>
      ),
      components: <AsteroidSettings />,
    },
  ];
}
