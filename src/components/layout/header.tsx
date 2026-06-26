"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Heart, LogIn, LogOut, Search, X, Menu } from "lucide-react";
import Input from "./input";
import { SearchContext } from "@/context/searchContext";
import { usePathname } from "next/navigation";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";

function IconMenu() {
  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "transparent",
        color: "#fff",
        boxShadow: "none",
        backgroundImage: "none",
      }}
    >
      <MenuList>
        <MenuItem
          sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}
        >
          <ListItemIcon>
            <ContentCut fontSize="small" sx={{ color: "#00FF7F" }} />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            ⌘X
          </Typography>
        </MenuItem>

        <MenuItem
          sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}
        >
          <ListItemIcon>
            <ContentCopy fontSize="small" sx={{ color: "#00FF7F" }} />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            ⌘C
          </Typography>
        </MenuItem>

        <MenuItem
          sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}
        >
          <ListItemIcon>
            <ContentPaste fontSize="small" sx={{ color: "#00FF7F" }} />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            ⌘V
          </Typography>
        </MenuItem>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 1 }} />

        <MenuItem
          sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}
        >
          <ListItemIcon>
            <Cloud fontSize="small" sx={{ color: "#00FF7F" }} />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default function Header() {
  const { status } = useSession();
  const { search, setSearch } = SearchContext();
  const [searchMobileAberto, setSearchMobileAberto] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMenu();
  }, [pathname]);

  const isAuthenticated = status === "authenticated";

  return (
    <>
      <header className="h-20 max-h-20 border-b border-zinc-800 bg-zinc-900 px-4 md:px-6 font-heading relative z-[60]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-white hover:text-[#00FF7F] transition-colors"
              aria-label="Abrir menu"
              onClick={toggleMenu}
            >
              <Menu className="w-6 h-6" />
            </button>

            {!searchMobileAberto && (
              <Link
                href="/"
                className="relative flex h-16 w-28 shrink-0 items-center overflow-hidden"
              >
                <Image
                  src="/img/logo.png"
                  alt="GamesNext"
                  width={128}
                  height={128}
                  priority
                  className="absolute left-1/2 top-1/2 h-32 w-32 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </Link>
            )}
          </div>

          <div className="hidden md:flex w-full max-w-sm items-center">
            <Input
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Digite um jogo..."
            />
          </div>

          {searchMobileAberto && (
            <div className="absolute inset-x-0 top-0 z-50 flex h-full items-center bg-zinc-900 px-4 md:hidden gap-2">
              <div className="flex-1">
                <Input
                  value={search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Digite um jogo..."
                />
              </div>
              <button
                onClick={() => {
                  setSearchMobileAberto(false);
                  setSearch("");
                }}
                className="p-2 text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          <nav className="flex items-center gap-1 sm:gap-2 ml-auto md:ml-0">
            <button
              onClick={() => setSearchMobileAberto(true)}
              className="flex md:hidden p-2 text-white/70 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>

            {!isAuthenticated ? (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#00FF7F]"
              >
                <LogIn className="h-5 w-5" aria-hidden="true" />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/favorites"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#00FF7F]"
                >
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  <span className="hidden md:block">Favoritos</span>
                </Link>

                <div className="h-6 w-px bg-zinc-700" aria-hidden="true" />

                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#00FF7F] cursor-pointer"
                >
                  <LogOut className="h-5 w-5" aria-hidden="true" />
                  <span className="hidden md:block">Sair</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      <aside
        className={`fixed top-0 left-0 z-[80] h-full w-80 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <span className="text-white font-bold">Menu</span>
          <button
            onClick={closeMenu}
            className="p-2 text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-2">
          <IconMenu />
        </div>
      </aside>
    </>
  );
}
