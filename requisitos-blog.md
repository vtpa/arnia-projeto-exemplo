# Sistema de Blog v1.0.0

## Entidades

User

- fullname -> string[Required]
- nickname -> string[Required, Unique]
- email -> string[Unique]
- password -> string[Required]
- posts -> Array de ObjectId

Post

- title -> string[Required, minLength(3), ]
- content -> string[Required, minLength(3)]
- likes -> number[default(0), min(0)]

## Requisitos funcionais

### Funcionalidades para o usuário não autenticado

- Deve ser possível criar um usuário, passando: fullname, nickname, email e senha
- Deve ser possível listar todos usuários e seus posts
- Deve ser possível listar um usuário e seus posts pelo id do usuário
- Deve ser possivel listar todos os posts ordenados pela quantidade de likes (ASC e DESC)
- Deve ser possível que o usuário faça login com e-mail e senha e receba um token JWT com validade de 4 horas

### Funcionalidades para o usuário autenticado (Deve enviar o token JWT)

- Deve ser possível criar um post, passando: title e content. O Id do usuário criador do post deve ser pego no token JWT.
- Deve ser possível dar like em um post (incrementando o campo likes), passando o id do post. (USAR PATCH)
- Deve ser possível editar title e content de um post pelo id (USAR PUT)
- Deve ser possível deletar um post pelo id

## Requisitos não funcionais

- Utilizar Typescript e padronização de projeto (ESLint, Prettier e EditorConfig)
- Utilizar Mongo Atlas + mongoose como BD
- Atenção para o relacionamento entre User e Post, utilizar o Populate: https://mongoosejs.com/docs/populate.html
- Utilizar o bcrypt para guardar apenas o hash da senha no Banco de dados
- Utilizar Autenticação + Autorização no padrão JWT
