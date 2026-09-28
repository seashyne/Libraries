"""
Seashyne Libraries for Python
Lightweight, zero-dependency game math, tweening, and noise utilities.
"""

from .vector import Vec2, Vec3
from .tween import ease, Ease
from .noise import perlin2d, perlin3d
from .events import Signal

__all__ = ["Vec2", "Vec3", "ease", "Ease", "perlin2d", "perlin3d", "Signal"]
__version__ = "1.0.0"
