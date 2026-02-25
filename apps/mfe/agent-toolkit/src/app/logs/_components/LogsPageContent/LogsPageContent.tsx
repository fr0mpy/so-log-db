"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, logs } from "@stackone/i18n";
import { LogTableLazy as LogTable } from "../LogTable";
import { StatCard } from "../StatCard";
import { LogFiltersLazy as LogFilters } from "../LogFilters";
import { LogsContentSkeleton } from "../LogsContent";
import { LogsChart } from "../../../../components/LogsChart";
import { LogsContent } from "../LogsContent";
import { LogDetailDialogLazy as LogDetailDialog } from "../../../../components/LogDetailDialog";
import type { LogEntryDetail } from "../../../../components/LogDetailDialog";
import { Switch } from "@stackone-ui/core/switch";
import { Grid, LogStats, FilterRow } from "../../../../styles";
import { useLogFilters, filterLogs } from "../../_lib";

interface LogEntry {
  id: string;
  timestamp: string;
  provider: { name: string; version: string };
  originOwner: string;
  source: string;
  request: { method: string; name: string };
  duration: number;
  status: number;
}

interface LogsPageContentProps {
  logs: readonly LogEntry[];
  stats: {
    total: number;
    avgLatency: number;
    successRate: string;
    errorRate: string;
    clientErrors: number;
    serverErrors: number;
    trends: {
      totalRequests: { delta: number; isUp: boolean };
      avgLatency: { delta: number; isUp: boolean };
      successRate: { delta: number; isUp: boolean };
      errorRate: { delta: number; isUp: boolean };
    };
  };
}

/**
 * Single lazy-loaded boundary for all page content.
 * Shows LogsSkeleton until JS loads, then renders complete page.
 */
export function LogsPageContent({
  logs: logsData,
  stats,
}: LogsPageContentProps) {
  const t = useTranslations();
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  // Filter state (URL-based)
  const { filters, setDateRange, setStatus, setSearch } = useLogFilters();
  const [backgroundLogs, setBackgroundLogs] = useState(false);

  // Log detail dialog state
  const [selectedLog, setSelectedLog] = useState<LogEntryDetail | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Hover coordination between chart and table
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  // Handle row click - open dialog with selected log
  const handleRowClick = (log: LogEntry) => {
    setSelectedLog(log as LogEntryDetail);
    setIsDialogOpen(true);
  };

  // Handle navigation within dialog
  const handleNavigate = (log: LogEntryDetail) => {
    setSelectedLog(log);
  };

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const filteredLogs = filterLogs(logsData, filters);

  return (
    <>
      {/* Filters */}
      <LogFilters
        title={t(logs.title)}
        dateRange={filters.dateRange}
        status={filters.status}
        searchQuery={filters.search}
        onDateRangeChange={setDateRange}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Chart + Stats with hover coordination */}
      <LogsContent>
        {isRefreshing ? (
          <LogsContentSkeleton />
        ) : (
          <>
            <div className={Grid.chartStats}>
              {/* Chart */}
              <div className={Grid.shrinkable}>
                <LogsChart
                  logs={filteredLogs}
                  translations={{
                    success: t(logs.chart.success),
                    clientError: t(logs.chart.clientError),
                    serverError: t(logs.chart.serverError),
                  }}
                  hoveredTime={hoveredTime}
                  onHover={setHoveredTime}
                />
              </div>

              {/* Stats 2x2 Grid with controls */}
              <div className={LogStats.wrapper}>
                {/* Controls at top right */}
                <div className={LogStats.controls}>
                  <Switch
                    id="background-logs-switch"
                    checked={backgroundLogs}
                    onCheckedChange={setBackgroundLogs}
                    aria-labelledby="background-logs-label"
                    className={FilterRow.switchSmall}
                  />
                  <label
                    id="background-logs-label"
                    htmlFor="background-logs-switch"
                    className={FilterRow.labelSmallMuted}
                  >
                    {t(logs.filters.backgroundLogs)}
                  </label>
                </div>

                <div className={LogStats.grid}>
                  <StatCard
                    label={t(logs.stats.totalRequests)}
                    value={stats.total}
                    trend={{
                      delta: stats.trends.totalRequests.delta,
                      isPositive: true,
                      prefix: "+",
                      suffix: "%",
                    }}
                  />
                  <StatCard
                    label={t(logs.stats.avgLatency)}
                    value={`${stats.avgLatency}${t(logs.stats.ms)}`}
                    trend={{
                      delta: stats.trends.avgLatency.delta,
                      isPositive: false,
                      prefix: "-",
                      suffix: t(logs.stats.ms),
                    }}
                  />
                  <StatCard
                    label={t(logs.stats.successRate)}
                    value={`${stats.successRate}%`}
                    variant="success"
                    trend={{
                      delta: stats.trends.successRate.delta,
                      isPositive: true,
                      prefix: "+",
                      suffix: "%",
                    }}
                  />
                  <StatCard
                    label={t(logs.stats.errorRate)}
                    value={`${stats.errorRate}%`}
                    variant="destructive"
                    trend={{
                      delta: stats.trends.errorRate.delta,
                      isPositive: false,
                      prefix: "-",
                      suffix: "%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <LogTable
              logs={filteredLogs}
              onRowClick={handleRowClick}
              onHover={setHoveredTime}
            />
          </>
        )}
      </LogsContent>

      {/* Log Detail Dialog */}
      <LogDetailDialog
        log={selectedLog}
        logs={filteredLogs as unknown as readonly LogEntryDetail[]}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNavigate={handleNavigate}
      />
    </>
  );
}
