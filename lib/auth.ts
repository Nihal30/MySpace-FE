export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

const API = process.env.NEXT_PUBLIC_API_URL; // e.g. http://localhost:4000/api
export const AUTH_COOKIE = "daybook_token";

/**
 * Mock mode (no NEXT_PUBLIC_API_URL): fakes a successful call and sets a
 * client-side cookie so middleware.ts lets you through.
 * Real mode: BE should set an httpOnly cookie named `daybook_token` itself.
 */
async function request(path: "login" | "register", body: Record<string, string>): Promise<AuthUser> {
  if (!API) {
    await new Promise((r) => setTimeout(r, 700));
    document.cookie = `${AUTH_COOKIE}=mock; path=/; max-age=${60 * 60 * 24 * 7}`;
    return { id: "mock-user", email: body.email, name: body.name };
  }

  const res = await fetch(`${API}/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // BE sets the httpOnly JWT cookie
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? "Something went wrong. Try again.");
  return data.user as AuthUser;
}

export const login = (email: string, password: string) => request("login", { email, password });
export const register = (name: string, email: string, password: string) =>
  request("register", { name, email, password });
