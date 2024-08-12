import '../styles/register.scss'

const Register = () => {

  const handler = async (e) => {
    e.preventDefault()
    const username = document.querySelector('#username').value
    const name = document.querySelector('#name').value
    const password = document.querySelector('#password').value
    const cPassword = document.querySelector('#cpassword').value
    const email = document.querySelector('#email').value

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let body = { username, name, password, cPassword, email }
    body = JSON.stringify(body)

    let options = {
      headers,
      body,
      method: 'POST',
      redirect: 'follow'
    }

    let res = await fetch('http://localhost/api/auth/register', options)
    res = await res.json()
    
    if(res.error != 'OK') {
      return alert(res.error)
    }

    body = {username, password}
    body = JSON.stringify(body)

    options = { headers, body, method: 'POST', redirect: 'follow', credentials: 'include' }
    res = await fetch('http://localhost/api/auth/login', options)

    res = await res.json()

    if(res.code != 200) {
      return alert(res.error)
    }

    
    window.location.replace('/')
  }
  return (
    <div className='registerContainer'>
      <h1>Create your account!</h1>
      <form className="registerForm" onSubmit={handler}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name='name' id='name' required placeholder='John Doe' />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name='username' id='username' required placeholder='johndoe' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' required placeholder='********' />
        </div>
        <div>
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" name='cpassword' id='cpassword' required placeholder='********' />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email' required placeholder='name@example.com' />
        </div>
        <button>Create Account</button>
      </form>
    </div>
  )
}

export default Register