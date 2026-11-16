// routes/_authenticated/my-info/edit.tsx  ← 새로 만들기
import { createFileRoute } from "@tanstack/react-router";
import { MyInfoEditPage } from "@/pages/movies/my-info-edit-page";

export const Route = createFileRoute("/_authenticated/my-info/edit")({
  component: MyInfoEditPage,
});