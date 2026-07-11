"use client";

import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "@/lib/api/tasks";
import { taskKeys } from "./task-keys";

export function useTasksQuery(params?: {
    completed?: boolean;
    priority?: string;
    sort?: string;
}) {
    return useQuery({
        queryKey: taskKeys.list(params),
        queryFn: () => tasksApi.getAll(params),
    });
}