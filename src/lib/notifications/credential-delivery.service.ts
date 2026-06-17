import { sendEmail } from "./email-notifier";
import { sendWhatsApp } from "./whatsapp-notifier";

type DeliverCredentialsInput = {
  name: string;
  email: string;
  phone: string | null;
  password: string;
};

function buildCredentialMessage({
  name,
  email,
  password,
}: DeliverCredentialsInput): string {
  return [
    `Olá ${name},`,
    "",
    "Seguem seus dados de acesso:",
    `E-mail: ${email}`,
    `Senha temporária: ${password}`,
    "",
    "Altere sua senha após o primeiro login.",
  ].join("\n");
}

async function deliverCredentials(
  input: DeliverCredentialsInput,
): Promise<void> {
  const message = buildCredentialMessage(input);

  await sendEmail({
    to: input.email,
    subject: "Seus dados de acesso",
    text: message,
  });

  if (input.phone) {
    await sendWhatsApp({
      phone: input.phone,
      text: message,
    });
  }
}

export { deliverCredentials, buildCredentialMessage };
