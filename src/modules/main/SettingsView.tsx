import { Box } from '@mui/material';

import UnityView from './UnityView';
import AffordancesView from './affordances/AffordancesView';
import ResetAffordancesButton from './affordances/ResetAffordancesButton';

const SettingsView = (): JSX.Element => (
  <Box flexDirection="row" display="flex" height="80vh" overflow="hidden">
    <Box width="50%" overflow="scroll">
      <AffordancesView />
      <ResetAffordancesButton />
    </Box>
    <Box width="50%" overflow="hidden" paddingTop="2%">
      <UnityView recordingComponent={false} />
    </Box>
  </Box>
);
export default SettingsView;
