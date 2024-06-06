

const STORAGE_KEY = 'tasks';

export const saveTasks = (tasks: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    console.log('Tasks saved:', tasks);
  }
};

export const loadTasks = (): any[] => {
  if (typeof window !== 'undefined') {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    console.log('Tasks loaded:', savedTasks);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
  }
  return [];
};

export const clearTasks = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};