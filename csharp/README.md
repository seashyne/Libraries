# Seashyne C# (.NET) Libraries

Lightweight, allocation-friendly, zero-dependency C# libraries compatible with **Unity**, **Godot**, **MonoGame**, and modern **.NET 8/9**.
Targets both `netstandard2.0` and `net8.0`.

## Modules

| Namespace | Class / Struct | Description |
| :--- | :--- | :--- |
| `Seashyne.Core.Math` | `Vector3D` | High-performance readonly struct for 3D vector arithmetic |
| `Seashyne.Core.Animation` | `Tweener` | 17+ easing curves, lerp, and bounce interpolation |
| `Seashyne.Core.Noise` | `PerlinNoise` | 2D Perlin noise generator |
| `Seashyne.Core.Events` | `Signal`, `Signal<T>` | Fast, type-safe decoupled event publisher / observer |

## Usage

```csharp
using Seashyne.Core.Math;
using Seashyne.Core.Animation;
using Seashyne.Core.Events;

// Vector
Vector3D pos = new Vector3D(0, 10, 0);
Vector3D target = new Vector3D(100, 10, 0);
Vector3D interpolated = pos.Lerp(target, 0.5f);

// Easing
float alpha = Tweener.Ease(EaseType.OutBounce, 0.7f);

// Signal
var onHealthChanged = new Signal<int>();
var disconnect = onHealthChanged.Connect(hp => {
    Console.WriteLine($"Health: {hp}");
});
onHealthChanged.Emit(85);
```
