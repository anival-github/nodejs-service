export const ROUTES = {
  USERS: /^\/users/,
  BOARDS: /^\/boards/,
  TASKS: /^\/tasks/,
  BOARD_ID_TASKS: /^\/boards\/([0-9A-Fa-f-]+)\/tasks/,
};

export const STRICT_ROUTES = {
  USERS: /^\/users(\/?)$/,
  USERS_ID: /^\/users\/([0-9A-Fa-f-]+)(\/?)$/,
  BOARDS: /^\/boards(\/?)$/,
  BOARDS_ID: /^\/boards\/([0-9A-Fa-f-]+)(\/?)$/,
  TASKS: /^\/tasks(\/?)$/,
  BOARD_ID_TASKS: /^\/boards\/([0-9A-Fa-f-]+)\/tasks(\/?)$/,
  BOARD_ID_TASKS_ID: /^\/boards\/([0-9A-Fa-f-]+)\/tasks\/([0-9A-Fa-f-]+)(\/?)$/,
};
