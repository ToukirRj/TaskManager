

const TASKS_STORAGE_KEY = 'tasks';
const DISABLED_BUTTONS_STORAGE_KEY = 'disabledButtons';

export const saveTasks = (tasks: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    console.log('Tasks saved:', tasks);
  }
};

export const loadTasks = (): any[] => {
  if (typeof window !== 'undefined') {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    console.log('Tasks loaded:', savedTasks);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
  }
  return [];
};

export const clearTasks = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TASKS_STORAGE_KEY);
  }
};

export const saveDisabledButtons = (disabledButtons: number[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DISABLED_BUTTONS_STORAGE_KEY, JSON.stringify(disabledButtons));
    console.log('Disabled buttons saved:', disabledButtons);
  }
};

export const loadDisabledButtons = (): number[] => {
  if (typeof window !== 'undefined') {
    const savedDisabledButtons = localStorage.getItem(DISABLED_BUTTONS_STORAGE_KEY);
    console.log('Disabled buttons loaded:', savedDisabledButtons);
    if (savedDisabledButtons) {
      return JSON.parse(savedDisabledButtons);
    }
  }
  return [];
};

export const clearDisabledButtons = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DISABLED_BUTTONS_STORAGE_KEY);
  }
};
