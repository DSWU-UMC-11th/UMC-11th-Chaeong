import { createFileRoute } from '@tanstack/react-router'
import { MyInfoPage } from '../pages/movies/my-info-page'

export const Route = createFileRoute('/my-info/')({
  component: MyInfoPage,
})
