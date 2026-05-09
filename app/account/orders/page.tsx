"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrder } from "@/hooks/use-order";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { Order } from "@/types/order.type";
import {
  ArrowDownUp,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Loader2,
  Package,
  Search,
  ShoppingBag,
  Truck,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const ORDERS_PER_PAGE = 10;

const STATUS_OPTIONS = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ xác nhận", value: "pending" },
  { label: "Đã xác nhận", value: "confirmed" },
  { label: "Đã giao hàng", value: "delivered" },
  { label: "Đã hủy", value: "cancelled" },
] as const;

const TIME_PERIODS = [
  { label: "30 ngày qua", days: 30 },
  { label: "3 tháng qua", days: 90 },
  { label: "6 tháng qua", days: 180 },
  { label: "1 năm qua", days: 365 },
];

type SortOption = "newest" | "oldest" | "price_desc" | "price_asc";
type StatusFilter = "all" | Order["status"];
type TimePeriod = number | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="h-3.5 w-3.5" />;
    case "confirmed":
      return <Truck className="h-3.5 w-3.5" />;
    case "delivered":
      return <CheckCircle className="h-3.5 w-3.5" />;
    case "cancelled":
      return <XCircle className="h-3.5 w-3.5" />;
    default:
      return <Package className="h-3.5 w-3.5" />;
  }
};

const STATUS_STYLES: Record<Order["status"], string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABELS: Record<Order["status"], string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  delivered: "Đã giao hàng",
  cancelled: "Đã hủy",
};

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Mới nhất",
  oldest: "Cũ nhất",
  price_desc: "Giá cao nhất",
  price_asc: "Giá thấp nhất",
};

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Order["status"] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 font-bold h-6 border-0",
        STATUS_STYLES[status],
      )}
    >
      {getStatusIcon(status)}
      {STATUS_LABELS[status]}
    </Badge>
  );
}

function PaymentBadge({ status }: { status: Order["payment_status"] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-bold h-6 border-0",
        status === "paid"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700",
      )}
    >
      {status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
    </Badge>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <TableRow>
      <TableCell colSpan={6} className="py-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">
              {hasFilters ? "Không tìm thấy đơn hàng" : "Chưa có đơn hàng nào"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {hasFilters
                ? "Thử thay đổi bộ lọc để xem thêm kết quả"
                : "Hãy bắt đầu mua sắm và đơn hàng sẽ hiện ở đây"}
            </p>
          </div>
          {!hasFilters && (
            <Button asChild size="sm" className="mt-4">
              <Link href="/products">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Mua sắm ngay
              </Link>
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function OrdersPage() {
  const { orders, error, isLoading } = useOrder();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const orderList: Order[] = useMemo(() => orders?.data?.data ?? [], [orders]);

  const filteredOrders = useMemo(() => {
    if (!orderList.length) return [];

    let result = [...orderList];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((o) =>
        o.order_number.toLowerCase().includes(term),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }

    if (timePeriod) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - timePeriod);
      result = result.filter((o) => new Date(o.created_at) >= cutoff);
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "price_desc":
          return Number(b.total) - Number(a.total);
        case "price_asc":
          return Number(a.total) - Number(b.total);
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, statusFilter, timePeriod, sortOption, orderList]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ORDERS_PER_PAGE),
  );

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyStatusFilter = (value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const applyTimePeriod = (days: number) => {
    setTimePeriod((prev) => (prev === days ? null : days));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTimePeriod(null);
    setSortOption("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" || statusFilter !== "all" || timePeriod !== null;

  if (error) {
    return (
      <Card className="w-full shadow-sm">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-7 w-7 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Có lỗi xảy ra
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.
          </p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Theo dõi và quản lý tất cả đơn hàng của bạn
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/products">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Tiếp tục mua sắm
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <aside className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                Bộ lọc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  Trạng thái
                </p>
                <div className="space-y-1">
                  {STATUS_OPTIONS.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => applyStatusFilter(value as StatusFilter)}
                      className={cn(
                        "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors font-medium",
                        statusFilter === value
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  Khoảng thời gian
                </p>
                <div className="space-y-1">
                  {TIME_PERIODS.map(({ label, days }) => (
                    <button
                      key={days}
                      onClick={() => applyTimePeriod(days)}
                      className={cn(
                        "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors font-medium",
                        timePeriod === days
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <>
                  <div className="border-t border-gray-100" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-gray-500 hover:text-gray-700 font-medium"
                    onClick={clearFilters}
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    Xóa bộ lọc
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </aside>

        <main className="xl:col-span-3 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              <Input
                placeholder="Tìm theo mã đơn hàng..."
                className="pl-9 bg-white border-gray-200 shadow-sm focus-visible:ring-primary h-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="shrink-0 bg-white border-gray-200 shadow-sm gap-2 h-10 font-medium"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {SORT_LABELS[sortOption]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(
                  ([value, label]) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => {
                        setSortOption(value);
                        setCurrentPage(1);
                      }}
                      className={cn(
                        "cursor-pointer font-medium",
                        sortOption === value
                          ? "text-primary font-bold bg-primary/5"
                          : "",
                      )}
                    >
                      {label}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card className="shadow-sm border-gray-200/80 overflow-hidden">
            <CardHeader className="bg-gray-50/50 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">
                    Lịch sử đơn hàng
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {isLoading
                      ? "Đang tải..."
                      : filteredOrders.length > 0
                        ? `${(currentPage - 1) * ORDERS_PER_PAGE + 1}–${Math.min(currentPage * ORDERS_PER_PAGE, filteredOrders.length)} / ${filteredOrders.length} đơn hàng`
                        : "0 đơn hàng"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-7 w-7 animate-spin text-primary/60" />
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/30 hover:bg-gray-50/30">
                          <TableHead className="font-bold text-gray-900 px-6 h-11">
                            Mã đơn hàng
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 px-4 h-11">
                            Ngày đặt
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 px-4 h-11">
                            Thanh toán
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 px-4 h-11">
                            Tổng tiền
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 px-4 h-11">
                            Trạng thái
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 text-right pr-6 h-11">
                            Thao tác
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedOrders.length > 0 ? (
                          paginatedOrders.map((order: Order) => (
                            <TableRow
                              key={order.id}
                              className="hover:bg-gray-50/50 transition-colors"
                            >
                              <TableCell className="px-6 py-4 whitespace-normal">
                                <Link
                                  href={`/account/orders/${order.order_number}`}
                                  className="font-mono text-sm font-bold text-primary hover:underline underline-offset-4"
                                >
                                  #{order.order_number}
                                </Link>
                              </TableCell>
                              <TableCell className="px-4 py-4 whitespace-normal text-sm text-gray-600 font-medium">
                                {formatDate(order.created_at)}
                              </TableCell>
                              <TableCell className="px-4 py-4 whitespace-normal">
                                <PaymentBadge status={order.payment_status} />
                              </TableCell>
                              <TableCell className="px-4 py-4 whitespace-normal font-bold text-gray-900">
                                {formatPrice(Number(order.total))}
                              </TableCell>
                              <TableCell className="px-4 py-4 whitespace-normal">
                                <StatusBadge status={order.status} />
                              </TableCell>
                              <TableCell className="text-right pr-6 py-4">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  asChild
                                  className="h-8 px-3 text-gray-600 hover:text-primary hover:bg-primary/5 font-medium"
                                >
                                  <Link
                                    href={`/account/orders/${order.order_number}`}
                                  >
                                    <Eye className="h-4 w-4 mr-1.5" />
                                    Chi tiết
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <EmptyState hasFilters={hasActiveFilters} />
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && filteredOrders.length > 0 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
                      <p className="text-xs text-gray-500 font-medium">
                        Trang {currentPage} / {totalPages}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="h-8 px-3 text-xs font-medium"
                        >
                          Trước
                        </Button>

                        <div className="flex items-center gap-1 mx-2">
                          {getPageNumbers(currentPage, totalPages).map(
                            (page, index) =>
                              page === "..." ? (
                                <span
                                  key={`ellipsis-${index}`}
                                  className="px-1.5 text-gray-400 text-sm select-none"
                                >
                                  …
                                </span>
                              ) : (
                                <Button
                                  key={`page-${page}`}
                                  variant={
                                    currentPage === page ? "default" : "ghost"
                                  }
                                  size="sm"
                                  className={cn(
                                    "h-8 w-8 p-0 text-xs font-bold",
                                    currentPage === page
                                      ? ""
                                      : "hover:bg-gray-100 text-gray-600",
                                  )}
                                  onClick={() => handlePageChange(Number(page))}
                                >
                                  {page}
                                </Button>
                              ),
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="h-8 px-3 text-xs font-medium"
                        >
                          Sau
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
