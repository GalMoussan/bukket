export type ColorVariant = {
  id: string;
  name: string;
  bodyColor: string;
  baseColor: string;
  image: string;
  hex: { body: string; base: string };
};

export const VIDEOS = {
  howItWorks: {
    id: "9zFLBgAtP8E",
    title: "BUKKET — How It Works",
    poster: "/products/purple-green.png",
  },
  fun: {
    id: "bZWzcAOoX0s",
    title: "Bukket Movie",
    poster: "/products/blue-yellow.png",
  },
  session: {
    src: "/videos/bukket-session.mp4",
    title: "NowThis — Bukket in action",
    poster: "/videos/bukket-session.jpg",
  },
} as const;

export const SHIPPING = {
  freeOver: 50,
  flatRate: 5.99,
} as const;

export const PRODUCT = {
  name: "Bukket",
  tagline: "The original portable gravity bong",
  description:
    "A compact, reusable gravity bong engineered for smooth hits and zero hassle. Pull the base, light, lift — gravity does the rest.",
  price: 39.99,
  features: [
    {
      title: "Portable & Durable",
      description:
        "Molded from high-grade plastic. Fits in a backpack, built to last session after session.",
      icon: "shield",
    },
    {
      title: "Smooth Gravity Hits",
      description:
        "The patented chamber design delivers dense, cool vapor with every pull.",
      icon: "wind",
    },
    {
      title: "Easy to Clean",
      description:
        "Disassembles in seconds. Rinse, dry, repeat. No complicated parts.",
      icon: "sparkles",
    },
    {
      title: "Replaceable Parts",
      description:
        "Bowl, base ring, and chamber components available separately when you need them.",
      icon: "wrench",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Fill & Load",
      description: "Add water to the chamber and pack the bowl.",
    },
    {
      step: 2,
      title: "Pull Down",
      description: "Submerge the base to create vacuum pressure.",
    },
    {
      step: 3,
      title: "Light & Lift",
      description: "Ignite and slowly raise — gravity pulls the hit through.",
    },
  ],
};

export const COLOR_VARIANTS: ColorVariant[] = [
  {
    id: "purple-green",
    name: "Purple / Green",
    bodyColor: "Purple",
    baseColor: "Lime Green",
    image: "/products/purple-green.png",
    hex: { body: "#7B2D8E", base: "#B8E638" },
  },
  {
    id: "blue-yellow",
    name: "Blue / Yellow",
    bodyColor: "Blue",
    baseColor: "Yellow",
    image: "/products/blue-yellow.png",
    hex: { body: "#1E6FD9", base: "#F5D800" },
  },
  {
    id: "blue-green",
    name: "Blue / Green",
    bodyColor: "Blue",
    baseColor: "Lime Green",
    image: "/products/blue-green.png",
    hex: { body: "#1E6FD9", base: "#B8E638" },
  },
  {
    id: "purple-yellow",
    name: "Purple / Yellow",
    bodyColor: "Purple",
    baseColor: "Yellow",
    image: "/products/purple-yellow.png",
    hex: { body: "#7B2D8E", base: "#F5D800" },
  },
];