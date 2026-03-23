"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { removeJWTfromCookie } from "@/lib/cookie";
import { logout } from "@/services/auth";
import { useUser } from "@/services/user";
import { getAvatarUrl } from "@/utils/avatar";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { If } from "react-haiku";
import { CartButton } from "../button/button-cart";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

// SVG Icons
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);


const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Khuyến mãi", href: "/promotions" },
  { name: "Tin tức", href: "/news" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isLoading, mutate } = useUser();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const linkRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useLayoutEffect(() => {
    if (isLoading) return;
    if (!headerRef.current || !linkRef.current || !buttonRef.current) return;

    const navButtons =
      buttonRef.current.querySelectorAll<HTMLElement>(".animate-btn");

    const setHomeInitial = () => {
      headerRef.current!.style.backgroundColor = "transparent";
      headerRef.current!.style.backdropFilter = "blur(0px)";
      linkRef.current!.style.color = "white";
      navButtons.forEach((btn) => (btn.style.color = "white"));
    };

    const setScrolled = () => {
      headerRef.current!.style.backgroundColor = "white";
      headerRef.current!.style.backdropFilter = "blur(10px)";
      linkRef.current!.style.color = "#374151";
      navButtons.forEach((btn) => (btn.style.color = "#374151"));
    };

    if (!isHome) {
      setScrolled();
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 70) {
        setScrolled();
      } else {
        setHomeInitial();
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome, isLoading]);

  const handleLogout = async () => {
    await logout();
    removeJWTfromCookie();
    router.push("/");
    mutate(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?searchName=${encodeURIComponent(searchQuery.trim())}`);
      setSearchMode(false);
      setSearchQuery("");
      setMobileMenuOpen(false); // Đóng mobile menu khi tìm kiếm
    }
  };

  return (
    <>
      {/* Header chính */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 shadow-sm w-full md:py-3 transition-all duration-400 ease-in-out ${isHome ? "bg-transparent" : "bg-white"} `}
      >
        {/* Container với padding-bottom để tạo khoảng cách */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo - ẩn khi ở chế độ tìm kiếm */}
            <div
              className={`flex items-center ${searchMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <Image
                    alt="Zerus Coffee"
                    src="/assets/images/logo.jpg"
                    width={40}
                    height={40}
                    className="rounded-lg shadow-md group-hover:scale-105 transition-transform"
                  />
                  {/* Thêm hiệu ứng xung quanh logo */}
                  <div className="absolute -inset-2 rounded-full border-2 border-amber-300/30 group-hover:border-amber-400/50 transition-colors animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-black text-amber-900 tracking-tight mr-2">
                      ZERUS
                    </span>
                    {/* Icon coffee bean nhỏ */}
                    <svg
                      className="w-5 h-5 text-amber-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-amber-600 tracking-[0.2em] uppercase -mt-1 border-t border-amber-200 pt-1">
                    Vintage Coffee
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation desktop - ẩn khi ở chế độ tìm kiếm */}
            <nav
              ref={linkRef}
              className={`hidden md:flex items-center space-x-8 animate-link ${isHome ? "text-white" : "text-gray-700"} ${searchMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className=" hover:text-amber-700 font-semibold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Thanh tìm kiếm - hiển thị khi searchMode = true */}
            {searchMode && (
              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-12">
                <form onSubmit={handleSearch} className="w-full max-w-2xl">
                  <div className="relative flex items-center">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm sản phẩm, bài viết..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                        autoFocus
                      />
                    </div>


                    {/* Nút đóng chế độ tìm kiếm */}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchMode(false);
                        setSearchQuery("");
                      }}
                      className="ml-2 p-3 rounded-xl border bg-white border-gray-300 text-gray-700 hover:bg-gray-100 animate-search"
                    >
                      <CloseIcon className="h-5 w-5" />
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* User actions - ẩn khi ở chế độ tìm kiếm */}
            <div
              ref={buttonRef}
              className={`flex items-center space-x-4 ${searchMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              {/* Nút tìm kiếm (chỉ hiện trên desktop khi không ở chế độ tìm kiếm) */}
              <button
                onClick={() => setSearchMode(true)}
                className="hidden md:block p-2 rounded-lg hover:bg-amber-700 text-white cursor-pointer animate-btn"
              >
                <SearchIcon className="h-5 w-5" />
              </button>

              <If isTrue={isLoading}>
                <Skeleton className="h-10 w-10 rounded-full" />
              </If>

              <If isTrue={!!user && !isLoading}>
                <CartButton className={`hidden md:block animate-btn ${isHome ? "text-white" : "text-gray-700"}`} />
                <Menu as="div" className="relative hidden md:block">
                  <MenuButton className="flex items-center space-x-2 cursor-pointer">
                    <Avatar className="h-10 w-10 border-2 border-amber-200">
                      <AvatarImage
                        src={getAvatarUrl(user?.avatar)}
                        alt={user?.name}
                      />
                      <AvatarFallback className="bg-amber-100 text-amber-800">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </MenuButton>

                  <MenuItems
                    anchor="bottom end"
                    className="absolute mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            href="/account"
                            className={`block px-4 py-2 text-sm ${active
                              ? "bg-amber-50 text-amber-700"
                              : "text-gray-700"
                              }`}
                          >
                            Hồ sơ của tôi
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            href="/account/orders"
                            className={`block px-4 py-2 text-sm ${active
                              ? "bg-amber-50 text-amber-700"
                              : "text-gray-700"
                              }`}
                          >
                            Đơn hàng
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            href="/account/address"
                            className={`block px-4 py-2 text-sm ${active
                              ? "bg-amber-50 text-amber-700"
                              : "text-gray-700"
                              }`}
                          >
                            Sổ Địa Chỉ
                          </Link>
                        )}
                      </MenuItem>

                      <MenuItem>
                        {({ active }) => (
                          <Link
                            href="/account/coupons"
                            className={`block px-4 py-2 text-sm ${active
                              ? "bg-amber-50 text-amber-700"
                              : "text-gray-700"
                              }`}
                          >
                            Mã giảm giá
                          </Link>
                        )}
                      </MenuItem>

                      <div className="border-t border-gray-100 my-1"></div>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-red-50 text-red-600" : "text-red-500"
                              }`}
                          >
                            Đăng xuất
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </If>

              <If isTrue={!user && !isLoading}>
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    onClick={() => router.push("/login")}
                    data-login-btn
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Đăng ký
                  </button>
                </div>
              </If>

              {/* Mobile menu button - luôn hiển thị trên mobile */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Gradient spacer để tạo khoảng cách */}
      </header>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="md:hidden"
      >
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/30" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header mobile menu */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      alt="Zerus Coffee"
                      src="/assets/images/logo.jpg"
                      width={32}
                      height={32}
                      className="rounded-lg shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-amber-900 tracking-tight">
                        ZERUS
                      </span>
                      <div className="flex items-center -mt-0.5">
                        <div className="h-px w-4 bg-amber-400 mr-1"></div>
                        <span className="text-xs font-medium text-amber-600 tracking-wider">
                          COFFEE
                        </span>
                        <div className="h-px w-4 bg-amber-400 ml-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                </button>
              </div>

              {/* Tìm kiếm trong mobile menu */}
              <div className="p-4 border-b">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <SearchIcon className="h-5 w-5 text-gray-400 hover:text-amber-600" />
                  </button>
                </form>
              </div>

              {/* Navigation mobile */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* User section - chỉ hiển thị trên mobile trong menu */}
                <div className="mt-8 pt-8 border-t">
                  <If isTrue={isLoading}>
                    <div className="flex items-center space-x-3 p-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </If>

                  <If isTrue={!!user && !isLoading}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-amber-50">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={getAvatarUrl(user?.avatar)}
                            alt={user?.name}
                          />
                          <AvatarFallback className="bg-amber-100 text-amber-800">
                            {user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 my-2 pt-2">
                        <CartButton
                          className="w-full justify-start text-gray-700 hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/account"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                          Hồ sơ của tôi
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                          Đơn hàng
                        </Link>
                        <Link
                          href="/account/address"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                          Sổ địa chỉ
                        </Link>
                        <Link
                          href="/account/coupons"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                          Mã giảm giá
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </If>

                  <If isTrue={!user && !isLoading}>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          router.push("/account/login");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 font-medium"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={() => {
                          router.push("/account/register");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-amber-600 text-white hover:bg-amber-700 font-medium"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </If>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
