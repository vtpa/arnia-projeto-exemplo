# Sistema de Gerenciamente de tarefas - KANBAN v1.0.0

## Entidades

Task

- title -> string[Required]
- content -> string[Required]
- status -> string[Required]: "Pending", "In Progress", "Completed"
- createdAt -> Date
- updatedAt -> Date
- user -> ObjectId [Required]

User

- name -> string[Required, minLength(3)]
- email -> string[Unique, Required]
- password -> string[Required]

## Requisitos funcionais

### Funcionalidades para o usuário não autenticado

- Deve ser possível criar um usuário, passando: name, email e password
- Deve ser possível fazer login, passando email e password, e recebendo um JWT para as demais requisições

### Funcionalidades para o usuário autenticado (Deve enviar o token JWT)

- Deve ser possível criar uma tarefa, passando: title e content. Inicialmente o status deve ser Pending (Pegar id do usuário pelo Token).
- Deve ser possível atualizar o status de uma tarefa, passando: id da tarefa e status. A campo updatedAt deve ser atualizado. O usuário logado deve ser o user da Task.
- Deve ser possível listar todas as tarefas do usuário logado.
- Deve ser possível listar as tasks ordenando por data de atualização e de criação, ASC e DESC.
- Deve ser possível listar as tasks filtrando por status.

## Requisitos não funcionais

- Utilizar Typescript e padronização de projeto (ESLint, Prettier e EditorConfig)
- Utilizar Mongo Atlas + mongoose como BD
- Atenção para o relacionamento entre User e Task, utilizar o Populate: https://mongoosejs.com/docs/populate.html
- Utilizar o bcrypt para guardar apenas o hash da senha no Banco de dados
- Utilizar Autenticação + Autorização no padrão JWT
