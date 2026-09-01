import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-semibold" style={{ color: "#051895" }}>
        404
      </h1>
      <p className="mt-3 text-lg text-gray-500">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        style={{ backgroundColor: "#051895" }}
      >
        Back to Home
      </Link>
    </div>
  );
}