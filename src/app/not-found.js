// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700">Oops! The page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500 hover:underline mt-4">
        Go back to Home
      </Link>
    </div>
  );
}
