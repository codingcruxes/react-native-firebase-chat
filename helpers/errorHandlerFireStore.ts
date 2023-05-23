export default function errorHandler(error: unknown): string {
  if (typeof error === 'string') return error;

  if (error instanceof Error) return error.message;

  return 'Uncaught exception connecting to firestore. Please reset application.';
}
