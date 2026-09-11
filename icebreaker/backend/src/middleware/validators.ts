import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema, ZodError } from 'zod';

/**
 * Zod validation middleware for Express routes.
 * Prevents NoSQL/SQL Injection and malformed data at the edge.
 */
export const validate = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: (error as any).errors || error.issues,
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error during validation',
      });
    }
  };
};

/**
 * Example schema for user registration
 */
export const userRegistrationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
});
