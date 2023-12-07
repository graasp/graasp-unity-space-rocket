import { useTranslation } from 'react-i18next';

import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

const UnityTipsView = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      alignItems="center" // Alignement vertical au centre
      justifyContent="center" // Alignement horizontal au centre
      spacing={2}
      width="100%"
    >
      <Card sx={{ maxWidth: '100%', boxShadow: 'none' }}>
        <CardContent>
          <Typography>{t('MainInformationTips')}</Typography>
        </CardContent>
        <CardMedia
          component="img"
          image="./graphics/unity_ref_sys.png"
          alt="unity reference system"
          sx={{ maxWidth: '500px', margin: '0 auto' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {t('CoordSys')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('UnityTips0')}
            <br />
            {t('UnityTips1')}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {t('RotationSim')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('UnityTips2')}
            <i>{t('UnityTips3')}</i>
          </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {t('Constants')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('Mass')}
            <sub>{t('Rocket')}</sub> = {t('Mass')}
            <sub>{t('Asteroid')}</sub> = {t('Constant0')}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};
export default UnityTipsView;
