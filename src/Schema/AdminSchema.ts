import z from "zod";

export const signUpSchema = z.object({
    userName: z
.string()
.min(2, "userName must be atleast 2 character")
.max(20, "userName must be atleast 2 character")
.regex(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, "username not coaintain special character"),
    email:z.string().email({message:'email address not valid'}),
    password: z.string().min(6,"password must be at least 6 character")
})