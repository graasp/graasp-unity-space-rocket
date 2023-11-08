import { UnitySettings, UnitySettingsKeys } from '../interfaces/settings';

// default settings object
export const DEFAULT_UNITY_SETTINGS: UnitySettings = {
  [UnitySettingsKeys.ShowPlayButton]: true,
  [UnitySettingsKeys.ShowPauseButton]: true,
  [UnitySettingsKeys.ShowResetButton]: true,
  [UnitySettingsKeys.ShowTimeControl]: true,

  [UnitySettingsKeys.Camera]: {
    [UnitySettingsKeys.Position]: {
      [UnitySettingsKeys.X]: 0,
      [UnitySettingsKeys.Y]: 1,
      [UnitySettingsKeys.Z]: -10,
    },
    [UnitySettingsKeys.ShowCameraControl]: true,
    [UnitySettingsKeys.IsLockedOnTarget]: true,
  },

  [UnitySettingsKeys.ShowReferenceFrame]: false,

  [UnitySettingsKeys.PhysicsObject]: {
    [UnitySettingsKeys.IsInteractiveUp]: false,
    [UnitySettingsKeys.IsInteractiveDown]: false,
    [UnitySettingsKeys.IsInteractiveRight]: true,
    [UnitySettingsKeys.IsInteractiveLeft]: true,
    [UnitySettingsKeys.ShowTrace]: false,
    [UnitySettingsKeys.TraceIsInteractive]: true,
    [UnitySettingsKeys.InitialPosition]: {
      [UnitySettingsKeys.X]: 0,
      [UnitySettingsKeys.Y]: 0,
      [UnitySettingsKeys.Z]: 0,
    },
    [UnitySettingsKeys.InitialRotation]: {
      [UnitySettingsKeys.X]: 0,
      [UnitySettingsKeys.Y]: 0,
      [UnitySettingsKeys.Z]: 0,
    },
    [UnitySettingsKeys.ShowVelocityVector]: true,
    [UnitySettingsKeys.InitialVelocity]: {
      [UnitySettingsKeys.X]: 0,
      [UnitySettingsKeys.Y]: 0,
      [UnitySettingsKeys.Z]: 0,
    },
    [UnitySettingsKeys.VelocityVectorIsInteractive]: false,
    [UnitySettingsKeys.ShowVelocityLabel]: true,
    [UnitySettingsKeys.ShowVelocityEquation]: false,
  },

  [UnitySettingsKeys.ThrustForce]: {
    [UnitySettingsKeys.IsActive]: false,
    [UnitySettingsKeys.IsInteractive]: true,
    [UnitySettingsKeys.ShowVector]: true,
    [UnitySettingsKeys.ShowLabel]: false,
    [UnitySettingsKeys.ShowEquation]: false,
    [UnitySettingsKeys.InitialMagnitude]: 3,
  },

  [UnitySettingsKeys.ShowAsteroidButton]: true,
  [UnitySettingsKeys.AsteroidCollisionForce]: 2,
};
