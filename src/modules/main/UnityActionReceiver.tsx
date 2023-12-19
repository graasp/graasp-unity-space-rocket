import { useCallback, useEffect, useMemo } from 'react';
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters';

import { useLocalContext } from '@graasp/apps-query-client';
import { AppAction } from '@graasp/sdk';

import { hooks, mutations } from '@/config/queryClient';
import { UNITY_ACTION_TYPE, UnityAction } from '@/interfaces/unityAction';

export interface UnityUserTraceProps {
  unityAddListener: (
    eventName: string,
    callback: (...parameters: ReactUnityEventParameter[]) => void,
  ) => void;
  unityRemoveListener: (
    eventName: string,
    callback: (...parameters: ReactUnityEventParameter[]) => void,
  ) => void;
  saveUnityTraceToAppAction?: boolean;
}

const UnityActionReceiver: React.FC<UnityUserTraceProps> = (
  props: UnityUserTraceProps,
) => {
  const context = useLocalContext();
  const { mutate: postAppAction } = mutations.usePostAppAction();
  const { data: appActions } = hooks.useAppActions();

  function GetLastRunId(): number {
    const prevUnityTrace = appActions?.filter(
      (a) => a.type === UNITY_ACTION_TYPE && a.member.id === context?.memberId,
    );

    if (prevUnityTrace === undefined || prevUnityTrace?.length === 0) {
      return -1;
    }
    return Math.max(
      ...prevUnityTrace.map((a: AppAction) => (a.data as UnityAction).runId),
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lastRunId = useMemo(() => GetLastRunId(), []);

  const receiveUnityTrace = useCallback(
    (gameDataJson: void | number | string | undefined) => {
      if (props.saveUnityTraceToAppAction) {
        const newTrace = JSON.parse(gameDataJson as string);

        newTrace.runId = lastRunId + 1;

        postAppAction({
          data: newTrace,
          type: UNITY_ACTION_TYPE,
        });
      }
    },
    [lastRunId, postAppAction, props.saveUnityTraceToAppAction],
  );

  useEffect(() => {
    props.unityAddListener('NewUnityUserTrace', receiveUnityTrace);
    return () => {
      props.unityRemoveListener('NewUnityUserTrace', receiveUnityTrace);
    };
  }, [
    props,
    props.unityAddListener,
    props.unityRemoveListener,
    receiveUnityTrace,
  ]);

  return null;
};

export default UnityActionReceiver;
