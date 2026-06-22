import { sendEmail } from "./email-notifier";
import { ZApiNotificationGateway } from "./whatsapp-notifier";
const whatsappGateway = new ZApiNotificationGateway();
function buildCredentialMessage({ name, email, password, }) {
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
async function deliverCredentials(input) {
    const message = buildCredentialMessage(input);
    await sendEmail({
        to: input.email,
        subject: "Seus dados de acesso",
        text: message,
    });
    if (input.phone) {
        await whatsappGateway.sendWhatsapp({
            phone: input.phone,
            message,
        });
    }
}
export { deliverCredentials, buildCredentialMessage };
