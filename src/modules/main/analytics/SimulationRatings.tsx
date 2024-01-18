import { useCallback, useEffect, useState } from 'react';
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

import {
  Cell,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

import { hooks } from '@/config/queryClient';
import { RATING_UNITY_TYPE } from '@/interfaces/unityAction';

import { groupBy } from './dataUtils';

interface PieData {
  rating: number;
  count: number;
  percentage?: number;
}

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  index: number;
  payload: PieData;
}

const CustomLabel: React.FC<CustomLabelProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
}) => {
  const { rating } = payload;
  const radius = innerRadius + (outerRadius - innerRadius) * 2.2;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="#82ca9d"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${rating}`}
    </text>
  );
};

const SimulationRatings = (): JSX.Element => {
  const { t } = useTranslation();

  const { data: appData } = hooks.useAppData();

  const GetAllRatings = useCallback(() => {
    const allRatings = appData
      ?.filter((m) => m.type === RATING_UNITY_TYPE)
      .map((e) => Number(e.data.rating));

    let dataCount: PieData[] = [];

    if (allRatings && allRatings.length > 0) {
      const dataGrouped = groupBy(allRatings, (e) => e);

      dataCount = Object.keys(dataGrouped).map((key) => {
        const numericKey = Number(key);
        const value = dataGrouped[Number(key)];
        return { rating: numericKey, count: value.length };
      });
    }

    const totalCount = dataCount.reduce((sum, item) => sum + item.count, 0);

    const dataWithPercentage = dataCount.map((item) => ({
      ...item,
      percentage: totalCount !== 0 ? (item.count / totalCount) * 100 : 0,
    }));

    return dataWithPercentage;
  }, [appData]);

  const [dataRatings, setDataRatings] = useState(GetAllRatings);

  useEffect(() => {
    setDataRatings(GetAllRatings);
  }, [GetAllRatings]);

  // ************************** Rendering ************************** //

  return (
    <Card sx={{ margin: 2, width: '100%', height: 'auto' }}>
      <CardHeader
        title={<Typography variant="subtitle1">{t('Ratings')}</Typography>}
        action={
          <Tooltip sx={{ marginLeft: 3 }} title={t('RatingsTooltip')} arrow>
            <IconButton>
              <InfoOutlined aria-label="settings" />
            </IconButton>
          </Tooltip>
        }
        sx={{ alignItems: 'center' }} // Align the CardHeader content vertically
      />
      <CardContent sx={{ width: '100%', height: '300px' }}>
        {dataRatings.length === 0 ? (
          <Typography variant="subtitle1">{t('NoRating')}</Typography>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataRatings}
                dataKey="count"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                innerRadius="50%"
                fill="#82ca9d"
                label={CustomLabel}
              >
                {dataRatings.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(value, name, props) => {
                  const rating = props?.payload?.rating ?? '';
                  const percentage = props?.payload?.percentage ?? 0;
                  return [`${percentage.toFixed(2)}%`, `${rating}`];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default SimulationRatings;
