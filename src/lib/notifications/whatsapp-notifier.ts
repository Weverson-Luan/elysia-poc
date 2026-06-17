type SendWhatsAppInput = {
  phone: string;
  text: string;
};

export interface INotificationGateway {
  sendWhatsapp(params: { phone: string; message: string }): Promise<void>;
}

function isWhatsAppConfigured(): boolean {
  return Boolean(
    process.env.EVOLUTION_API_URL &&
    process.env.EVOLUTION_API_KEY &&
    process.env.EVOLUTION_INSTANCE_NAME,
  );
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

async function sendWhatsApp({ phone, text }: SendWhatsAppInput): Promise<void> {
  if (!isWhatsAppConfigured()) {
    console.warn(
      "[whatsapp-notifier] Evolution API not configured, skipping WhatsApp to",
      phone,
    );
    return;
  }

  const baseUrl = process.env.EVOLUTION_API_URL!.replace(/\/$/, "");
  const instanceName = process.env.EVOLUTION_INSTANCE_NAME!;
  const url = `${baseUrl}/message/sendText/${instanceName}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.EVOLUTION_API_KEY!,
    },
    body: JSON.stringify({
      number: normalizePhone(phone),
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Evolution API error (${response.status}): ${body || response.statusText}`,
    );
  }
}

export class ZApiNotificationGateway implements INotificationGateway {
  async sendWhatsapp({
    phone,
    message,
  }: {
    phone: string;
    message: string;
  }): Promise<void> {
    const response = await fetch(
      "https://api.z-api.io/instances/3E86A554C1E621A0A4683A86B7177DC9/token/75D4195C50E56D8280010B0A/send-text",
      {
        method: "POST",
        headers: {
          "client-token": "F1624ce3f147e492d9fc55c0c2040f713S",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          message,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro ao enviar mensagem WhatsApp: ${response.status}`);
    }
  }
}

export { sendWhatsApp, isWhatsAppConfigured, normalizePhone };
