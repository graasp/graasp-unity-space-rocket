export const RATING_UNITY_TYPE = 'RATING_SIM';

export const UNITY_ACTION_TYPE = 'UNITY_ACTION';

export enum UserActionType {
  Click,
  Drag,
}

export enum UnityActionObjectId {
  Object0 = 'ResetButton',
  Object1 = 'PlayButton',
  Object2 = 'ZoomSlider',
  Object3 = 'LockedOnObject',
  Object4 = 'TopDownViewToggle',
  Object5 = 'TraceToggle',
  Object6 = 'RulerToggle',
  Object7 = 'FrictionStaticSlider',
  Object8 = 'FrictionKineticSlider',
  Object9 = 'PushForceToggle',
  Object10 = 'PushForceVector',
  Object11 = 'FrictionVector',
  Object12 = 'CubeVelocityVector',
}

export interface UnityAction {
  time: number | Array<number>;
  objectId: UnityActionObjectId;
  actionType: UserActionType;
  extra: string | boolean | string[];
  runId: number;
}

export const emptyUnityAction: UnityAction = {
  time: 0,
  objectId: UnityActionObjectId.Object0,
  actionType: UserActionType.Click,
  extra: '',
  runId: 0,
};

const computeLookupUnityId = (): Record<UnityActionObjectId, number> => {
  // This funtion is run once!
  const lookup: Record<UnityActionObjectId, number> = {} as any;
  Object.keys(UnityActionObjectId).forEach((key, index) => {
    lookup[UnityActionObjectId[key as keyof typeof UnityActionObjectId]] =
      index;
  });
  return lookup;
};

const unityObjectIdToNumber: Record<UnityActionObjectId, number> = (() => {
  const result = computeLookupUnityId();
  return result;
})();

export { unityObjectIdToNumber };
