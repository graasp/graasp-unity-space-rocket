import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InfoOutlined } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import { hooks } from '@/config/queryClient';
import { UNITY_ACTION_TYPE, UnityAction } from '@/interfaces/unityAction';

import { groupBy, median } from './dataUtils';

const UserUnityRunStats = (): JSX.Element => {
  const { t } = useTranslation();

  const { data: appActions } = hooks.useAppActions();

  const [medianOfRuns, setMedianOfRuns] = useState(0);

  const getMedianOfRunsByUsers = (): number => {
    const dataUserRun = appActions
      ?.filter((a) => a.type === UNITY_ACTION_TYPE)
      ?.map((action) => {
        return {
          MemberId: action.member.id,
          runId: (action.data as UnityAction).runId,
        };
      });

    if (dataUserRun) {
      const dataUserRunGrouped = groupBy(dataUserRun, (e) => e.MemberId);

      console.log(dataUserRunGrouped);

      const nbRunByUser = [];
      for (const [key, value] of Object.entries(dataUserRunGrouped)) {
        nbRunByUser.push(new Set(value.map((e) => e.runId)).size);
      }
      return median(nbRunByUser);
    }

    return 0;
  };

  useEffect(() => {
    setMedianOfRuns(getMedianOfRunsByUsers());
  }, [appActions]);

  return (
    <Card
      sx={{
        margin: 2,
        width: '100%',
        minWidth: '150px',
        height: 'fit-content',
      }}
    >
      <CardHeader
        title={<Typography variant="subtitle1">{t('MedianTrials')}</Typography>}
        action={
          <Tooltip
            sx={{ marginLeft: 3 }}
            title={t('MedianTrialsTooltip')}
            arrow
          >
            <IconButton>
              <InfoOutlined aria-label="settings" />
            </IconButton>
          </Tooltip>
        }
        sx={{ alignItems: 'center' }} // Align the CardHeader content vertically
      />
      <CardContent>
        <Typography>{medianOfRuns}</Typography>
      </CardContent>
    </Card>
  );
};
export default UserUnityRunStats;
