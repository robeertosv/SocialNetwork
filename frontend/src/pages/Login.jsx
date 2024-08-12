import '../styles/login.scss'

const Login = () => {

  const handler = async (e) => {
    e.preventDefault()
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let body = {
      username, password
    }
    body = JSON.stringify(body)

    let options = {headers, method: 'POST', body, redirect: 'follow', credentials: 'include'}
    let res = await fetch('http://localhost/api/auth/login', options)

    res = await res.json()

    if(res.code != 200) {
      return alert(res.error)
    }

    window.location.replace('/')
  }

  return (
    <div className='loginContainer'>

      <form method='POST' id='loginForm' onSubmit={handler}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder='username' required name='username' id='username' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='password' required name='password' id='password' />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>

  )
}

export default Login