# 🌊 Seashyne Libraries

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Languages](https://img.shields.io/badge/Languages-Lua%20%7C%20C%20%7C%20C%2B%2B%20%7C%20C%23%20%7C%20Python-blue)](#ecosystem)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure)-brightgreen)](#ecosystem)
[![Web Portal](https://img.shields.io/badge/Web%20Portal-Live%20Catalog-cyan)](https://seashyne.github.io/Libraries/)

A unified, lightweight, cross-language developer library ecosystem designed for **game development**, **Minecraft avatar scripting (Shyne Core)**, **native plugins**, **standalone tools**, and **creative computing**.

---

## 🌟 Key Principles

1. **Seashyne Custom Systems**: The core math, signal, timer, and cross-language toolkits are crafted directly by Seashyne to make Minecraft avatar creation and multi-language development seamless.
2. **Curated Open Source (MIT Standards)**: Industry-standard community modules (`classic.lua`, `tween.lua`, `inspect.lua`) are bundled under strict MIT license terms with original author copyright headers preserved.
3. **Zero External Dependencies**: Every library is 100% self-contained pure code. No bloated dependency trees.
4. **Cross-Language Consistency**: Algorithms (easing, noise, vectors, signals) work with matching design across all 5 supported languages.
5. **Plug-and-Play**: Copy a single `.lua`, `.h`, `.hpp`, or `.cs` file directly into your project, or consume via raw CDN URLs.
6. **Machine-Readable Registry**: Includes [`registry.json`](registry.json) for automated tooling, package managers, and runtime loaders.

---

## 🌐 Live Web Portal & Documentation

Visit the interactive catalog at **[seashyne.github.io/Libraries](https://seashyne.github.io/Libraries/)** to:
- 🔍 Search and filter libraries across all languages.
- 📈 Interactively preview easing curves with the live animated visualizer.
- 📋 Copy CDN / raw URLs with one click.
- 💻 Inspect syntax-highlighted source code directly in your browser.

---

## 📁 Repository Structure

```
Libraries/
├── registry.json                 # Machine-readable catalog metadata
├── lua/                          # Pure Lua 5.1/5.2/5.3/5.4 & LuaJIT (100% Original)
│   ├── classic.lua               # OOP / Class system with single inheritance
│   ├── tween.lua                 # Complete tweening engine with 24+ easing equations
│   ├── vector.lua                # 2D/3D Vector math (dot, cross, lerp, distance)
│   ├── signal.lua                # Decoupled Event / Observer dispatcher
│   ├── color.lua                 # RGBA, Hex, integer bitpacking, and color lerp
│   ├── timer.lua                 # Animation and game delay/periodic timer scheduler
│   ├── noise.lua                 # 1D/2D/3D Perlin noise generator
│   └── inspect.lua               # Table serializer, cycle-detection, and debug
│
├── c/                            # Single-Header C99/C11 (100% Original)
│   └── include/
│       ├── seashyne_tween.h      # Easing & lerp curves
│       ├── seashyne_math.h       # Vector2 & Vector3 math
│       └── seashyne_noise.h      # Fast Perlin noise 2D/3D
│
├── cpp/                          # Modern C++17/C++20 Header-Only
│   └── include/seashyne/
│       ├── tween.hpp             # Type-safe easing
│       ├── math.hpp              # Vec2, Vec3 structs
│       ├── noise.hpp             # Perlin noise generator
│       └── signal.hpp            # Type-safe event dispatcher
│
├── csharp/                       # .NET Standard 2.0 & .NET 8 (Unity / Godot)
│   └── Seashyne.Core/
│       ├── Math/Vector3D.cs
│       ├── Animation/Tweener.cs
│       ├── Noise/PerlinNoise.cs
│       └── Events/Signal.cs
│
├── python/                       # Pure Python 3.9+ Module
│   └── seashyne/
│       ├── vector.py             # Vec2, Vec3 NamedTuples
│       ├── tween.py              # Ease functions & lerp
│       ├── noise.py              # Perlin noise 2D/3D
│       └── events.py             # Signal observer
│
└── docs/                         # Interactive Web Portal (GitHub Pages)
    ├── index.html
    ├── style.css
    └── app.js
```

---

## 🚀 Quick Usage by Language

### 1. Lua (Minecraft Shyne Core / Love2D / Defold)
```lua
local tween = require("tween")
local Vector = require("vector")

local pos = Vector(0, 10, 0)
local target = Vector(100, 10, 0)
local mid = pos:lerp(target, 0.5)

local t = tween.new(1.0, { scale = 0 }, { scale = 1 }, "outBounce")
```

### 2. C (C99 / Embedded / Game Engines)
```c
#include "seashyne_tween.h"
#include "seashyne_math.h"

SeashyneVec3 a = seashyne_vec3(0, 0, 0);
SeashyneVec3 b = seashyne_vec3(10, 20, 30);
float dist = seashyne_vec3_distance(a, b);
float curved = seashyne_ease(SEASHYNE_EASE_OUT_BOUNCE, 0.75f);
```

### 3. C++ (C++17/20 Modern)
```cpp
#include <seashyne/tween.hpp>
#include <seashyne/math.hpp>

using namespace seashyne;
Vec3 pos{0, 10, 0};
Vec3 next = pos.lerp(Vec3{10, 10, 0}, 0.5f);
float bounce = Tween::apply(Ease::OutBounce, 0.8f);
```

### 4. C# (.NET 8 / Unity / Godot)
```csharp
using Seashyne.Core.Math;
using Seashyne.Core.Animation;

Vector3D pos = new Vector3D(0, 10, 0);
float progress = Tweener.Ease(EaseType.OutBounce, 0.5f);
```

### 5. Python (Automation / Blender / Math)
```python
from seashyne import Vec3, ease, Ease, perlin2d

v = Vec3(0, 10, 0).lerp(Vec3(20, 10, 0), 0.5)
eased = ease(Ease.OUT_BOUNCE, 0.75)
height = perlin2d(12.5, 44.2)
```

---

## ⚡ Direct CDN & Download Links

You can load or download any file directly from jsDelivr CDN or GitHub raw:

| Language | Module | CDN URL |
| :--- | :--- | :--- |
| **Lua** | `tween.lua` | `https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/tween.lua` |
| **Lua** | `classic.lua` | `https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/classic.lua` |
| **Lua** | `noise.lua` | `https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/noise.lua` |
| **Lua** | `vector.lua` | `https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/vector.lua` |
| **Lua** | `signal.lua` | `https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/signal.lua` |
| **C** | `seashyne_tween.h` | `https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/c/include/seashyne_tween.h` |
| **C++** | `tween.hpp` | `https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/cpp/include/seashyne/tween.hpp` |

---

## 📄 License
This repository is open-source software licensed under the **[MIT License](LICENSE)**. Free for commercial, personal, and educational use.
