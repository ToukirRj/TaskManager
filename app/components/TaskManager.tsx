"use client"

import { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import { Icon } from '@iconify/react';
import { saveTasks, loadTasks, saveDisabledButtons, loadDisabledButtons } from '../store/localStorage';

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
  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(new Set());


  // Load tasks and disabled buttons from local storage when the component mounts
  useEffect(() => {
    const storedTasks = loadTasks();
    const storedDisabledButtons = loadDisabledButtons();
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
    if (storedDisabledButtons.length > 0) {
      setDisabledButtons(new Set(storedDisabledButtons));
    }
  },[]);


  // Save tasks and disabled buttons to local storage whenever they change
  useEffect(() => {
    saveTasks(tasks);
    saveDisabledButtons(Array.from(disabledButtons));
  }, [tasks, disabledButtons]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Add tasks with set Task
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

  // Toggle Task Completion with Set Disabled Button
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    setDisabledButtons(prev => {
      const newSet = new Set(prev);
      newSet.add(taskId);
      return newSet;
    });
  };

  // Delete Task with Set Disabled Button
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setDisabledButtons(prev => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
  };

  // Set filtered Tasks
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
        <button onClick={openModal} className='rounded-md flex items-center bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500'>
          <Icon className='text-white me-1' icon="gridicons:add" width="16" height="16"/>
          Add Task
        </button>
      </div>

      <div className='bg-[#e6e6e6] rounded-full p-1 mt-3'>
        <button onClick={() => setFilter('all')} 
          className={`px-5 py-1.5 rounded-full text-sm font-semibold ${filter === 'all' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-gray-700'}`}>
          All
        </button>
        <button onClick={() => setFilter('active')} 
          className={`px-5 py-1.5 rounded-full text-sm font-semibold ${filter === 'active' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-gray-700'}`}>
          Active
        </button>
        <button onClick={() => setFilter('completed')} 
          className={`px-5 py-1.5 rounded-full text-sm font-semibold ${filter === 'completed' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-gray-700'}`}>
          Completed
        </button>
      </div>

      <div className='mt-3 p-4 bg-[#eeeeee] rounded-[10px]'>
        {filteredTasks.length === 0 && (
          <div className="my-4 w-full text-center font-medium text-red-500">No tasks available!</div>
        )}
        <div className='grid grid-cols-3 gap-4'>
          {filteredTasks.map(task => (
            <div key={task.id} className='bg-white rounded-lg relative p-4 shadow-lg'>

              <div className='flex justify-between items-center'>
                <div className="flex space-x-2">
                  <span style={{ opacity: task.completed ? '0.22' : '1' }} className='bg-gray-600 py-1 px-3 rounded-full text-[11px] font-semibold uppercase text-white'>Active</span>
                  <span style={{ opacity: task.completed ? '1' : '0.22' }} className='bg-green-600 py-1 px-3 rounded-full text-[11px] font-semibold uppercase text-white'>Completed</span>
                </div>
                <button onClick={() => deleteTask(task.id)} className='close text-white bg-red-500 h-7 w-7 rounded-full items-center justify-center flex hover:opacity-75'>
                  <Icon icon="mi:delete" width="18" height="18" className='text-white'/>
                </button>
              </div>

              <div className='my-3 py-3 border-y border-slate-200'>
                <h2 className='w-full text-[16px] font-semibold text-slate-800'>{task.title}</h2>
                <p className='text-[13px] font-medium w-full text-slate-500'>{task.description}</p>
              </div>

              <div className='flex items-center justify-end'>
                <button onClick={() => toggleTaskCompletion(task.id)} className='rounded-md flex items-center bg-indigo-600 px-2.5 py-1.5 text-[13px] font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-30'
                  disabled={disabledButtons.has(task.id)}>
                  <Icon icon="icon-park-solid:check-one" width="16" height="16" className='text-white me-1'/>
                  Mark As Complete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
      {showModal && <TaskModal onClose={closeModal} onSubmit={addTask} />}
    </div>
  );
};

export default TaskManager;
