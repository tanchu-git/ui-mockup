import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create endpoints for the backend
export interface User {
    userId?: number;
    cognitoId?: number;
    username?: string;

    // owner?: Business
}

export interface Business {
    id: number;
    ownerId: number;
    name: string;
    street: string;
    postcode: number;
    city: string;
    coordinate?: string;

    user?: User
}

export enum Status {
    ToDo = " To Do",
    WorkInProgress = "Work In Progress",
    Completed = "Completed"
}

export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Normal = "Normal",
    Low = "Low"
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    businessId: number;

    business?: Business
}

export interface Review {
    id: number;
    businessId: number;
    name: string;
    review: string;
    score: number;
    gender: string;
    date: string;
}

// Create API to call the backend front the frontend
export const api = createApi({
    // Grab the URL in .env 
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: ["Business", "Tasks", "Reviews"],
    // Redux query
    endpoints: (build) => ({
        // return the schema
        getBusiness: build.query<Business[], {ownerId: number}>({
            // append to URL
            query: ({ownerId}) => `business?ownerId=${ownerId}`,
            providesTags: (result) => 
                result 
                    ? result.map(({id}) => ({type: "Business" as const, id})) 
                    : [{type: "Business" as const}]
        }),
        // When creating a new business on UI - data will be transferred here
        createBusiness: build.mutation<Business, Partial<Business>>({
            // POST body
            query: (business) => ({
                url: "business",
                method: "POST",
                body: business
            }),
            // Get updated list
            invalidatesTags: ["Business"]
        }),
        // Send parameter 'businessId' and get the corresponding data
        getTasks: build.query<Task[], {businessId: number}>({
            // append to URL
            query: ({businessId}) => `tasks?businessId=${businessId}`,
            providesTags: (result) => 
                result 
                    ? result.map(({id}) => ({type: "Tasks" as const, id})) 
                    : [{type: "Tasks" as const}]
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            // POST body
            query: (task) => ({
                url: "tasks",
                method: "POST",
                body: task
            }),
            // Get updated list
            invalidatesTags: ["Tasks"]
        }),
        updateTaskStatus: build.mutation<Task, {taskId: number; status: string}>({
            // PATCH body
            query: ({taskId, status}) => ({
                url: `tasks/${taskId}/status`,
                method: "PATCH",
                body: {status}
            }),
            // Get updated specific task
            invalidatesTags: (result, error, {taskId}) => [
                {type: "Tasks", id: taskId}
            ]
        }),
        getReviews: build.query<Review[], {businessId: number}>({
            // append to URL
            query: ({businessId}) => `reviews?businessId=${businessId}`,
            providesTags: (result) => 
                result 
                    ? result.map(({id}) => ({type: "Reviews" as const, id})) 
                    : [{type: "Reviews" as const}]
        }),
    })
})

export const {
    useGetBusinessQuery,
    useCreateBusinessMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useGetReviewsQuery
} = api;