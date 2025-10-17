import Link from "next/link";

export default function NotFound() {
   return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
         <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/404-bg-video.mp4"
            autoPlay
            loop
            muted
            playsInline
         />
         <div className="absolute inset-0 bg-black/30" aria-hidden />
         <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
            <span className="text-[8rem] font-bold leading-none tracking-[0.02em] sm:text-[10rem] md:text-[12rem]">
               404
            </span>
            <p className="max-w-xl text-base text-white/80 sm:text-lg">
               Oops! Looks like you took a wrong turn. This page doesn&apos;t exist, but the rest of our site does.
            </p>
            <Link
               href="/"
               className="rounded-none bg-white px-8 py-3 text-base font-medium text-neutral-900 transition hover:bg-neutral-200">
               Go Back Home
            </Link>
         </div>
      </div>
   );
}
