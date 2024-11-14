import { cva } from '@/lib/cva'

interface PaginationProps {
  page: number
  total: number
}

export default function Pagination({ page, total }: PaginationProps) {
  return new Array(total).fill(0).map((_, index) => (
    <figure
      key={index}
      className={cva('border border-white/50 rounded-full size-2 bg-white/0 transition-all', {
        'w-8 bg-white/50 border-white/10': page === index,
      })}
    />
  ))
}
