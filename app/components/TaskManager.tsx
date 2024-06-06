"use client"

import { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import { saveTasks, loadTasks } from '../store/localStorage';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = loadTasks();
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addTask = (title: string, description: string) => {
    if (title.trim() === '') return;
    const task: Task = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className='max-w-6xl mx-auto w-full bg-white rounded-[15px] p-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold leading-9 tracking-tight text-gray-900'>Task Manager</h2>
        <button onClick={openModal} className='rounded-md flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='me-1'><path fill="currentColor" d="M11.96 1.75A10.25 10.25 0 1 0 22.25 12A10.261 10.261 0 0 0 11.96 1.75M17.25 13h-4.28v4.27a1 1 0 0 1-2 0V13H6.69a1 1 0 1 1 0-2h4.28V6.68a1 1 0 0 1 2 0v4.28h4.28a1 1 0 0 1 0 2z"/></svg>
          Add Task
        </button>
      </div>
      <div className='bg-[#e6e6e6] rounded-full p-1 mt-3'>
        <button onClick={() => setFilter('all')} className={`px-5 py-1.5 rounded-full text-sm font-semibold ${filter === 'all' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-slate-500'}`}>
          All
        </button>
        <button onClick={() => setFilter('active')} className={`px-5 py-1.5 rounded-full text-sm font-semibold ${filter === 'active' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-slate-500'}`}>
          Active
        </button>
        <button onClick={() => setFilter('completed')} className={`px-5 py-1.5 rounded-full text-sm font-semibold ${filter === 'completed' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-slate-500'}`}>
          Completed
        </button>
      </div>
      <div className='mt-3 p-4 grid grid-cols-3 gap-4 min-h-[350px] bg-[#eeeeee] rounded-[10px]'>
        {filteredTasks.map(task => (
          <div key={task.id} className='bg-white rounded-lg relative p-4 shadow-lg'>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)}/>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}> 

              {task.title}
            </span>
            <p className=''>{task.description}</p>
            <button onClick={() => deleteTask(task.id)} className='close text-white text-[24px] bg-red-500 h-8 w-8 rounded-full items-center justify-center flex absolute top-3 right-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M8 21h8a2 2 0 0 0 2-2V7H6v12a2 2 0 0 0 2 2" opacity="0.16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"/></g></svg>
            </button>
          </div>
        ))}
      </div>
      {showModal && <TaskModal onClose={closeModal} onSubmit={addTask} />}
    </div>
  );
};

export default TaskManager;
