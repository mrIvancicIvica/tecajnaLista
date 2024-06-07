import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hnbApi = createApi({
  reducerPath: 'hnbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.hnb.hr/tecajn-eur/v3' }),
  endpoints: (builder) => ({
    getDateApply: builder.query({
      query: (date) => `?datum-primjene=${date}`,
    }),
    getDetails: builder.query({
      query: (cur) => `?valuta=${cur}`,
    }),
    getTest: builder.query({
      query: (inputDate) =>
        `?datum-primjene-od=2024-01-25&datum-primjene-do=2024-01-26`,
      transformResponse: (response) => {
        console.log('getDifferences',response)
      }
    }),
    getDifferences: builder.query({
      query: (inputDate) => `?datum-primjene-od=2024-01-25&datum-primjene-do=${inputDate}`,
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetDateApplyQuery,
  useGetDetailsQuery,
  useGetDifferencesQuery,
  useGetTestQuery,
} = hnbApi;
