import LoginForm from './LoginForm'

const getToken = async (): Promise<{ csrfToken: string }> => {
  return Promise.resolve({ csrfToken: 'tototototototo' }) // await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/csrf`)
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
