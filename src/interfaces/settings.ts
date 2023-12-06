export const UNITY_SETTINGS_NAME = 'UNITY_SETTINGS';

// general settings keys
export enum UnitySettingsKeys {
  ShowPlayPauseButton = 'showPlayButton',
  ShowPauseButton = 'showPauseButton',
  ShowResetButton = 'showResetButton',
  ShowTimeControl = 'showTimeControl',
  Camera = 'camera',
  ShowCameraControl = 'showCameraControl',
  Position = 'position',
  Rotation = 'rotation',
  IsLockedOnObject = 'isLockedOnObject',
  ShowReferenceFrame = 'showReferenceFrame',
  PhysicsObject = 'physicalObject',
  ShowTrace = 'showTrace',
  TraceIsInteractive = 'showTraceIsInteractive',
  IsInteractive = 'isInteractive',
  IsActive = 'isActive',
  InitialPosition = 'initialPosition',
  InitialRotation = 'initialRotation',
  ShowVelocityVector = 'showVelocityVector',
  InitialVelocity = 'initialVelocity',
  VelocityVectorIsInteractive = 'velocityVectorIsInteractive',
  ShowVelocityLabel = 'showVelocityLabel',
  ShowVelocityEquation = 'showVelocityEquation',
  ShowVector = 'showVector',
  ShowLabel = 'showLabel',
  ShowEquation = 'showEquation',
  InitialMagnitude = 'initialMagnitude',
  ThrustForce = 'thrustForce',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
  ShowAsteroidButton = 'showAsteroidButton',
  AsteroidCollisionForce = 'asteroidCollisionForce',
  IsInteractiveUp = 'isInteractiveUp',
  IsInteractiveDown = 'isInteractiveDown',
  IsInteractiveLeft = 'isInteractiveLeft',
  IsInteractiveRight = 'isInteractiveRight',
}

// type of Unity settings
export type UnitySettings = {
  [UnitySettingsKeys.ShowPlayPauseButton]: boolean;
  [UnitySettingsKeys.ShowPauseButton]: boolean;
  [UnitySettingsKeys.ShowResetButton]: boolean;
  [UnitySettingsKeys.ShowTimeControl]: boolean;

  [UnitySettingsKeys.Camera]: {
    [UnitySettingsKeys.Position]: {
      [UnitySettingsKeys.X]: number;
      [UnitySettingsKeys.Y]: number;
      [UnitySettingsKeys.Z]: number;
    };
    [UnitySettingsKeys.Rotation]: {
      [UnitySettingsKeys.X]: number;
      [UnitySettingsKeys.Y]: number;
      [UnitySettingsKeys.Z]: number;
    };
    [UnitySettingsKeys.ShowCameraControl]: boolean;
    [UnitySettingsKeys.IsLockedOnObject]: boolean;
  };

  [UnitySettingsKeys.ShowReferenceFrame]: boolean;

  [UnitySettingsKeys.PhysicsObject]: {
    [UnitySettingsKeys.IsInteractiveUp]: boolean;
    [UnitySettingsKeys.IsInteractiveDown]: boolean;
    [UnitySettingsKeys.IsInteractiveRight]: boolean;
    [UnitySettingsKeys.IsInteractiveLeft]: boolean;
    [UnitySettingsKeys.ShowTrace]: boolean;
    [UnitySettingsKeys.TraceIsInteractive]: boolean;
    [UnitySettingsKeys.InitialPosition]: {
      [UnitySettingsKeys.X]: number;
      [UnitySettingsKeys.Y]: number;
      [UnitySettingsKeys.Z]: number;
    };
    [UnitySettingsKeys.InitialRotation]: {
      [UnitySettingsKeys.X]: number;
      [UnitySettingsKeys.Y]: number;
      [UnitySettingsKeys.Z]: number;
    };
    [UnitySettingsKeys.ShowVelocityVector]: boolean;
    [UnitySettingsKeys.InitialVelocity]: {
      [UnitySettingsKeys.X]: number;
      [UnitySettingsKeys.Y]: number;
      [UnitySettingsKeys.Z]: number;
    };
    [UnitySettingsKeys.VelocityVectorIsInteractive]: boolean;
    [UnitySettingsKeys.ShowVelocityLabel]: boolean;
    [UnitySettingsKeys.ShowVelocityEquation]: boolean;
  };

  [UnitySettingsKeys.ThrustForce]: {
    [UnitySettingsKeys.IsActive]: boolean;
    [UnitySettingsKeys.IsInteractive]: boolean;
    [UnitySettingsKeys.ShowVector]: boolean;
    [UnitySettingsKeys.ShowLabel]: boolean;
    [UnitySettingsKeys.ShowEquation]: boolean;
    [UnitySettingsKeys.InitialMagnitude]: number;
  };

  [UnitySettingsKeys.ShowAsteroidButton]: boolean;
  [UnitySettingsKeys.AsteroidCollisionForce]: number;

  // used to allow access using settings[settingKey] syntax
  [key: string]: unknown;
};
