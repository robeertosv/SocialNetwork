# Social Network

## _Red social parecida a X (Twitter)_

# Funcionalidades

    -   Crear cuenta
    -   Login
    -   Crear post (solo texto o texto + imagen)
    -   Seguir cuentas
    -   Solicitud de seguimiento a cuentas privadas
    -   Ver seguidores y seguidos de otras cuentas
    -   Añadir comentarios
    -   Eliminar posts
    -   Añadir iconos

# Por hacer
    -   Like en los posts
    -   Admin panel (banear / verificar cuentas)
    -   Feed (Mostrar los posts de las cuentas que sigues ordenados por fecha, paginación de resultados, o mostrar los posts de las cuentas que sigues o publicas que contengan una palabra o hashtag)

# Instalación y uso

## Requisitos

    -   NodeJS
    -   npm
    -   MongoDB (con una db llamada social)

## Instalación

```bash

git clone https://github.com/robeertosv/SocialNetwork.git


cd frontend 
npm install
npm start

cd ../server
npm install
npm start

cd C:\<TuRuta>\MongoDB\7.0\Server\bin
.\mongod.exe
```

En la carpeta server poner un archivo .env similar a este

```bash

PORT=80
DB_URI=mongodb://localhost:27017/social
API_KEY=<Tu API key> # (La mia la generé con openssl rand -base64 32)

```

Se puede usar en http://localhost:9000 (farm) o compilar el frontend con 
```bash

cd frontend
npm run build
```
y usar la web en http://localhost (puerto especificado en .env)
