import nodemailer from "nodemailer";
function isEmailConfigured() {
    return Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM);
}
function createTransport() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: process.env.SMTP_USER && process.env.SMTP_PASS
            ? {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
            : undefined,
    });
}
async function sendEmail({ to, subject, text }) {
    if (!isEmailConfigured()) {
        console.warn("[email-notifier] SMTP not configured, skipping email to", to);
        return;
    }
    const transport = createTransport();
    await transport.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        text,
    });
}
export { sendEmail, isEmailConfigured };
