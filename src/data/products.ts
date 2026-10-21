/** Generic demonstration families. Prices are fictional, equipment-only EUR. */
export type ProductVariant = {
  capacity: string;
  price: number;
  sku: string;
};

export const productSlugs = [
  "air-conditioner", "split-air-conditioner", "heat-pump", "boiler", "ducted-system", "vrf-vrv",
] as const;
export type ProductSlug = (typeof productSlugs)[number];
export type Product = {
  slug: ProductSlug;
  image: string;
  variants: ProductVariant[];
};

// Names, categories, descriptions and alt text live in the existing i18n layer.
export const products: Product[] = [
  {
    slug: "air-conditioner",
    image: "/images/products/aurea-air-conditioner.png",
    variants: [
      { capacity: "2.5 kW", price: 950, sku: "AC-025" },
      { capacity: "3.5 kW", price: 1150, sku: "AC-035" },
      { capacity: "5.0 kW", price: 1450, sku: "AC-050" },
    ],
  },
  {
    slug: "split-air-conditioner",
    image: "/images/products/aurea-split-air-conditioner.png",
    variants: [
      { capacity: "2.5 kW", price: 1100, sku: "SPLIT-025" },
      { capacity: "3.5 kW", price: 1350, sku: "SPLIT-035" },
      { capacity: "5.0 kW", price: 1650, sku: "SPLIT-050" },
    ],
  },
  {
    slug: "heat-pump",
    image: "/images/products/aurea-heat-pump.png",
    variants: [
      { capacity: "6 kW", price: 6500, sku: "HP-060" },
      { capacity: "8 kW", price: 7500, sku: "HP-080" },
      { capacity: "10 kW", price: 8500, sku: "HP-100" },
    ],
  },
  {
    slug: "boiler",
    image: "/images/products/aurea-condensing-boiler.png",
    variants: [
      { capacity: "24 kW", price: 1800, sku: "BOILER-024" },
      { capacity: "30 kW", price: 2200, sku: "BOILER-030" },
      { capacity: "35 kW", price: 2600, sku: "BOILER-035" },
    ],
  },
  {
    slug: "ducted-system",
    image: "/images/products/aurea-ducted-hvac-system.png",
    variants: [
      { capacity: "5.0 kW", price: 3200, sku: "DUCT-050" },
      { capacity: "7.1 kW", price: 3900, sku: "DUCT-071" },
      { capacity: "10.0 kW", price: 4800, sku: "DUCT-100" },
    ],
  },
  {
    slug: "vrf-vrv",
    image: "/images/products/aurea-vrf-vrv-system.png",
    variants: [
      { capacity: "12 kW", price: 7500, sku: "VRF-120" },
      { capacity: "16 kW", price: 9000, sku: "VRF-160" },
      { capacity: "20 kW", price: 11000, sku: "VRF-200" },
    ],
  },
];
