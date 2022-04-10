import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

export const workspaceApi = createApi({
  reducerPath: 'api/workspace',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/workspace',
    prepareHeaders: (headers) => {
      const user = cookie.get('user')
      if (user) {
        headers.set('Authorization', `Bearer ${JSON.parse(user).token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    createWorkspace: builder.mutation({
      query: (body) => ({
        url: 'create',
        method: 'POST',
        body
      })
    })
  })
})

export const { useCreateWorkspaceMutation } = workspaceApi