// NotFoundPage.tsx
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-gray-600 mb-2">Oops! Page not found.</p>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <a href="/" className="text-blue-500 font-bold hover:underline">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
