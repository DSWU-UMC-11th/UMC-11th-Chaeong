// api/favorites/add-favorite.ts
import { authApi } from "../auth-api";

export function addFavorite(body: { movieId: number }) {
  return authApi.post("favorites", { json: body }).json();
}