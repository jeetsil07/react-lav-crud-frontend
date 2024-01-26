import { baseapi } from "./api";

export const registrationApi = baseapi.injectEndpoints({
    endpoints: (builder)=>({
        registration: builder.mutation({
            query:(formData)=>({
                url: '/api/addEmp',
                method: "POST",
                body: formData,
                header:{
                    "Content-type": "application/json"
                }
            }),
        })
    })
})
export const {useRegistrationMutation} = registrationApi;