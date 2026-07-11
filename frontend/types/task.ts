export type Priority = "low" | "medium" | "high";

export interface Task {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    priority: Priority;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface TaskCreateInput {
    title: string;
    description?: string | null;
    priority?: Priority;
    due_date?: string | null;
}

export interface TaskUpdateInput {
    title?: string;
    description?: string | null;
    completed?: boolean;
    priority?: Priority;
    due_date?: string | null;
}