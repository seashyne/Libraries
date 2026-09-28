/**
 * seashyne_math.h - C99 2D/3D Vector & Math Utilities
 * Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
 * License: MIT
 */

#ifndef SEASHYNE_MATH_H
#define SEASHYNE_MATH_H

#include <math.h>

typedef struct {
    float x;
    float y;
} SeashyneVec2;

typedef struct {
    float x;
    float y;
    float z;
} SeashyneVec3;

static inline SeashyneVec2 seashyne_vec2(float x, float y) {
    SeashyneVec2 v = { x, y };
    return v;
}

static inline SeashyneVec3 seashyne_vec3(float x, float y, float z) {
    SeashyneVec3 v = { x, y, z };
    return v;
}

static inline SeashyneVec3 seashyne_vec3_add(SeashyneVec3 a, SeashyneVec3 b) {
    return seashyne_vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}

static inline SeashyneVec3 seashyne_vec3_sub(SeashyneVec3 a, SeashyneVec3 b) {
    return seashyne_vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}

static inline SeashyneVec3 seashyne_vec3_scale(SeashyneVec3 v, float scale) {
    return seashyne_vec3(v.x * scale, v.y * scale, v.z * scale);
}

static inline float seashyne_vec3_dot(SeashyneVec3 a, SeashyneVec3 b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

static inline SeashyneVec3 seashyne_vec3_cross(SeashyneVec3 a, SeashyneVec3 b) {
    return seashyne_vec3(
        a.y * b.z - a.z * b.y,
        a.z * b.x - a.x * b.z,
        a.x * b.y - a.y * b.x
    );
}

static inline float seashyne_vec3_length(SeashyneVec3 v) {
    return sqrtf(v.x * v.x + v.y * v.y + v.z * v.z);
}

static inline SeashyneVec3 seashyne_vec3_normalize(SeashyneVec3 v) {
    float len = seashyne_vec3_length(v);
    if (len > 1e-6f) {
        float inv = 1.0f / len;
        return seashyne_vec3(v.x * inv, v.y * inv, v.z * inv);
    }
    return seashyne_vec3(0.0f, 0.0f, 0.0f);
}

static inline float seashyne_vec3_distance(SeashyneVec3 a, SeashyneVec3 b) {
    return seashyne_vec3_length(seashyne_vec3_sub(a, b));
}

static inline SeashyneVec3 seashyne_vec3_lerp(SeashyneVec3 a, SeashyneVec3 b, float t) {
    return seashyne_vec3(
        a.x + (b.x - a.x) * t,
        a.y + (b.y - a.y) * t,
        a.z + (b.z - a.z) * t
    );
}

static inline float seashyne_clamp(float val, float min, float max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

#endif /* SEASHYNE_MATH_H */
