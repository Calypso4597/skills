import type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-3-stroke-2/CentralIconBase";
import { IconArrowLeft } from "@central-icons-react/round-outlined-radius-3-stroke-2/IconArrowLeft";
import { IconCheckmark1 } from "@central-icons-react/round-outlined-radius-3-stroke-2/IconCheckmark1";
import { IconChevronRight } from "@central-icons-react/round-outlined-radius-3-stroke-2/IconChevronRight";
import { IconClipboard } from "@central-icons-react/round-outlined-radius-3-stroke-2/IconClipboard";
import { IconDotGrid1x3Horizontal } from "@central-icons-react/round-outlined-radius-3-stroke-2/IconDotGrid1x3Horizontal";
import { IconGithub } from "@central-icons-react/round-outlined-radius-3-stroke-2/IconGithub";
import { IconMagnifyingGlass } from "@central-icons-react/round-outlined-radius-3-stroke-2/IconMagnifyingGlass";
import { IconPan } from "@central-icons-react/round-outlined-radius-3-stroke-2/IconPan";
import type { FC } from "react";
import { cn } from "@/lib/utils";

export type IconProps = CentralIconBaseProps;

function createIcon(Central: FC<CentralIconBaseProps>) {
  return function Icon({ size = 16, className, ...props }: IconProps) {
    return <Central size={size} className={cn("shrink-0", className)} {...props} />;
  };
}

/** Site icon set: Central Icons (Iconists) — round outlined, r3, stroke 2. */
export const ArrowLeft = createIcon(IconArrowLeft);
export const Checkmark = createIcon(IconCheckmark1);
export const ChevronRight = createIcon(IconChevronRight);
export const Clipboard = createIcon(IconClipboard);
export const DotGridHorizontal = createIcon(IconDotGrid1x3Horizontal);
export const Github = createIcon(IconGithub);
export const MagnifyingGlass = createIcon(IconMagnifyingGlass);
export const Pan = createIcon(IconPan);
