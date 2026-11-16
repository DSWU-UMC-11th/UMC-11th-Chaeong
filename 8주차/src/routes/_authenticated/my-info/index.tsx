// routes/_authenticated/my-info/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { MyInfoPage } from "@/pages/movies/my-info-page";

export const Route = createFileRoute("/_authenticated/my-info/")({
  component: MyInfoPage,
});