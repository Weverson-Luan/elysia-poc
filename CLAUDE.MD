# CLAUDE.md

Diretrizes para desenvolvimento neste projeto usando **ElysiaJS**, **Bun**, **TypeScript**, **Prisma** e **arquitetura baseada em módulos**.

## 1. Comportamento esperado

Antes de codificar:

- Entenda o problema antes de alterar arquivos.
- Declare suposições quando algo não estiver claro.
- Não invente regras de negócio.
- Não crie abstrações sem necessidade.
- Não refatore código fora do escopo solicitado.
- Prefira mudanças pequenas, objetivas e verificáveis.

Se existir dúvida relevante, pergunte antes de implementar.

---

## 2. Simplicidade primeiro

Sempre escolha a solução mais simples que resolva o problema.

Evite:

- Criar helpers genéricos para uso único.
- Criar camadas extras sem necessidade.
- Criar configurações que não foram solicitadas.
- Criar tratamento para cenários impossíveis.
- Reescrever módulos inteiros sem necessidade.

Antes de finalizar, revise se o código poderia ser menor e mais claro.

---

## 3. Arquitetura baseada em módulos

O projeto deve ser organizado por domínio/feature.

Exemplo:

```txt
src/
  modules/
    users/
      controlers
        create-user.controlers.ts
        get-all-user.controlers.ts
        get-one-user.controlers.ts
      services
        create-user.service.ts
        get-all-user.service.ts
        get-one-user.service.ts
      repositories
        create-user.repository-impl.ts
        get-all-user.repository-impl.ts
        get-one-user.repository-impl.ts
      contracts
        create-user.repository-contract.ts
        get-all-user.repository-contract.ts
        get-one-user.repository-contract.ts
      routes
        create-user.routes.ts
        get-all-user.routes.ts
        get-one-user.routes.ts
      dtos
        users.create.ts
        users.get-all.ts
      errors
        app-user.error

    auth/
      controlers
        auth-signin.controlers.ts
      services
        auth-signin.service.ts
      repositories
        auth-signin.repository-impl.ts
      contracts
        auth-signin.repository-contract.ts
      routes
        auth-signin.routes.ts
      dtos
        auth-signin.create.ts
      errors
        app-auth-signin.error

  shared/
    database/
      prisma.ts

    errors/
      app-error.ts

    http/
      response.ts

  server.ts
```

Cada módulo deve conter apenas o que pertence ao seu domínio.

---

## 4. Responsabilidade de cada arquivo

### `*.routes.ts`

Responsável por registrar as rotas do módulo no Elysia.

Não deve conter regra de negócio.

### `*.controller.ts`

Responsável por receber entrada da rota e chamar o service.

Pode lidar com:

- parâmetros da request;
- body;
- query params;
- resposta HTTP.

Não deve acessar Prisma diretamente.

### `*.service.ts`

Responsável pela regra de negócio.

Pode:

- validar regras do domínio;
- decidir fluxos;
- chamar repositories;
- lançar erros de negócio.

Não deve conhecer detalhes HTTP.

### `*.repository.ts`

Responsável pelo acesso ao banco de dados.

Pode usar Prisma diretamente.

Não deve conter regra de negócio.

### `*.schema.ts`

Responsável pelos schemas de validação do Elysia.

Use para validar:

- body;
- params;
- query;
- response quando fizer sentido.

### `*.types.ts`

Responsável por tipos locais do módulo.

Não criar tipos globais sem necessidade.

---

## 5. Regras para ElysiaJS

Ao criar rotas:

- Use plugins por módulo.
- Mantenha nomes claros.
- Evite colocar lógica dentro do handler.
- Use schemas do Elysia sempre que possível.
- Separe controller, service e repository.

Exemplo:

```ts
import { Elysia } from "elysia";
import { usersController } from "./users.controller";
import { createUserSchema } from "./users.schema";

const usersRoutes = new Elysia({ prefix: "/users" }).post(
  "/",
  usersController.create,
  {
    body: createUserSchema.body,
  },
);

export { usersRoutes };
```

---

## 6. Regras para Prisma

- Prisma deve ser acessado somente nos repositories.
- Não chamar Prisma dentro de controller.
- Não chamar Prisma diretamente em rotas.
- Não duplicar queries iguais em vários lugares.
- Nomear queries de forma clara.

Exemplo correto:

```ts
const usersRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
```

---

## 7. Padrão de nomes

Use nomes claros e descritivos.

Evite:

```ts
function handleTeste() {}
const tt = "";
const n = "";
const data = {};
```

Prefira:

```ts
function createUserAccount() {}
const userEmail = "";
const userDocument = "";
const createUserPayload = {};
```

O nome deve explicar a intenção do código.

---

## 8. Alterações cirúrgicas

Ao editar código existente:

- Altere apenas o necessário.
- Não reorganize arquivos sem solicitação.
- Não formate arquivos inteiros sem necessidade.
- Não mude padrão de código existente sem motivo.
- Remova somente imports, variáveis ou funções que sua alteração tornou inúteis.

Se encontrar código morto não relacionado, apenas mencione.

---

## 9. Critérios de sucesso

Para cada tarefa, defina o que precisa ser validado.

Exemplos:

### Criar endpoint

Critério de sucesso:

- rota criada;
- body validado;
- service chamado;
- repository acessando banco;
- resposta correta retornada.

### Corrigir bug

Critério de sucesso:

- bug reproduzido;
- causa identificada;
- alteração mínima aplicada;
- fluxo validado novamente.

### Criar módulo

Critério de sucesso:

- módulo criado com routes, controller, service, repository e schema;
- módulo registrado no servidor;
- responsabilidades separadas.

---

## 10. Fluxo recomendado para implementação

Antes de codificar, seguir:

1. Identificar o módulo afetado.
2. Entender a regra solicitada.
3. Verificar se já existe padrão parecido no projeto.
4. Aplicar a menor alteração possível.
5. Remover apenas resíduos criados pela alteração.
6. Validar se o fluxo funciona.

---

## 11. O que não fazer

Não fazer:

- Criar arquitetura nova sem pedido.
- Misturar regra de negócio com rota.
- Acessar banco no controller.
- Criar arquivos genéricos sem uso real.
- Criar mocks quando a tarefa pede implementação real.
- Alterar nomes de arquivos sem necessidade.
- Trocar biblioteca ou padrão do projeto sem aprovação.
- Criar código “preparado para o futuro”.

---

## 12. Resposta esperada do agente

Ao responder uma tarefa, use este formato quando fizer sentido:

```txt
Entendi o objetivo.

Suposições:
- ...

Plano:
1. ...
2. ...
3. ...

Critérios de sucesso:
- ...
```

Para tarefas simples, responda direto com a solução.

---

## 13. Regra principal

Código bom neste projeto é:

- simples;
- modular;
- legível;
- com responsabilidade bem separada;
- sem abstração desnecessária;
- fácil de remover ou evoluir depois.

```

```
