import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

import { UUID } from '@graasp/sdk';

import { hooks } from '@/config/queryClient';
import {
  UNITY_ACTION_TYPE,
  UnityAction,
  emptyUnityAction,
} from '@/interfaces/unityAction';

import UnityActionChart from './UnityActionChart';
import UnityActionTimeLine from './UnityActionTimeLine';

type ReduceMemberInfo = {
  id: UUID;
  name: string;
};

const UnityAnalyticsView = (): JSX.Element => {
  const { t } = useTranslation();
  const { data: appActions } = hooks.useAppActions();

  const AllTrialsKey = t('AllTrials');
  const AllKey = t('AllUsers');
  const ALL_USERS_ID = 'ID_ALL_USERS';

  // ********************** All Users ********************** //
  const [allActionUsers, setAllActionUsers] = React.useState(
    new Set<ReduceMemberInfo>(),
  );

  useEffect(() => {
    const getAllUsers = (): Set<ReduceMemberInfo> => {
      const userSet = new Map(
        appActions?.map((a) => [
          a.member.id,
          { id: a.member.id, name: a.member.name },
        ]),
      ).values();

      if (userSet) {
        const ALL_USERS = {
          name: AllKey,
          id: ALL_USERS_ID,
        };

        return new Set([ALL_USERS, ...new Set(userSet)]);
      }
      return new Set();
    };
    setAllActionUsers(getAllUsers());
  }, [AllKey, appActions]);

  // ********************** User Selection ********************** //
  const [selectedUser, setSelectedUser] = React.useState(ALL_USERS_ID);

  const handleUserChange = (e: SelectChangeEvent): void => {
    setSelectedUser(e.target.value);
  };

  // ********************** All User run possible ***************** //
  const [allSelectedUserRun, setAllSelectedUserRun] = React.useState(
    new Set<string>(),
  );

  useEffect(() => {
    const getAllUserRunId = (): Set<string> => {
      let prevUnityTrace;
      if (selectedUser === ALL_USERS_ID) {
        prevUnityTrace = appActions
          ?.filter((a) => a.type === UNITY_ACTION_TYPE)
          ?.map((action) => (action.data as UnityAction).runId);
      } else {
        prevUnityTrace = appActions
          ?.filter(
            (a) => a.type === UNITY_ACTION_TYPE && a.member.id === selectedUser,
          )
          ?.map((action) => (action.data as UnityAction).runId);
      }

      let runList = [''];
      if (prevUnityTrace && prevUnityTrace.length > 1) {
        runList = prevUnityTrace?.sort((a, b) => a - b).map((e) => String(e));
        runList.unshift(AllTrialsKey);
      }

      return new Set(runList);
    };
    setAllSelectedUserRun(getAllUserRunId());
  }, [AllTrialsKey, appActions, selectedUser]);

  // ********************** Run Id Selection ********************** //
  const [selectedUserRun, setSelectedUserRun] = React.useState(AllKey);

  const handleRunChange = (e: SelectChangeEvent): void => {
    setSelectedUserRun(e.target.value);
  };

  // ********************** Data Processing ********************** //

  const getUnityActionProcessed = (): UnityAction[] => {
    let prevUnityTrace;
    if (selectedUser === ALL_USERS_ID) {
      // All user are selected.
      prevUnityTrace = appActions?.filter((a) => a.type === UNITY_ACTION_TYPE);
    } else {
      prevUnityTrace = appActions?.filter(
        (a) => a.type === UNITY_ACTION_TYPE && a.member.id === selectedUser,
      );
    }

    prevUnityTrace = prevUnityTrace?.map(
      (action) => action.data as UnityAction,
    );

    if (selectedUserRun !== AllTrialsKey) {
      prevUnityTrace = prevUnityTrace?.filter(
        (a) => a.runId === Number(selectedUserRun),
      );
    }

    if (prevUnityTrace) {
      return prevUnityTrace;
    }

    return [emptyUnityAction];
  };

  // ********************** Rendering ********************** //
  return (
    <Stack height="100%">
      <Stack direction="row">
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>{t('Name')}</InputLabel>
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            input={<OutlinedInput label={t('Name')} />}
          >
            {[...allActionUsers].map((member: ReduceMemberInfo) => (
              <MenuItem key={member.id} value={member.id}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>{t('TrialNumero')}</InputLabel>
          <Select
            value={selectedUserRun}
            onChange={handleRunChange}
            input={<OutlinedInput label={t('TrialNumero')} />}
          >
            {[...allSelectedUserRun].map((member: string) => (
              <MenuItem key={member} value={member}>
                {member}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <UnityActionTimeLine data={getUnityActionProcessed()} />
      <UnityActionChart data={getUnityActionProcessed()} />
    </Stack>
  );
};

export default UnityAnalyticsView;
