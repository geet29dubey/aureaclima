import type { Product } from "@/data/products";
import type { Locale } from "@/i18n/dictionaries";
import type { ProductCopy, ProductDictionary } from "@/i18n/product-dictionaries";
import { Icon } from "./icon";
import { JourneyLink } from "./journey-link";
import { ProductImage } from "./product-image";

const numberLocales: Record<Locale, string> = { en: "en-GB", es: "es-ES", it: "it-IT" };

export function ProductCard({ product, copy, d, locale }: { product: Product; copy: ProductCopy; d: ProductDictionary; locale: Locale }) {
  const price = new Intl.NumberFormat(numberLocales[locale], { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const id = `product-${product.slug}`;
  return <article id={id} className="product-card" aria-labelledby={`${id}-title`}>
    <ProductImage src={product.image} alt={copy.imageAlt} pending={d.imagePending}/>
    <div className="product-card-body">
      <p className="product-category">{copy.category}</p>
      <h3 id={`${id}-title`}>{copy.name}</h3>
      <p className="product-description">{copy.description}</p>
      <div className="product-details">
        <p className="product-from">{d.from} <strong>{price.format(Math.min(...product.variants.map(variant => variant.price)))}</strong></p>
        <p className="product-price-note">{d.equipmentOnly}</p>
        <h4 id={`${id}-options`} className="product-options-heading">{d.options}</h4>
        <dl className="product-variants" aria-labelledby={`${id}-options`}>
          {product.variants.map(variant => <div key={variant.sku}><dt>{variant.capacity}</dt><dd>{price.format(variant.price)}</dd></div>)}
        </dl>
        <JourneyLink destination="installation" locale={locale} placement={`product-${product.slug}`} className="button button-outline product-assessment">
          {d.assessment}<Icon name="arrow" size={17}/>
        </JourneyLink>
      </div>
    </div>
  </article>;
}
