import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { UnityAction } from '@/interfaces/unityAction';

import { groupBy } from './dataUtils';

export interface UnityActionProps {
  data: Array<UnityAction>;
}

const UnityActionChart = ({ data }: UnityActionProps): JSX.Element => {
  const { t } = useTranslation();

  const dataGrouped = groupBy(data, (e) => e.objectId);

  const dataCount = Object.entries(dataGrouped).map(([key, value]) => ({
    objectId: key,
    count: value.length,
  }));

  // ************************** Rendering ************************** //
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignSelf="center"
      alignItems="center"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={400}
          data={dataCount}
          margin={{
            top: 50,
            right: 80,
            bottom: 20,
            left: 120,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <YAxis
            dataKey="count"
            type="number"
            label={{
              value: t('NbOfClicks'),
              position: 'insideTopRight',
              dy: -40,
            }}
          />
          <XAxis
            dataKey="objectId"
            type="category"
            allowDuplicatedCategory={false}
            label={{
              value: t('TimelineYlabel'),
              angle: 0,
              position: 'insideBottomRight',
              offset: -10,
            }}
          />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="caption">{t('ClickPerButton')}</Typography>
    </Stack>
  );
};

export default UnityActionChart;
