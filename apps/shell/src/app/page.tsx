"use client";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@stackone-ui/core";
import { HomeStyles as S } from "./styles";

export default function HomePage() {
  return (
    <main className={S.main}>
      <Card className={S.card}>
        <CardHeader>
          <CardTitle>StackOne Shell</CardTitle>
        </CardHeader>
        <CardContent className={S.cardContent}>
          <nav className={S.nav}>
            <Button asChild>
              <a href="/connectors">Connectors</a>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </main>
  );
}
