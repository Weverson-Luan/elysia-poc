import type { Messages } from "../locale";

export const ptBR: Messages = {
  validation: {
    failed: "Dados inválidos",
    required: "{field} é obrigatório",
    invalidEmail: "E-mail inválido",
    invalidPhone: "Telefone inválido",
    minLength: "{field} deve ter no mínimo {min} caracteres",
    invalidType: "{field} possui um valor inválido",
  },
  fields: {
    name: "Nome",
    email: "E-mail",
    password: "Senha",
    phone: "Telefone",
  },
  errors: {
    userAlreadyExists: "Usuário já existe",
    userNotFound: "Usuário não encontrado",
    invalidUserData: "Dados do usuário inválidos",
    unauthorized: "Não autorizado",
    rateLimitExceeded: "Aguarde alguns minutos antes de solicitar novamente.",
    internalServerError: "Erro interno do servidor",
  },
  success: {
    healthOk: "Serviço disponível",
    userRegistered: "Usuário registrado com sucesso",
    userCreated: "Usuário criado com sucesso",
    userProfile: "Perfil retornado com sucesso",
    userUpdated: "Usuário atualizado com sucesso",
    usersList: "Lista de usuários retornada com sucesso",
    credentialsSent:
      "Se o e-mail existir em nossa base, você receberá seus dados de acesso em breve.",
  },
};
