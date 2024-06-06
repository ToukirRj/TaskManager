import { useState } from 'react';

interface Props {
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
}

const TaskModal: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = () => {
    if (title.trim() === '') return;
    onSubmit(title, description);
    onClose();
  };

  return (
    <div className="modal fixed top-0 left-0 right-0 z-10 bg-black/[0.35] min-h-screen pt-10">
      <div className="modal-content max-w-[400px] mx-auto w-full bg-[#fff] rounded-[10px] p-6">
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold leading-9 tracking-tight text-gray-900'>Create New Task</h2>
          <button type="button" className="close text-white text-[24px] bg-red-500 h-8 w-8 rounded-full items-center justify-center flex" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="0.75em" height="1em" viewBox="0 0 12 16">
              <path fill="currentColor" d="M10 12.5a.47.47 0 0 1-.35-.15l-8-8c-.2-.2-.2-.51 0-.71s.51-.2.71 0l7.99 8.01c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"/>
              <path fill="currentColor" d="M2 12.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l8-7.99c.2-.2.51-.2.71 0s.2.51 0 .71l-8.01 7.99c-.1.1-.23.15-.35.15"/>
            </svg>
          </button>
        </div>
        <label htmlFor="title" className='block text-sm font-medium leading-6 text-gray-900'>Task Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} 
        className='block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 sm:text-sm sm:leading-6 outline-none'/>
        <label htmlFor="description" className='mt-2 block text-sm font-medium leading-6 text-gray-900'>Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
        className='block w-full rounded-md py-1 px-3 text-gray-900 shadow-sm border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 sm:text-sm sm:leading-6 outline-none'/>
        <div className='flex justify-end'>
          <button onClick={handleSubmit} className='mt-4 rounded-md flex items-center bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" className='me-2'><path fill="currentColor" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417L5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
