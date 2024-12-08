import { type ZodObject, type ZodRawShape } from 'zod';
import { useParams } from 'react-router-dom';

export function useValidatedUrlParams<T>(schema: ZodObject<ZodRawShape>) {
  const params = useParams();

  const validatedParams = schema.safeParse(params);

  if (!validatedParams.success) {
    throw new Error('Something seems wrong with the URL. Please check and try again.');
  }

  return validatedParams.data as T;
}
