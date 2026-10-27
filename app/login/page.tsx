import AuthShowcase from "@/components/auth/AuthShowcase";
import AuthForm from "@/components/auth/AuthForm";

export const metadata = { title: "Sign in — Daybook" };

export default function LoginPage() {
  return (
    <div className="flex-1 grid md:grid-cols-2 min-h-screen">
      <AuthShowcase />
      <AuthForm />
    </div>
  );
}
