import { useTranslation } from 'react-i18next';

import { Rating, Stack, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';

import { hooks, mutations } from '@/config/queryClient';
import { PLAYER_VIEW_CY } from '@/config/selectors';
import { RATING_UNITY_TYPE } from '@/interfaces/unityAction';

import UnityView from './UnityView';

const PlayerView = (): JSX.Element => {
  const { t } = useTranslation();
  const context = useLocalContext();

  const { data: appData } = hooks.useAppData();
  const { mutate: postAppData } = mutations.usePostAppData();
  const { mutate: patchAppData } = mutations.usePatchAppData();

  const getPreviousRating = (): number | null => {
    const previousRating = appData?.find(
      (m) =>
        m.type === RATING_UNITY_TYPE && m?.creator?.id === context?.memberId,
    );
    // setting does not exist
    if (!previousRating) {
      return null;
    }
    return Number(previousRating.data.rating);
  };

  const saveRatings = (ratingValue: number | null): void => {
    if (appData) {
      const previousRating = appData.find(
        (m) =>
          m.type === RATING_UNITY_TYPE && m?.creator?.id === context?.memberId,
      );
      // setting does not exist
      if (!previousRating) {
        postAppData({ data: { rating: ratingValue }, type: RATING_UNITY_TYPE });
      } else {
        patchAppData({
          id: previousRating?.id || '',
          data: { rating: ratingValue },
        });
      }
    }
  };

  return (
    <Stack data-cy={PLAYER_VIEW_CY} spacing={1}>
      <UnityView recordingComponent saveUnityTraceToAppAction />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Typography component="legend">{t('RatingQuestion')}</Typography>
        <Rating
          name="simple-controlled"
          precision={0.5}
          value={getPreviousRating()}
          onChange={(event, newValue) => {
            saveRatings(newValue);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default PlayerView;
