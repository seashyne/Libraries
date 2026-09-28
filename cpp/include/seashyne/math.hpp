/**
 * math.hpp - Modern C++ 2D/3D Vector & Math Utilities
 * Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
 * License: MIT
 */

#pragma once

#include <cmath>
#include <iostream>

namespace seashyne {

struct Vec2 {
    float x{0.0f}, y{0.0f};

    constexpr Vec2() = default;
    constexpr Vec2(float x, float y) : x(x), y(y) {}

    constexpr Vec2 operator+(const Vec2& o) const { return {x + o.x, y + o.y}; }
    constexpr Vec2 operator-(const Vec2& o) const { return {x - o.x, y - o.y}; }
    constexpr Vec2 operator*(float s) const { return {x * s, y * s}; }
    constexpr Vec2 operator/(float s) const { return {x / s, y / s}; }

    float length() const { return std::sqrt(x * x + y * y); }
    float dot(const Vec2& o) const { return x * o.x + y * o.y; }
    float distance(const Vec2& o) const { return (*this - o).length(); }
    Vec2 normalize() const {
        float l = length();
        return l > 1e-6f ? (*this / l) : Vec2{};
    }
};

struct Vec3 {
    float x{0.0f}, y{0.0f}, z{0.0f};

    constexpr Vec3() = default;
    constexpr Vec3(float x, float y, float z) : x(x), y(y), z(z) {}

    constexpr Vec3 operator+(const Vec3& o) const { return {x + o.x, y + o.y, z + o.z}; }
    constexpr Vec3 operator-(const Vec3& o) const { return {x - o.x, y - o.y, z - o.z}; }
    constexpr Vec3 operator*(float s) const { return {x * s, y * s, z * s}; }
    constexpr Vec3 operator/(float s) const { return {x / s, y / s, z / s}; }

    float length() const { return std::sqrt(x * x + y * y + z * z); }
    float dot(const Vec3& o) const { return x * o.x + y * o.y + z * o.z; }
    Vec3 cross(const Vec3& o) const {
        return {
            y * o.z - z * o.y,
            z * o.x - x * o.z,
            x * o.y - y * o.x
        };
    }
    float distance(const Vec3& o) const { return (*this - o).length(); }
    Vec3 normalize() const {
        float l = length();
        return l > 1e-6f ? (*this / l) : Vec3{};
    }
    Vec3 lerp(const Vec3& target, float t) const {
        return *this + (target - *this) * t;
    }
};

} // namespace seashyne
