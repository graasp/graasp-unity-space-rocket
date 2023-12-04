import { useTranslation } from 'react-i18next';

import { Rating, Stack, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';

import { hooks, mutations } from '@/config/queryClient';
import { PLAYER_VIEW_CY } from '@/config/selectors';

import UnityView from './UnityView';

const PlayerView = (): JSX.Element => {
  const { t } = useTranslation();
  const context = useLocalContext();

  const { data: appData } = hooks.useAppData();
  const { mutate: postAppData } = mutations.usePostAppData();
  const { mutate: patchAppData } = mutations.usePatchAppData();

  const getPreviousRating = (): number | null => {
    const previousRating = appData?.find(
      (m) => m.type === 'rating-action' && m?.creator?.id === context?.memberId,
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
          m.type === 'rating-action' && m?.creator?.id === context?.memberId,
      );
      // setting does not exist
      if (!previousRating) {
        postAppData({ data: { rating: ratingValue }, type: 'rating-action' });
      } else {
        patchAppData({
          id: previousRating?.id || '',
          data: { rating: ratingValue },
        });
      }
    }
  };

  return (
    <div data-cy={PLAYER_VIEW_CY}>
      <Stack sx={{ m: 5 }}>
        <UnityView recordingComponent />
      </Stack>
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
    </div>
  );
};

export default PlayerView;
