import {z} from "zod";

export const loginFormSchema = z.object({
  login: z.string({ message: 'Вы забыли ввести логин' }),
  password: z.string({ message: 'Вы забыли ввести пароль' })
})

export type LoginFormValues = z.infer<typeof loginFormSchema>