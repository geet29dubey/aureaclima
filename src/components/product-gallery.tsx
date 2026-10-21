import { products } from "@/data/products";
import type { Locale } from "@/i18n/dictionaries";
import { productDictionaries } from "@/i18n/product-dictionaries";
import { ProductCard } from "./product-card";
import "@/app/products.css";

export function ProductGallery({ locale }: { locale: Locale }) {
  const d = productDictionaries[locale];
  return <section id="products" className="section products-section" aria-labelledby="products-title">
    <div className="container content-container">
      <div className="section-heading products-heading">
        <p className="eyebrow">{d.eyebrow}</p>
        <h2 id="products-title">{d.title}</h2>
        <p>{d.intro}</p>
      </div>
      <div className="product-grid">
        {products.map(product => <ProductCard key={product.slug} product={product} copy={d.products[product.slug]} d={d} locale={locale}/>)}
      </div>
      <div className="products-disclaimers">
        <p>{d.pricingDisclaimer}</p>
        <p>{d.demoDisclaimer}</p>
      </div>
    </div>
  </section>;
}
