import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#21170f] px-5 py-16 text-[#fff8e9]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,161,90,0.12),transparent_65%)]" />

      <section className="relative w-full max-w-2xl border border-[#a17b3e]/50 bg-[#2b1d13]/70 px-6 py-12 text-center sm:px-12 sm:py-16">
        <span className="font-serif text-3xl text-[#dfbd72]">✦</span>

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.35em] text-[#dfbd72]">
          La Buena Mesa
        </p>

        <h1 className="mt-6 font-serif text-8xl font-bold leading-none text-[#dfbd72] sm:text-9xl">
          404
        </h1>

        <div className="mx-auto mt-6 h-px w-20 bg-[#a17b3e]" />

        <h2 className="mt-7 font-serif text-3xl font-bold sm:text-4xl">
          Esta mesa está vacía.
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/65 sm:text-base">
          Parece que la página que buscás no está en nuestra carta.
          Volvé al inicio y descubrí todo lo que tenemos para ofrecerte.
        </p>

        <Link
          href="/"
          className="mt-9 inline-flex min-h-14 items-center justify-center gap-3 bg-[#c5a15a] px-8 text-sm font-semibold text-[#21180d] transition hover:bg-[#e0c27f]"
        >
          Volver al inicio
          <span aria-hidden="true">↗</span>
        </Link>

      </section>
    </main>
  );
}