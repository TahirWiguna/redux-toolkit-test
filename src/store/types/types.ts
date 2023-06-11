export interface User {
  id: number;
  name: string;
  username: string;
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
