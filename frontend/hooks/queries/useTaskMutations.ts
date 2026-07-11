"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/lib/api/tasks";
import { Task, TaskCreateInput, TaskUpdateInput } from "@/types/task";
import { taskKeys } from "./task-keys";

export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (input: TaskCreateInput) => tasksApi.create(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
        },
    });
}

export function useUpdateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: TaskUpdateInput }) =>
            tasksApi.update(id, input),
        // optimistic update for toggle-complete and edits
        onMutate: async ({ id, input }) => {
            await queryClient.cancelQueries({ queryKey: taskKeys.lists() });
            const previous = queryClient.getQueriesData<Task[]>({
                queryKey: taskKeys.lists(),
            });

            queryClient.setQueriesData<Task[]>(
                { queryKey: taskKeys.lists() },
                (old) =>
                    old?.map((t) => (t.id === id ? { ...t, ...input } : t)) ?? old
            );

            return { previous };
        },
        onError: (_err, _vars, context) => {
            context?.previous?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data);
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
        },
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => tasksApi.delete(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: taskKeys.lists() });
            const previous = queryClient.getQueriesData<Task[]>({
                queryKey: taskKeys.lists(),
            });

            queryClient.setQueriesData<Task[]>(
                { queryKey: taskKeys.lists() },
                (old) => old?.filter((t) => t.id !== id) ?? old
            );

            return { previous };
        },
        onError: (_err, _vars, context) => {
            context?.previous?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data);
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
        },
    });
}