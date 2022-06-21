import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

export const candidateApi = createApi({
    reducerPath: 'api/candidate',
    tagTypes: ['Candidate'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/candidate',
        prepareHeaders: (headers) => {
            const user = cookie.get('user')
            if (user) {
                headers.set('Authorization', `Bearer ${JSON.parse(user).token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        addCandidate: builder.mutation({
            query: (body) => ({
                url: 'add',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Candidate']
        }),
        fetchCandidates: builder.query({
            query: ({ term, status }) => ({
                    url: '/all',
                    params: { term, status: status === 'all' ? '' : status }
            }),
            providesTags: ['Candidate']
        }),
        removeCandidate: builder.mutation({
            query: (id) => ({
                url: `remove/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Candidate']
        }),
        editCandidate: builder.mutation({
            query: ({ id, body }) => ({
                url: `edit/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Candidate']
        }),
        fetchCandidate: builder.query({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: ['Candidate']
        }),
        editCandidateStatus: builder.mutation({
            query: ({ id, body }) => ({
                url: `edit/status/${id}`,
                method: 'PUT',
                body
            }
            ),
            invalidatesTags: ['Candidate']
        })
    })
})

export const {
    useAddCandidateMutation,
    useFetchCandidatesQuery,
    useRemoveCandidateMutation,
    useEditCandidateMutation,
    useFetchCandidateQuery,
    useEditCandidateStatusMutation
} = candidateApi
