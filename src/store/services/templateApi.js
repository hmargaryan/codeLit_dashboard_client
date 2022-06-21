import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

export const templateApi = createApi({
    reducerPath: 'api/template',
    tagTypes: ['Template'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/template',
        prepareHeaders: (headers) => {
            const user = cookie.get('user')
            if (user) {
                headers.set('Authorization', `Bearer ${JSON.parse(user).token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        createTemplate: builder.mutation({
            query: (body) => ({
                url: 'create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Template']
        }),
        fetchTemplates: builder.query({
            query: (term) => ({
                url: '/all',
                params: { term }
            }),
            providesTags: ['Template'],
        }),
        editTemplate: builder.mutation({
            query: ({ id, body }) => ({
                url: `edit/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Template']
        }),
        deleteTemplate: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Template']
        }),
        fetchTemplate: builder.query({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: ['Template']
        }),
    })
})

export const {
    useCreateTemplateMutation,
    useFetchTemplatesQuery,
    useEditTemplateMutation,
    useDeleteTemplateMutation,
    useFetchTemplateQuery
} = templateApi
