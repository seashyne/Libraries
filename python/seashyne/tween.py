"""
tween.py - Python Easing and Interpolation Functions
Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
License: MIT
"""

import math
from enum import Enum

class Ease(Enum):
    LINEAR = "linear"
    IN_QUAD = "in_quad"
    OUT_QUAD = "out_quad"
    INOUT_QUAD = "inout_quad"
    IN_CUBIC = "in_cubic"
    OUT_CUBIC = "out_cubic"
    INOUT_CUBIC = "inout_cubic"
    IN_SINE = "in_sine"
    OUT_SINE = "out_sine"
    INOUT_SINE = "inout_sine"
    IN_EXPO = "in_expo"
    OUT_EXPO = "out_expo"
    OUT_BOUNCE = "out_bounce"

def _bounce(t: float) -> float:
    if t < (1.0 / 2.75):
        return 7.5625 * t * t
    elif t < (2.0 / 2.75):
        t -= (1.5 / 2.75)
        return 7.5625 * t * t + 0.75
    elif t < (2.5 / 2.75):
        t -= (2.25 / 2.75)
        return 7.5625 * t * t + 0.9375
    else:
        t -= (2.625 / 2.75)
        return 7.5625 * t * t + 0.984375

def ease(curve: Ease | str, t: float) -> float:
    t = max(0.0, min(1.0, float(t)))
    name = curve.value if isinstance(curve, Ease) else str(curve).lower()

    if name in ("in_quad", "inquad"):
        return t * t
    elif name in ("out_quad", "outquad"):
        return t * (2.0 - t)
    elif name in ("inout_quad", "inoutquad"):
        return 2.0 * t * t if t < 0.5 else -1.0 + (4.0 - 2.0 * t) * t
    elif name in ("in_cubic", "incubic"):
        return t * t * t
    elif name in ("out_cubic", "outcubic"):
        t -= 1.0
        return t * t * t + 1.0
    elif name in ("in_sine", "insine"):
        return 1.0 - math.cos(t * (math.pi * 0.5))
    elif name in ("out_sine", "outsine"):
        return math.sin(t * (math.pi * 0.5))
    elif name in ("inout_sine", "inoutsine"):
        return -0.5 * (math.cos(math.pi * t) - 1.0)
    elif name in ("in_expo", "inexpo"):
        return 0.0 if t <= 0.0 else math.pow(2.0, 10.0 * (t - 1.0))
    elif name in ("out_expo", "outexpo"):
        return 1.0 if t >= 1.0 else 1.0 - math.pow(2.0, -10.0 * t)
    elif name in ("out_bounce", "outbounce"):
        return _bounce(t)
    return t

def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t
