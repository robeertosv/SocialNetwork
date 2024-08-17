import React, { useEffect, useState } from 'react'
import './styles/edit.scss'

const Edit = ({ userData, closeEPopUp }) => {

    const handler = async (e) => {
        e.preventDefault()


        let formData = new FormData(e.target);
        formData.append('id', userData._id)
        formData.append('iprivate', document.querySelector('#private').checked)
        const options = { body:formData, method:'POST', redirect: 'follow' }

        let res = await fetch('http://localhost/api/users/updateProfile', options)
        res = await res.json()
        
        if(res.message == 'modificado') {
            return window.location.replace('/'+document.querySelector('#username').value)
        }

        alert(res.message)
        
    }

    return (
        <div className='editContainer'>
            <button className="close-btn" onClick={closeEPopUp}>X</button>
            <h1>Edita tu perfil</h1>

            <form encType='multipart/form-data' onSubmit={handler}>
                <div className='profilePicContainer'>
                    <label htmlFor="pic">Foto de perfil</label>
                    <input type="file" name='pic' id='pic'/>
                </div>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name='name' id='name' required defaultValue={userData.name} />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' id='username' required defaultValue={userData.username} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' required defaultValue={userData.email}/>
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <input type="text" name='bio' id='bio' defaultValue={userData.bio}/>
                </div>
                <div>
                    <label htmlFor="password">Nueva Contraseña</label>
                    <input type="password" name='password' id='password'  autoComplete="new-password"  />
                </div>
                <div>
                    <label htmlFor="cPassword">Confirma tu contraseña</label>
                    <input type="password" name='cPassword' id='cPassword'  autoComplete="new-password" />
                </div>
                <div>
                    <label htmlFor="private">Cuenta privada</label>
                    <input type="checkbox" name='private' id='private' defaultChecked={userData.isPrivate} />
                </div>

                <button type='submit'>Confirmar cambios</button>
            </form>
        </div>
    )
}

export default Edit