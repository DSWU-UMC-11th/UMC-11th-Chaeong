import { authApi } from "../auth-api";

export function getFavorite(movieId: number) {
  return authApi.get(`favorites/${movieId}`).json<{
    isSuccess: boolean;
    code: string;
    message: string;
    result: { isFavorite: boolean };
  }>();
}
