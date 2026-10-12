"use client";

import { useEffect, useMemo, useState } from "react";
import categories from "@/src/db/Categories.db.json";
import products from "@/src/db/Products.db.json";
import mealBackgrounds from "@/src/db/MealBackgrounds.db.json";

export default function Home() {
  const [search, setSearch] = useState("");
  const [currentMeal, setCurrentMeal] = useState(null);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    function updateMeal() {
      const hour = new Date().getHours();

      const meal = mealBackgrounds.find((item) => {
        if (item.startHour < item.endHour) {
          return hour >= item.startHour && hour < item.endHour;
        }

        // Horario que cruza la medianoche: cena.
        return hour >= item.startHour || hour < item.endHour;
      });

      setCurrentMeal(meal || mealBackgrounds[0]);
    }

    function updateScroll() {
      setShowTopButton(window.scrollY > 350);
    }

    updateMeal();
    updateScroll();

    const interval = window.setInterval(updateMeal, 60_000);
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);

  const productsByCategory = useMemo(() => {
    const term = search.trim().toLowerCase();

    return categories
      .map((category) => ({
        ...category,
        products: products.filter((product) => {
          const matchesCategory =
            String(product.categoryId) === String(category.id);

          const matchesSearch =
            !term ||
            `${product.name} ${product.description || ""}`
              .toLowerCase()
              .includes(term);

          return matchesCategory && matchesSearch;
        }),
      }))
      .filter((category) => category.products.length > 0);
  }, [search]);

  function goToCategory(categoryId) {
    document.getElementById(`category-${categoryId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main
      id="top"
      className="min-h-screen bg-[#4b3024] bg-cover bg-center bg-fixed px-3 py-6 transition-[background-image] duration-1000 sm:px-8 sm:py-10"
      style={
        currentMeal
          ? {
              backgroundImage: `url("${currentMeal.image}")`,
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-6xl">
        <header className="relative mb-8 overflow-hidden px-3 py-8 text-center sm:mb-10 sm:py-12">
          {/* Brillo sutil detrás del título */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-transparent" />

          <div className="relative mx-auto max-w-3xl">
            {/* Ornamento superior */}
            <div className="mb-5 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af63] sm:w-20" />
              <span className="font-serif text-xl text-[#e2c27b]">✦</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af63] sm:w-20" />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#f0d79d] sm:text-xs">
              Cocina tradicional · Experiencia gourmet
            </p>

            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight tracking-wide text-[#f7e7bd] [text-shadow:0_2px_2px_rgba(0,0,0,0.8),0_5px_20px_rgba(0,0,0,0.7)] sm:text-7xl">
              La Buena Mesa
            </h1>

            {/* Separador dorado */}
            <div className="mx-auto mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#b99551] sm:w-16" />
              <span className="text-sm text-[#e2c27b]">❖</span>
              <span className="h-px w-10 bg-[#b99551] sm:w-16" />
            </div>

            <p className="mx-auto mt-5 max-w-md font-serif text-base italic leading-relaxed text-white [text-shadow:0_2px_5px_rgba(0,0,0,0.9)] sm:text-xl">
              Sabores de siempre, servidos con distinción.
            </p>

            {currentMeal && (
              <div className="mt-6 inline-flex items-center gap-3 border border-[#c5a45e]/70 bg-black/35 px-5 py-2.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e2c27b]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#f0d79d] sm:text-xs">
                  {currentMeal.name}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#e2c27b]" />
              </div>
            )}

            <p className="mt-5 text-[9px] uppercase tracking-[0.35em] text-[#e9d6a7]/80 sm:text-[10px]">
              Una experiencia para disfrutar
            </p>
          </div>
        </header>

        <section className="relative overflow-hidden border border-[#e5d7bd] bg-[#fffdf6] px-5 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.4)] sm:px-10 sm:py-10 lg:px-14">
          <div className="pointer-events-none absolute inset-2 border border-[#e9dfcd] sm:inset-3" />

          <div className="relative">
            <header className="border-b border-[#ded2bd] pb-6 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9b7952]">
                Nuestra selección
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-[#39271d] sm:text-4xl">
                La carta
              </h2>

              <p className="mt-2 text-sm text-[#817263]">
                Descubrí todos nuestros platos.
              </p>
            </header>

            <div className="mx-auto mt-6 max-w-xl">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar un plato..."
                className="w-full border border-[#ded2bd] bg-white px-4 py-3 text-sm text-[#39271d] outline-none placeholder:text-[#a69a8a] focus:border-[#98734d]"
              />
            </div>

            <nav className="sticky top-0 z-20 -mx-5 mt-5 border-y border-[#ded2bd] bg-[#fffdf6]/95 px-5 py-3 backdrop-blur-sm sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => goToCategory(category.id)}
                    className="shrink-0 border border-[#ded2bd] px-4 py-2 text-sm text-[#5b3927] transition hover:border-[#5b3927] hover:bg-[#5b3927] hover:text-white"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-8 space-y-10 sm:space-y-12">
              {productsByCategory.map((category) => (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  className="scroll-mt-24"
                >
                  <header className="mb-3 border-b-2 border-[#795337] pb-3">
                    <h3 className="font-serif text-2xl font-bold text-[#39271d] sm:text-3xl">
                      {category.name}
                    </h3>
                  </header>

                  <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                    {category.products.map((product) => (
                      <article
                        key={product.id}
                        className="flex gap-4 border-b border-dashed border-[#ded2bd] py-5"
                      >
                        {product.image && (
                          <div className="h-24 w-24 shrink-0 overflow-hidden bg-[#eee5d7] sm:h-28 sm:w-28">
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start gap-3">
                            <h4 className="font-serif text-lg font-bold leading-snug text-[#39271d]">
                              {product.name}
                            </h4>

                            <span className="ml-auto shrink-0 pt-1 text-sm font-bold text-[#795337]">
                              {formatPrice(product.price)}
                            </span>
                          </div>

                          {product.description && (
                            <p className="mt-2 text-sm leading-relaxed text-[#817263]">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {productsByCategory.length === 0 && (
              <p className="py-12 text-center font-serif text-xl text-[#39271d]">
                No se encontraron platos.
              </p>
            )}

            <footer className="mt-10 border-t border-[#ded2bd] pt-6 text-center">
              <p className="font-serif text-xl italic text-[#5b3927]">
                ¡Gracias por elegirnos!
              </p>
            </footer>
          </div>
        </section>
      </div>

      {/* Botón flotante para volver arriba */}
      {showTopButton && (
        <button
          type="button"
          onClick={goToTop}
          aria-label="Volver al inicio"
          title="Volver arriba"
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#e5d7bd] bg-[#5b3927] text-2xl text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#795337] sm:bottom-8 sm:right-8"
        >
          ↑
        </button>
      )}
    </main>
  );
}
