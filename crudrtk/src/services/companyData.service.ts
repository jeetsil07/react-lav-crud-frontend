import { baseapi } from "./api";

export const companyData = baseapi.injectEndpoints({
    endpoints: (builder)=>({
        getAllCmp: builder.query({
            query:()=>'/api/showAllCmp',
            providesTags: ['cmpData']
        })
    })
});

export const { useGetAllCmpQuery} = companyData;