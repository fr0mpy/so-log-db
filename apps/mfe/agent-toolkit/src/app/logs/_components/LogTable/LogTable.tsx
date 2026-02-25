"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTranslations, logs, aria } from "@stackone/i18n";
import { getTimeSlot } from "@stackone/utils/formatters";
import { cn } from "@stackone-ui/core/utils";
import { Card } from "@stackone-ui/core/card";
import { Paper } from "@stackone-ui/core/paper";
import { usePagination, TablePagination } from "@stackone-ui/core/pagination";
import { SelectCompound as Select } from "@stackone-ui/core/select";
import { useToast } from "@stackone-ui/core/toast";
import { useListKeyboardNavigation } from "@stackone-ui/core/hooks";
import { PAGINATION, TABLE, TOAST_DURATION } from "../../../../config";
import { LogTableSkeleton } from "./LogTableLazy";
import { LOG_TABLE_COLUMNS } from "./columns";
import { LogTableRow } from "./LogTableRow";
import { SortableHeader } from "../../../../components/SortableHeader";
import { replayRequest } from "../../actions";
import { useTableSort } from "../../../../hooks";
import type { LogEntry } from "../../_lib";
import {
  DataTable,
  LogTableColumns,
  LogPagination,
  PaginationSelect,
} from "../../../../styles";

interface LogTableProps {
  logs: readonly LogEntry[];
  /** Callback when a row is clicked */
  onRowClick?: (log: LogEntry) => void;
  /** Callback when a row is hovered (for chart coordination) */
  onHover?: (time: string | null) => void;
}

export function LogTable({
  logs: logEntries,
  onRowClick,
  onHover,
}: LogTableProps) {
  const t = useTranslations();
  const { addToast, removeToast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sorting state - default to newest first
  const { sortedData, sortState, handleSort } = useTableSort(logEntries, {
    column: "requested",
    direction: "desc",
  });

  // Scroll to top callback for pagination
  const scrollToTop = useCallback(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 });
  }, []);

  // Pagination state using shared hook
  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedData: paginatedLogs,
    goToPage,
    setPageSize,
  } = usePagination(sortedData, {
    defaultPageSize: PAGINATION.defaultPageSize,
    onPageChange: scrollToTop,
    resetDeps: [sortState.column, sortState.direction],
  });

  // Keyboard navigation for roving tabindex pattern
  const {
    focusedIndex: focusedRowIndex,
    handleKeyDown: handleTableKeyDown,
    handleActionKeyDown,
  } = useListKeyboardNavigation({
    items: paginatedLogs,
    containerRef: scrollContainerRef,
    onSelect: onRowClick,
    resetDeps: [currentPage, pageSize],
  });

  // Track if component is mounted to prevent flash of empty content
  const [isMounted, setIsMounted] = useState(false);

  // Virtualize rows for performance
  const virtualizer = useVirtualizer({
    count: paginatedLogs.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => TABLE.rowHeight,
    overscan: TABLE.overscan,
  });

  const handleRowMouseEnter = (timestamp: string) => {
    onHover?.(getTimeSlot(timestamp));
  };

  const handleRowMouseLeave = () => {
    onHover?.(null);
  };

  const handleReplay = async (logId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const loadingId = addToast({
      variant: "loading",
      position: "bottom-right",
      title: t(logs.actions.replayLoading),
      duration: TOAST_DURATION.loading,
    });

    const result = await replayRequest(logId);

    if (result.success) {
      addToast({
        variant: "success",
        position: "bottom-right",
        title: t(logs.actions.replaySuccess),
        duration: TOAST_DURATION.success,
      });
    } else {
      addToast({
        variant: "destructive",
        position: "bottom-right",
        title: t(logs.actions.replayError),
        description: result.error,
        duration: TOAST_DURATION.error,
      });
    }

    setTimeout(() => removeToast(loadingId), TOAST_DURATION.cleanup);
  };

  // Set mounted after first render to prevent flash of empty content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show skeleton during virtualizer initialization to prevent flash of empty content
  // The virtualizer needs one render cycle to measure the scroll container
  if (!isMounted) {
    return <LogTableSkeleton />;
  }

  const rowClasses = [DataTable.rowWrapper, DataTable.row].join(" ");

  return (
    <div className={DataTable.scrollWrapper}>
      <Card className={DataTable.headerCard} data-ui="header">
        <div className={DataTable.header} data-ui="header-inner">
          <div className={DataTable.headerRow} data-ui="header-row">
            {LOG_TABLE_COLUMNS.map(({ id, labelKey, className }) => (
              <SortableHeader
                key={id}
                column={id}
                sortState={sortState}
                onSort={handleSort}
                className={className}
                ariaLabel={t(aria.sortByColumn, { column: t(labelKey) })}
              >
                {t(labelKey)}
              </SortableHeader>
            ))}
            <div
              className={cn(DataTable.headerCell, LogTableColumns.actions)}
              data-ui="hcell-actions"
            />
          </div>
        </div>
      </Card>

      {/* Virtualized Scrollable Body */}
      <Paper className={DataTable.bodyPaper} data-ui="body">
        <div
          id="table"
          ref={scrollContainerRef}
          className={DataTable.scrollArea}
          data-ui="scroll-area"
          tabIndex={0}
          role="grid"
          aria-label={t(aria.viewLogDetails)}
          aria-rowcount={paginatedLogs.length}
          onKeyDown={handleTableKeyDown}
        >
          {/* Total height container for scroll */}
          <div
            style={{
              height:
                virtualizer.getTotalSize() > 0
                  ? `${virtualizer.getTotalSize()}px`
                  : "auto",
              width: "100%",
              position: "relative",
            }}
          >
            {/* Render visible rows */}
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const log = paginatedLogs[virtualRow.index];
              return (
                <LogTableRow
                  key={log.id}
                  log={log}
                  index={virtualRow.index}
                  isFocused={focusedRowIndex === virtualRow.index}
                  rowClasses={rowClasses}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onMouseEnter={() => handleRowMouseEnter(log.timestamp)}
                  onMouseLeave={handleRowMouseLeave}
                  onClick={() => onRowClick?.(log)}
                  onReplay={handleReplay}
                  onActionKeyDown={handleActionKeyDown}
                />
              );
            })}
          </div>
        </div>
      </Paper>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={PAGINATION.pageSizeOptions}
        onPageChange={goToPage}
        onPageSizeChange={setPageSize}
        labels={{
          showCount: (count) => t(logs.pagination.show, { count }),
          pageSizeAriaLabel: t(logs.pagination.showRowsPerPage),
          paginationAriaLabel: t(aria.pagination),
        }}
        className={LogPagination.container}
        controlsClassName={LogPagination.controls}
        renderPageSizeSelector={({ pageSize: size, options, onChange, ariaLabel, label }) => (
          <Select.Root
            value={String(size)}
            onValueChange={(value) => onChange(Number(value))}
            triggerMode="hover"
            width="auto"
            placement="top"
            variant="ghost"
          >
            <Select.Trigger aria-label={ariaLabel}>
              <span className={PaginationSelect.triggerText}>{label}</span>
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <div className={PaginationSelect.optionsContainer}>
                    {options.map((opt) => (
                      <Select.Option key={opt} value={String(opt)}>
                        {opt}
                      </Select.Option>
                    ))}
                  </div>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        )}
      />
    </div>
  );
}
