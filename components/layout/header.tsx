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
import HeaderSearch from "../header/HeaderSearch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { TopAnnouncement } from "./top-announcement";
import { SearchIcon } from "../header/IconSearch";

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Tin tức", href: "/blogs" },
  { name: "Trợ giúp", href: "/help" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      router.push(
        `/products?searchName=${encodeURIComponent(searchQuery.trim())}`,
      );
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Top Announcement Bar */}
        <TopAnnouncement />

        {/* Header chính */}
        <header
          ref={headerRef}
          className={`shadow-sm w-full md:py-1 transition-all duration-400 ease-in-out ${isHome ? "bg-transparent" : "bg-white"} `}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between h-14 md:h-16 gap-4">
              {/* Left Group: Logo & Nav */}
              <div className="flex items-center gap-6 lg:gap-10">
                <Link
                  href="/"
                  className="flex items-center space-x-2 group shrink-0"
                >
                  <Image
                    alt="Zerus Coffee"
                    src="/assets/images/logo.jpg"
                    width={38}
                    height={38}
                    className="rounded-lg shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-col hidden sm:flex">
                    <span className="text-lg font-black text-amber-900 tracking-tight leading-none">
                      ZERUS
                    </span>
                    <span className="text-[9px] font-bold text-amber-600 tracking-widest uppercase">
                      Vintage Coffee
                    </span>
                  </div>
                </Link>

                {/* Navigation links - Visible on md and up */}
                <nav
                  ref={linkRef}
                  className={`hidden md:flex items-center space-x-5 lg:space-x-8 animate-link ${isHome ? "text-white" : "text-gray-700"}`}
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="hover:text-amber-700 font-bold uppercase text-[12px] lg:text-sm tracking-widest transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Center/Right: Search Bar */}
              <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md ml-4">
                <HeaderSearch />
              </div>

              {/* Right Group: User Actions */}
              <div ref={buttonRef} className="flex items-center gap-3 shrink-0">
                <If isTrue={isLoading}>
                  <Skeleton className="h-9 w-9 rounded-full" />
                </If>

                <If isTrue={!!user && !isLoading}>
                  <CartButton
                    className={`animate-btn ${isHome ? "text-white" : "text-gray-700"}`}
                  />
                  <Menu as="div" className="relative hidden md:block">
                    <MenuButton className="flex items-center space-x-2 cursor-pointer">
                      <Avatar className="h-9 w-9 border-2 border-amber-200 shadow-sm transition-transform hover:scale-105">
                        <AvatarImage
                          src={getAvatarUrl(user?.avatar)}
                          alt={user?.name}
                        />
                        <AvatarFallback className="bg-amber-100 text-amber-800 text-xs font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </MenuButton>

                    <MenuItems
                      anchor="bottom end"
                      className="absolute mt-2 w-56 bg-white rounded-xl shadow-2xl border border-stone-100 overflow-hidden z-50 p-1 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="px-4 py-3 border-b border-stone-50 bg-stone-50/50">
                        <p className="text-xs font-black text-stone-900 uppercase tracking-tight">
                          {user?.name}
                        </p>
                        <p className="text-[10px] text-stone-400 truncate font-bold">
                          {user?.email}
                        </p>
                      </div>
                      <div className="py-1">
                        {[
                          { name: "Hồ sơ của tôi", href: "/account" },
                          { name: "Đơn hàng", href: "/account/orders" },
                          { name: "Sổ Địa Chỉ", href: "/account/address" },
                          { name: "Mã giảm giá", href: "/account/coupons" },
                        ].map((item) => (
                          <MenuItem key={item.href}>
                            {({ active }) => (
                              <Link
                                href={item.href}
                                className={`block px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${active
                                  ? "bg-orange-50 text-[#D94E28]"
                                  : "text-stone-600"
                                  }`}
                              >
                                {item.name}
                              </Link>
                            )}
                          </MenuItem>
                        ))}

                        <div className="border-t border-stone-50 my-1"></div>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`block w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${active
                                ? "bg-rose-50 text-rose-600"
                                : "text-rose-500"
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
                  <div className="hidden md:flex items-center space-x-2">
                    <button
                      onClick={() => router.push("/login")}
                      className={`animate-btn px-3 py-2 rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all cursor-pointer ${isHome ? "text-white hover:bg-white/10" : "text-stone-600 hover:bg-stone-200"}`}
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => router.push("/register")}
                      className="bg-[#D94E28] hover:bg-[#BF4423] text-white px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-orange-900/20"
                    >
                      Đăng ký
                    </button>
                  </div>
                </If>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={`md:hidden p-2 rounded-lg hover:bg-white/10 animate-btn ${isHome ? "text-white" : "text-gray-700"} `}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className={`md:hidden animate-btn ${isHome ? "text-white" : "text-gray-700"}`}
      >
        <div className="fixed inset-0 z-60">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-60 w-full max-w-sm bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header mobile menu */}
              <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50/50">
                <div className="flex items-center space-x-3">
                  <Image
                    alt="Zerus Coffee"
                    src="/assets/images/logo.jpg"
                    width={36}
                    height={36}
                    className="rounded-lg shadow-md"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-amber-900 tracking-tight">
                      ZERUS
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase">
                      Vintage Coffee
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white shadow-sm border border-stone-100 transition-all active:scale-90"
                >
                  <XMarkIcon className="h-6 w-6 text-stone-500" />
                </button>
              </div>

              {/* Tìm kiếm trong mobile menu */}
              <div className="p-5">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-stone-400 group-focus-within:text-[#D94E28] transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Bạn muốn uống gì hôm nay?"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-amber-500 text-sm font-medium transition-all"
                  />
                </form>
              </div>

              {/* Navigation mobile */}
              <div className="flex-1 overflow-y-auto px-5 py-2">
                <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-4 ml-2">
                  Menu
                </p>
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-4 rounded-2xl text-stone-600 hover:bg-orange-50 hover:text-[#D94E28] font-bold text-xs uppercase tracking-widest transition-all group"
                    >
                      {item.name}
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                  ))}
                </div>

                {/* User section */}
                <div className="mt-8 pt-8 border-t border-stone-100">
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
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 rounded-3xl bg-linear-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-sm">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarImage
                            src={getAvatarUrl(user?.avatar)}
                            alt={user?.name}
                          />
                          <AvatarFallback className="bg-amber-100 text-amber-800">
                            {user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-black text-stone-900 uppercase text-sm tracking-tight truncate">
                            {user?.name}
                          </p>
                          <p className="text-[10px] text-stone-400 font-bold truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {[
                          { name: "Hồ sơ", href: "/account" },
                          { name: "Đơn hàng", href: "/account/orders" },
                          { name: "Địa chỉ", href: "/account/address" },
                          { name: "Voucher", href: "/account/coupons" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center p-3 rounded-2xl bg-stone-50 text-stone-600 hover:bg-stone-100 font-bold text-[10px] uppercase tracking-wide transition-all border border-stone-100"
                          >
                            {item.name}
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="col-span-2 flex items-center justify-center p-3 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100 font-bold text-[10px] uppercase tracking-wide transition-all border border-rose-100 mt-2"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </If>

                  <If isTrue={!user && !isLoading}>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          router.push("/login");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-4 rounded-2xl border-2 border-stone-100 text-stone-600 hover:bg-stone-200 hover:text-amber-600 font-black uppercase text-[10px] tracking-widest transition-all"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={() => {
                          router.push("/register");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-4 rounded-2xl bg-[#D94E28] text-white hover:bg-[#BF4423] font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-orange-900/20"
                      >
                        Đăng ký thành viên
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
