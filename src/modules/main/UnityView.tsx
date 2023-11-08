import { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

import { Stack } from '@mui/material';

import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import { UNITY_SETTINGS_NAME } from '@/interfaces/settings';

import { useSettings } from '../context/SettingsContext';

const UnityView = (): JSX.Element => {
  const { [UNITY_SETTINGS_NAME]: settings = DEFAULT_UNITY_SETTINGS } =
    useSettings();

  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    loaderUrl: './BuildSpaceRocket/Build/BuildSpaceRocket.loader.js',
    dataUrl: './BuildSpaceRocket/Build/BuildSpaceRocket.data',
    frameworkUrl: './BuildSpaceRocket/Build/BuildSpaceRocket.framework.js',
    codeUrl: './BuildSpaceRocket/Build/BuildSpaceRocket.wasm',
  });

  useEffect(() => {
    if (isLoaded) {
      sendMessage(
        'AppManager',
        'ResetAppFromJSON',
        JSON.stringify(settings, null, 0),
      );
    }
  }, [sendMessage, settings, isLoaded]);

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Unity
        tabIndex={-1}
        unityProvider={unityProvider}
        style={{ width: 800, height: 600 }}
      />
    </Stack>
  );
};

export default UnityView;
