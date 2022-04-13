import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

export const workspaceMemberApi = createApi({
  reducerPath: 'api/workspaceMember',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/workspaceMember',
    prepareHeaders: (headers) => {
      const user = cookie.get('user')
      if (user) {
        headers.set('Authorization', `Bearer ${JSON.parse(user).token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    addMember: builder.mutation({
      query: (body) => ({
        url: 'add',
        method: 'POST',
        body
      })
    })
  })
})

export const { useAddMemberMutation } = workspaceMemberApi