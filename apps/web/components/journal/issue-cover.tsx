import React from 'react'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IssueCoverProps {
  volume: number
  issueNo: number
  theme?: string | null
  coverImage?: string | null
  className?: string
  priority?: boolean
}

/**
 * Journal issue cover, always rendered at a fixed 2:3 (width:height) ratio —
 * the standard aspect ratio for print/journal cover pages.
 */
export function IssueCover({
  volume,
  issueNo,
  theme,
  coverImage,
  className,
  priority,
}: IssueCoverProps) {
  return (
    <div
      className={cn(
        'relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-border',
        className,
      )}
    >
      {coverImage ? (
        <Image
          src={coverImage}
          alt={`Cover — Volume ${volume}, Issue ${issueNo}`}
          fill
          priority={priority}
          className="object-cover"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        />
      ) : (
        <div className="gad-gradient absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <BookOpen className="h-7 w-7 text-white/70 mb-4" />
          <p className="text-white/70 text-[10px] font-medium uppercase tracking-widest mb-3">
            Gender Research &amp; Policy Journal
          </p>
          <p className="font-display text-3xl font-bold leading-none text-white">
            Vol. {volume}
          </p>
          <p className="font-display text-base text-white/90 mt-1 mb-4">
            Issue {issueNo}
          </p>
          {theme && (
            <p className="text-white/80 text-xs leading-snug line-clamp-4">
              {theme}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
