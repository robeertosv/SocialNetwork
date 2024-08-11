import React, { useEffect, useState } from 'react'
import './styles/create.scss'

const Create = () => {
    const [postLength, setPostLength] = useState(0);
    const [previewImage, setPreviewImage] = useState(null)
    const [image, setImage] = useState(null)
    const [postText, setPostText] = useState('')
    const [btnVisible, setBtnVisible] = useState(false)

    useEffect(() => {

        if(!btnVisible) {
            document.querySelector('#closePreviewBtn').style.display = 'none'
            document.querySelector('#imgPreview').style.display = 'none'
        }else {
            document.querySelector('#closePreviewBtn').style.display = 'block'
            document.querySelector('#imgPreview').style.display = 'block'
        }

        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(image)
            setBtnVisible(true)
        } else {
            setPreviewImage(null)
        }

        const textarea = document.getElementById('postText');
        const adjustHeight = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textarea.addEventListener('input', adjustHeight);
        return () => textarea.removeEventListener('input', adjustHeight);
    }, [image, btnVisible]);

    const changeLength = (e) => {
        setPostText(e.target.value)
        setPostLength(e.target.value.length);
    };

    const changePreviewImage = (e) => {
        const file = e.target.files[0]

        if (file) { setImage(file) }
    }

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

    const deleteImage = () => {
        setPreviewImage(null)
        setImage(null)
        setBtnVisible(false)
    }

    const formatText = (text) => {
        return text.replace(/#(\w+)/g, '<a href="/tags/$1">#$1</a>').replace(/@(\w+)/g, '<a href="/$1">@$1</a>');
    };

    return (
        <div className='createContainer'>
            <form method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className="writeZone">
                    <div className="imagePreview">
                        <img src={previewImage} id='imgPreview' />
                        <button onClick={deleteImage} id='closePreviewBtn'>X</button>
                    </div>
                    <textarea id="postText" placeholder='Escribe algo' name='post' cols="30" rows="1" maxLength={200} onChange={changeLength} value={postText}></textarea>
                    <p>{postLength}/200</p>
                    <div
                        className="formattedText"
                        dangerouslySetInnerHTML={{ __html: formatText(postText) }}
                    ></div>
                </div>
                <div className="tools">
                    <label id="addImage" htmlFor='image'>Image<input onChange={changePreviewImage} type="file" name="image" id="image" accept="image/*" /></label>
                    <button id="send" type="submit">Post</button>
                </div>
            </form>
        </div>
    )
}

export default Create