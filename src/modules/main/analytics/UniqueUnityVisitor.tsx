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
import { RATING_UNITY_TYPE, UNITY_ACTION_TYPE } from '@/interfaces/unityAction';

const UniqueUnityVisitor = (): JSX.Element => {
  const { t } = useTranslation();

  const { data: appActions } = hooks.useAppActions();
  const { data: appData } = hooks.useAppData();

  // ********************** All Users ********************** //
  const [allUnityUsers, setAllUnityUsers] = useState(0);

  useEffect(() => {
    const getAllUnityUsers = (): number => {
      const actionsSet = appActions
        ?.filter((a) => a.type === UNITY_ACTION_TYPE)
        ?.map((action) => action.member.id);

      const ratingSet = appData
        ?.filter((a) => a.type === RATING_UNITY_TYPE)
        ?.map((d) => d.creator?.id)
        ?.filter((id): id is string => id !== null && id !== undefined);

      if (ratingSet) return new Set(actionsSet?.concat(ratingSet)).size;

      return 0;
    };

    setAllUnityUsers(getAllUnityUsers());
  }, [appActions, appData]);

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
        title={<Typography variant="subtitle1">{t('Visitors')}</Typography>}
        action={
          <Tooltip sx={{ marginLeft: 3 }} title={t('VisitorsTooltip')} arrow>
            <IconButton>
              <InfoOutlined aria-label="settings" />
            </IconButton>
          </Tooltip>
        }
        sx={{ alignItems: 'center' }} // Align the CardHeader content vertically
      />
      <CardContent>
        <Typography>{allUnityUsers}</Typography>
      </CardContent>
    </Card>
  );
};
export default UniqueUnityVisitor;
