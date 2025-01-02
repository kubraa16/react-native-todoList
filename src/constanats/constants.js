export const TASK_STATUS = {
  TODO: 'todo',
  WIP: 'wip',
  DONE: 'done',
};

export const TAB_KEY = {
  ALL: 'all',
  TODO: 'todo',
  WIP: 'wip',
  DONE: 'done',
};

export const TABS = {
  [TAB_KEY.ALL]: {
    label: 'All',
    icon: {focused: 'list', default: 'list-outline'},
  },
  [TAB_KEY.TODO]: {
    label: 'Todo',
    icon: {focused: 'checkmark', default: 'checkmark-outline'},
  },
  [TAB_KEY.WIP]: {
    label: 'Wip',
    icon: {focused: 'hammer', default: 'hammer-outline'},
  },
  [TAB_KEY.DONE]: {
    label: 'Done',
    icon: {focused: 'checkmark-done', default: 'checkmark-done-outline'},
  },
};
