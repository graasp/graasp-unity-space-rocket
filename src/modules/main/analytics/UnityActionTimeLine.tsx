import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import {
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { UnityAction, UserActionType } from '@/interfaces/unityAction';

import TimeLineTooltip from './TimeLineTooltip';
import { groupBy } from './dataUtils';

const initZoomArea = {
  left: 'auto',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
};

export interface UnityActionProps {
  data: Array<UnityAction>;
}

const UnityActionTimeLine = ({ data }: UnityActionProps): JSX.Element => {
  const { t } = useTranslation();

  const points: JSX.Element[] = [];
  const lines: JSX.Element[] = [];

  const dataGrouped = groupBy(data, (e) => e.runId);

  Object.entries(dataGrouped).forEach(([, value]) => {
    value.forEach(({ actionType, time, objectId, extra, runId }, i) => {
      if (actionType === UserActionType.Click) {
        points.push(
          <Scatter
            key={`${objectId}-${runId}-${i}`}
            data={[{ time, objectId, extra }]}
            dataKey="objectId"
            fill="#8884d8"
            shape="circle"
          />,
        );
      }
      if (actionType === UserActionType.Drag) {
        const extraList = extra as string[];
        const dataForLine = (time as number[]).map((val, index) => ({
          time: val,
          objectId,
          extra: extraList[index],
        }));
        lines.push(
          <Line
            key={`${objectId}-${runId}-${i}`}
            type="linear"
            data={dataForLine}
            dataKey="objectId"
            stroke="#82ca9d"
            strokeWidth={2}
          />,
        );
      }
    });
  });

  // ************************** ZOOM ************************** //
  const [zoomArea, setZoomArea] = useState(initZoomArea);

  const handleMouseUp = (): void => {
    let { refAreaLeft, refAreaRight } = zoomArea;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setZoomArea({
        ...zoomArea,
        refAreaLeft: '',
        refAreaRight: '',
      });
      return;
    }

    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
    setZoomArea({
      ...zoomArea,
      refAreaLeft: '',
      refAreaRight: '',
      left: refAreaLeft,
      right: refAreaRight,
    });
  };

  const zoomOut = (): void => {
    setZoomArea(initZoomArea);
  };

  // ************************** Rendering ************************** //

  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignSelf="center"
      alignItems="center"
    >
      <Button
        variant="outlined"
        sx={{ width: 'fit-content', height: 'fit-content', marginLeft: 'auto' }}
        onClick={zoomOut}
        disabled={zoomArea.left === 'auto'}
      >
        {t('ZoomOut')}
      </Button>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          margin={{
            top: 50,
            right: 80,
            bottom: 20,
            left: 120,
          }}
          onMouseDown={(e) =>
            setZoomArea({ ...zoomArea, refAreaLeft: e.activeLabel ?? '' })
          }
          onMouseMove={(e) =>
            zoomArea.refAreaLeft &&
            setZoomArea({ ...zoomArea, refAreaRight: e.activeLabel ?? '' })
          }
          onMouseUp={handleMouseUp}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip
            content={<TimeLineTooltip />}
            wrapperStyle={{
              backgroundColor: 'white',
              padding: 7,
              border: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#C4C4C4',
            }}
          />

          <XAxis
            dataKey="time"
            type="number"
            allowDataOverflow
            label={{
              value: t('TimelineXlabel'),
              position: 'insideBottomRight',
              offset: -10,
            }}
            domain={[zoomArea.left, zoomArea.right]}
          />
          <YAxis
            dataKey="objectId"
            type="category"
            allowDuplicatedCategory={false}
            label={{
              value: t('TimelineYlabel'),
              angle: 0,
              position: 'insideTopRight',
              dy: -40,
            }}
          />
          {points}
          {lines}
          {zoomArea.refAreaLeft && zoomArea.refAreaRight ? (
            <ReferenceArea
              x1={zoomArea.refAreaLeft}
              x2={zoomArea.refAreaRight}
              strokeOpacity={1}
            />
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
      <Typography variant="caption">{t('TimelineTitle')}</Typography>
    </Stack>
  );
};

export default UnityActionTimeLine;
