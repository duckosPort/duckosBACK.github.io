declare module '@emailjs/browser' {
  export interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  export function send(
    serviceID: string,
    templateID: string,
    templateParams?: Record<string, any>,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;
}