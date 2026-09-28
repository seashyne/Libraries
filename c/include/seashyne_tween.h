/**
 * seashyne_tween.h - C99 Easing & Interpolation Functions
 * Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
 * License: MIT
 */

#ifndef SEASHYNE_TWEEN_H
#define SEASHYNE_TWEEN_H

#include <math.h>

#ifndef SEASHYNE_PI
#define SEASHYNE_PI 3.14159265358979323846f
#endif

typedef enum {
    SEASHYNE_EASE_LINEAR = 0,
    SEASHYNE_EASE_IN_QUAD,
    SEASHYNE_EASE_OUT_QUAD,
    SEASHYNE_EASE_INOUT_QUAD,
    SEASHYNE_EASE_IN_CUBIC,
    SEASHYNE_EASE_OUT_CUBIC,
    SEASHYNE_EASE_INOUT_CUBIC,
    SEASHYNE_EASE_IN_SINE,
    SEASHYNE_EASE_OUT_SINE,
    SEASHYNE_EASE_INOUT_SINE,
    SEASHYNE_EASE_IN_EXPO,
    SEASHYNE_EASE_OUT_EXPO,
    SEASHYNE_EASE_INOUT_EXPO,
    SEASHYNE_EASE_IN_CIRC,
    SEASHYNE_EASE_OUT_CIRC,
    SEASHYNE_EASE_INOUT_CIRC,
    SEASHYNE_EASE_OUT_BOUNCE
} SeashyneEaseType;

static inline float seashyne_ease_linear(float t) {
    return t;
}

static inline float seashyne_ease_in_quad(float t) {
    return t * t;
}

static inline float seashyne_ease_out_quad(float t) {
    return t * (2.0f - t);
}

static inline float seashyne_ease_inout_quad(float t) {
    return t < 0.5f ? 2.0f * t * t : -1.0f + (4.0f - 2.0f * t) * t;
}

static inline float seashyne_ease_in_cubic(float t) {
    return t * t * t;
}

static inline float seashyne_ease_out_cubic(float t) {
    float f = t - 1.0f;
    return f * f * f + 1.0f;
}

static inline float seashyne_ease_inout_cubic(float t) {
    return t < 0.5f ? 4.0f * t * t * t : (t - 1.0f) * (2.0f * t - 2.0f) * (2.0f * t - 2.0f) + 1.0f;
}

static inline float seashyne_ease_in_sine(float t) {
    return 1.0f - cosf(t * (SEASHYNE_PI * 0.5f));
}

static inline float seashyne_ease_out_sine(float t) {
    return sinf(t * (SEASHYNE_PI * 0.5f));
}

static inline float seashyne_ease_inout_sine(float t) {
    return -0.5f * (cosf(SEASHYNE_PI * t) - 1.0f);
}

static inline float seashyne_ease_in_expo(float t) {
    return (t <= 0.0f) ? 0.0f : powf(2.0f, 10.0f * (t - 1.0f));
}

static inline float seashyne_ease_out_expo(float t) {
    return (t >= 1.0f) ? 1.0f : 1.0f - powf(2.0f, -10.0f * t);
}

static inline float seashyne_ease_inout_expo(float t) {
    if (t <= 0.0f) return 0.0f;
    if (t >= 1.0f) return 1.0f;
    if (t < 0.5f) return 0.5f * powf(2.0f, 20.0f * t - 10.0f);
    return 1.0f - 0.5f * powf(2.0f, -20.0f * t + 10.0f);
}

static inline float seashyne_ease_out_bounce(float t) {
    if (t < (1.0f / 2.75f)) {
        return 7.5625f * t * t;
    } else if (t < (2.0f / 2.75f)) {
        float f = t - (1.5f / 2.75f);
        return 7.5625f * f * f + 0.75f;
    } else if (t < (2.5f / 2.75f)) {
        float f = t - (2.25f / 2.75f);
        return 7.5625f * f * f + 0.9375f;
    } else {
        float f = t - (2.625f / 2.75f);
        return 7.5625f * f * f + 0.984375f;
    }
}

static inline float seashyne_ease(SeashyneEaseType type, float t) {
    if (t < 0.0f) t = 0.0f;
    if (t > 1.0f) t = 1.0f;
    switch (type) {
        case SEASHYNE_EASE_IN_QUAD:    return seashyne_ease_in_quad(t);
        case SEASHYNE_EASE_OUT_QUAD:   return seashyne_ease_out_quad(t);
        case SEASHYNE_EASE_INOUT_QUAD: return seashyne_ease_inout_quad(t);
        case SEASHYNE_EASE_IN_CUBIC:   return seashyne_ease_in_cubic(t);
        case SEASHYNE_EASE_OUT_CUBIC:  return seashyne_ease_out_cubic(t);
        case SEASHYNE_EASE_INOUT_CUBIC:return seashyne_ease_inout_cubic(t);
        case SEASHYNE_EASE_IN_SINE:    return seashyne_ease_in_sine(t);
        case SEASHYNE_EASE_OUT_SINE:   return seashyne_ease_out_sine(t);
        case SEASHYNE_EASE_INOUT_SINE: return seashyne_ease_inout_sine(t);
        case SEASHYNE_EASE_IN_EXPO:    return seashyne_ease_in_expo(t);
        case SEASHYNE_EASE_OUT_EXPO:   return seashyne_ease_out_expo(t);
        case SEASHYNE_EASE_INOUT_EXPO: return seashyne_ease_inout_expo(t);
        case SEASHYNE_EASE_OUT_BOUNCE: return seashyne_ease_out_bounce(t);
        default: return seashyne_ease_linear(t);
    }
}

static inline float seashyne_lerp(float a, float b, float t) {
    return a + (b - a) * t;
}

#endif /* SEASHYNE_TWEEN_H */
