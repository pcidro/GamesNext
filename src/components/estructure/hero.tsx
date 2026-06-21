export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] w-full overflow-hidden bg-zinc-950 font-body text-white">
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 -z-20 bg-[url('/img/hero.png')] bg-cover bg-position-[68%_center] sm:bg-position-[72%_center] lg:bg-position-[center_center]"
      />

      <div
        aria-hidden="true"
        className="block absolute top-0 left-0 w-full h-full z-0 md:hidden  inset-0 -z-20 bg-[url('/img/heromobile.png')] bg-cover bg-position-[68%_center] sm:bg-position-[72%_center] lg:bg-position-[center_center]"
      />

      <div className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-300 items-center px-6 py-20 sm:px-8 lg:px-10">
        <div className="max-w-150 animate-hero-content">
          <h1 className="max-w-150 font-heading text-4xl font-extrabold leading-[1.05] tracking-normal text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
            Descubra seus próximos jogos favoritos
          </h1>

          <p className="mt-6 max-w-[520px] text-base leading-8 text-zinc-300 sm:text-lg">
            Explore títulos populares, acompanhe avaliações e monte sua lista de
            favoritos em um só lugar.
          </p>

          <a
            href="#jogos-populares"
            className="mt-8 inline-flex h-[52px] items-center justify-center rounded-xl bg-[#22C55E] px-7 font-heading text-sm font-bold text-white shadow-[0_18px_40px_rgba(34,197,94,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#16A34A] hover:shadow-[0_22px_48px_rgba(34,197,94,0.3)] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            Explorar Jogos
          </a>
        </div>
      </div>
    </section>
  );
}
