import { Task, TaskCreateInput, TaskUpdateInput } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(
            errorBody?.detail
                ? JSON.stringify(errorBody.detail)
                : `Request failed with status ${res.status}`
        );
    }
    if (res.status === 204) return undefined as T;
    return res.json();
}

export const api = {
    getTasks: async (params?: {
        completed?: boolean;
        priority?: string;
        sort?: string;
    }): Promise<Task[]> => {
        const query = new URLSearchParams();
        if (params?.completed !== undefined)
            query.set("completed", String(params.completed));
        if (params?.priority) query.set("priority", params.priority);
        if (params?.sort) query.set("sort", params.sort);

        const res = await fetch(`${API_URL}/tasks?${query.toString()}`);
        return handleResponse<Task[]>(res);
    },

    getTask: async (id: string): Promise<Task> => {
        const res = await fetch(`${API_URL}/tasks/${id}`);
        return handleResponse<Task>(res);
    },

    createTask: async (data: TaskCreateInput): Promise<Task> => {
        const res = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return handleResponse<Task>(res);
    },

    updateTask: async (id: string, data: TaskUpdateInput): Promise<Task> => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return handleResponse<Task>(res);
    },

    deleteTask: async (id: string): Promise<void> => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });
        return handleResponse<void>(res);
    },
};