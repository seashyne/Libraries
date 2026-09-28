# Seashyne C Libraries

Collection of lightweight, zero-dependency, single-header C99/C11 libraries.
Designed for embedded systems, native plugins, game engines, and interoperability.

## Libraries

| Header | Description | Dependencies |
| :--- | :--- | :--- |
| `seashyne_tween.h` | 17+ standard easing functions and lerp interpolation | `<math.h>` |
| `seashyne_math.h` | 2D/3D Vector math (add, sub, dot, cross, normalize, distance) | `<math.h>` |
| `seashyne_noise.h` | Fast Perlin noise 2D and 3D implementation | `<math.h>` |

## Usage

Simply copy the `.h` file into your project or include it directly:

```c
#include "seashyne_tween.h"
#include "seashyne_math.h"
#include "seashyne_noise.h"

int main(void) {
    // Tweening
    float progress = seashyne_ease(SEASHYNE_EASE_OUT_BOUNCE, 0.75f);

    // Vector Math
    SeashyneVec3 a = seashyne_vec3(0, 10, 0);
    SeashyneVec3 b = seashyne_vec3(5, 10, 0);
    float dist = seashyne_vec3_distance(a, b);

    // Noise
    float height = seashyne_perlin2d(12.5f, 44.2f);
    return 0;
}
```
