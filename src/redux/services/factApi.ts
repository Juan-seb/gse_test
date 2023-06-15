import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const factApi = createApi({
  reducerPath: 'factApi', // The name of the reducer path for the API slice in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://catfact.ninja' }), // Configuring the base query function with the base URL
  endpoints: (builder) => ({
    getNumberFacts: builder.query<any, any>({
      query: () => '/facts' // Configuring a query endpoint for fetching number facts
    }),
    updateAllFacts: builder.mutation<any, string>({
      query: (limit: string) => `/facts?limit=${limit}` // Configuring a mutation endpoint for updating all facts
    })
  })
})

export const { useGetNumberFactsQuery, useUpdateAllFactsMutation } = factApi
