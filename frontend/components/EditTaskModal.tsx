import React, { useState, useEffect } from 'react';

export interface EditTaskData {
  id?: string | number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string; // YYYY-MM-DD
}

export interface EditTaskModalProps {
  task?: EditTaskData;
  isOpen: boolean;
  onClose?: () => void;
  onSave?: (task: EditTaskData) => void;
}

export function EditTaskModal({
  task,
  isOpen,
  onClose,
  onSave,
}: EditTaskModalProps) {
  // Default values matching the design reference if no task is provided
  const defaultTask: EditTaskData = {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  };

  const initialTask = task || defaultTask;

  const [title, setTitle] = useState(initialTask.title);
  const [description, setDescription] = useState(initialTask.description);
  const [priority, setPriority] = useState(initialTask.priority);
  const [dueDate, setDueDate] = useState(initialTask.dueDate);

  // Sync state with task prop when it changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const activeTask = task || defaultTask;
      setTitle(activeTask.title);
      setDescription(activeTask.description);
      setPriority(activeTask.priority);
      setDueDate(activeTask.dueDate);
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSave?.({
      ...initialTask,
      title,
      description,
      priority,
      dueDate,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-md bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      {/* EDIT TASK MODAL CARD */}
      <div className="bg-white w-full max-w-[500px] rounded-lg shadow-2xl overflow-hidden border border-outline-variant">
        {/* Modal Header */}
        <div className="px-lg py-md border-b border-outline-variant flex justify-between items-center bg-white">
          <h2 className="text-title-lg text-on-surface">Edit Task</h2>
          <button
            type="button"
            className="p-xs rounded-full hover:bg-surface-container-high transition-colors flex items-center justify-center"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Modal Content (Form) */}
        <form className="p-lg space-y-lg" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="space-y-xs">
            <label className="text-label-md text-on-surface-variant font-medium block">Task Title</label>
            <input
              className="w-full h-[44px] px-md bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-xs">
            <label className="text-label-md text-on-surface-variant font-medium block">Description</label>
            <textarea
              className="w-full p-md bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Priority & Due Date Row */}
          <div className="grid grid-cols-2 gap-lg">
            <div className="space-y-xs">
              <label className="text-label-md text-on-surface-variant font-medium block">Priority</label>
              <div className="relative">
                <select
                  className="w-full h-[44px] px-md appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  value={priority.toLowerCase()}
                  onChange={(e) => {
                    const val = e.target.value;
                    const capitalized = (val.charAt(0).toUpperCase() + val.slice(1)) as any;
                    setPriority(capitalized);
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="space-y-xs">
              <label className="text-label-md text-on-surface-variant font-medium block">Due Date</label>
              <div className="relative">
                <input
                  className="w-full h-[44px] px-md bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-outline pointer-events-none hidden sm:block">calendar_today</span>
              </div>
            </div>
          </div>

          {/* Optional Task Owner */}

        </form>

        {/* Modal Actions */}
        <div className="px-lg py-md border-t border-outline-variant bg-surface-container-low/30 flex justify-end items-center gap-md">
          <button
            type="button"
            className="px-lg py-sm rounded-lg text-on-surface-variant text-label-md font-medium hover:bg-surface-container-high transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-lg py-sm rounded-lg bg-primary text-on-primary text-label-md font-bold shadow-md hover:opacity-90 active:scale-95 transition-all"
            onClick={() => handleSubmit()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
