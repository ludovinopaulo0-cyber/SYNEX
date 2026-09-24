const CATEGORIES = [
  {
    id: "gaming",
    label: "Gaming",
    subcategories: [
      "playstation",
      "xbox",
      "steam",
      "nintendo",
      "pc",
      "roblox"
    ]
  },
  {
    id: "gift-cards",
    label: "Gift Cards",
    subcategories: ["amazon", "apple", "google-play", "outros"]
  },
  {
    id: "entretenimento",
    label: "Entretenimento",
    subcategories: ["netflix", "spotify", "disney", "youcine", "outros"]
  },
  {
    id: "jogos-digitais",
    label: "Jogos Digitais",
    subcategories: ["pc", "playstation", "xbox", "nintendo"]
  }
];
const SUBCATEGORY_LABELS = {
  playstation: "PlayStation",
  xbox: "Xbox",
  steam: "Steam",
  nintendo: "Nintendo",
  pc: "PC",
  roblox: "Roblox",
  netflix: "Netflix",
  spotify: "Spotify",
  disney: "Disney+",
  youcine: "YouCine",
  amazon: "Amazon",
  apple: "Apple",
  "google-play": "Google Play",
  outros: "Outros"
};
function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? titleCase(id);
}
function subcategoryLabel(id) {
  return SUBCATEGORY_LABELS[id] ?? titleCase(id);
}
function titleCase(value) {
  return value.split(/[-_\s]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
const PSN = (value, price) => ({
  seedId: `psn-${value}`,
  category: "gaming",
  subcategory: "playstation",
  name: `PSN ${value}€`,
  price,
  platform: "PlayStation",
  region: "Europa",
  type: "Gift Card"
});
const ROBUX = (value, price) => ({
  seedId: `robux-${value}`,
  category: "gaming",
  subcategory: "roblox",
  name: `Robux ${value}`,
  price,
  platform: "Roblox",
  region: "Global",
  type: "Gift Card"
});
const NETFLIX = (value, price) => ({
  seedId: `netflix-${value}`,
  category: "entretenimento",
  subcategory: "netflix",
  name: `Netflix ${value}$`,
  price,
  platform: "Netflix",
  region: "Global",
  type: "Assinatura"
});
const GAME = (seedId, name, price, subcategory, platform, region) => ({
  seedId,
  category: "jogos-digitais",
  subcategory,
  name,
  price,
  platform,
  region,
  type: "Jogo Digital"
});
const SEED_CATALOG = [
  PSN(10, 14800),
  PSN(20, 3e4),
  PSN(50, 75e3),
  PSN(60, 89900),
  PSN(100, 146859),
  ROBUX(200, 5400),
  ROBUX(400, 10600),
  ROBUX(800, 13500),
  ROBUX(1e3, 15500),
  ROBUX(3e3, 46800),
  NETFLIX(15, 21500),
  NETFLIX(20, 27500),
  NETFLIX(30, 39500),
  NETFLIX(50, 62e3),
  NETFLIX(75, 94e3),
  GAME("gta-6-ps5", "GTA VI (PS5)", 115e3, "playstation", "PlayStation 5", "Europa"),
  GAME("gta-5-ps", "GTA V (PS4/PS5)", 58e3, "playstation", "PlayStation 4 / 5", "Europa"),
  GAME("fc-27-ps5", "EA Sports FC 27 (PS5)", 113900, "playstation", "PlayStation 5", "Europa"),
  GAME("fc-26-ps5", "EA Sports FC 26 (PS5)", 83500, "playstation", "PlayStation 5", "Europa"),
  GAME("nba-2k26-ps5", "NBA 2K26 (PS5)", 86e3, "playstation", "PlayStation 5", "Europa"),
  GAME("spiderman-remastered-ps5", "Spider-Man Remastered (PS5)", 74800, "playstation", "PlayStation 5", "Europa"),
  GAME("gta-5-pc", "GTA V (PC)", 19900, "pc", "PC", "Global"),
  GAME("rdr2-pc", "Red Dead Redemption 2 (PC)", 59850, "pc", "PC", "Global")
];
export {
  CATEGORIES as C,
  SEED_CATALOG as S,
  categoryLabel as c,
  subcategoryLabel as s
};
