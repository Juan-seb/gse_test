import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const factApi = createApi({
  reducerPath: 'factApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://catfact.ninja' }),
  endpoints: (builder) => ({
    getNumberFacts: builder.query<any, any>({
      query: () => '/facts'
    }),
    updateAllFacts: builder.mutation<any, string>({
      query: (limit: string) => `/facts?limit=${limit}`
    })
  })
})

export const { useGetNumberFactsQuery, useUpdateAllFactsMutation } = factApi
