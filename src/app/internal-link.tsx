"use client";

import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import type { PropsWithChildren } from "react";

interface OwnProps {
  href: string;
}

export type InternalLinkProps = PropsWithChildren<OwnProps>;

export default function InternalLink({ children, href }: InternalLinkProps) {
  return (
    <MuiLink component={NextLink} href={href}>
      {children}
    </MuiLink>
  );
}