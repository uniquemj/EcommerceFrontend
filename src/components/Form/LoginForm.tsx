import type { LoginFormProps } from '@/types/loginform.types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminLoginSchema, loginSchema } from '@/validations/auth.validate'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'
import { UserRole } from '@/types/enum.types'

const LoginForm = ({userType, handleLogin, registerLink}:LoginFormProps ) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(userType === UserRole.ADMIN? adminLoginSchema : loginSchema)
    })
  return (
      <Card className=" w-[330px] min-[380px]:w-[350px]">
        <CardHeader className="text-center space-y-1.5">
          <CardTitle className="text-xl font-bold">Login as {userType.toUpperCase()}</CardTitle>
          <CardDescription>Log in into BajarHub.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Your Email..."
                />
                {errors.email ? (
                  <p className="text-red-400">{errors.email.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="Your Password..."
                />
                {errors.password ? (
                  <p className="text-red-400">{errors.password.message}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-7 flex flex-col space-y-5">
            <Button
              type="submit"
              className="w-full bg-red-400 hover:cursor-pointer hover:bg-transparent hover:text-red-400 hover:border hover:border-red-400"
            >
              Log In
            </Button>

            {userType === UserRole.ADMIN ? "": (<CardDescription>
              Don't have account?{" "}
              <Link to={registerLink} className="text-red-400 font-medium">
                Sign Up
              </Link>
            </CardDescription>)}
          </CardFooter>
        </form>
      </Card>
  )
}

export default LoginForm;