# Sistema de Biblioteca v1.0.0

## Entidades

Users

- fullname -> string[Required]
- role -> string[Required] "Admin", "Student"
- email -> string[Required, Unique]
- password -> string[Required]
- borrowedBooks -> Array de ObjectId, ref 'books'

Books

- title -> string[Required, minLength(3)]
- description -> string
- author -> string[Required, minLength(3)]
- releasedYear -> number[Required, positive]
- category -> string[Required, minLength(3)]
- coverPicture -> string
- loanedTo -> ObjectId | null -> Emprestado para, ref 'user'

## Requisitos funcionais

### Funcionalidades para o usuário não autenticado

- Deve ser possível criar um usuário, passando: fullname, email e password. Sempre a role será "Student"
- Deve ser possível que o usuário faça login com e-mail e senha e receba um token JWT contendo { id, role } com validade de 24 horas
- Deve ser possível listar todos os livros
- Deve ser possível listar todos os livros, filtrando os que estão disponíveis para empréstimo

### Funcionalidades para o usuário autenticado (Deve enviar o token JWT)

#### Usuário Admin

- Deve ser possivel criar um livro
- Deve ser possivel adicionar uma foto da capa via upload
- Deve ser possivel editar informações de um livro
- Deve ser possível deletar um livro, caso ele não esteja emprestado

#### Usuário Student

- Deve ser possível que o usuário logado pegue emprestado um livro que está disponível. Verificar se o livro está disponível (loanedTo === null).
- Deve ser possivel listar todos os livros que o usuario logado tem emprestado.
- Deve ser possível devolver um livro que o usuário tem emprestado. Verificar se o livro que está sendo devolvido está emprestado para o usuário que está logado.

## Requisitos não funcionais

- Utilizar Typescript e padronização de projeto (ESLint, Prettier e EditorConfig)
- Utilizar Mongo Atlas + mongoose como BD
- Atenção para o relacionamento entre User e Post, utilizar o Populate: https://mongoosejs.com/docs/populate.html
- Utilizar o bcrypt para guardar apenas o hash da senha no Banco de dados
- Utilizar Autenticação + Autorização no padrão JWT
- Utilizar o Multer para upload de imagens
