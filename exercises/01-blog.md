# Sistema de Blog v2.0.0

## Entidades

User

- fullname -> string[Required]
- nickname -> string[Required, Unique]
- email -> string[Required, Unique]
- password -> string[Required]
- posts -> Array de ObjectId, ref 'post'

Post

- author -> ObjectId, ref 'user'
- title -> string[Required, minLength(3)]
- content -> string[Required, minLength(3)]
- likes -> number[default(0), min(0)]
- comments -> Array de ObjectId, ref 'comment'

Comments

- author -> ObjectId, ref 'user'
- post -> ObjectId, ref 'post'
- content -> string[Required, minLength(3)]

## Requisitos funcionais

### Funcionalidades para o usuário não autenticado

- Deve ser possível criar um usuário, passando: fullname, nickname, email e senha
- Deve ser possível listar todos usuários e seus posts
- Deve ser possível listar um usuário e seus posts pelo id do usuário
- Deve ser possivel listar todos os posts ordenados pela quantidade de likes (ASC e DESC)
- Deve ser possível que o usuário faça login com e-mail e senha e receba um token JWT com validade de 4 horas

### Funcionalidades para o usuário autenticado (Deve enviar o token JWT)

- Deve ser possível criar um post, passando: title e content. O Id do usuário criador do post (author) deve ser pego no token JWT.
- Deve ser possível dar like em um post (incrementando o campo likes), passando o id do post. O author não deve conseguir dar like no próprio post (USAR PATCH)
- Deve ser possível editar title e content de um post pelo id. O usuário logado deve ser o author do post (USAR PUT)
- Deve ser possível deletar um post pelo id. O usuário logado deve ser o author do post

- Deve ser possível criar um comment, passando: id do post e content. O Id do usuário criador do comment deve ser pego no token JWT.
- Deve ser possível editar content de um comment pelo id. O usuário logado deve ser o author do comment (USAR PUT)
- Deve ser possível deletar um comment pelo id. O usuário logado deve ser o author do comment

## Requisitos não funcionais

- Utilizar Typescript e padronização de projeto (ESLint, Prettier e EditorConfig)
- Utilizar Mongo Atlas + mongoose como BD
- Atenção para o relacionamento entre User e Post, utilizar o Populate: https://mongoosejs.com/docs/populate.html
- Utilizar o bcrypt para guardar apenas o hash da senha no Banco de dados
- Utilizar Autenticação + Autorização no padrão JWT
