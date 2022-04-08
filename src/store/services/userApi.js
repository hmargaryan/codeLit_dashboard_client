import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/user' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: 'sign-up',
        method: 'POST',
        body
      })
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: 'sign-in',
        method: 'POST',
        body
      })
    })
  })
})

export const { useSignUpMutation, useSignInMutation } = userApi