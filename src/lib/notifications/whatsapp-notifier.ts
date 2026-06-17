export interface INotificationGateway {
  sendWhatsapp(params: { phone: string; message: string }): Promise<void>;
}

export class ZApiNotificationGateway implements INotificationGateway {
  async sendWhatsapp({
    phone,
    message,
  }: {
    phone: string;
    message: string;
  }): Promise<void> {
    const url = `https://api.z-api.io/instances/3E86A554C1E621A0A4683A86B7177DC9/token/75D4195C50E56D8280010B0A/send-text`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "client-token": "F1624ce3f147e492d9fc55c0c2040f713S",
      },
      body: JSON.stringify({
        phone,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar mensagem WhatsApp: ${response.status}`);
    }
  }
}
