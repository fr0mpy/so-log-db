import Link from "next/link";
import { Routes } from "@/routes";

export { metadata } from './metadata'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@stackone-ui/core/card";
import { Badge } from "@stackone-ui/core/badge";
import { PageHeader, Stats, Grid, Card as CardStyles } from "../styles";

export default function DashboardPage() {
  return (
    <div>
      <header className={PageHeader.container}>
        <h1 className={PageHeader.title}>Dashboard</h1>
        <p className={PageHeader.description}>Overview and quick access</p>
      </header>

      <div className={Stats.grid}>
        <Card>
          <CardContent className={CardStyles.contentPadded}>
            <p className={Stats.label}>Total Logs</p>
            <p className={Stats.value}>-</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={CardStyles.contentPadded}>
            <p className={Stats.label}>Errors (24h)</p>
            <Badge variant="destructive">-</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={CardStyles.contentPadded}>
            <p className={Stats.label}>Warnings (24h)</p>
            <Badge variant="warning">-</Badge>
          </CardContent>
        </Card>
      </div>

      <div className={Grid.actionsRow}>
        <Link href={Routes.logs.index} prefetch={true}>
          <Card className={CardStyles.interactive}>
            <CardHeader>
              <CardTitle>View Logs</CardTitle>
              <CardDescription>
                Real-time log viewing with filters and streaming
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href={Routes.search} prefetch={true}>
          <Card className={CardStyles.interactive}>
            <CardHeader>
              <CardTitle>Search</CardTitle>
              <CardDescription>
                Fast local search with SQLite (1000s of items)
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
