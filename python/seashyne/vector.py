"""
vector.py - Fast 2D and 3D Vector Math for Python
Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
License: MIT
"""

from __future__ import annotations
import math
from typing import NamedTuple

class Vec2(NamedTuple):
    x: float = 0.0
    y: float = 0.0

    def __add__(self, other: Vec2 | float) -> Vec2:
        if isinstance(other, (int, float)):
            return Vec2(self.x + other, self.y + other)
        return Vec2(self.x + other.x, self.y + other.y)

    def __sub__(self, other: Vec2 | float) -> Vec2:
        if isinstance(other, (int, float)):
            return Vec2(self.x - other, self.y - other)
        return Vec2(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar: float) -> Vec2:
        return Vec2(self.x * scalar, self.y * scalar)

    def __truediv__(self, scalar: float) -> Vec2:
        return Vec2(self.x / scalar, self.y / scalar)

    def length_sq(self) -> float:
        return self.x * self.x + self.y * self.y

    def length(self) -> float:
        return math.sqrt(self.length_sq())

    def normalize(self) -> Vec2:
        l = self.length()
        return self / l if l > 1e-6 else Vec2(0, 0)

    def dot(self, other: Vec2) -> float:
        return self.x * other.x + self.y * other.y

    def distance_to(self, other: Vec2) -> float:
        return (self - other).length()

    def lerp(self, target: Vec2, t: float) -> Vec2:
        t = max(0.0, min(1.0, t))
        return self + (target - self) * t


class Vec3(NamedTuple):
    x: float = 0.0
    y: float = 0.0
    z: float = 0.0

    def __add__(self, other: Vec3 | float) -> Vec3:
        if isinstance(other, (int, float)):
            return Vec3(self.x + other, self.y + other, self.z + other)
        return Vec3(self.x + other.x, self.y + other.y, self.z + other.z)

    def __sub__(self, other: Vec3 | float) -> Vec3:
        if isinstance(other, (int, float)):
            return Vec3(self.x - other, self.y - other, self.z - other)
        return Vec3(self.x - other.x, self.y - other.y, self.z - other.z)

    def __mul__(self, scalar: float) -> Vec3:
        return Vec3(self.x * scalar, self.y * scalar, self.z * scalar)

    def __truediv__(self, scalar: float) -> Vec3:
        return Vec3(self.x / scalar, self.y / scalar, self.z / scalar)

    def length_sq(self) -> float:
        return self.x * self.x + self.y * self.y + self.z * self.z

    def length(self) -> float:
        return math.sqrt(self.length_sq())

    def normalize(self) -> Vec3:
        l = self.length()
        return self / l if l > 1e-6 else Vec3(0, 0, 0)

    def dot(self, other: Vec3) -> float:
        return self.x * other.x + self.y * other.y + self.z * other.z

    def cross(self, other: Vec3) -> Vec3:
        return Vec3(
            self.y * other.z - self.z * other.y,
            self.z * other.x - self.x * other.z,
            self.x * other.y - self.y * other.x
        )

    def distance_to(self, other: Vec3) -> float:
        return (self - other).length()

    def lerp(self, target: Vec3, t: float) -> Vec3:
        t = max(0.0, min(1.0, t))
        return self + (target - self) * t
