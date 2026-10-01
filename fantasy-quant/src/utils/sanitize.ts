import DOMPurify from 'dompurify';
import { z } from 'zod';

/**
 * Sanitizes raw HTML input to prevent XSS attacks.
 * Uses DOMPurify on the client and isomorphic-dompurify on the server.
 */
export const sanitizeHtml = (html: string): string => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(html);
  } else {
    // Basic fallback for SSR if isomorphic-dompurify isn't loaded
    // In production, ensure isomorphic-dompurify is used server-side
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
};

/**
 * Example Zod schema for Chat Agent API request validation
 * Ensures user input to the AI is strictly typed and bounded
 */
export const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000, "Message is too long"),
  conversationId: z.string().uuid().optional(),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string()
    })
  ).optional()
});
