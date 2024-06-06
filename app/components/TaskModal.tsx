
import { useState } from 'react';
import { Icon } from '@iconify/react';

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
      <div className="modal-content max-w-[450px] mx-auto w-full bg-[#fff] rounded-[10px] p-8">
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold leading-9 tracking-tight text-gray-900'>Create New Task</h2>
          <button type="button" className="close text-white text-[24px] bg-red-500 h-8 w-8 rounded-full items-center justify-center flex" onClick={onClose}>
            <Icon icon="ion:close-outline" width="24" height="24"/>
          </button>
        </div>
        <div className='mt-4'>
          <label htmlFor="title" className='block text-sm font-medium leading-6 text-gray-900'>Task Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} 
          className='block w-full rounded-md py-1.5 px-3 text-gray-900 border border-slate-300 focus:border-indigo-600 text-[13px] leading-6 outline-none'/>
        </div>
        <div className='mt-4'>
          <label htmlFor="description" className='block text-sm font-medium leading-6 text-gray-900'>Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
          className='block w-full rounded-md py-1 px-3 text-gray-900 border border-slate-300 focus:border-indigo-600 text-[13px] leading-6 outline-none'/>
        </div>
        <div className='flex justify-end mt-5'>
          <button onClick={handleSubmit} className='rounded-md flex items-center bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-500'>
            <Icon icon="icon-park-solid:check-one" width="16" height="16" className='text-white me-1'/>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
