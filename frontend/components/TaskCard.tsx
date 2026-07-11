import React from 'react';

export interface TaskCardProps {
  status?: 'active' | 'completed' | 'regular' | 'skeleton';
  title?: string;
  description?: string;
  date?: string;
  priority?: 'High' | 'Medium' | 'Low';
  completedAt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStatus?: () => void;
}

export function TaskCard({
  status = 'regular',
  title,
  description,
  date,
  priority,
  completedAt,
  onEdit,
  onDelete,
  onToggleStatus
}: TaskCardProps) {
  if (status === 'skeleton') {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-lg">
        <div className="flex items-start gap-md">
          <div className="mt-1 w-6 h-6 md:w-5 md:h-5 skeleton rounded shrink-0"></div>
          <div className="flex-1 space-y-md">
            <div className="h-5 w-2/3 skeleton rounded"></div>
            <div className="h-4 w-full skeleton rounded"></div>
            <div className="flex gap-md">
              <div className="h-5 w-20 skeleton rounded"></div>
              <div className="h-5 w-16 skeleton rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="bg-surface-container-low border border-outline-variant p-md rounded-lg transition-standard opacity-75">
        <div className="flex items-start justify-between gap-md">
          <div className="flex items-start gap-md w-full min-w-0">
            <div 
              className="mt-1 w-6 h-6 md:w-5 md:h-5 bg-on-surface-variant border-2 border-on-surface-variant rounded flex items-center justify-center cursor-pointer shrink-0 transition-standard hover:opacity-85"
              onClick={onToggleStatus}
              title="Mark as active"
            >
              <span className="material-symbols-outlined text-white text-sm md:text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-body-lg md:text-body-md font-semibold md:font-medium text-on-surface-variant line-through truncate">{title}</h3>
              {completedAt && <p className="text-label-md text-on-surface-variant opacity-70 mt-xs">{completedAt}</p>}
              <div className="flex items-center gap-md mt-md">
                <span className="text-label-sm font-label-sm text-on-surface-variant px-sm py-0.5 bg-surface-container rounded-full md:hidden">Done</span>
                
                <div className="hidden md:flex items-center gap-1 text-label-md text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Completed
                </div>
              </div>
            </div>
          </div>
          <button 
            type="button" 
            className="p-1 rounded hover:bg-surface-container-high transition-standard text-on-surface-variant shrink-0"
            onClick={onDelete}
            title="Delete task"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    );
  }

  const isActive = status === 'active';
  
  const borderLeftClass = isActive 
    ? "border-l-4 border-l-primary" 
    : (priority === 'High' ? "border-l-4 border-l-error md:border-l-transparent" : "");

  const containerClasses = `bg-surface-container-lowest border border-outline-variant p-md rounded-lg shadow-sm hover:shadow-md transition-standard group flex items-start justify-between gap-md ${borderLeftClass}`;

  const checkboxClasses = isActive
    ? "mt-1 w-6 h-6 md:w-5 md:h-5 border-2 border-primary rounded flex items-center justify-center cursor-pointer hover:bg-surface-container-low transition-standard shrink-0"
    : "mt-1 w-6 h-6 md:w-5 md:h-5 border-2 border-outline rounded flex items-center justify-center cursor-pointer hover:border-primary transition-standard shrink-0";

  const priorityClasses = priority === 'High'
    ? "text-on-primary bg-primary"
    : "text-secondary bg-secondary-container";

  const priorityIcon = priority === 'High' ? 'priority_high' : 'low_priority';

  return (
    <div className={containerClasses}>
      <div className="flex items-start gap-md w-full min-w-0">
        <div className={checkboxClasses} onClick={onToggleStatus} title="Mark as completed">
          <span className="material-symbols-outlined text-primary text-sm md:text-[14px] hidden group-hover:block">check</span>
        </div>

        <div className="flex-1 min-w-0 space-y-xs">
          <div className="flex justify-between items-start gap-sm">
            <h3 className="text-body-lg md:text-body-md font-semibold md:font-bold text-on-surface group-hover:text-primary transition-standard truncate">
              {title}
            </h3>

            {priority === 'High' && (
              <span className="text-label-sm font-label-sm text-error px-sm py-0.5 bg-error-container rounded-full md:hidden shrink-0">High</span>
            )}
            {priority === 'Medium' && (
              <span className="text-label-sm font-label-sm text-on-secondary-container px-sm py-0.5 bg-secondary-container rounded-full md:hidden shrink-0">Medium</span>
            )}
            {priority === 'Low' && (
              <span className="text-label-sm font-label-sm text-on-surface-variant px-sm py-0.5 bg-surface-container rounded-full md:hidden shrink-0">Low</span>
            )}
          </div>

          <p className="text-body-md md:text-label-md text-on-surface-variant mt-xs line-clamp-1">
            {description}
          </p>

          <div className="flex items-center gap-md pt-xs md:pt-0 md:mt-md">
            {date && (
              <div className="flex items-center gap-xs text-on-surface-variant md:hidden">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span className="text-label-sm">{date === 'Today' ? 'Today, 5:00 PM' : date}</span>
              </div>
            )}

            {date && (
              <div className="hidden md:flex items-center gap-1 text-label-md text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                {date}
              </div>
            )}

            {priority && (
              <div className={`hidden md:flex items-center gap-1 text-label-md px-2 py-0.5 rounded ${priorityClasses}`}>
                <span className="material-symbols-outlined text-[14px]">{priorityIcon}</span>
                {priority}
              </div>
            )}
          </div>
        </div>
      </div>

      <button 
        type="button" 
        className="p-1 rounded hover:bg-surface-container-high transition-standard text-on-surface-variant shrink-0"
        onClick={onEdit}
        title="Edit task"
      >
        <span className="material-symbols-outlined">more_vert</span>
      </button>
    </div>
  );
}
