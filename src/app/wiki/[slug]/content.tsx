"use client";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./content.module.scss";

export interface ContentProps {
  html: string;
}

export default function Content({ html }: ContentProps) {
  const [contentEl, setContentEl] = useState<HTMLDivElement>();
  const router = useRouter();

  useEffect(() => {
    if (!contentEl) return;

    const controller = new AbortController();

    contentEl.addEventListener(
      "click",
      (ev) => {
        const link = (ev.target as HTMLElement | null)?.closest("a");
        if (!link) return;
        if (link.origin !== location.origin) return;

        ev.stopPropagation();
        ev.preventDefault();

        router.push(link.href);
      },
      {
        signal: controller.signal,
      },
    );

    return () => {
      controller.abort();
    };
  }, [contentEl, router]);

  return (
    <Box
      ref={(el: HTMLDivElement | null) => setContentEl(el || undefined)}
      className={style.content}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: 必要だから
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}