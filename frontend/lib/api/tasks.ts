import { apiClient } from "@/lib/axios";
import { Task, TaskCreateInput, TaskUpdateInput } from "@/types/task";

export const tasksApi = {
    getAll: async (params?: {
        completed?: boolean;
        priority?: string;
        sort?: string;
    }): Promise<Task[]> => {
        const { data } = await apiClient.get<Task[]>("/tasks", { params });
        return data;
    },

    getById: async (id: string): Promise<Task> => {
        const { data } = await apiClient.get<Task>(`/tasks/${id}`);
        return data;
    },

    create: async (input: TaskCreateInput): Promise<Task> => {
        const { data } = await apiClient.post<Task>("/tasks", input);
        return data;
    },

    update: async (id: string, input: TaskUpdateInput): Promise<Task> => {
        const { data } = await apiClient.patch<Task>(`/tasks/${id}`, input);
        return data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`);
    },
};