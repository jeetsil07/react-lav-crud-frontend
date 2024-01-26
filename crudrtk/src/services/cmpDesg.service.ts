import { baseapi } from "./api";

export const allEmpApi = baseapi.injectEndpoints({
    endpoints: (builder)=>({
        getCmpDesg: builder.query({
            query:(company_id)=>`/api/showDesg/${company_id}`,
            providesTags: ['getDesg']
        })
    })
});
export const {useGetCmpDesgQuery} = allEmpApi;
