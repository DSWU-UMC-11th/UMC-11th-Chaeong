"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "../../utils/cn";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { authApi } from "../../api/auth-api";
import { useAuthStore } from "../../stores/auth-store";
import { getFavorite } from "../../api/favorites/get-favorite";
import { useAddFavoriteMutation } from "../../hooks/use-add-favorite-mutation";
import { useDeleteFavoriteMutation } from "../../hooks/use-delete-favorite-mutation";

// 평점 응답 타입 (필드명은 API 문서에 맞춰 수정)
interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

// 토큰의 sub(회원 id) 꺼내기
function getMemberIdFromToken(token: string | null): number | null {
  if (!token) return null;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return Number(JSON.parse(atob(base64)).sub);
  } catch {
    return null;
  }
}

export function MovieDetailPage({ movieId: movieIdParam }: { movieId: string }) {
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const router = useRouter();
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);

  // ---------- 영화 정보 ----------
  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
  });
  const movie = movieDetailQuery.data;

  // ---------- 즐겨찾기 ----------
  const favoriteQuery = useQuery({
    queryKey: ["favorites", movieId],
    queryFn: () => getFavorite(movieId),
    enabled: isValidMovieId && Boolean(accessToken),
    retry: false,
  });
  const addFavoriteMutation = useAddFavoriteMutation();
  const deleteFavoriteMutation = useDeleteFavoriteMutation();

  console.log("favorite:", favoriteQuery.status, favoriteQuery.data);
  const isFavorite = favoriteQuery.data?.result.isFavorite === true;
  const isFavoritePending =
    addFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

  const handleToggleFavorite = () => {
    if (!accessToken) {
      alert("로그인이 필요해요.");
      return;
    }
    if (isFavoritePending) return;

    if (isFavorite) deleteFavoriteMutation.mutate(movieId);
    else addFavoriteMutation.mutate({ movieId });
  };

  // ---------- 평점 ----------
  const [ratingInput, setRatingInput] = useState<number | null>(null);
  const [reviewInput, setReviewInput] = useState<string | null>(null);

  const memberId = getMemberIdFromToken(accessToken);

  const ratingsQuery = useQuery({
  queryKey: ["ratings", memberId],
  queryFn: async () => {
    const res = await authApi
      .get(`members/${memberId}/ratings`)
      .json<Rating[] | { result?: Rating[] }>();

    // 배열이 그대로 오면 그대로, 감싸져 있으면 result를 꺼냄
    return Array.isArray(res) ? res : (res.result ?? []);
  },
  enabled: memberId !== null,
  retry: false,
});

  const myRating = ratingsQuery.data?.find((r) => r.movieId === movieId);

  const invalidateRatings = () =>
    queryClient.invalidateQueries({ queryKey: ["ratings"] });

  const createRatingMutation = useMutation({
    mutationFn: (body: { movieId: number; score: number; comment?: string }) =>
      authApi.post("ratings", { json: body }).json(),
    onSuccess: () => {
      invalidateRatings();
      alert("평점을 저장했어요.");
    },
    onError: () => alert("평점 저장에 실패했어요."),
  });

  const updateRatingMutation = useMutation({
    mutationFn: (v: { ratingId: number; score: number; comment?: string }) =>
      authApi
        .patch(`ratings/${v.ratingId}`, {
          json: { score: v.score, comment: v.comment },
        })
        .json(),
    onSuccess: () => {
      invalidateRatings();
      alert("평점을 수정했어요.");
    },
    onError: () => alert("평점 수정에 실패했어요."),
  });

  const deleteRatingMutation = useMutation({
    mutationFn: (ratingId: number) =>
      authApi.delete(`ratings/${ratingId}`).json(),
    onSuccess: () => {
      invalidateRatings();
      setRatingInput(null);
      setReviewInput(null);
    },
    onError: () => alert("평점 삭제에 실패했어요."),
  });

  // 입력 전에는 서버 값, 입력하면 입력값을 보여줌
  const rating = ratingInput ?? myRating?.score ?? 0;
  const reviewText = reviewInput ?? myRating?.comment ?? "";

  const isRatingPending =
    createRatingMutation.isPending ||
    updateRatingMutation.isPending ||
    deleteRatingMutation.isPending;

    const handleSaveRating = () => {
    console.log("save:", { myRating, rating, reviewText });

    if (!accessToken) {
      alert("로그인이 필요해요.");
      return;
    }
    if (rating === 0) {
      alert("별점은 필수예요.");
      return;
    }
    if (isRatingPending) return;

    if (myRating) {
      updateRatingMutation.mutate({
        ratingId: myRating.ratingId,
        score: rating,
        comment: reviewText,
      });
    } else {
      createRatingMutation.mutate({
        movieId,
        score: rating,
        comment: reviewText,
      });
    }
  };
  

  const handleDeleteRating = () => {
    if (!myRating || isRatingPending) return;
    deleteRatingMutation.mutate(myRating.ratingId);
  };

  // ---------- 조건부 렌더링 (Hook은 전부 위에 있어야 함) ----------
  if (!isValidMovieId) {
    return <main className="p-20">올바르지 않은 영화 번호예요.</main>;
  }

  if (movieDetailQuery.isPending) {
    return <main className="p-20">로딩 중...</main>;
  }

  if (movieDetailQuery.isError) {
    return <main className="p-20">영화 정보를 불러오지 못했어요.</main>;
  }

  if (!movie) {
    return <main className="p-20">영화를 찾을 수 없어요.</main>;
  }

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen bg-[#F6F7F9] pb-[60px]">
      <div
        className="relative w-full h-[360px] bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
      >
        <div className="flex flex-col justify-between items-start px-20 py-6 h-full box-border">
          <button
            className="flex flex-row items-center gap-1 bg-none border-none cursor-pointer font-semibold text-[13px] text-white"
            onClick={() => router.push("/")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>영화 목록</span>
          </button>

          <div className="flex flex-col gap-2 w-[800px]">
            <h1 className="font-semibold text-[46px] leading-[50px] tracking-[-2.3px] text-white m-0">
              {movie.title}
            </h1>
            <div className="font-medium text-sm text-white">{movie.original_title}</div>
            <div className="flex flex-row items-center gap-2 font-semibold text-[13px] text-white">
              <span>{movie.release_date}</span>
              <span>•</span>
              <span>{movie.genres.map((g) => g.name).join(" · ")}</span>
              <span>•</span>
              <span>{movie.runtime}분</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-row items-start px-20 py-6 gap-8 w-full max-w-[1440px] box-border">
        <div className="relative w-[200px] h-[286px] rounded-[10px] overflow-hidden shadow-[0px_12px_30px_rgba(12,15,20,0.12)] bg-[#F6F7F9] flex-shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>

        <section className="flex flex-col gap-3 flex-1  min-w-0">
          <h2 className="font-semibold text-[21px] leading-[25px] tracking-[-0.63px] text-[#17191E]">
            {movie.tagline}
          </h2>
          <p className="font-medium text-sm leading-6 text-[#606774]">{movie.overview}</p>
          <div className="flex mt-4">
            <button
              className={cn(
                "box-border flex flex-row justify-center items-center px-4 gap-2 h-[42px] border border-white rounded-lg text-white font-black text-sm cursor-pointer bg-[#2563EB]",
                isFavoritePending && "opacity-60 cursor-not-allowed",
              )}
              onClick={handleToggleFavorite}
              disabled={isFavoritePending}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "#FFFFFF" : "none"}>
                <path
                  d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                  stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              <span>{isFavorite ? "즐겨찾기됨" : "즐겨찾기"}</span>
            </button>
          </div>
        </section>

        <aside className="flex flex-col gap-2 w-[360px] pl-[30px] box-border">
          <h2 className="font-semibold text-[21px] text-[#17191E]">내 평점</h2>
          <p className="text-xs text-[#969DA8]">별점은 필수, 후기는 선택이에요.</p>

          <div className="flex flex-row gap-1 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="box-border flex justify-center items-center w-[38px] h-[38px] bg-white border border-[#E3E6EB] rounded-lg cursor-pointer"
                onClick={() => setRatingInput(star)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={star <= rating ? "#FFB800" : "none"}>
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    stroke={star <= rating ? "#FFB800" : "#606774"}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>

          <textarea
            className="box-border w-[329px] h-[102px] p-3 bg-white border border-[#E3E6EB] rounded-lg text-[13px] text-[#17191E] outline-none resize-none"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={reviewText}
            onChange={(e) => setReviewInput(e.target.value)}
          />

          <button
            type="button"
            className="box-border w-[329px] h-[42px] bg-[#17191E] border border-white rounded-lg font-black text-sm text-white cursor-pointer disabled:opacity-60"
            onClick={handleSaveRating}
            disabled={isRatingPending}
          >
            {myRating ? "평점 수정" : "평점 저장"}
          </button>

          {myRating && (
            <button
              type="button"
              className="box-border w-[329px] h-[42px] bg-white border border-[#D92D20] rounded-lg font-black text-sm text-[#D92D20] cursor-pointer disabled:opacity-60"
              onClick={handleDeleteRating}
              disabled={isRatingPending}
            >
              평점 삭제
            </button>
          )}
        </aside>
      </main>
    </div>
  );
}
