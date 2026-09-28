# Seashyne Python Libraries

Zero-dependency, pure Python 3.9+ utilities for game development, math, automation, Blender scripts, and simulation.

## Modules

| Module | Exports | Description |
| :--- | :--- | :--- |
| `seashyne.vector` | `Vec2`, `Vec3` | Fast 2D/3D immutable vector math (add, sub, dot, cross, lerp, distance) |
| `seashyne.tween` | `ease`, `Ease`, `lerp` | 17+ easing curves, bounce interpolation |
| `seashyne.noise` | `perlin2d`, `perlin3d` | 2D and 3D Perlin noise generation |
| `seashyne.events` | `Signal` | Fast decoupled Event/Signal observer dispatcher |

## Usage

```python
from seashyne import Vec3, ease, Ease, perlin2d, Signal

# Vector Math
pos = Vec3(0, 10, 0)
target = Vec3(50, 10, 0)
mid = pos.lerp(target, 0.5)

# Easing
val = ease(Ease.OUT_BOUNCE, 0.75)

# Perlin Noise
height = perlin2d(15.2, 88.4)

# Event Signal
on_hit = Signal()
disconnect = on_hit.connect(lambda dmg: print(f"Damage: {dmg}"))
on_hit.emit(42)
```
