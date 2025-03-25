import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  children: React.ReactNode
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode
  isCurrentPage?: boolean
}

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  children: React.ReactNode
  as?: React.ElementType
}

export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  )
}

export function BreadcrumbItem({
  children,
  className,
  isCurrentPage,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li
      className={cn(
        "inline-flex items-center",
        isCurrentPage && "text-gray-900 font-medium",
        className
      )}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
    >
      {children}
    </li>
  )
}

export function BreadcrumbLink({
  children,
  as: Component = "a",
  className,
  ...props
}: BreadcrumbLinkProps) {
  return (
    <Component
      className={cn(
        "hover:text-gray-900 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
