import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

export const interviewApi = createApi({
    reducerPath: 'api/interview',
    tagTypes: ['Interview'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/interview',
        prepareHeaders: (headers) => {
            const user = cookie.get('user')
            if (user) {
                headers.set('Authorization', `Bearer ${JSON.parse(user).token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        createInterviewSession: builder.mutation({
            query: (body) => ({
                url: 'create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Interview']
        }),
        fetchCandidateInterviewSessions: builder.query({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: ['Interview']
        }),
        addInterviewSessionResult: builder.mutation({
            query: ({ id, body }) => ({
                url: `/add/result/${id}`,
                method: 'PUT',
                body
            }),
            providesTags: ['Interview']
        })
    })
})

export const {
    useCreateInterviewSessionMutation,
    useFetchCandidateInterviewSessionsQuery,
    useAddInterviewSessionResultMutation
} = interviewApi
