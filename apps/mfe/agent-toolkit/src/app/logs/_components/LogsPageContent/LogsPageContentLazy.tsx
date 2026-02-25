"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { LogsPageContent as LogsPageContentType } from "./LogsPageContent";
import { LogsSkeleton } from "../LogsSkeleton";

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>;

export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import("./LogsPageContent").then((mod) => mod.LogsPageContent),
  {
    loading: () => <LogsSkeleton />,
  },
);
