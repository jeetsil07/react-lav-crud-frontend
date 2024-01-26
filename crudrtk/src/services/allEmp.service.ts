import { baseapi } from "./api";

export const allEmpApi = baseapi.injectEndpoints({
    endpoints: (builder)=>({
        getAllEmp: builder.query({
            query:()=>'/api/showAllEmp',
            providesTags: ['allEmp']
        })
    })
});
export const {useGetAllEmpQuery} = allEmpApi;
