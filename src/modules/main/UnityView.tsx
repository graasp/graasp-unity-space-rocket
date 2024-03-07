import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Unity, useUnityContext } from 'react-unity-webgl';

import {
  FileDownload,
  RadioButtonChecked,
  StopCircleOutlined,
} from '@mui/icons-material';
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import { UNITY_SETTINGS_NAME } from '@/interfaces/settings';

import { useSettings } from '../context/SettingsContext';
import UnityActionReceiver from './UnityActionReceiver';
import RestrictedNumberInput from './components/RestrictedNumberInput';

export interface UnityViewProps {
  recordingComponent: boolean;
  saveUnityTraceToAppAction?: boolean;
}

const UnityView = (props: UnityViewProps): JSX.Element => {
  const { t } = useTranslation();
  // ************************ Unity Context ************************ //
  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: './BuildSpaceRocket/Build/BuildSpaceRocket.loader.js',
    dataUrl: './BuildSpaceRocket/Build/BuildSpaceRocket.data',
    frameworkUrl: './BuildSpaceRocket/Build/BuildSpaceRocket.framework.js',
    codeUrl: './BuildSpaceRocket/Build/BuildSpaceRocket.wasm',
  });

  // ************************ Unity Configuration ************************ //
  const { [UNITY_SETTINGS_NAME]: settings = DEFAULT_UNITY_SETTINGS } =
    useSettings();

  useEffect(() => {
    if (isLoaded) {
      sendMessage(
        'AppManager',
        'ResetAppFromJSON',
        JSON.stringify(settings, null, 0),
      );
    }
  }, [sendMessage, settings, isLoaded]);

  // ************************ Unity Data Recording ************************ //
  const [isRecording, setIsRecording] = useState(false);
  const [unityDataString, setUnityDataRecorded] = useState('');

  const [isDownloadEnabled, setDownloadEnabled] = useState(false);

  useEffect(
    () => {
      if (isRecording) {
        setDownloadEnabled(false);
        sendMessage('DataExporter', 'StartGameObjectRecording');
      } else if (!isDownloadEnabled) {
        sendMessage('DataExporter', 'StopGameObjectRecording');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRecording],
  );

  const receiveUnityGameData = useCallback(
    (gameDataJson: void | number | string | undefined) => {
      setUnityDataRecorded(gameDataJson as string);
      setDownloadEnabled(true);
      setIsRecording(false);
    },
    [],
  );

  useEffect(() => {
    addEventListener('GameObjectDataRecordingDone', receiveUnityGameData);
    return () => {
      removeEventListener('GameObjectDataRecordingDone', receiveUnityGameData);
    };
  }, [addEventListener, removeEventListener, receiveUnityGameData]);

  // ************************ Download logic ************************ //
  function downloadFile(
    data: string,
    fileName: string,
    fileType: string,
  ): void {
    // Create blob
    const blob = new Blob([data], { type: fileType });
    // Create a html tag
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    // simulate click
    const fakeClick = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(fakeClick);
    a.remove();
  }

  const exportToJson = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    downloadFile(
      JSON.parse(unityDataString).list,
      'gameData.json',
      'text/json',
    );
  };

  // ************************ Time rate input logic ************************ //
  const restrictionRegex = /^[+]?\d*\.?\d*$/;

  const wrapperUnityMessage = (value: string): void => {
    const nbVal = Number(value);
    if (nbVal !== 0) {
      sendMessage('DataExporter', 'SetTimeRate', nbVal);
    }
  };

  // ************************ ********************* ************************ //

  // ************************ ********************* ************************ //

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      width="100%"
      alignItems="center"
      spacing={2}
    >
      {props.recordingComponent && isLoaded && (
        <Card variant="outlined" sx={{ width: 'min-content' }}>
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={2}>
              <Typography variant="h6">{t('RecordLabel')}</Typography>
              <Stack direction="row">
                <RestrictedNumberInput
                  label={t('TimeRate')}
                  unit="S"
                  regex={restrictionRegex}
                  defaultValue="0.1"
                  minValue={0}
                  maxValue={100}
                  onUpdateValue={wrapperUnityMessage}
                />
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? (
                    <StopCircleOutlined fontSize="large" />
                  ) : (
                    <RadioButtonChecked fontSize="large" />
                  )}
                </IconButton>
              </Stack>
              <IconButton
                color="secondary"
                disabled={!isDownloadEnabled}
                onClick={exportToJson}
              >
                <FileDownload />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      )}
      <Stack
        flexGrow={2}
        width={{ xs: '100%', md: 'unset' }}
        alignItems="center"
      >
        {isLoaded === false && (
          // We'll conditionally render the loading overlay if the Unity
          // Application is not loaded.
          <div
            style={{
              position: 'relative',
              width: '80%',
              aspectRatio: 4 / 3,
              minWidth: 500,
              minHeight: 375,
              backgroundColor: '#f1f2f7',
              border: 1,
              textAlign: 'center', // Center the content horizontally
              alignSelf: 'center', // Center the content vertically
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>
              ({t('Loading') + Math.round(loadingProgression * 100)}%)
            </Typography>
          </div>
        )}
        <Unity
          tabIndex={-1}
          unityProvider={unityProvider}
          style={{
            width: '100%',
            height: '100%',
            // width: '80%',
            aspectRatio: 4 / 3,
            minWidth: 500,
            minHeight: 375,
            maxWidth: 1200,
            maxHeight: 900,
          }}
        />
        <UnityActionReceiver
          unityAddListener={addEventListener}
          unityRemoveListener={removeEventListener}
          saveUnityTraceToAppAction={props.saveUnityTraceToAppAction}
        />
      </Stack>
    </Stack>
  );
};

export default UnityView;
