const { z } = require('zod');

/**
 * Zod Schemas for API Payload Validation in Cloud Functions
 * 
 * Ensures that incoming requests conform to strict types and length bounds
 * to prevent NoSQL injection, buffer overflows, and malformed data crashes.
 */

// Example: User Profile Update Payload
const updateUserProfileSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

// Example: AI Chat Request Payload
const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(2000, "Message too long"),
  threadId: z.string().uuid("Invalid thread ID format").optional(),
});

/**
 * Generic middleware wrapper for Firebase functions to validate payload
 */
function validatePayload(schema, data) {
  try {
    return {
      isValid: true,
      data: schema.parse(data)
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.flatten().fieldErrors
      };
    }
    return { isValid: false, errors: { _global: ["Unknown validation error"] } };
  }
}

module.exports = {
  updateUserProfileSchema,
  chatRequestSchema,
  validatePayload
};
