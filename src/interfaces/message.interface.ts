export interface Message {
  id: string;
  text: string;
  priority: number;
  retries: number;
  maxRetries: number;
}
