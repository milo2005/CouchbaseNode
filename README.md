# coffetrace v1.0.0

Trazabilidad de Cafe

- [Users](#users)
	- [Add](#add)
	- [Delete](#delete)
	- [Get User](#get-user)
	- [Get Users by Type](#get-users-by-type)
	- [Login](#login)
	- [Update User](#update-user)
	


# Users

## Add



	POST /api/v1/users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| User			| Object			|  <p>Objecto JSON</p>							|
| User._id			| String			|  <p>ID de usuario, solo en lectura</p>							|
| User.tipo			| String			|  <p>Tipo de usuario: Admin, Extensionista, Trilladora, Acopio</p>							|
| User.nombre			| String			|  <p>Nombre de usuario</p>							|
| User.documento			| String			|  <p>Documento de usuario</p>							|
| User.usuario			| String			|  <p>User Credencial de ingreso</p>							|
| User.password			| String			|  <p>Contraseña de usuario</p>							|
| User.region			| Object			|  <p>Region asignada, solo para Extensionista</p>							|
| User.region.departamento			| String			|  <p>Nombre del departamento</p>							|
| User.region.municipio			| String			|  <p>Nombre del municipio</p>							|
| User.region.region			| String			|  <p>Nombre de la region</p>							|
| User.trilladora			| String			|  <p>ID trilladora, solo para Trilladora</p>							|
| User.acopio			| String			|  <p>ID Acopio, solo para acopio</p>							|

## Delete



	DELETE /api/v1/users/:id


## Get User



	GET /api/v1/users/:id


## Get Users by Type



	GET /api/v1/users/type/:type


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| role			| String			|  <p>User's role</p>							|
| limit			| Int			|  <p>Limite de objetos retornados</p>							|
| Punto			| Int			|  <p>de iniciarl de consulta</p>							|

## Login



	POST /api/v1/users/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Credentials			| Object			|  <p>JSON object</p>							|
| Credentials.username			| String			|  <p>nombre de usuario</p>							|
| Credentials.password			| String			|  <p>contraseña de usuario</p>							|

## Update User



	PUT /api/v1/users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| User			| Object			|  <p>Objecto JSON</p>							|
| User._id			| String			|  <p>ID de usuario, solo en lectura</p>							|
| User.tipo			| String			|  <p>Tipo de usuario: Admin, Extensionista, Trilladora, Acopio</p>							|
| User.nombre			| String			|  <p>Nombre de usuario</p>							|
| User.documento			| String			|  <p>Documento de usuario</p>							|
| User.usuario			| String			|  <p>User Credencial de ingreso</p>							|
| User.password			| String			|  <p>Contraseña de usuario</p>							|
| User.region			| Object			|  <p>Region asignada, solo para Extensionista</p>							|
| User.region.departamento			| String			|  <p>Nombre del departamento</p>							|
| User.region.municipio			| String			|  <p>Nombre del municipio</p>							|
| User.region.region			| String			|  <p>Nombre de la region</p>							|
| User.trilladora			| String			|  <p>ID trilladora, solo para Trilladora</p>							|
| User.acopio			| String			|  <p>ID Acopio, solo para acopio</p>							|


