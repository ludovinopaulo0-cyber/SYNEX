import { r as reactExports, T as jsxRuntimeExports, $ as createServerFn } from "./server.mjs";
import { C as CATEGORIES, c as categoryLabel, s as subcategoryLabel } from "./catalog-BfiH91C2.mjs";
import { R as Route2, a as createSsrRpc, u as updateProduct, c as createProduct, d as deleteProduct } from "./router-EGhq8omK.mjs";
import { o as object, s as string, n as number } from "./schemas-CrY2pnAI.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string2) => string2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string2) => string2.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string2) => {
  const camelCase = toCamelCase(string2);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$A = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$A);
const __iconNode$z = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$z);
const __iconNode$y = [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
];
const Boxes = createLucideIcon("boxes", __iconNode$y);
const __iconNode$x = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$x);
const __iconNode$w = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$w);
const __iconNode$v = [
  ["path", { d: "m12.296 3.464 3.02 3.956", key: "qash78" }],
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z", key: "1h7j8b" }
  ],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "4lm6w1" }],
  ["path", { d: "m6.18 5.276 3.1 3.899", key: "zjj9t3" }]
];
const Clapperboard = createLucideIcon("clapperboard", __iconNode$v);
const __iconNode$u = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$u);
const __iconNode$t = [
  ["line", { x1: "6", x2: "10", y1: "11", y2: "11", key: "1gktln" }],
  ["line", { x1: "8", x2: "8", y1: "9", y2: "13", key: "qnk9ow" }],
  ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12", key: "krot7o" }],
  ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10", key: "1lcuu1" }],
  [
    "path",
    {
      d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
      key: "mfqc10"
    }
  ]
];
const Gamepad2 = createLucideIcon("gamepad-2", __iconNode$t);
const __iconNode$s = [
  ["line", { x1: "6", x2: "10", y1: "12", y2: "12", key: "161bw2" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "15", x2: "15.01", y1: "13", y2: "13", key: "dqpgro" }],
  ["line", { x1: "18", x2: "18.01", y1: "11", y2: "11", key: "meh2c" }],
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }]
];
const Gamepad = createLucideIcon("gamepad", __iconNode$s);
const __iconNode$r = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  ["path", { d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "1sqzm4" }],
  [
    "path",
    { d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5", key: "kc0143" }
  ],
  ["rect", { x: "3", y: "7", width: "18", height: "4", rx: "1", key: "1hberx" }]
];
const Gift = createLucideIcon("gift", __iconNode$r);
const __iconNode$q = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$q);
const __iconNode$p = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$p);
const __iconNode$o = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode$o);
const __iconNode$n = [
  ["path", { d: "M10 18v-7", key: "wt116b" }],
  [
    "path",
    {
      d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
      key: "1m329m"
    }
  ],
  ["path", { d: "M14 18v-7", key: "vav6t3" }],
  ["path", { d: "M18 18v-7", key: "aexdmj" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M6 18v-7", key: "1ivflk" }]
];
const Landmark = createLucideIcon("landmark", __iconNode$n);
const __iconNode$m = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$m);
const __iconNode$l = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$l);
const __iconNode$k = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$k);
const __iconNode$j = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$j);
const __iconNode$i = [
  [
    "path",
    {
      d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
      key: "vbtd3f"
    }
  ],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", key: "x3v2xh" }]
];
const MonitorPlay = createLucideIcon("monitor-play", __iconNode$i);
const __iconNode$h = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$h);
const __iconNode$g = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
const Music = createLucideIcon("music", __iconNode$g);
const __iconNode$f = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$f);
const __iconNode$e = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$e);
const __iconNode$d = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
const Quote = createLucideIcon("quote", __iconNode$d);
const __iconNode$c = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$c);
const __iconNode$b = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$b);
const __iconNode$a = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$a);
const __iconNode$9 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$9);
const __iconNode$8 = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$8);
const __iconNode$7 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$7);
const __iconNode$6 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function Logo({ size = 40 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "cut-chip relative grid place-items-center overflow-hidden border border-hairline bg-ink-deep",
      style: { width: size, height: size },
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute inset-0 opacity-90",
            style: {
              background: "linear-gradient(135deg, rgba(124,58,237,0.95) 0%, rgba(124,58,237,0.25) 55%, rgba(15,23,42,0.9) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute -right-1 top-0 h-full w-px rotate-[22deg] bg-lilac/50",
            style: { transformOrigin: "top" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "relative font-display font-bold leading-none tracking-tight text-paper",
            style: { fontSize: size * 0.42 },
            children: "SX"
          }
        )
      ]
    }
  );
}
function Wordmark() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[1.05rem] font-bold tracking-[0.22em] text-paper", children: "SYNEX" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[0.6rem] font-medium tracking-[0.32em] text-muted", children: "DIGITAL" })
  ] });
}
const COPY = {
  login: {
    title: "Acesso restrito",
    hint: "Introduz o PIN para entrar no modo de gestão do catálogo.",
    action: "Entrar"
  },
  setup: {
    title: "Definir PIN da loja",
    hint: "Primeira utilização: escolhe um PIN de 6 a 12 dígitos. Fica guardado apenas como hash — nunca em texto simples.",
    action: "Guardar PIN"
  },
  change: {
    title: "Alterar PIN",
    hint: "Confirma o PIN actual e define o novo.",
    action: "Alterar"
  }
};
function AdminDialog({
  mode,
  onClose,
  onLogin,
  onSetup,
  onChange
}) {
  const [pin, setPin] = reactExports.useState("");
  const [nextPin, setNextPin] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const firstField = reactExports.useRef(null);
  const copy = COPY[mode];
  reactExports.useEffect(() => {
    firstField.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const submit = async (event) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "login") await onLogin(pin);
      else if (mode === "setup") await onSetup(pin);
      else await onChange(pin, nextPin);
      onClose();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível continuar.");
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/85 p-4 backdrop-blur-sm",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": copy.title,
      onClick: (event) => {
        if (event.target === event.currentTarget) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cut-panel panel-in w-full max-w-sm border border-hairline bg-ink p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 36 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper", children: copy.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
                " Painel SYNEX"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Fechar",
              className: "text-muted transition-colors hover:text-paper",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-5 text-xs leading-relaxed text-muted", children: copy.hint }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", htmlFor: "admin-pin", children: mode === "change" ? "PIN actual" : "PIN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: firstField,
                id: "admin-pin",
                className: "field font-display tracking-[0.5em]",
                type: "password",
                inputMode: "numeric",
                autoComplete: "off",
                value: pin,
                onChange: (event) => setPin(event.target.value.replace(/\D/g, "")),
                placeholder: "······",
                required: true
              }
            )
          ] }),
          mode === "change" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", htmlFor: "admin-next-pin", children: "Novo PIN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "admin-next-pin",
                className: "field font-display tracking-[0.5em]",
                type: "password",
                inputMode: "numeric",
                autoComplete: "off",
                value: nextPin,
                onChange: (event) => setNextPin(event.target.value.replace(/\D/g, "")),
                placeholder: "······",
                required: true
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "border-l-2 border-lilac bg-violet/10 px-3 py-2 text-[0.7rem] leading-relaxed text-paper", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: busy,
              className: "flex w-full items-center justify-center gap-2 border border-violet bg-violet/25 px-4 py-2.5 font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-violet/45 disabled:opacity-60",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5" }),
                busy ? "A verificar…" : copy.action
              ]
            }
          )
        ] })
      ] })
    }
  );
}
const BY_SUBCATEGORY = {
  playstation: Gamepad2,
  xbox: Gamepad,
  steam: Gamepad2,
  nintendo: Gamepad,
  pc: Monitor,
  roblox: Boxes,
  netflix: MonitorPlay,
  spotify: Music,
  disney: Sparkles,
  youcine: Clapperboard,
  amazon: ShoppingBag,
  apple: Smartphone,
  "google-play": Play
};
const BY_CATEGORY = {
  gaming: Gamepad2,
  "gift-cards": Gift,
  entretenimento: Clapperboard,
  "jogos-digitais": KeyRound
};
function subcategoryIcon(subcategory, category) {
  return BY_SUBCATEGORY[subcategory] ?? BY_CATEGORY[category] ?? Gift;
}
function formatKz(price) {
  const rounded = Math.round(price);
  return `${String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Kz`;
}
function formatKzParts(price) {
  return { amount: formatKz(price).replace(" Kz", ""), currency: "Kz" };
}
function ProductArtwork({ product }) {
  const Icon2 = subcategoryIcon(product.subcategory, product.category);
  if (product.imageData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: product.imageData,
        alt: product.name,
        loading: "lazy",
        className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-deep",
      style: {
        backgroundImage: "linear-gradient(150deg, rgba(124,58,237,0.22), rgba(15,23,42,0.05) 60%), url(/img/texture-shards.png)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "h-9 w-9 text-lilac/70", strokeWidth: 1.25 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[0.62rem] font-medium uppercase tracking-[0.28em] text-muted", children: subcategoryLabel(product.subcategory) })
      ]
    }
  );
}
function ProductCard({
  product,
  onOrder,
  onShare,
  index = 0
}) {
  const hasDiscount = product.discountPrice !== null && product.discountPrice < product.price;
  const price = formatKzParts(hasDiscount ? product.discountPrice : product.price);
  const originalPrice = hasDiscount ? formatKzParts(product.price) : null;
  const meta = [product.region, product.platform, product.type].filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "cut-card group relative flex flex-col border border-hairline bg-ink-raised/55 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-lilac/40 hover:bg-ink-raised/80",
      style: { animationDelay: `${Math.min(index, 11) * 45}ms` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden border-b border-hairline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductArtwork, { product }),
          hasDiscount && product.available && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-3 bg-violet px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-paper", children: "Promoção" }),
          !product.available && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-3 bg-paper px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink", children: "Esgotado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (event) => {
                event.stopPropagation();
                onShare(product);
              },
              "aria-label": "Partilhar produto",
              title: "Partilhar",
              className: "absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center border border-hairline bg-ink/70 text-muted backdrop-blur-sm transition-colors hover:border-lilac/60 hover:text-paper",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-[0.95rem] font-semibold leading-snug text-paper", children: product.name }),
            meta.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.66rem] uppercase tracking-[0.12em] text-muted", children: meta.join(" · ") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[0.72rem] font-medium text-muted line-through decoration-muted/70", children: [
              originalPrice.amount,
              " ",
              originalPrice.currency
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-baseline gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[1.35rem] font-bold leading-none text-paper", children: price.amount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[0.7rem] font-medium tracking-[0.14em] text-lilac", children: price.currency })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onOrder(product),
              disabled: !product.available,
              className: "flex items-center justify-between gap-2 border border-violet/60 bg-violet/15 px-3 py-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-lilac hover:bg-violet/35 disabled:cursor-not-allowed disabled:border-hairline disabled:bg-transparent disabled:text-muted",
              children: [
                product.available ? "Encomendar" : "Indisponível",
                product.available && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const TARGET_SIZE = 800;
const QUALITY = 0.86;
async function cropToSquareDataUrl(file) {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const sx = Math.round((bitmap.width - side) / 2);
  const sy = Math.round((bitmap.height - side) / 2);
  const size = Math.min(side, TARGET_SIZE);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("O browser não conseguiu preparar a imagem.");
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);
  bitmap.close();
  const webp = canvas.toDataURL("image/webp", QUALITY);
  if (webp.startsWith("data:image/webp")) return webp;
  return canvas.toDataURL("image/jpeg", QUALITY);
}
const EMPTY = {
  category: "gaming",
  subcategory: "playstation",
  name: "",
  price: 0,
  discountPrice: null,
  imageData: null,
  platform: "",
  region: "",
  type: "",
  available: true
};
function toInput(product) {
  return {
    category: product.category,
    subcategory: product.subcategory,
    name: product.name,
    price: product.price,
    discountPrice: product.discountPrice,
    imageData: product.imageData,
    platform: product.platform ?? "",
    region: product.region ?? "",
    type: product.type ?? "",
    available: product.available
  };
}
function clean(input) {
  const trimmed = (value) => {
    const next = (value ?? "").trim();
    return next.length > 0 ? next : null;
  };
  return {
    ...input,
    name: input.name.trim(),
    category: input.category.trim(),
    subcategory: input.subcategory.trim().toLowerCase(),
    platform: trimmed(input.platform),
    region: trimmed(input.region),
    type: trimmed(input.type)
  };
}
function AdminProductForm({
  product,
  token,
  onSaved,
  onDeleted,
  onCancel
}) {
  const [form, setForm] = reactExports.useState(
    product ? toInput(product) : EMPTY
  );
  const [open, setOpen] = reactExports.useState(product === null);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const fileInput = reactExports.useRef(null);
  const patch = (changes) => setForm((current) => ({ ...current, ...changes }));
  const knownSubcategories = CATEGORIES.find((entry) => entry.id === form.category)?.subcategories ?? [];
  const handleFile = async (file) => {
    if (!file) return;
    setError(null);
    setBusy("image");
    try {
      const dataUrl = await cropToSquareDataUrl(file);
      patch({ imageData: dataUrl });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha no upload.");
    } finally {
      setBusy(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };
  const save = async () => {
    setError(null);
    const payload = clean(form);
    if (!payload.name) {
      setError("O produto precisa de um nome.");
      return;
    }
    setBusy("save");
    try {
      const saved = product ? await updateProduct({ data: { token, id: product.id, product: payload } }) : await createProduct({ data: { token, product: payload } });
      onSaved(saved);
      if (!product) setForm(EMPTY);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível guardar.");
    } finally {
      setBusy(false);
    }
  };
  const remove = async () => {
    if (!product || !onDeleted) return;
    if (!window.confirm(`Eliminar "${product.name}" do catálogo?`)) return;
    setBusy("delete");
    try {
      await deleteProduct({ data: { token, id: product.id } });
      onDeleted(product.id);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível eliminar.");
      setBusy(false);
    }
  };
  const preview = {
    id: product?.id ?? 0,
    delivery: "Digital",
    ...form,
    platform: form.platform || null,
    region: form.region || null,
    type: form.type || null
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "cut-card flex flex-col border border-violet/45 bg-ink-raised/70", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden border-b border-hairline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductArtwork, { product: preview }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 flex gap-2 bg-ink-deep/80 p-2 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => fileInput.current?.click(),
            disabled: busy === "image",
            className: "flex flex-1 items-center justify-center gap-1.5 border border-hairline px-2 py-1.5 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-lilac/60",
            children: [
              busy === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-3 w-3" }),
              form.imageData ? "Trocar" : "Imagem"
            ]
          }
        ),
        form.imageData && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => patch({ imageData: null }),
            className: "border border-hairline px-2 py-1.5 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper",
            children: "Remover"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileInput,
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: (event) => void handleFile(event.target.files?.[0])
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "field",
            value: form.name,
            onChange: (event) => patch({ name: event.target.value }),
            placeholder: "PSN 20€"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", children: "Preço (Kz)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "field font-display",
            type: "number",
            min: 0,
            value: form.price,
            onChange: (event) => patch({ price: Number(event.target.value) || 0 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", children: "Preço com desconto (Kz, opcional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "field font-display",
              type: "number",
              min: 0,
              placeholder: "Sem desconto",
              value: form.discountPrice ?? "",
              onChange: (event) => {
                const raw = event.target.value;
                patch({ discountPrice: raw === "" ? null : Number(raw) || 0 });
              }
            }
          ),
          form.discountPrice !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => patch({ discountPrice: null }),
              className: "shrink-0 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted hover:text-lilac",
              children: "Remover"
            }
          )
        ] }),
        form.discountPrice !== null && form.discountPrice >= form.price && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[0.66rem] text-amber-400", children: "Tem de ser menor que o preço normal." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen((value) => !value),
          className: "flex items-center gap-1.5 self-start font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-lilac",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                className: `h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`
              }
            ),
            "Mais detalhes"
          ]
        }
      ),
      open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-l border-hairline pl-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", children: "Categoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "field",
              value: form.category,
              onChange: (event) => patch({ category: event.target.value }),
              children: CATEGORIES.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: entry.id, children: entry.label }, entry.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", children: "Subcategoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "field",
              list: "synex-subcategories",
              value: form.subcategory,
              onChange: (event) => patch({ subcategory: event.target.value })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "synex-subcategories", children: knownSubcategories.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: subcategoryLabel(value) }, value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", children: "Plataforma" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "field",
                value: form.platform ?? "",
                onChange: (event) => patch({ platform: event.target.value }),
                placeholder: "PlayStation"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", children: "Região" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "field",
                value: form.region ?? "",
                onChange: (event) => patch({ region: event.target.value }),
                placeholder: "Europa"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "field-label", children: "Tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "field",
              value: form.type ?? "",
              onChange: (event) => patch({ type: event.target.value }),
              placeholder: "Gift Card"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-[0.7rem] text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: form.available,
              onChange: (event) => patch({ available: event.target.checked }),
              className: "h-3.5 w-3.5 accent-violet"
            }
          ),
          "Disponível para encomenda"
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "border-l-2 border-lilac bg-violet/10 px-2.5 py-2 text-[0.68rem] leading-relaxed text-paper", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => void save(),
            disabled: busy !== false,
            className: "flex flex-1 items-center justify-center gap-1.5 border border-violet bg-violet/25 px-3 py-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-violet/45 disabled:opacity-60",
            children: [
              busy === "save" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3 w-3" }),
              product ? "Guardar" : "Adicionar"
            ]
          }
        ),
        product && onDeleted && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void remove(),
            disabled: busy !== false,
            "aria-label": "Eliminar produto",
            className: "border border-hairline p-2 text-muted transition-colors hover:border-lilac/50 hover:text-paper disabled:opacity-60",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
          }
        ),
        onCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onCancel,
            className: "border border-hairline px-3 py-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper",
            children: "Fechar"
          }
        )
      ] })
    ] })
  ] });
}
const authed = object({
  token: string().min(1)
});
const supplierBalance = createServerFn({
  method: "POST"
}).inputValidator(authed).handler(createSsrRpc("bb69a002fcddfa3ef395b784de66ec5896129c6b5206b6ac6120d6079b2eaca7"));
const supplierSearchGiftCards = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  q: string().max(80)
})).handler(createSsrRpc("06051ef87a9bb2c19c93b458a10112c94f93de70c581669bef238ccf2fb96f7c"));
const supplierGiftCardOffers = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  categoryId: string().min(1).max(120)
})).handler(createSsrRpc("5a83c4eebcb494f6119a3247a654dc9be7c7d366e989f6a175397bd0565e50ec"));
const supplierOrderGiftCard = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  categoryId: string().min(1).max(120),
  cardId: string().min(1).max(120),
  quantity: number().int().min(1).max(100)
})).handler(createSsrRpc("32921a888acb2ff385a820124def84a53d0206a540a44bb022ba4ab6716cc3e1"));
const supplierSearchGameKeys = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  q: string().max(80)
})).handler(createSsrRpc("a6fc7603d4d10da36139988ff2f11bacc2b9b26182fa11b9ebafe67c4625775f"));
const supplierGameKeyOffers = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  gameId: string().min(1).max(120)
})).handler(createSsrRpc("db8b0b767ded61ca87d8af8f2acda7a41bb91d6b7c59ce431a4634db39ae09b5"));
const supplierOrderGameKey = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  gameId: string().min(1).max(120),
  keyId: string().min(1).max(120),
  quantity: number().int().min(1).max(100)
})).handler(createSsrRpc("bff1aae1529b11f60b9f885b36c7f677c244d1b33732fcff8b574104fb7a74d5"));
const supplierOrderStatus = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  number: number().int().min(1)
})).handler(createSsrRpc("cbd541fb092abfc190af6db592643213bc7288df7c9d54add4a3aa56e0afaf6c"));
const FAIL_MESSAGES = {
  out_of_stock: "Esgotou antes de conseguirmos encomendar. Tenta mais tarde.",
  stock_short: "Não havia stock suficiente para a quantidade pedida.",
  price_changed: "O preço mudou entretanto. Consulta outra vez.",
  offer_gone: "Este item deixou de estar disponível.",
  account_problem: "Dados do destinatário rejeitados.",
  region_restricted: "Esta região não é elegível para este item.",
  limit_exceeded: "Limite de quantidade ou frequência atingido.",
  timed_out: "Demorou demasiado tempo a concluir.",
  cancelled: "O pedido foi cancelado antes de terminar.",
  declined: "O fornecedor recusou o pedido."
};
function SupplierPanel({
  token,
  onClose
}) {
  const [tab, setTab] = reactExports.useState("giftcards");
  const [balance, setBalance] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const [categories, setCategories] = reactExports.useState([]);
  const [searching, setSearching] = reactExports.useState(false);
  const [activeCategory, setActiveCategory] = reactExports.useState(null);
  const [offers, setOffers] = reactExports.useState([]);
  const [loadingOffers, setLoadingOffers] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [order, setOrder] = reactExports.useState(null);
  const [placingId, setPlacingId] = reactExports.useState(null);
  const pollTimer = reactExports.useRef(null);
  reactExports.useEffect(() => {
    void supplierBalance({ data: { token } }).then((res) => setBalance(res?.balance_usd ?? null)).catch(() => setBalance(null));
    return () => {
      if (pollTimer.current) window.clearTimeout(pollTimer.current);
    };
  }, [token]);
  function resetResults() {
    setCategories([]);
    setActiveCategory(null);
    setOffers([]);
    setOrder(null);
    setError(null);
  }
  function switchTab(next) {
    setTab(next);
    setQuery("");
    resetResults();
  }
  async function search(event) {
    event?.preventDefault();
    setSearching(true);
    setError(null);
    setActiveCategory(null);
    setOffers([]);
    setOrder(null);
    try {
      if (tab === "giftcards") {
        const res = await supplierSearchGiftCards({ data: { token, q: query } });
        setCategories(
          (res?.data ?? []).map((c) => ({ id: c.category_id, label: c.name }))
        );
      } else {
        const res = await supplierSearchGameKeys({ data: { token, q: query } });
        setCategories(
          (res?.data ?? []).map((g) => ({
            id: g.game_id,
            label: `${g.name} · ${g.platform} · ${g.region}`
          }))
        );
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha na pesquisa.");
    } finally {
      setSearching(false);
    }
  }
  async function openCategory(category) {
    setActiveCategory(category);
    setOffers([]);
    setOrder(null);
    setError(null);
    setLoadingOffers(true);
    try {
      if (tab === "giftcards") {
        const res = await supplierGiftCardOffers({ data: { token, categoryId: category.id } });
        setOffers(
          (res?.offers ?? []).map((o) => ({
            id: o.card_id,
            name: o.name,
            price_usd: o.price_usd,
            stock: o.stock,
            min_quantity: o.min_quantity,
            max_quantity: o.max_quantity
          }))
        );
      } else {
        const res = await supplierGameKeyOffers({ data: { token, gameId: category.id } });
        setOffers(
          (res?.keys ?? []).map((o) => ({
            id: o.key_id,
            name: o.name,
            price_usd: o.price_usd,
            stock: o.stock,
            min_quantity: o.min_quantity,
            max_quantity: o.max_quantity
          }))
        );
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não consegui carregar os preços.");
    } finally {
      setLoadingOffers(false);
    }
  }
  function poll(number2) {
    pollTimer.current = window.setTimeout(async () => {
      try {
        const res = await supplierOrderStatus({ data: { token, number: number2 } });
        if (!res) return;
        setOrder(
          (prev) => prev ? {
            ...prev,
            status: res.status,
            status_reason: res.status_reason,
            fail_code: res.fail_code,
            codes: res.codes ?? res.keys ?? []
          } : prev
        );
        if (res.status === "created" || res.status === "processing") {
          poll(number2);
        }
      } catch {
        poll(number2);
      }
    }, 2500);
  }
  async function buy(offer) {
    if (!activeCategory) return;
    setPlacingId(offer.id);
    setError(null);
    try {
      const res = tab === "giftcards" ? await supplierOrderGiftCard({
        data: { token, categoryId: activeCategory.id, cardId: offer.id, quantity: 1 }
      }) : await supplierOrderGameKey({
        data: { token, gameId: activeCategory.id, keyId: offer.id, quantity: 1 }
      });
      if (!res) return;
      setOrder({
        number: res.number,
        status: res.status,
        status_reason: res.status_reason,
        fail_code: res.fail_code,
        charged_usd: res.charged_usd,
        name: res.card_name ?? res.key_name ?? offer.name,
        quantity: res.quantity ?? 1,
        codes: res.codes ?? res.keys ?? []
      });
      if (res.status === "created" || res.status === "processing") {
        poll(res.number);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível encomendar.");
    } finally {
      setPlacingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/85 p-4 backdrop-blur-sm",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Fornecedor",
      onClick: (event) => {
        if (event.target === event.currentTarget) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cut-panel panel-in flex max-h-[85vh] w-full max-w-lg flex-col border border-hairline bg-ink p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper", children: "Fornecedor · ReSellCodes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[0.66rem] uppercase tracking-[0.16em] text-muted", children: balance !== null ? `Saldo: ${balance} USD` : "A carregar saldo…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Fechar",
              className: "text-muted transition-colors hover:text-paper",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => switchTab("giftcards"),
              className: `flex-1 border px-3 py-2 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] transition-colors ${tab === "giftcards" ? "border-violet bg-violet/25 text-paper" : "border-hairline text-muted hover:text-paper"}`,
              children: "Giftcards"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => switchTab("gamekeys"),
              className: `flex-1 border px-3 py-2 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] transition-colors ${tab === "gamekeys" ? "border-violet bg-violet/25 text-paper" : "border-hairline text-muted hover:text-paper"}`,
              children: "Jogos (chaves)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: search, className: "mb-4 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "field flex-1",
              placeholder: tab === "giftcards" ? "Ex: roblox, psn, netflix…" : "Ex: GTA, FC 26…",
              value: query,
              onChange: (event) => setQuery(event.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: searching,
              className: "flex items-center gap-1.5 bg-violet px-3 py-2 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-paper disabled:opacity-60",
              children: [
                searching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
                "Pesquisar"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300", children: error }),
          !activeCategory && categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void openCategory(c),
              className: "w-full border border-hairline px-3 py-2 text-left text-xs text-paper transition-colors hover:border-lilac/50",
              children: c.label
            }
          ) }, c.id)) }),
          activeCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: resetResults,
                className: "mb-3 text-[0.64rem] uppercase tracking-[0.16em] text-lilac hover:underline",
                children: "← Voltar à pesquisa"
              }
            ),
            loadingOffers && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-xs text-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
              " A carregar preços…"
            ] }),
            !loadingOffers && !order && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
              offers.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center justify-between gap-3 border border-hairline px-3 py-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-paper", children: o.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[0.64rem] text-muted", children: [
                        o.price_usd,
                        " USD · stock ",
                        o.stock
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        disabled: placingId === o.id || o.stock < 1,
                        onClick: () => void buy(o),
                        className: "flex shrink-0 items-center gap-1.5 bg-violet px-3 py-1.5 font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper disabled:opacity-50",
                        children: [
                          placingId === o.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3 w-3" }),
                          "Comprar"
                        ]
                      }
                    )
                  ]
                },
                o.id
              )),
              offers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted", children: "Sem ofertas disponíveis neste item." })
            ] }),
            order && /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusCard, { order })
          ] }),
          !activeCategory && categories.length === 0 && !searching && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted", children: "Pesquisa por um produto acima para veres os preços atuais do fornecedor." })
        ] })
      ] })
    }
  );
}
function OrderStatusCard({ order }) {
  const [copied, setCopied] = reactExports.useState(null);
  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
    }
  };
  const pending = order.status === "created" || order.status === "processing";
  const failed = order.status === "failed" || order.status === "refund";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-violet/40 bg-violet/10 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-paper", children: [
      "Pedido #",
      order.number,
      " · ",
      order.name
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[0.64rem] text-muted", children: [
      "Cobrado: ",
      order.charged_usd,
      " USD"
    ] }),
    pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 flex items-center gap-2 text-xs text-lilac", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
      " A processar no fornecedor…"
    ] }),
    failed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-red-300", children: order.fail_code && FAIL_MESSAGES[order.fail_code] || order.status_reason || "O pedido falhou. O saldo foi devolvido automaticamente." }),
    order.status === "completed" && order.codes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5", children: order.codes.map((code) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-center justify-between gap-2 border border-hairline bg-ink px-2.5 py-1.5 font-display text-xs text-paper",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void copy(code),
              className: "shrink-0 text-muted hover:text-lilac",
              "aria-label": "Copiar código",
              children: copied === code ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
            }
          )
        ]
      },
      code
    )) })
  ] });
}
const BRAND = {
  instagramHandle: "sx.synex",
  instagramProfile: "https://instagram.com/sx.synex",
  /** Número de WhatsApp em formato internacional, sem espaços nem "+". */
  whatsappNumber: "244962289140"
};
function whatsappLink(message) {
  const base = `https://wa.me/${BRAND.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
function orderMessage(product) {
  const hasDiscount = product.discountPrice !== null && product.discountPrice < product.price;
  const lines = [
    "Olá! Quero encomendar:",
    "",
    product.name,
    hasDiscount ? `Preço: ${formatKz(product.discountPrice)} (promoção, preço normal ${formatKz(product.price)})` : `Preço: ${formatKz(product.price)}`
  ];
  if (product.platform) lines.push(`Plataforma: ${product.platform}`);
  if (product.region) lines.push(`Região: ${product.region}`);
  if (product.type) lines.push(`Tipo: ${product.type}`);
  lines.push("", "Vi através do site da SYNEX.");
  return lines.join("\n");
}
const pinSchema = object({
  pin: string().min(4).max(24)
});
const getAdminStatus = createServerFn().handler(createSsrRpc("c962a5d7fbda97df77a182f57d61572a8f532932a758bb3a14005ea967d38d64"));
const createAdminPin = createServerFn({
  method: "POST"
}).inputValidator(pinSchema).handler(createSsrRpc("244cbf2cbe082686ba4a903262e4b9f1518a0015f2e0e1fdf19bceffad45f9bb"));
const adminLogin = createServerFn({
  method: "POST"
}).inputValidator(pinSchema).handler(createSsrRpc("263bd70d1804a67d4dddede387d919e0b357a91a8745b685045216115f131092"));
const adminSessionValid = createServerFn({
  method: "POST"
}).inputValidator(object({
  token: string().min(1)
})).handler(createSsrRpc("151070df37d7314ac70f86b2cc96c7f645f5d0853297a943e73ceea83192cd84"));
const adminLogout = createServerFn({
  method: "POST"
}).inputValidator(object({
  token: string().min(1)
})).handler(createSsrRpc("4cc4e122782d959242dc5168a6cf40d85642479c38f1768b56ceb0fb02d46ae3"));
const adminChangePin = createServerFn({
  method: "POST"
}).inputValidator(object({
  token: string().min(1),
  currentPin: string().min(4).max(24),
  nextPin: string().min(4).max(24)
})).handler(createSsrRpc("2d7645931714107e3ee0dd6733e4a688d3bd292bf21c5549803311103d8db73a"));
const STORAGE_KEY = "synex.admin.token";
function useAdmin() {
  const [token, setToken] = reactExports.useState(null);
  const [configured, setConfigured] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let active = true;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    void (async () => {
      const [status, session] = await Promise.all([
        getAdminStatus(),
        stored ? adminSessionValid({ data: { token: stored } }) : null
      ]);
      if (!active) return;
      setConfigured(status.configured);
      if (stored && session?.valid) {
        setToken(stored);
      } else if (stored) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  const persist = reactExports.useCallback((value) => {
    sessionStorage.setItem(STORAGE_KEY, value);
    setToken(value);
  }, []);
  const login = reactExports.useCallback(
    async (pin) => {
      const result = await adminLogin({ data: { pin } });
      persist(result.token);
    },
    [persist]
  );
  const setup = reactExports.useCallback(
    async (pin) => {
      const result = await createAdminPin({ data: { pin } });
      setConfigured(true);
      persist(result.token);
    },
    [persist]
  );
  const logout = reactExports.useCallback(async () => {
    const current = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setToken(null);
    if (current) await adminLogout({ data: { token: current } });
  }, []);
  const changePin = reactExports.useCallback(
    async (currentPin, nextPin) => {
      if (!token) throw new Error("Sessão expirada.");
      await adminChangePin({ data: { token, currentPin, nextPin } });
    },
    [token]
  );
  return { token, configured, login, setup, logout, changePin };
}
const HERO_ART = "/img/hero-backdrop.png";
function fold(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
function Home() {
  const {
    products: initial
  } = Route2.useLoaderData();
  const [products, setProducts] = reactExports.useState(initial);
  const [query, setQuery] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("all");
  const [subcategory, setSubcategory] = reactExports.useState(null);
  const [dialog, setDialog] = reactExports.useState(null);
  const [supplierOpen, setSupplierOpen] = reactExports.useState(false);
  const [creating, setCreating] = reactExports.useState(false);
  const [toast, setToast] = reactExports.useState(null);
  const [highlightId, setHighlightId] = reactExports.useState(null);
  const [openFaq, setOpenFaq] = reactExports.useState(0);
  const appliedSharedLink = reactExports.useRef(false);
  const admin = useAdmin();
  reactExports.useEffect(() => setProducts(initial), [initial]);
  reactExports.useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);
  const activeCategories = reactExports.useMemo(() => {
    const used = new Set(products.map((product) => product.category));
    const known = CATEGORIES.filter((entry) => used.has(entry.id)).map((entry) => entry.id);
    const extra = [...used].filter((id) => !CATEGORIES.some((entry) => entry.id === id));
    return [...known, ...extra];
  }, [products]);
  const activeSubcategories = reactExports.useMemo(() => {
    if (category === "all") return [];
    const seen = [];
    for (const product of products) {
      if (product.category !== category) continue;
      if (!seen.includes(product.subcategory)) seen.push(product.subcategory);
    }
    return seen;
  }, [products, category]);
  const searching = query.trim().length > 0;
  const visible = reactExports.useMemo(() => {
    if (searching) {
      const needle = fold(query.trim());
      return products.filter((product) => fold(product.name).includes(needle));
    }
    return products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (subcategory && product.subcategory !== subcategory) return false;
      return true;
    });
  }, [products, query, category, subcategory, searching]);
  const order = (product) => {
    window.open(whatsappLink(orderMessage(product)), "_blank", "noopener,noreferrer");
  };
  function productUrl(product) {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("p", String(product.id));
    return url.toString();
  }
  async function share(product) {
    const url = productUrl(product);
    const text = `${product.name} — ${formatKzParts(product.discountPrice ?? product.price).amount} Kz na SYNEX DIGITAL`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text,
          url
        });
        return;
      } catch {
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copiado. Cola onde quiseres partilhar.");
    } catch {
      setToast(url);
    }
  }
  reactExports.useEffect(() => {
    if (appliedSharedLink.current) return;
    if (products.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get("p");
    if (!sharedId) return;
    const target = products.find((p) => String(p.id) === sharedId);
    if (!target) return;
    appliedSharedLink.current = true;
    setQuery("");
    setCategory(target.category);
    setSubcategory(target.subcategory);
    setHighlightId(target.id);
    window.setTimeout(() => {
      document.getElementById(`product-${target.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 80);
    window.setTimeout(() => setHighlightId(null), 2600);
  }, [products]);
  const upsert = (saved) => setProducts((current) => current.some((product) => product.id === saved.id) ? current.map((product) => product.id === saved.id ? saved : product) : [...current, saved]);
  const isAdmin = admin.token !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-x-hidden bg-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grain" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-hairline bg-ink/85 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 38 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wordmark, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: whatsappLink("Olá! Vim através do site da SYNEX."), target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 border border-hairline px-3 py-1.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:border-lilac/50 hover:text-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "WhatsApp" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: BRAND.instagramProfile, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 border border-hairline px-3 py-1.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:border-lilac/50 hover:text-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline", children: [
            "@",
            BRAND.instagramHandle
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 w-[72%] bg-cover bg-center opacity-70", style: {
        backgroundImage: `url("${HERO_ART}")`
      }, "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "linear-gradient(95deg, #0f172a 0%, rgba(15,23,42,0.96) 34%, rgba(15,23,42,0.55) 62%, rgba(15,23,42,0.85) 100%)"
      }, "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline-grid absolute inset-0 opacity-60", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rise inline-flex items-center gap-2 border-l-2 border-lilac pl-3 font-display text-[0.66rem] font-medium uppercase tracking-[0.28em] text-lilac", style: {
          animationDelay: "40ms"
        }, children: "Entrega digital · Pagamento em Kz" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "rise mt-6 font-display text-[2.45rem] font-bold leading-[1.04] tracking-tight text-paper sm:text-[3.6rem]", style: {
          animationDelay: "110ms"
        }, children: [
          "O teu próximo jogo",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lilac", children: "começa aqui." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rise mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted sm:text-base", style: {
          animationDelay: "180ms"
        }, children: "Gift Cards, Game Keys e produtos digitais para gamers em Angola." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted", style: {
          animationDelay: "240ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-lilac" }),
            " Entrega digital"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3.5 w-3.5 text-lilac" }),
            " Pagamento em Kz"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5 text-lilac" }),
            " Atendimento online"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rise mt-9 flex flex-wrap items-center gap-3", style: {
          animationDelay: "300ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#catalogo", className: "group flex items-center gap-2 border border-violet bg-violet/30 px-6 py-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-violet/55", children: [
            "Ver produtos",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: whatsappLink("Olá! Vim através do site da SYNEX."), target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 border border-hairline px-6 py-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:border-lilac/60 hover:text-paper", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
            "Fala connosco"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rise mt-10 flex max-w-md items-center gap-3 border border-hairline bg-ink-deep/70 px-4 py-3 backdrop-blur-sm focus-within:border-lilac/60", style: {
          animationDelay: "360ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 shrink-0 text-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Procurar produto: PSN, Robux, Netflix…", "aria-label": "Procurar produto", className: "w-full bg-transparent text-sm text-paper outline-none placeholder:text-muted/70" }),
          searching && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setQuery(""), "aria-label": "Limpar pesquisa", className: "text-muted transition-colors hover:text-paper", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rule-glow h-px w-full", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "catalogo", className: "relative mx-auto max-w-6xl px-5 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold uppercase tracking-[0.16em] text-paper", children: searching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Resultados para",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lilac", children: [
              "“",
              query.trim(),
              "”"
            ] })
          ] }) : "Catálogo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-muted", children: [
            visible.length,
            " ",
            visible.length === 1 ? "produto" : "produtos",
            !searching && category !== "all" && ` · ${categoryLabel(category)}`
          ] })
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setCreating((value) => !value), className: "flex items-center gap-2 border border-violet bg-violet/25 px-4 py-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-violet/45", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
          " Novo produto"
        ] })
      ] }),
      !searching && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryTab, { label: "Todos", active: category === "all", onClick: () => {
            setCategory("all");
            setSubcategory(null);
          } }),
          activeCategories.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryTab, { label: categoryLabel(id), active: category === id, onClick: () => {
            setCategory(id);
            setSubcategory(null);
          } }, id))
        ] }),
        activeSubcategories.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 border-l border-hairline pl-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { label: "Tudo", active: subcategory === null, onClick: () => setSubcategory(null) }),
          activeSubcategories.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { label: subcategoryLabel(id), active: subcategory === id, onClick: () => setSubcategory(id) }, id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: [
        isAdmin && creating && admin.token && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProductForm, { product: null, token: admin.token, onSaved: upsert, onCancel: () => setCreating(false) }),
        visible.map((product, index) => isAdmin && admin.token ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProductForm, { product, token: admin.token, onSaved: upsert, onDeleted: (id) => setProducts((current) => current.filter((entry) => entry.id !== id)) }, product.id) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: `product-${product.id}`, className: `rise transition-shadow duration-500 ${highlightId === product.id ? "rounded-[2px] ring-2 ring-lilac shadow-[0_0_0_4px_rgba(192,132,252,0.18)]" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, onOrder: order, onShare: share, index }) }, product.id))
      ] }),
      visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cut-panel mt-6 border border-hairline bg-ink-raised/40 px-6 py-14 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mx-auto h-7 w-7 text-lilac/60", strokeWidth: 1.25 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper", children: "Sem resultados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted", children: "Não temos nada com esse nome à vista. Pede pelo WhatsApp — muita coisa entra por encomenda." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: whatsappLink("Olá! Procuro um produto que não vi no catálogo da SYNEX."), target: "_blank", rel: "noopener noreferrer", className: "mt-6 inline-flex items-center gap-2 border border-violet bg-violet/25 px-5 py-2.5 font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-violet/45", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
          " Pedir no WhatsApp"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-hairline bg-ink-deep/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper", children: "O que dizem os clientes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-3", children: [{
        name: "Jérsson M.",
        text: "Pedi a PSN à noite e já estava a jogar 10 minutos depois. Super rápido."
      }, {
        name: "Ivânia S.",
        text: "Comprei Robux para o meu filho, o código veio certo e o atendimento foi muito simpático."
      }, {
        name: "Paulo K.",
        text: "Já fiz várias encomendas, nunca tive problema nenhum. Recomendo."
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cut-panel border border-hairline bg-ink-raised/40 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-4 w-4 text-violet/70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs leading-relaxed text-muted", children: [
          "“",
          item.text,
          "”"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-paper", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({
            length: 5
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-lilac text-lilac" }, i)) })
        ] })
      ] }, item.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-hairline bg-ink-deep/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-3", children: [{
      step: "01",
      title: "Escolhe o produto",
      body: "Procura pelo nome ou navega pelas categorias. Os preços estão todos em Kwanzas."
    }, {
      step: "02",
      title: "Fala pelo WhatsApp",
      body: "O botão Encomendar abre o WhatsApp com os dados do produto já preenchidos. Combinamos o pagamento por lá."
    }, {
      step: "03",
      title: "Recebes o código",
      body: "Entrega digital: o código ou a conta chegam pela mesma conversa, sem envios nem esperas."
    }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-violet/70", children: item.step }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold uppercase tracking-[0.14em] text-paper", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-relaxed text-muted", children: item.body })
      ] })
    ] }, item.step)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-hairline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper", children: "Formas de pagamento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-md text-xs leading-relaxed text-muted", children: "Combinamos o pagamento diretamente na conversa do WhatsApp, depois de confirmares o pedido." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2 sm:max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border border-violet/60 bg-violet/10 px-4 py-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-5 w-5 shrink-0 text-lilac" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-semibold uppercase tracking-[0.1em] text-paper", children: "Multicaixa Express" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.68rem] text-lilac", children: "Preferencial — confirmação mais rápida" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border border-hairline bg-ink-raised/40 px-4 py-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 shrink-0 text-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-semibold uppercase tracking-[0.1em] text-paper", children: "Transferência bancária" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.68rem] text-muted", children: "Dados enviados no WhatsApp" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-hairline bg-ink-deep/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-5 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper", children: "Perguntas frequentes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 divide-y divide-hairline border-y border-hairline", children: [{
        q: "Quanto tempo demora a entrega?",
        a: "É tudo digital: normalmente entregamos o código ou os dados em poucos minutos depois de confirmado o pagamento, pela mesma conversa de WhatsApp."
      }, {
        q: "Como resgato o código que recebo?",
        a: "Depende do produto (PSN, Robux, Netflix, etc.) — enviamos sempre o passo a passo específico junto com o código, para não haver dúvidas."
      }, {
        q: "Que formas de pagamento aceitam?",
        a: "Multicaixa Express (preferencial, confirmação mais rápida) e transferência bancária. Os dados são enviados na conversa do WhatsApp."
      }, {
        q: "E se o código não funcionar?",
        a: "Resolvemos contigo diretamente pelo WhatsApp — confirmamos o problema e substituímos ou reembolsamos conforme o caso."
      }, {
        q: "É seguro comprar aqui?",
        a: "Sim. Trabalhamos com fornecedores verificados e todo o histórico de pedidos fica registado — não é uma venda anónima."
      }].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setOpenFaq(openFaq === i ? null : i), className: "flex w-full items-center justify-between gap-4 py-4 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs font-semibold uppercase tracking-[0.08em] text-paper", children: item.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${openFaq === i ? "rotate-180 text-lilac" : ""}` })
        ] }),
        openFaq === i && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pb-4 text-xs leading-relaxed text-muted", children: item.a })
      ] }, item.q)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-hairline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 34 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wordmark, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[0.66rem] uppercase tracking-[0.16em] text-muted", children: "Produtos digitais · Angola" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: whatsappLink("Olá! Vim através do site da SYNEX."), target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
          " WhatsApp"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: BRAND.instagramProfile, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-3.5 w-3.5" }),
          " @",
          BRAND.instagramHandle
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDialog(admin.configured === false ? "setup" : "login"), "aria-label": "Acesso ao painel de gestão", title: "Gestão", className: "text-muted/25 transition-colors hover:text-lilac/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }) }),
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-violet/40 bg-ink-deep/95 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-lilac", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
        " Modo administrador"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSupplierOpen(true), className: "border border-hairline px-3 py-1.5 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper", children: "Fornecedor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDialog("change"), className: "border border-hairline px-3 py-1.5 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper", children: "Alterar PIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void admin.logout(), className: "flex items-center gap-1.5 border border-hairline px-3 py-1.5 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3 w-3" }),
          " Sair"
        ] })
      ] })
    ] }) }),
    dialog && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDialog, { mode: dialog, onClose: () => setDialog(null), onLogin: admin.login, onSetup: admin.setup, onChange: admin.changePin }),
    supplierOpen && admin.token && /* @__PURE__ */ jsxRuntimeExports.jsx(SupplierPanel, { token: admin.token, onClose: () => setSupplierOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: whatsappLink("Olá! Vim através do site da SYNEX."), target: "_blank", rel: "noopener noreferrer", "aria-label": "Falar no WhatsApp", className: "fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-violet text-paper shadow-[0_14px_30px_-10px_rgba(124,58,237,0.8)] transition-transform hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }) }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-in fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 border border-lilac/40 bg-ink-deep/95 px-4 py-3 text-xs text-paper shadow-[0_18px_40px_-18px_rgba(124,58,237,0.7)] backdrop-blur-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 shrink-0 text-lilac" }),
      toast
    ] })
  ] });
}
function CategoryTab({
  label,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, className: `cut-chip px-4 py-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors ${active ? "bg-violet/35 text-paper ring-1 ring-inset ring-violet" : "bg-ink-raised/50 text-muted hover:bg-ink-raised hover:text-paper"}`, children: label });
}
function Pill({
  label,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, className: `rounded-full border px-3 py-1 text-[0.66rem] uppercase tracking-[0.14em] transition-colors ${active ? "border-lilac/70 text-paper" : "border-hairline text-muted hover:border-lilac/40 hover:text-paper"}`, children: label });
}
export {
  Home as component
};
