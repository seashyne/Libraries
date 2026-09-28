# Seashyne C++ Libraries

Modern C++17/C++20 Header-Only utility libraries for high-performance applications, game development, and tools.

## Headers

| Header | Class | Description |
| :--- | :--- | :--- |
| `seashyne/tween.hpp` | `seashyne::Tween` | Easing curves, interpolation, and bounce/elastic easing |
| `seashyne/math.hpp` | `seashyne::Vec2`, `Vec3` | Vector arithmetic, dot, cross, distance, lerp, normalization |
| `seashyne/noise.hpp` | `seashyne::Noise` | 2D/3D Perlin noise generation |
| `seashyne/signal.hpp` | `seashyne::Signal<Args...>` | Type-safe Observer/Signal event bus |

## Example

```cpp
#include <seashyne/tween.hpp>
#include <seashyne/math.hpp>
#include <seashyne/signal.hpp>

int main() {
    using namespace seashyne;

    // Tween
    float val = Tween::apply(Ease::OutBounce, 0.5f);

    // Vector Math
    Vec3 a{0, 5, 0};
    Vec3 b{10, 5, 0};
    Vec3 mid = a.lerp(b, 0.5f);

    // Signals
    Signal<int, std::string> onEvent;
    auto conn = onEvent.connect([](int code, std::string msg) {
        // Handle event
    });
    onEvent.emit(200, "OK");

    return 0;
}
```
