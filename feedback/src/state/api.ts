import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create endpoints for the backend
export interface User {
    userId?: number;
    cognitoId?: number;
    username?: string;
}

export interface Business {
    id: number;
    ownerId: number;
    name: string;
    street: string;
    postcode: number;
    city: string;
    placeId?: string;
    feedbackLink?: string;
    ratingLimit?: number;

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

export interface RankData {   
    businessId: number;
    rank: number;             
    totalReviews: number;           
    mostMentionedCompliment: string;
    mostMentionedComplaint: string;
    mostMentionedStaff: string;
    reviewScore: string;
    mostReviewedByGender: string;
    socialEngagement: number;
    topSocialTool: string;
    bottomSocialTool: string;  
    topReviewTool: string;
    bottomReviewTool: string;
    lastReview: string;
    lastMention: string;

    business?: Business
}

// Create API to call the backend front the frontend
export const api = createApi({
    // Grab the URL in .env 
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: ["Business", "Tasks", "Reviews", "RankData"],
    // Redux query
    endpoints: (build) => ({        
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
        getFeedbackLink: build.query<Business[], {feedbackLink: string}>({
            // append to URL
            query: ({feedbackLink}) => `feedback?feedbackLink=${feedbackLink}`,
            providesTags: (result) => 
                result 
                    ? result.map(({id}) => ({type: "Business" as const, id})) 
                    : [{type: "Business" as const}]
        }),
    })
})

export const {
    useUpdateTaskStatusMutation,
    useGetFeedbackLinkQuery
} = api;