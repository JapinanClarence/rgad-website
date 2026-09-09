import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@gad/components'

type PaginationNavProps = {
  currentPage: number
  totalPages: number
  basePath: string
  searchParams?: Record<string, string | undefined>
}

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | undefined>,
) {
  const params = new URLSearchParams()

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== 'page') params.set(key, value)
    }
  }

  if (page > 1) params.set('page', String(page))

  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages: Array<number | 'ellipsis'> = []
  const siblingCount = 1
  const totalVisible = siblingCount * 2 + 5

  if (totalPages <= totalVisible) {
    for (let page = 1; page <= totalPages; page++) pages.push(page)
    return pages
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1)

  pages.push(1)
  if (leftSibling > 2) pages.push('ellipsis')

  for (let page = leftSibling; page <= rightSibling; page++) pages.push(page)

  if (rightSibling < totalPages - 1) pages.push('ellipsis')
  pages.push(totalPages)

  return pages
}

export function PaginationNav({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}: PaginationNavProps) {
  if (totalPages <= 1) return null

  const pageNumbers = getPageNumbers(currentPage, totalPages)
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {hasPrevious ? (
            <Link
              href={buildHref(basePath, currentPage - 1, searchParams)}
              passHref
              legacyBehavior
            >
              <PaginationPrevious />
            </Link>
          ) : (
            <PaginationPrevious
              href="#"
              aria-disabled="true"
              tabIndex={-1}
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>

        {pageNumbers.map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Link
                href={buildHref(basePath, page, searchParams)}
                passHref
                legacyBehavior
              >
                <PaginationLink isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </Link>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          {hasNext ? (
            <Link
              href={buildHref(basePath, currentPage + 1, searchParams)}
              passHref
              legacyBehavior
            >
              <PaginationNext />
            </Link>
          ) : (
            <PaginationNext
              href="#"
              aria-disabled="true"
              tabIndex={-1}
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
