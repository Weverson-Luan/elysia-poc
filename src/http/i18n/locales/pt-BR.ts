import type { Messages } from "../locale";

export const ptBR: Messages = {
  validation: {
    failed: "Dados inválidos",
    required: "{field} é obrigatório",
    invalidEmail: "E-mail inválido",
    minLength: "{field} deve ter no mínimo {min} caracteres",
    invalidType: "{field} possui um valor inválido",
  },
  fields: {
    name: "Nome",
    email: "E-mail",
    password: "Senha",
  },
  errors: {
    userAlreadyExists: "Usuário já existe",
    invalidUserData: "Dados do usuário inválidos",
    unauthorized: "Não autorizado",
    internalServerError: "Erro interno do servidor",
  },
  success: {
    healthOk: "Serviço disponível",
    userRegistered: "Usuário registrado com sucesso",
    userCreated: "Usuário criado com sucesso",
    userProfile: "Perfil retornado com sucesso",
    usersList: "Lista de usuários retornada com sucesso",
  },
};
