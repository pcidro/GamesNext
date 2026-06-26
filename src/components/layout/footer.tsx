import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default async function Footer() {
  return (
    <div className="bg-gray-800 w-full text-white">
      <footer className="grid grid-cols-3 px-8 py-4 items-center">
        <div>
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
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-sm font-medium text-gray-400">
            Nos siga nas redes sociais:
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <InstagramIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-400 transition-colors"
            >
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <YouTubeIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div />
      </footer>
    </div>
  );
}
