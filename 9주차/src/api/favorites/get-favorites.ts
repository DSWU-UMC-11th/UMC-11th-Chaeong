// api/favorites/get-favorites.ts  (목록, 복수)
import { authApi } from "../auth-api";
import type { Favorite } from "../../types/favorite";

interface FavoritesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Favorite[];
}

export async function getFavorites() {
  const response = await authApi.get("favorites").json<FavoritesResponse>();
  return response.result;
}
