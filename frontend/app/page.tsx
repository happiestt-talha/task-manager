"use client";

import { useState, useEffect } from "react";
import { TaskCard } from "@/components/TaskCard";
import { EditTaskModal, EditTaskData } from "@/components/EditTaskModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { useTasksQuery } from "@/hooks/queries/useTasksQuery";
import { useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/queries/useTaskMutations";
import { Task, TaskCreateInput } from "@/types/task";
import { WeatherWidget } from "@/components/WeatherWidget";

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const taskStatus = (t: Task): "active" | "completed" | "regular" =>
  t.completed ? "completed" : t.priority === "high" ? "active" : "regular";

const displayPriority = (p: string): "High" | "Medium" | "Low" =>
  capitalize(p) as "High" | "Medium" | "Low";

const formatDateLabel = (iso: string | null): string => {
  if (!iso) return "";
  try {
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d.getTime())) return iso;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = d.getTime() - today.getTime();
    const oneDay = 86_400_000;
    if (Math.abs(diff) < oneDay / 2) return "Today";
    if (diff > 0 && diff < oneDay * 1.5) return "Tomorrow";
    if (diff < 0 && diff > -oneDay * 1.5) return "Yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return iso;
  }
};

const toEditData = (t: Task): EditTaskData => ({
  id: t.id,
  title: t.title,
  description: t.description ?? "",
  priority: capitalize(t.priority) as EditTaskData["priority"],
  dueDate: t.due_date ?? "",
});

export default function Page() {
  const { data: tasks = [], isLoading, error: queryError, refetch } = useTasksQuery();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const [error, setError] = useState<string | null>(null);
  const [isWakingUp, setIsWakingUp] = useState(false);

  const queryErrorMessage = queryError instanceof Error ? queryError.message : (queryError ? String(queryError) : null);
  useEffect(() => {
    if (queryErrorMessage) {
      setError(queryErrorMessage);
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [queryErrorMessage]);

  useEffect(() => {
    let wakeUpTimeout: NodeJS.Timeout;
    if (isLoading) {
      setIsWakingUp(false);
      wakeUpTimeout = setTimeout(() => {
        setIsWakingUp(true);
      }, 5000);
    } else {
      setIsWakingUp(false);
    }
    return () => clearTimeout(wakeUpTimeout);
  }, [isLoading]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Active" | "Completed" | "Overdue">("All");

  const [desktopTitle, setDesktopTitle] = useState("");
  const [desktopDesc, setDesktopDesc] = useState("");
  const [desktopPriority, setDesktopPriority] = useState<"low" | "medium" | "high">("medium");
  const [desktopDate, setDesktopDate] = useState("");
  const [showDesktopError, setShowDesktopError] = useState(false);

  const [mobileTitle, setMobileTitle] = useState("");

  const clearError = () => setError(null);

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 6000);
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        input: { completed: !task.completed },
      });
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to update task status.");
    }
  };

  const handleOpenEdit = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleSaveTask = async (data: EditTaskData) => {
    if (!selectedTask) return;
    try {
      await updateTaskMutation.mutateAsync({
        id: selectedTask.id,
        input: {
          title: data.title,
          description: data.description || null,
          priority: data.priority.toLowerCase() as "low" | "medium" | "high",
          due_date: data.dueDate || null,
        },
      });
      setEditModalOpen(false);
      setSelectedTask(undefined);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to save task.");
      throw err;
    }
  };

  const handleOpenDelete = (task: Task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask) return;
    try {
      await deleteTaskMutation.mutateAsync(selectedTask.id);
      setDeleteModalOpen(false);
      setSelectedTask(undefined);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to delete task.");
      throw err;
    }
  };

  const handleCreateDesktopTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desktopTitle.trim()) {
      setShowDesktopError(true);
      return;
    }

    const input: TaskCreateInput = {
      title: desktopTitle.trim(),
      description: desktopDesc.trim() || null,
      priority: desktopPriority,
      due_date: desktopDate || null,
    };

    try {
      await createTaskMutation.mutateAsync(input);
      setDesktopTitle("");
      setDesktopDesc("");
      setDesktopPriority("medium");
      setDesktopDate("");
      setShowDesktopError(false);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to create task.");
    }
  };

  const handleCreateMobileTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileTitle.trim()) {
      showError("Task title is required");
      return;
    }

    const input: TaskCreateInput = {
      title: mobileTitle.trim(),
      priority: "medium",
    };

    try {
      await createTaskMutation.mutateAsync(input);
      setMobileTitle("");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to create task.");
    }
  };


  const filteredTasks = tasks.filter(task => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      task.title.toLowerCase().includes(q) ||
      (task.description ?? "").toLowerCase().includes(q);
    if (!matchesSearch) return false;

    if (filterType === "Active") return !task.completed;
    if (filterType === "Completed") return task.completed;
    if (filterType === "Overdue") {
      if (task.completed) return false;
      if (!task.due_date) return false;
      return new Date(task.due_date + "T23:59:59") < new Date();
    }
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface-container-lowest dark:bg-inverse-surface border-b border-outline-variant dark:border-outline shadow-sm w-full transition-standard">
        <div className="max-w-container-max mx-auto px-md md:px-lg py-md flex justify-between items-center h-16">
          <div className="flex items-center gap-sm md:gap-xl">
            <span className="text-title-lg font-bold text-primary dark:text-primary-fixed">TaskFlow</span>
            <nav className="hidden md:flex gap-lg items-center h-full">
              <a className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 h-full flex items-center" href="#">Dashboard</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-md md:px-lg py-lg md:py-2xl space-y-lg md:space-y-0">

        <section className="mb-lg md:mb-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
          <div className="space-y-xs">
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">My Tasks</h1>
            <p className="text-body-lg text-on-surface-variant mt-xs">Stay on track and organized.</p>
          </div>
          <div className="shrink-0">
            <WeatherWidget />
          </div>
        </section>

        {error && (
          <div className="mb-lg flex items-center gap-md bg-error-container text-on-error-container p-md rounded-lg border border-error/30 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-error shrink-0">error</span>
            <p className="text-body-md flex-1">{error}</p>
            <button type="button" onClick={() => refetch()} className="px-sm py-xs bg-error text-on-error rounded font-label-md shrink-0 hover:opacity-90 transition-opacity">
              Retry
            </button>
            <button type="button" onClick={clearError} className="p-xs rounded hover:bg-error/10 transition-colors shrink-0">
              <span className="material-symbols-outlined text-error text-[18px]">close</span>
            </button>
          </div>
        )}

        {isWakingUp && !error && (
          <div className="mb-lg flex items-center gap-md bg-secondary-container text-on-secondary-container p-md rounded-lg border border-secondary/30 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-secondary shrink-0 animate-spin">sync</span>
            <p className="text-body-md flex-1">Waking up server, this may take a moment...</p>
          </div>
        )}

        <div className="md:hidden space-y-lg">
          <section className="bg-surface-container-lowest border border-outline-variant rounded p-md shadow-sm">
            <form className="flex flex-col gap-md" onSubmit={handleCreateMobileTask}>
              <div className="relative">
                <input
                  className="w-full h-12 px-md py-sm bg-surface-container-low border border-outline-variant rounded text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="Add a new task..."
                  type="text"
                  value={mobileTitle}
                  onChange={e => setMobileTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between gap-sm">
                <div className="flex gap-xs">
                  <button type="button" className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant text-on-secondary-fixed-variant hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </button>
                  <button type="button" className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant text-on-secondary-fixed-variant hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined">flag</span>
                  </button>
                </div>
                <button type="submit" disabled={createTaskMutation.isPending} className="px-lg h-10 bg-primary text-on-primary rounded font-label-md text-label-md active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {createTaskMutation.isPending ? "Creating..." : "Create Task"}
                </button>
              </div>
            </form>
          </section>

          <section className="flex flex-col gap-sm">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">search</span>
              <input
                className="w-full h-11 pl-10 pr-md bg-white border border-outline-variant rounded text-body-md focus:ring-2 focus:ring-primary transition-all"
                placeholder="Search tasks"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-sm overflow-x-auto pb-xs scrollbar-none">
              {(["All", "Active", "Completed", "Overdue"] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  className={`whitespace-nowrap px-md py-sm rounded-full text-label-sm font-semibold transition-all ${
                    filterType === f
                      ? "bg-primary text-on-primary"
                      : "bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container-low"
                  }`}
                  onClick={() => setFilterType(f)}
                >
                  {f === "All" ? "All Tasks" : f}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-md pb-xl">
            {isLoading ? (
              <>
                <TaskCard status="skeleton" />
                <TaskCard status="skeleton" />
                <TaskCard status="skeleton" />
              </>
            ) : filteredTasks.length === 0 ? (
              <div className="p-lg bg-surface-container-lowest text-center rounded border border-outline-variant text-on-surface-variant text-body-md">
                No tasks found.
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  status={taskStatus(task)}
                  title={task.title}
                  description={task.description ?? ""}
                  date={formatDateLabel(task.due_date)}
                  priority={displayPriority(task.priority)}
                  completedAt={task.completed ? `Completed at ${new Date(task.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : undefined}
                  onToggleStatus={() => handleToggleStatus(task)}
                  onEdit={() => handleOpenEdit(task)}
                  onDelete={() => handleOpenDelete(task)}
                />
              ))
            )}


          </section>
        </div>

        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">

          <aside className="lg:col-span-4 space-y-lg">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-sm">
              <h2 className="text-title-lg font-bold mb-md text-on-surface">Create Task</h2>
              <form className="space-y-md" onSubmit={handleCreateDesktopTask}>
                <div>
                  <label className="block text-label-md font-medium text-on-surface-variant mb-xs">Title</label>
                  <input
                    className={`w-full h-10 px-md border rounded-lg focus:ring-2 focus:outline-none text-body-md ${
                      showDesktopError ? "border-error focus:ring-error" : "border-outline-variant focus:ring-primary"
                    }`}
                    placeholder="e.g. Design System Audit"
                    type="text"
                    value={desktopTitle}
                    onChange={e => {
                      setDesktopTitle(e.target.value);
                      if (e.target.value.trim()) setShowDesktopError(false);
                    }}
                  />
                  {showDesktopError && (
                    <p className="text-error text-label-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">error</span>
                      Task title is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-label-md font-medium text-on-surface-variant mb-xs">Description</label>
                  <textarea
                    className="w-full p-md border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-md resize-none"
                    placeholder="Briefly describe the task..."
                    rows={3}
                    value={desktopDesc}
                    onChange={e => setDesktopDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-md">
                  <div>
                    <label className="block text-label-md font-medium text-on-surface-variant mb-xs">Priority</label>
                    <select
                      className="w-full h-10 px-md border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-md appearance-none bg-surface-container-lowest"
                      value={desktopPriority}
                      onChange={e => setDesktopPriority(e.target.value as "low" | "medium" | "high")}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-label-md font-medium text-on-surface-variant mb-xs">Due Date</label>
                    <input
                      className="w-full h-10 px-md border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-md"
                      type="date"
                      value={desktopDate}
                      onChange={e => setDesktopDate(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" disabled={createTaskMutation.isPending} className="w-full h-11 bg-primary text-on-primary font-bold rounded-lg hover:bg-on-surface-variant transition-standard active:scale-95 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {createTaskMutation.isPending ? (
                    <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  )}
                  {createTaskMutation.isPending ? "Adding..." : "Add Task"}
                </button>
              </form>
            </div>

            <div className="bg-primary text-on-primary p-lg rounded-lg border border-primary">
              <p className="text-label-sm uppercase tracking-wider opacity-80">Task Summary</p>
              <p className="text-headline-lg font-bold mt-1">{completedCount} Done</p>
              <div className="mt-md h-1.5 w-full bg-on-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-on-primary transition-all duration-500"
                  style={{ width: tasks.length > 0 ? `${Math.round((completedCount / tasks.length) * 100)}%` : "0%" }}
                ></div>
              </div>
              <p className="text-label-sm mt-sm opacity-80">
                {completedCount}/{tasks.length} tasks completed
              </p>
            </div>
          </aside>

          <section className="lg:col-span-8 space-y-md">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-md bg-surface-container-low p-md rounded-lg border border-outline-variant">
              <div className="flex items-center gap-md">
                <span className="text-body-md font-bold text-on-surface">
                  {filteredTasks.length} Task{filteredTasks.length !== 1 ? "s" : ""}
                </span>
                <div className="h-4 w-[1px] bg-outline-variant hidden sm:block"></div>
                <div
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-label-md font-medium cursor-pointer transition-standard ${
                    filterType === "Active" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                  onClick={() => setFilterType(filterType === "Active" ? "All" : "Active")}
                >
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Active Only
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-label-md font-medium cursor-pointer transition-standard ${
                    filterType === "Completed" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                  onClick={() => setFilterType(filterType === "Completed" ? "All" : "Completed")}
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Completed Only
                </div>
              </div>
              <div className="relative w-full sm:w-auto">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input
                  className="w-full sm:w-64 h-9 pl-9 pr-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-label-md"
                  placeholder="Search tasks..."
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-sm">
              {isLoading ? (
                <>
                  <TaskCard status="skeleton" />
                  <TaskCard status="skeleton" />
                  <TaskCard status="skeleton" />
                  <TaskCard status="skeleton" />
                </>
              ) : filteredTasks.length === 0 ? (
                <div className="p-lg bg-surface-container-lowest text-center rounded border border-outline-variant text-on-surface-variant text-body-md">
                  No tasks found.
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    status={taskStatus(task)}
                    title={task.title}
                    description={task.description ?? ""}
                    date={formatDateLabel(task.due_date)}
                    priority={displayPriority(task.priority)}
                    completedAt={
                      task.completed
                        ? `Completed at ${new Date(task.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                        : undefined
                    }
                    onToggleStatus={() => handleToggleStatus(task)}
                    onEdit={() => handleOpenEdit(task)}
                    onDelete={() => handleOpenDelete(task)}
                  />
                ))
              )}

            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low dark:bg-inverse-surface border-t border-outline-variant dark:border-outline mt-auto w-full">
        <div className="max-w-container-max mx-auto py-xl px-md md:px-lg flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex flex-col items-center md:items-start gap-sm md:gap-0">
            <span className="text-label-md font-bold text-on-surface dark:text-inverse-on-surface">
              TaskFlow
            </span>
            <p className="text-label-sm text-secondary dark:text-secondary-fixed md:hidden">
              © {new Date().getFullYear()} Muhammad Talha Manzoor. All rights reserved.
            </p>
          </div>
          <p className="hidden md:block text-label-sm text-secondary dark:text-secondary-fixed">
            © {new Date().getFullYear()} Muhammad Talha Manzoor. All rights reserved.
          </p>
          <div className="flex gap-md md:gap-lg">
            <a className="text-on-secondary-fixed-variant dark:text-on-secondary-fixed hover:text-primary transition-standard text-label-sm font-bold" href="https://mtalha.me" target="_blank" rel="noopener noreferrer">mtalha.me</a>
            <a className="text-on-secondary-fixed-variant dark:text-on-secondary-fixed hover:text-primary transition-standard text-label-sm" href="#">Privacy Policy</a>
            <a className="text-on-secondary-fixed-variant dark:text-on-secondary-fixed hover:text-primary transition-standard text-label-sm" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      <EditTaskModal
        isOpen={editModalOpen}
        task={selectedTask ? toEditData(selectedTask) : undefined}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedTask(undefined);
        }}
        onSave={handleSaveTask}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        taskTitle={selectedTask?.title}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedTask(undefined);
        }}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
