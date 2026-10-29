import { NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';

type RequestHandler<T> = (data: T, req: Request) => Promise<NextResponse>;

export function withValidation<T>(schema: ZodSchema<T>, handler: RequestHandler<T>) {
  return async (req: Request) => {
    try {
      const body = await req.json();
      const result = schema.safeParse(body);
      
      if (!result.success) {
        return NextResponse.json(
          { error: 'Validation Error', details: result.error.errors },
          { status: 400 }
        );
      }
      
      return await handler(result.data, req);
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }
  };
}
