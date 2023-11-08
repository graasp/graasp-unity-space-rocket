import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import { List } from 'immutable';

import { ANALYTICS_VIEW_CY } from '@/config/selectors';

import { useAppDataContext } from '../context/AppDataContext';

const AnalyticsView = (): JSX.Element => {
  const { t } = useTranslation();
  const { permission } = useLocalContext();
  const { appData } = useAppDataContext();

  const getAllRating = (): List<number> =>
    appData.map((m) => Number(m?.data?.rating));

  const computeAverageRating = (): number => {
    const ratings = getAllRating();
    return (ratings?.reduce((r1, r2) => r1 + r2, 0) || 0) / (ratings.size || 1);
  };

  return (
    <div data-cy={ANALYTICS_VIEW_CY}>
      {permission === PermissionLevel.Admin && (
        <Stack direction="column" spacing={2}>
          <Box p={2}>
            <pre>{JSON.stringify(getAllRating()?.toJS(), null, 2)}</pre>
          </Box>
          <Box p={2}>
            <Typography>{t('RatingAverage')}</Typography>
            <pre>{JSON.stringify(computeAverageRating(), null, 2)}</pre>
          </Box>
        </Stack>
      )}
    </div>
  );
};
export default AnalyticsView;
