"use client";

import { useTranslations } from "next-intl";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@stackone-ui/core";
import { HomeStyles as S } from "./styles";
import { Routes } from "../lib/routes";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className={S.main}>
      <Card className={S.card}>
        <CardHeader className={S.cardHeader}>
          <CardTitle>{t("home.title")}</CardTitle>
        </CardHeader>
        <CardContent className={S.cardContent}>
          <nav className={S.nav}>
            <Button asChild>
              <a href={Routes.agentToolkit}>{t("navigation.agentToolkit")}</a>
            </Button>
            <Button asChild variant="secondary">
              <a href={Routes.componentLibrary}>{t("navigation.componentLibrary")}</a>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </main>
  );
}
