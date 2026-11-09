import { createFileRoute } from '@tanstack/react-router'
import { MyInfoEditPage } from '../pages/movies/my-info-edit-page'

export const Route = createFileRoute('/my-info/edit')({
  component: MyInfoEditPage,
})