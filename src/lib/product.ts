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
        "Molded from high-grade plastic. Bag included for easy carry, can fit in any bag. Built to last session after session with all of your friends.",
      icon: "shield",
    },
    {
      title: "Smooth Gravity Hits",
      description:
        "The patented chamber design delivers dense, cool vapor with every pull - full experience of a gravity bong in a portable, easy-to-use way.",
      icon: "wind",
    },
    {
      title: "Replaceable Parts",
      description:
        "Bowl, base ring, and chamber components available separately when you need them, all in here - ",
      link: { href: "/contact", label: "contact us today" },
      icon: "wrench",
    },
    {
      title: "Easy to Clean",
      description:
        "Disassembles in seconds. Rinse, dry, repeat. No complicated parts. It's 2026, we shouldn't work hard.",
      icon: "sparkles",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Fill & Load",
      description:
        "Remove the head-piece and fill it up with your smoking-leaves, Place the head-piece with the smoking leaves on it's designated location on top",
    },
    {
      step: 2,
      title: "Light & Pull down",
      description:
        "Light the smoking-leaves on the head-piece, and as you light it - pull up the top part of the BUKKET to slowly open the accordion and suck the smoke inside",
    },
    {
      step: 3,
      title: "Enhale and release",
      description:
        "When accordion is fully open, remove the head-piece and enhale the content of the BUKKET, Enjoy an extraordinary experience",
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