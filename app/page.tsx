import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 bg-background p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8">
        <h1 className="mb-0 mt-0 px-4 text-center font-instrument-serif text-[64px] font-normal italic leading-[83px] lg:px-[314px]">
          Litelaro
        </h1>
        <p className="mb-[48px] mt-[25px] px-4 text-center font-instrument-sans text-[28px] font-light leading-[133%] lg:px-[314px]">
          Gamified Literature Learning <br className="hidden md:inline" />
          for Teachers and Students
        </p>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/login"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Login →
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/sign-up"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Sign up →
        </Link>
      </footer>
    </div>
  );
}
