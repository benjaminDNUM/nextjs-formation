import LoginForm from './LoginForm'

const getToken = async (): Promise<{ csrfToken: string }> => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/csrf`)
  return await req.json()
}

const Login = async () => {
  const token = await getToken()
  return <LoginForm csrfToken={token.csrfToken} />
}

export default Login
