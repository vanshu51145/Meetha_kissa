export type Category = {
  slug: string;
  name: string;
  hint: string;
};

export const categories: Category[] = [
  { slug: "all", name: "All Sweets", hint: "Everything we make" },
  { slug: "dry-fruits", name: "Dry Fruits", hint: "Rich & nourishing" },
  { slug: "barfi", name: "Barfi", hint: "Festive classics" },
  { slug: "ladoo", name: "Ladoo", hint: "Melt-in-mouth rounds" },
  { slug: "bengali", name: "Bengali Sweets", hint: "Soft chenna magic" },
  { slug: "traditional", name: "Traditional", hint: "Recipes from 1998" },
  { slug: "gift-boxes", name: "Gift Boxes", hint: "Made for gifting" },
];

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  categories: string[];
  ingredients: string[];
  badge?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "kaju-katli",
    name: "Kaju Katli",
    tagline: "Silky cashew fudge finished with delicate silver leaf.",
    description:
      "Our best-seller since day one. Whole cashews are ground to a silken paste, slow-cooked with pure ghee and just enough sugar, then rolled paper-thin and finished with edible silver vark. It should melt the moment it touches your tongue — never stick to the roof of your mouth.",
    price: 650,
    unit: "500g",
    image: "/products/kaju-katli.jpg",
    categories: ["dry-fruits", "barfi", "traditional"],
    ingredients: ["Cashews", "Sugar", "Pure ghee", "Cardamom", "Edible silver vark"],
    badge: "Bestseller",
    featured: true,
  },
  {
    slug: "motichoor-ladoo",
    name: "Motichoor Ladoo",
    tagline: "Fine boondi pearls crafted into melt-in-the-mouth ladoos.",
    description:
      "Gram flour batter is dropped through a fine sieve into warm ghee so every boondi pearl is barely a millimetre wide. The pearls are tossed with sugar syrup scented with cardamom and saffron, pressed by hand while still warm, and topped with melon seeds and pistachio.",
    price: 450,
    unit: "500g",
    image: "/products/motichoor-ladoo.jpg",
    categories: ["ladoo", "traditional"],
    ingredients: ["Gram flour", "Sugar", "Pure ghee", "Saffron", "Cardamom", "Melon seeds"],
    featured: true,
  },
  {
    slug: "rasmalai",
    name: "Rasmalai",
    tagline: "Soft chenna dumplings soaked in fragrant saffron milk.",
    description:
      "Fresh chenna is kneaded until completely smooth, shaped into gentle discs and simmered in light syrup before being left to soak overnight in thickened milk infused with saffron, cardamom and rose. Best enjoyed chilled, straight from the box.",
    price: 380,
    unit: "500g",
    image: "/products/rasmalai.jpg",
    categories: ["bengali"],
    ingredients: ["Chenna (fresh paneer)", "Milk", "Saffron", "Sugar", "Cardamom", "Pistachio"],
    featured: true,
  },
  {
    slug: "gulab-jamun",
    name: "Gulab Jamun",
    tagline: "Golden khoya dumplings dipped in aromatic sugar syrup.",
    description:
      "Khoya is kneaded with a whisper of flour, rolled crack-free and fried on low heat until deep golden, then dropped into a rose-and-cardamom syrup that it drinks up for hours. Served warm, with a little extra syrup poured over the top.",
    price: 320,
    unit: "500g",
    image: "/products/gulab-jamun.jpg",
    categories: ["traditional"],
    ingredients: ["Khoya (milk solids)", "Sugar", "Rose water", "Cardamom", "Pure ghee"],
    featured: true,
  },
  {
    slug: "pista-barfi",
    name: "Pista Barfi",
    tagline: "Rich pistachio fudge with a delicate cardamom finish.",
    description:
      "Shelled pistachios are blanched, ground and folded into a slow-cooked milk fudge that sets soft rather than brittle. The natural green comes from the nuts alone — no colour, ever. Cut into diamonds and finished with slivered pistachio.",
    price: 520,
    unit: "500g",
    image: "/products/pista-barfi.jpg",
    categories: ["barfi", "dry-fruits"],
    ingredients: ["Pistachios", "Milk", "Sugar", "Pure ghee", "Cardamom"],
    featured: true,
  },
  {
    slug: "besan-ladoo",
    name: "Besan Ladoo",
    tagline: "Roasted gram flour, ghee and cardamom blended into traditional ladoos.",
    description:
      "The slowest sweet we make. Besan is roasted in pure ghee for over an hour until it turns the colour of sandalwood and smells of toasted nuts, then cooled, sweetened and shaped by hand. Our recipe hasn't changed since 1998.",
    price: 400,
    unit: "500g",
    image: "/products/besan-ladoo.jpg",
    categories: ["ladoo", "traditional"],
    ingredients: ["Gram flour", "Pure ghee", "Sugar", "Cardamom", "Cashew"],
    featured: true,
  },
  {
    slug: "anjeer-barfi",
    name: "Anjeer Barfi",
    tagline: "Sun-dried figs folded with almonds, cashew and cardamom.",
    description:
      "Dried figs are soaked and cooked down into a dark, honeyed paste, then folded with chopped almonds and cashews. Naturally sweet, faintly chewy and heavy in the hand — one piece is plenty with chai.",
    price: 580,
    unit: "500g",
    image: "/products/anjeer-barfi.jpg",
    categories: ["dry-fruits", "barfi"],
    ingredients: ["Dried figs (anjeer)", "Almonds", "Cashews", "Sugar", "Cardamom"],
  },
  {
    slug: "dry-fruit-ladoo",
    name: "Dry Fruit Ladoo",
    tagline: "Dates, almonds and pistachios pressed into wholesome rounds.",
    description:
      "No sugar, no syrup — just dates binding a generous mix of roasted almonds, cashews, pistachios and figs. The kind of sweet you can give a child before school or a grandmother after dinner without thinking twice.",
    price: 550,
    unit: "500g",
    image: "/products/dry-fruit-ladoo.jpg",
    categories: ["dry-fruits", "ladoo"],
    ingredients: ["Dates", "Almonds", "Cashews", "Pistachios", "Figs", "Poppy seeds"],
  },
  {
    slug: "coconut-ladoo",
    name: "Coconut Ladoo",
    tagline: "Fresh grated coconut rolled into tender, milky rounds.",
    description:
      "Coconut grated the same morning it is used, simmered with full-fat milk and sugar until it pulls away from the pan, then rolled warm and rolled again in desiccated coconut. Soft, simple and finished within days.",
    price: 350,
    unit: "500g",
    image: "/products/coconut-ladoo.jpg",
    categories: ["ladoo", "traditional"],
    ingredients: ["Fresh coconut", "Full-fat milk", "Sugar", "Cardamom"],
  },
  {
    slug: "rasgulla",
    name: "Rasgulla",
    tagline: "Pillowy chenna balls floating in light sugar syrup.",
    description:
      "Kolkata-style. Chenna is kneaded until it squeaks, rolled into crack-free balls and boiled in a thin syrup until each one doubles in size and bobs like a balloon. Served in the syrup it was cooked in — never drained.",
    price: 340,
    unit: "500g",
    image: "/products/rasgulla.jpg",
    categories: ["bengali"],
    ingredients: ["Chenna (fresh paneer)", "Sugar", "Lemon juice"],
  },
  {
    slug: "soan-papdi",
    name: "Soan Papdi",
    tagline: "Flaky, melt-in-mouth layers of gram flour and ghee.",
    description:
      "Gram flour and ghee are cooked to a golden roux, then pulled and folded with sugar syrup until the whole mass separates into thousands of gossamer threads. Cut into cubes, dusted with pistachio. Best eaten over a plate — it crumbles on purpose.",
    price: 380,
    unit: "500g",
    image: "/products/soan-papdi.jpg",
    categories: ["traditional"],
    ingredients: ["Gram flour", "Sugar", "Pure ghee", "Cardamom", "Pistachio"],
  },
  {
    slug: "kalakand",
    name: "Kalakand",
    tagline: "Slow-cooked milk cake with a granular, meltaway bite.",
    description:
      "Milk is reduced for hours with nothing but a little sugar and citric acid, until it sets into a soft, grainy cake. Cut thick, covered in silver leaf and cut again into squares so every piece keeps its edges.",
    price: 480,
    unit: "500g",
    image: "/products/kalakand.jpg",
    categories: ["barfi", "traditional"],
    ingredients: ["Milk", "Sugar", "Cardamom", "Edible silver vark"],
  },
  {
    slug: "jalebi",
    name: "Jalebi",
    tagline: "Crisp, saffron-scented spirals fried to order.",
    description:
      "Fermented overnight for that faint tang, piped into hot oil in tight spirals and plunged straight into warm saffron syrup. Crisp outside, syrupy inside. Order it for a gathering — jalebi waits for nobody.",
    price: 300,
    unit: "500g",
    image: "/products/jalebi.jpg",
    categories: ["traditional"],
    ingredients: ["All-purpose flour", "Sugar", "Saffron", "Ghee", "Lemon"],
  },
  {
    slug: "festive-gift-box",
    name: "Festive Gift Box",
    tagline: "A curated tray of our best-loved classics.",
    description:
      "Eight varieties — Kaju Katli, Pista Barfi, Motichoor Ladoo, Besan Ladoo and more — arranged in a hand-finished box with a satin ribbon and a handwritten note card. Our most-gifted box through Diwali and Raksha Bandhan.",
    price: 1450,
    unit: "1kg box",
    image: "/products/festive-gift-box.jpg",
    categories: ["gift-boxes"],
    ingredients: [
      "Kaju Katli",
      "Pista Barfi",
      "Motichoor Ladoo",
      "Besan Ladoo",
      "Anjeer Barfi",
      "Handwritten note card",
    ],
    badge: "Gifting",
  },
  {
    slug: "celebration-gift-box",
    name: "Celebration Gift Box",
    tagline: "A premium mithai assortment, packed for grand occasions.",
    description:
      "Our largest box: twelve varieties including dry fruit specials, Bengali classics and silver-leaf katli, packed in layered trays inside a maroon keepsake box with gold foil detailing. Made for weddings, corporate gifting and big Diwali nights.",
    price: 2100,
    unit: "1.5kg box",
    image: "/products/celebration-gift-box.jpg",
    categories: ["gift-boxes"],
    ingredients: [
      "Twelve assorted varieties",
      "Dry fruit specials",
      "Bengali classics",
      "Silver-leaf katli",
      "Maroon keepsake box",
      "Gold foil detailing",
    ],
    badge: "Premium",
  },
  {
    slug: "classic-ladoo-box",
    name: "Classic Ladoo Box",
    tagline: "Four kinds of ladoo, packed the way a family would.",
    description:
      "Motichoor, Besan, Dry Fruit and Coconut ladoos in one box — the four our regulars always ask for. Packed in a sturdy paper box that survives the car ride home, with each layer separated by butter paper.",
    price: 950,
    unit: "800g box",
    image: "/products/classic-ladoo-box.jpg",
    categories: ["gift-boxes", "ladoo"],
    ingredients: [
      "Motichoor Ladoo",
      "Besan Ladoo",
      "Dry Fruit Ladoo",
      "Coconut Ladoo",
      "Butter paper layers",
    ],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const relatedProducts = (product: Product, limit = 4) =>
  products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.categories.some((c) => product.categories.includes(c)),
    )
    .slice(0, limit);

export const inr = (value: number) => `₹${value.toLocaleString("en-IN")}`;
