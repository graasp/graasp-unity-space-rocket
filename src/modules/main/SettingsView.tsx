import { Stack } from '@mui/material';

import UnityView from './UnityView';
import AffordancesView from './affordances/AffordancesView';
import ResetAffordancesButton from './affordances/ResetAffordancesButton';

const SettingsView = (): JSX.Element => (
  <Stack flexDirection="row" display="flex" height="80vh" overflow="hidden">
    <Stack width="50%" overflow="scroll">
      <AffordancesView />
      <ResetAffordancesButton />
    </Stack>
    <Stack width="50%" overflow="hidden" paddingTop="2%">
      <UnityView recordingComponent={false} />
    </Stack>
  </Stack>
);
export default SettingsView;
