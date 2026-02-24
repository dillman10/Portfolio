import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-start justify-center px-6">
      <div className="text-xs font-mono text-muted-foreground" data-testid="text-404-label">
        404
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight" data-testid="text-404-title">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-muted-foreground" data-testid="text-404-subtitle">
        The page youre looking for doesnt exist.
      </p>

      <Link
        href="/"
        data-testid="link-404-home"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        Go home
      </Link>
    </div>
  );
}
