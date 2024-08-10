import React, { useEffect, useState } from 'react'
import './styles/create.scss'

const Create = () => {
    const [postLength, setPostLength] = useState(0);

    useEffect(() => {
        const textarea = document.getElementById('postText');
        const adjustHeight = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textarea.addEventListener('input', adjustHeight);
        return () => textarea.removeEventListener('input', adjustHeight);
    }, []);

    const changeLength = (e) => {
        setPostLength(e.target.value.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch('http://localhost/api/posts/create', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Manejar la respuesta exitosa
                console.log('Post creado exitosamente');
            } else {
                // Manejar errores
                console.error('Error al crear el post');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className='createContainer'>
            <form method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className="writeZone">
                    <textarea id="postText" placeholder='Escribe algo' name='post' cols="30" rows="1" maxLength={200} onChange={changeLength}></textarea>
                    <p>{postLength}/200</p>
                </div>
                <div className="tools">
                    <label id="addImage" htmlFor='image'>Image<input type="file" name="image" id="image" accept="image/*" /></label>
                    <button id="send" type="submit">Post</button>
                </div>
            </form>
        </div>
    )
}

export default Create