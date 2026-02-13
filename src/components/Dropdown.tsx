import { useEffect, useRef, type ReactNode } from 'react'

interface DropdownProps {
  isOpen: boolean
  onClose: () => void
  anchor: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
  contentClassName?: string
}

export function Dropdown({
  isOpen,
  onClose,
  anchor,
  children,
  align = 'left',
  className = '',
  contentClassName = '',
}: DropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {anchor}
      {isOpen && (
        <div
          role="menu"
          className={`absolute top-full left-0 mt-1 z-50 min-w-[220px] py-1 bg-white rounded-lg shadow-lg border border-gray-200 ${align === 'right' ? 'left-auto right-0' : ''} ${contentClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
