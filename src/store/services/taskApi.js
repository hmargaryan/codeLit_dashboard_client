import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

export const taskApi = createApi({
    reducerPath: 'api/task',
    tagTypes: ['Task'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/task',
        prepareHeaders: (headers) => {
            const user = cookie.get('user')
            if (user) {
                headers.set('Authorization', `Bearer ${JSON.parse(user).token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (body) => ({
                url: 'create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Task']
        }),
        fetchTasks: builder.query({
            query: (term) => ({
                url: '/all',
                params: { term }
            }),
            providesTags: ['Task'],
        }),
        fetchTask: builder.query({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: ['Task'],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Task']
        }),
        editTask: builder.mutation({
            query: ({ id, body }) => ({
                url: `edit/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Task']
        })
    })
})

export const {
    useCreateTaskMutation,
    useFetchTasksQuery,
    useDeleteTaskMutation,
    useEditTaskMutation,
    useFetchTaskQuery
} = taskApi
