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

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Tooltip as RechartsTooltip } from 'recharts';

import { hooks } from '@/config/queryClient';
import { RATING_UNITY_TYPE } from '@/interfaces/unityAction';

import { groupBy } from './dataUtils';

interface PieData {
  rating: number;
  count: number;
  percentage?: number;
}

const SimulationRatings = (): JSX.Element => {
  const { t } = useTranslation();

  const { data: appData } = hooks.useAppData();

  function GetAllRatings(): PieData[] {
    const allRatings = appData
      ?.filter((m) => m.type === RATING_UNITY_TYPE)
      .map((e) => Number(e.data.rating));

    let dataCount = Array();
    if (allRatings) {
      const dataGrouped = groupBy(allRatings, (e) => e);

      for (const [key, value] of Object.entries(dataGrouped)) {
        const numericKey = Number(key);
        dataCount.push({ rating: numericKey, count: value.length });
      }
    }

    const totalCount = dataCount.reduce((sum, item) => sum + item.count, 0);

    let dataWithPercentage = dataCount.map((item) => ({
      ...item,
      percentage: (item.count / totalCount) * 100,
    }));

    return dataWithPercentage;
  }

  const [dataRatings, setDataRatings] = useState(GetAllRatings());

  useEffect(() => {
    setDataRatings(GetAllRatings());
  }, [appData]);

  console.log(dataRatings);

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
                outerRadius={'70%'}
                innerRadius={'50%'}
                fill="#82ca9d"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                  payload,
                }) => {
                  const rating = payload.rating;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 2.2;
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
                }}
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
