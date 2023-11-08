export const PLAYER_VIEW_CY = 'player-view';
export const BUILDER_VIEW_CY = 'builder-view';
export const ANALYTICS_VIEW_CY = 'analytics-view';
export const ADMIN_VIEW_CY = 'admin-view';

export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;
