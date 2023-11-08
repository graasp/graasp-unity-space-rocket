import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Settings, ViewInArOutlined } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import { BUILDER_VIEW_CY } from '@/config/selectors';

import AdminView from './AdminView';
import UnityView from './UnityView';

enum Tabs {
  SIM_SETTINGS_VIEW = 'SIM_SETTINGS_VIEW',
  SIM_DEMO_VIEW = 'SIM_DEMO_VIEW',
}

const BuilderView = (): JSX.Element => {
  const { t } = useTranslation();
  const { permission } = useLocalContext();

  const [activeTab, setActiveTab] = useState(Tabs.SIM_SETTINGS_VIEW);

  return (
    <Box data-cy={BUILDER_VIEW_CY}>
      <TabContext value={activeTab}>
        <Box>
          <TabList
            onChange={(_, newTabs) => setActiveTab(newTabs)}
            centered
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              value={Tabs.SIM_SETTINGS_VIEW}
              label={t('Settings')}
              icon={<Settings />}
              iconPosition="start"
            />
            <Tab
              value={Tabs.SIM_DEMO_VIEW}
              label={t('Preview')}
              icon={<ViewInArOutlined />}
              iconPosition="start"
            />
          </TabList>
        </Box>
        <TabPanel value={Tabs.SIM_SETTINGS_VIEW}>
          {permission === PermissionLevel.Admin && <AdminView />}
        </TabPanel>
        <TabPanel value={Tabs.SIM_DEMO_VIEW}>
          <UnityView />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default BuilderView;
