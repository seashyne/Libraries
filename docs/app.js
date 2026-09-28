// Seashyne Libraries Catalog Data
const CATALOG = [
  {
    id: "lua-classic",
    name: "classic.lua",
    language: "lua",
    version: "0.1.0",
    category: "OOP / Class",
    description: "Tiny, fast Class-based Object-Oriented Programming for pure Lua.",
    file: "../lua/classic.lua",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/lua/classic.lua",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/classic.lua",
    tags: ["oop", "class", "inheritance", "lua"],
    sample: `-- Defining a class
local Object = require("classic")
local Point = Object:extend()

function Point:new(x, y)
    self.x = x or 0
    self.y = y or 0
end

local p = Point(10, 20)
print(p.x, p.y)`
  },
  {
    id: "lua-tween",
    name: "tween.lua",
    language: "lua",
    version: "2.1.1",
    category: "Animation / Tween",
    description: "Complete tweening engine with all standard Robert Penner easing equations.",
    file: "../lua/tween.lua",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/lua/tween.lua",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/tween.lua",
    tags: ["tween", "easing", "animation", "interpolation", "lua"],
    sample: `local tween = require("tween")

local obj = { x = 0, y = 0 }
local t = tween.new(2.0, obj, { x = 100, y = 200 }, "outBounce")

-- In your game tick / render loop
local complete = t:update(dt)`
  },
  {
    id: "lua-noise",
    name: "noise.lua",
    language: "lua",
    version: "1.0.0",
    category: "Math / Procedural",
    description: "Fast 1D, 2D, and 3D Perlin and Simplex noise generator for Lua.",
    file: "../lua/noise.lua",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/lua/noise.lua",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/noise.lua",
    tags: ["noise", "perlin", "simplex", "procedural", "lua"],
    sample: `local noise = require("noise")

local height = noise.perlin2d(worldX * 0.05, worldZ * 0.05)
local density = noise.perlin3d(x * 0.1, y * 0.1, z * 0.1)`
  },
  {
    id: "lua-vector",
    name: "vector.lua",
    language: "lua",
    version: "1.0.0",
    category: "Math / Vector",
    description: "2D and 3D vector arithmetic with operator overloads, dot, cross, and lerp.",
    file: "../lua/vector.lua",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/lua/vector.lua",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/vector.lua",
    tags: ["math", "vector", "3d", "vector3", "lua"],
    sample: `local Vector = require("vector")

local a = Vector(10, 0, 5)
local b = Vector(20, 0, 5)
local distance = a:distanceTo(b)
local interpolated = a:lerp(b, 0.5)`
  },
  {
    id: "lua-signal",
    name: "signal.lua",
    language: "lua",
    version: "1.0.0",
    category: "Events / Observer",
    description: "Lightweight Event/Observer publisher for decoupled event messaging.",
    file: "../lua/signal.lua",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/lua/signal.lua",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/signal.lua",
    tags: ["events", "signal", "observer", "pubsub", "lua"],
    sample: `local Signal = require("signal")

local onDamage = Signal()
local disconnect = onDamage:connect(function(amount, source)
    print("Player took " .. amount .. " damage from " .. source)
end)

onDamage:fire(25, "Lava")
disconnect() -- Unsubscribe`
  },
  {
    id: "lua-inspect",
    name: "inspect.lua",
    language: "lua",
    version: "3.1.0",
    category: "Debug / Tools",
    description: "Human-readable Lua table serialization and debugging printer.",
    file: "../lua/inspect.lua",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/lua/inspect.lua",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/inspect.lua",
    tags: ["debug", "inspect", "serializer", "table", "lua"],
    sample: `local inspect = require("inspect")

local data = { id = 101, tags = {"hero", "avatar"}, stats = { hp = 100 } }
print(inspect(data))`
  },
  {
    id: "c-tween",
    name: "seashyne_tween.h",
    language: "c",
    version: "1.0.0",
    category: "Animation / Tween",
    description: "C99 single-header easing and interpolation curves (Penner equations).",
    file: "../c/include/seashyne_tween.h",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/c/include/seashyne_tween.h",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/c/include/seashyne_tween.h",
    tags: ["c", "c99", "tween", "easing", "header-only"],
    sample: `#include "seashyne_tween.h"

float t = 0.5f;
float curved = seashyne_ease(SEASHYNE_EASE_OUT_BOUNCE, t);
float pos = seashyne_lerp(0.0f, 100.0f, curved);`
  },
  {
    id: "c-math",
    name: "seashyne_math.h",
    language: "c",
    version: "1.0.0",
    category: "Math / Vector",
    description: "C99 single-header 2D/3D vector math functions with dot, cross, lerp.",
    file: "../c/include/seashyne_math.h",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/c/include/seashyne_math.h",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/c/include/seashyne_math.h",
    tags: ["c", "c99", "math", "vector", "header-only"],
    sample: `#include "seashyne_math.h"

SeashyneVec3 a = seashyne_vec3(0, 5, 0);
SeashyneVec3 b = seashyne_vec3(10, 5, 0);
SeashyneVec3 mid = seashyne_vec3_lerp(a, b, 0.5f);
float dist = seashyne_vec3_distance(a, b);`
  },
  {
    id: "c-noise",
    name: "seashyne_noise.h",
    language: "c",
    version: "1.0.0",
    category: "Math / Procedural",
    description: "C99 single-header 2D/3D Perlin noise generator.",
    file: "../c/include/seashyne_noise.h",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/c/include/seashyne_noise.h",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/c/include/seashyne_noise.h",
    tags: ["c", "c99", "noise", "perlin", "header-only"],
    sample: `#include "seashyne_noise.h"

float h = seashyne_perlin2d(x * 0.1f, y * 0.1f);
float d = seashyne_perlin3d(x * 0.05f, y * 0.05f, z * 0.05f);`
  },
  {
    id: "cpp-tween",
    name: "seashyne/tween.hpp",
    language: "cpp",
    version: "1.0.0",
    category: "Animation / Tween",
    description: "Modern C++20 header-only easing engine with lerp and bounce support.",
    file: "../cpp/include/seashyne/tween.hpp",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/cpp/include/seashyne/tween.hpp",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/cpp/include/seashyne/tween.hpp",
    tags: ["cpp", "cpp20", "tween", "easing", "header-only"],
    sample: `#include <seashyne/tween.hpp>

using namespace seashyne;
float progress = Tween::apply(Ease::OutBounce, 0.7f);
float current_x = Tween::lerp(0.0f, 500.0f, progress);`
  },
  {
    id: "cpp-math",
    name: "seashyne/math.hpp",
    language: "cpp",
    version: "1.0.0",
    category: "Math / Vector",
    description: "Modern C++20 Vector2 and Vector3 structs with full operator support.",
    file: "../cpp/include/seashyne/math.hpp",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/cpp/include/seashyne/math.hpp",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/cpp/include/seashyne/math.hpp",
    tags: ["cpp", "cpp20", "math", "vector", "header-only"],
    sample: `#include <seashyne/math.hpp>

using namespace seashyne;
Vec3 pos{0, 10, 0};
Vec3 target{100, 10, 0};
Vec3 mid = pos.lerp(target, 0.5f);`
  },
  {
    id: "cpp-signal",
    name: "seashyne/signal.hpp",
    language: "cpp",
    version: "1.0.0",
    category: "Events / Observer",
    description: "Type-safe event dispatcher and signal connection manager.",
    file: "../cpp/include/seashyne/signal.hpp",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/cpp/include/seashyne/signal.hpp",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/cpp/include/seashyne/signal.hpp",
    tags: ["cpp", "cpp20", "signal", "events", "observer", "header-only"],
    sample: `#include <seashyne/signal.hpp>

seashyne::Signal<int, float> onHit;
auto conn = onHit.connect([](int damage, float knockback) {
    std::cout << "Hit for: " << damage << "\\n";
});
onHit.emit(50, 1.2f);`
  },
  {
    id: "csharp-core",
    name: "Seashyne.Core",
    language: "csharp",
    version: "1.0.0",
    category: "Utility / Cross-Platform",
    description: "C# (.NET 8 & Unity) library with Vector3D, Tweener, PerlinNoise, and Signal.",
    file: "../csharp/Seashyne.Core/Seashyne.Core.csproj",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/csharp/Seashyne.Core/",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/csharp/Seashyne.Core/",
    tags: ["csharp", "dotnet", "unity", "godot", "vector", "tween"],
    sample: `using Seashyne.Core.Math;
using Seashyne.Core.Animation;

Vector3D pos = new Vector3D(0, 10, 0);
Vector3D target = new Vector3D(100, 10, 0);
Vector3D mid = pos.Lerp(target, 0.5f);

float alpha = Tweener.Ease(EaseType.OutBounce, 0.7f);`
  },
  {
    id: "python-seashyne",
    name: "seashyne",
    language: "python",
    version: "1.0.0",
    category: "Utility / Math",
    description: "Zero-dependency Python package with Vec2/Vec3, ease curves, Perlin noise, and Signal.",
    file: "../python/seashyne/__init__.py",
    raw_url: "https://raw.githubusercontent.com/seashyne/Libraries/main/python/seashyne/",
    cdn_url: "https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/python/seashyne/",
    tags: ["python", "math", "vector", "noise", "tween", "events"],
    sample: `from seashyne import Vec3, ease, Ease, perlin2d

pos = Vec3(0, 10, 0)
target = Vec3(100, 10, 0)
mid = pos.lerp(target, 0.5)

alpha = ease(Ease.OUT_BOUNCE, 0.75)
height = perlin2d(10.5, 42.1)`
  }
];

// State
let activeLang = "all";
let searchQuery = "";
let currentModalItem = null;

// DOM Elements
const cardsGrid = document.getElementById("cardsGrid");
const languageTabs = document.getElementById("languageTabs");
const searchInput = document.getElementById("searchInput");
const codeModal = document.getElementById("codeModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalTitle = document.getElementById("modalTitle");
const modalLangBadge = document.getElementById("modalLangBadge");
const modalDesc = document.getElementById("modalDesc");
const modalCode = document.getElementById("modalCode");
const copyCodeBtn = document.getElementById("copyCodeBtn");
const copyRawBtn = document.getElementById("copyRawBtn");
const copyCdnBtn = document.getElementById("copyCdnBtn");
const downloadBtn = document.getElementById("downloadBtn");
const toast = document.getElementById("toast");

// Render Catalog Cards
function renderCards() {
  cardsGrid.innerHTML = "";
  
  const filtered = CATALOG.filter(item => {
    const matchesLang = activeLang === "all" || item.language === activeLang;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query));
    return matchesLang && matchesSearch;
  });

  if (filtered.length === 0) {
    cardsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-dim);">
        <p style="font-size: 18px;">No libraries found matching your criteria.</p>
        <p style="font-size: 14px; margin-top: 8px;">Try clearing filters or search query.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "lib-card";
    card.onclick = () => openModal(item);

    const tagsHtml = item.tags.map(t => `<span class="card-tag">#${t}</span>`).join("");

    card.innerHTML = `
      <div>
        <div class="card-top">
          <h3 class="card-title">${item.name}</h3>
          <span class="card-badge badge-${item.language}">${item.language.toUpperCase()}</span>
        </div>
        <p class="card-desc">${item.description}</p>
        <div class="card-tags">${tagsHtml}</div>
      </div>
      <div class="card-footer">
        <span>v${item.version} • ${item.category}</span>
        <span class="view-code-hint">View Code & Specs →</span>
      </div>
    `;
    cardsGrid.appendChild(card);
  });
}

// Modal Logic
async function openModal(item) {
  currentModalItem = item;
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.description;
  modalLangBadge.textContent = item.language.toUpperCase();
  modalLangBadge.className = `card-badge badge-${item.language}`;
  
  modalCode.textContent = item.sample || "// Loading source code...";
  downloadBtn.href = item.raw_url;
  downloadBtn.setAttribute("download", item.name);

  codeModal.classList.add("active");

  // Attempt to fetch raw code if reachable
  try {
    const resp = await fetch(item.file);
    if (resp.ok) {
      const code = await resp.text();
      modalCode.textContent = code;
    }
  } catch (e) {
    // If running from file:// or offline, keep sample
  }
}

function closeModal() {
  codeModal.classList.remove("active");
  currentModalItem = null;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Event Listeners
languageTabs.addEventListener("click", e => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeLang = btn.dataset.lang;
  renderCards();
});

searchInput.addEventListener("input", e => {
  searchQuery = e.target.value;
  renderCards();
});

closeModalBtn.addEventListener("click", closeModal);
codeModal.addEventListener("click", e => {
  if (e.target === codeModal) closeModal();
});

copyCodeBtn.addEventListener("click", () => {
  if (!currentModalItem) return;
  navigator.clipboard.writeText(modalCode.textContent).then(() => {
    showToast("Code copied to clipboard!");
  });
});

copyRawBtn.addEventListener("click", () => {
  if (!currentModalItem) return;
  navigator.clipboard.writeText(currentModalItem.raw_url).then(() => {
    showToast("Raw URL copied to clipboard!");
  });
});

copyCdnBtn.addEventListener("click", () => {
  if (!currentModalItem) return;
  navigator.clipboard.writeText(currentModalItem.cdn_url).then(() => {
    showToast("CDN Link copied to clipboard!");
  });
});

// Interactive Easing Visualizer Playground
const canvas = document.getElementById("curveCanvas");
const ctx = canvas.getContext("2d");
const easingSelector = document.getElementById("easingSelector");
const playBtn = document.getElementById("playBtn");
const demoBall = document.getElementById("demoBall");

const EASING_FUNCTIONS = {
  linear: t => t,
  inQuad: t => t * t,
  outQuad: t => t * (2 - t),
  inOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic: t => t * t * t,
  outCubic: t => { const f = t - 1; return f * f * f + 1; },
  inOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  outBounce: t => {
    if (t < (1 / 2.75)) return 7.5625 * t * t;
    if (t < (2 / 2.75)) { const f = t - (1.5 / 2.75); return 7.5625 * f * f + 0.75; }
    if (t < (2.5 / 2.75)) { const f = t - (2.25 / 2.75); return 7.5625 * f * f + 0.9375; }
    const f = t - (2.625 / 2.75);
    return 7.5625 * f * f + 0.984375;
  },
  outExpo: t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inOutSine: t => -0.5 * (Math.cos(Math.PI * t) - 1)
};

function drawCurve() {
  const width = canvas.width;
  const height = canvas.height;
  const padding = 30;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  ctx.clearRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding + (plotHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Curve
  const easeFn = EASING_FUNCTIONS[easingSelector.value] || EASING_FUNCTIONS.linear;
  ctx.beginPath();
  ctx.strokeStyle = "#00f0ff";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(0, 240, 255, 0.5)";
  ctx.shadowBlur = 10;

  for (let px = 0; px <= plotWidth; px++) {
    const t = px / plotWidth;
    const val = easeFn(t);
    const x = padding + px;
    const y = height - padding - val * plotHeight;
    if (px === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}

let animationId = null;
function playAnimation() {
  if (animationId) cancelAnimationFrame(animationId);
  const easeFn = EASING_FUNCTIONS[easingSelector.value] || EASING_FUNCTIONS.linear;
  const duration = 1200; // ms
  const startTime = performance.now();
  const trackWidth = demoBall.parentElement.clientWidth - 40;

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeFn(progress);

    demoBall.style.left = `${10 + eased * trackWidth}px`;

    if (progress < 1) {
      animationId = requestAnimationFrame(step);
    }
  }

  animationId = requestAnimationFrame(step);
}

easingSelector.addEventListener("change", () => {
  drawCurve();
  playAnimation();
});
playBtn.addEventListener("click", playAnimation);

// Initialize
renderCards();
drawCurve();
playAnimation();
