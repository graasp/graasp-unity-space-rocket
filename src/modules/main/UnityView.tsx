import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Unity, useUnityContext } from 'react-unity-webgl';

import {
  FileDownload,
  RadioButtonChecked,
  StopCircleOutlined,
} from '@mui/icons-material';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';

import { DEFAULT_UNITY_SETTINGS } from '@/config/settings';
import { UNITY_SETTINGS_NAME } from '@/interfaces/settings';

import { useSettings } from '../context/SettingsContext';
import RestrictedNumberInput from './components/RestrictedNumberInput';

export interface UnityViewProps {
  recordingComponent: boolean;
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
  return (
    <Grid container direction="row" width="100%" minHeight="100%">
      <Grid
        item
        xs={props.recordingComponent ? 2 : 0}
        display="flex"
        justifyContent={props.recordingComponent ? 'center' : 'center'}
        alignItems="center"
      >
        {props.recordingComponent && isLoaded && (
          <Box
            sx={{
              boxShadow: 1,
              p: 2,
              m: 1,
              borderRadius: 2,
              textAlign: 'center',
              width: 'fit-content',
              height: 'fit-content',
            }}
          >
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
          </Box>
        )}
      </Grid>
      <Grid
        item
        xs={props.recordingComponent ? 8 : 12}
        display="flex"
        justifyContent="center"
      >
        <Unity
          tabIndex={-1}
          unityProvider={unityProvider}
          style={{
            width: 800,
            height: 600,
            minWidth: 500,
            minHeight: 375,
          }}
        />
      </Grid>
      <Grid item xs={props.recordingComponent ? 2 : 0} />
    </Grid>
  );
};

export default UnityView;
