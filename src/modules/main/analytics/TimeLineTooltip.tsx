import React from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

interface TimeLineTooltipProps {
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  active?: boolean;
}

const TimeLineTooltip = ({
  label,
  payload,
  active,
}: TimeLineTooltipProps): JSX.Element => {
  const { t } = useTranslation();

  const Yvalue = (): string => {
    if (active && payload && payload.length) {
      return `${t('TimelineYlabel')}: ${payload[0]?.value}`;
    }
    return '';
  };

  const Xvalue = (): string => {
    if (active && payload && payload.length) {
      return `${t('TimelineXlabel')}: ${label}`;
    }
    return '';
  };

  const ExtraStr = (): string => {
    if (active && payload && payload.length) {
      return `Extra: ${JSON.stringify(payload[0].payload.extra)
        .replace(/"([^"]+)":/g, '$1: ')
        // Remove double quotes around string values
        .replace(/"([^"]+)"/g, '$1')
        // Add a space after commas
        .replace(/,/g, ', ')
        .replace(/[{}]/g, '')}`;
    }
    return '';
  };

  if (active && payload && payload.length) {
    return (
      <Stack>
        <Stack>
          <Typography>{Yvalue()}</Typography>
          <Typography>{Xvalue()}</Typography>
          <Typography>{ExtraStr()}</Typography>
        </Stack>
      </Stack>
    );
  }

  return <Stack />;
};

export default TimeLineTooltip;
