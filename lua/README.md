# Seashyne Lua Libraries

Collection of lightweight, zero-dependency, pure Lua 5.1/5.2/5.3/5.4 & LuaJIT compatible libraries.
Ideal for Minecraft mods (Shyne Core Avatar Runtime), Love2D, Defold, Roblox, and game scripting.

## Libraries

| Library | File | Size | Description |
| :--- | :--- | :--- | :--- |
| **classic** | `classic.lua` | ~1 KB | Tiny Class-based Object-Oriented Programming (OOP) module |
| **tween** | `tween.lua` | ~6 KB | Complete tweening engine with all standard easing functions |
| **noise** | `noise.lua` | ~4 KB | Fast 1D, 2D, and 3D Perlin & Simplex noise generation |
| **vector** | `vector.lua` | ~3 KB | 2D and 3D Vector math (add, sub, mul, dot, cross, lerp, distance) |
| **signal** | `signal.lua` | ~1 KB | Fast Event / Signal dispatcher (Observer pattern) |
| **inspect** | `inspect.lua` | ~3 KB | Human-readable table inspection, serialization, and debugging |

## Quick Start

```lua
-- Require directly (or via Shyne Core)
local Class = require("classic")
local tween = require("tween")
local Vector = require("vector")
local Signal = require("signal")

-- Vector Math
local v1 = Vector(1, 2, 3)
local v2 = Vector(4, 5, 6)
local v3 = v1:lerp(v2, 0.5)

-- Tweening
local target = { x = 0 }
local t = tween.new(1.0, target, { x = 100 }, "outBounce")
t:update(0.5)

-- Event Dispatching
local onJump = Signal()
local disconnect = onJump:connect(function(height)
    print("Player jumped: " .. height)
end)
onJump:fire(1.5)
```
