import { createClient } from "@gad/supabase/server";
import { loginSchema, type LoginInput } from "@gad/schema";

type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function loginWithPassword(
  input: LoginInput,
): Promise<ServiceResult<{ userId: string; email: string | null }>> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid credentials",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { success: false, error: error?.message ?? "Login failed" };
  }

  return {
    success: true,
    data: { userId: data.user.id, email: data.user.email ?? null },
  };
}

export async function logout(): Promise<ServiceResult<null>> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
}

export async function getCurrentSession(): Promise<
  ServiceResult<{ userId: string; email: string | null } | null>
> {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return { success: false, error: error.message };
  }

  if (!session) {
    return { success: true, data: null };
  }

  return {
    success: true,
    data: { userId: session.user.id, email: session.user.email ?? null },
  };
}
