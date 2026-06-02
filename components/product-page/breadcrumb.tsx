'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface ProductBreadcrumbProps {
  items: BreadcrumbItem[]
}

export function ProductBreadcrumb({ items }: ProductBreadcrumbProps) {
  return (
    <nav className="bg-black pt-24 pb-4 px-6">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-[13px] font-sans text-[#757575]">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-3 h-3" />}
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-[#046BD2] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#CCD6DF]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
