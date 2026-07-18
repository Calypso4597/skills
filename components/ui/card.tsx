import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Card({
  className,
  size = "default",
  ...props
}: ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex min-w-0 w-full max-w-full flex-col gap-4 overflow-hidden rounded-xl border-0 py-4 text-foreground has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex w-full min-w-0 max-w-full flex-col gap-2 rounded-t-xl px-4",
        className,
      )}
      {...props}
    />
  );
}

function CardHeaderRow({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header-row"
      className={cn(
        "flex w-full min-w-0 max-w-full flex-row items-baseline justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "min-w-0 flex-1 text-[14px] font-medium leading-[150%] break-words text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "w-full min-w-0 max-w-full text-[12px] leading-[150%] break-words text-muted",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="card-action" className={cn("shrink-0", className)} {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardHeaderRow,
  CardTitle,
  CardAction,
  CardDescription,
};
