import LoginForm from './LoginForm'

const getToken = async (): Promise<{ csrfToken: string }> => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/csrf`)
  return await req.json()
}

const Login = async () => {
  try {
    const token = await getToken()
    return <LoginForm csrfToken={token.csrfToken} />
  } catch (e) {
    return <div></div>
  }
}

export default Login
