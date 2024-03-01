import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


import { Task } from '../../pages/ViewTask';

export interface getAllTaskRTKInterface {
  tasksToTheUser: Task[];
}

export interface PostTaskRequestInterface {
  taskDate: Date | any;
  task: string | "";
  userId: string | "";
}
export interface PostTaskResponsetInterface {
  data: {
    details: Task;
    message: string | "";
  };
  error?: {
    data: {
      message: string | "";
    };
    status: number;
  };
}

export interface UpdateTaskStatusRequest {
  taskId: string;
  status: boolean;
}
export interface UpdateTaskStatusResponse {
  data?: { message: string | "" };
  error?: {
    data: {
      message: string | "";
    };
    status: number;
  };
}

export interface UpdateTaskStatusResponseError {
  error?: {
    data: {
      message: string | "";
    };
    status: number;
  };
}

export interface deleteTaskRTKInterface {
  message: string | "";
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("userToken");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllTasks: builder.query<getAllTaskRTKInterface, string>({
      query: (userId) => `task/tasks/${userId}`,
    }),

    postTask: builder.mutation<
      PostTaskResponsetInterface,
      PostTaskRequestInterface
    >({
      query: (body) => ({
        url: `task/createTask`,
        method: `POST`,
        body: body,
      }),
    }),

    getTaskById: builder.query<Task, string>({
      query: (taskId) => `task/taskById/${taskId}`,
    }),

    updateTaskStatus: builder.mutation<
      UpdateTaskStatusResponse,
      UpdateTaskStatusRequest
    >({
      query: ({ taskId, status }) => ({
        url: `task/tasks/${taskId}`,
        method: "PUT",
        body: { task_status: status },
      }),
    }),

    deleteTaskById: builder.mutation<deleteTaskRTKInterface, string>({
      query: (taskId) => ({
        url: `task/tasks/${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  usePostTaskMutation,
  useGetTaskByIdQuery,
  useDeleteTaskByIdMutation,
  useUpdateTaskStatusMutation,
} = taskApi;
