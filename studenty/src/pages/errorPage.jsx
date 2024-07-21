import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-700 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default ErrorPage;
