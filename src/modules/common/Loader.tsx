import React, { FC } from 'react';

import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: FC = () => (
  <Stack
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <CircularProgress />
  </Stack>
);

export default Loader;
