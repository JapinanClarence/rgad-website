import { redirect } from 'next/navigation'

// The category-tab article listing that used to live here has been replaced
// by the Issues experience at /issue (Current Issue / All Articles/Issues).
// This route is kept only so old links to /articles don't break.
export default function ArticlesRedirect() {
  redirect('/issue')
}
