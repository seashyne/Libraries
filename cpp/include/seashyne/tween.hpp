/**
 * tween.hpp - Modern C++ Easing & Tweening Engine
 * Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
 * License: MIT
 */

#pragma once

#include <cmath>
#include <functional>
#include <algorithm>

namespace seashyne {

enum class Ease {
    Linear,
    InQuad, OutQuad, InOutQuad,
    InCubic, OutCubic, InOutCubic,
    InSine, OutSine, InOutSine,
    InExpo, OutExpo, InOutExpo,
    OutBounce
};

class Tween {
public:
    static constexpr float PI = 3.14159265358979323846f;

    static float apply(Ease ease, float t) {
        t = std::clamp(t, 0.0f, 1.0f);
        switch (ease) {
            case Ease::InQuad: return t * t;
            case Ease::OutQuad: return t * (2.0f - t);
            case Ease::InOutQuad: return t < 0.5f ? 2.0f * t * t : -1.0f + (4.0f - 2.0f * t) * t;
            case Ease::InCubic: return t * t * t;
            case Ease::OutCubic: { float f = t - 1.0f; return f * f * f + 1.0f; }
            case Ease::InOutCubic: return t < 0.5f ? 4.0f * t * t * t : (t - 1.0f) * (2.0f * t - 2.0f) * (2.0f * t - 2.0f) + 1.0f;
            case Ease::InSine: return 1.0f - std::cos(t * (PI * 0.5f));
            case Ease::OutSine: return std::sin(t * (PI * 0.5f));
            case Ease::InOutSine: return -0.5f * (std::cos(PI * t) - 1.0f);
            case Ease::InExpo: return (t <= 0.0f) ? 0.0f : std::pow(2.0f, 10.0f * (t - 1.0f));
            case Ease::OutExpo: return (t >= 1.0f) ? 1.0f : 1.0f - std::pow(2.0f, -10.0f * t);
            case Ease::OutBounce: return bounce(t);
            default: return t;
        }
    }

    template<typename T>
    static T lerp(const T& a, const T& b, float t) {
        return a + (b - a) * t;
    }

private:
    static float bounce(float t) {
        if (t < (1.0f / 2.75f)) return 7.5625f * t * t;
        if (t < (2.0f / 2.75f)) { float f = t - (1.5f / 2.75f); return 7.5625f * f * f + 0.75f; }
        if (t < (2.5f / 2.75f)) { float f = t - (2.25f / 2.75f); return 7.5625f * f * f + 0.9375f; }
        float f = t - (2.625f / 2.75f);
        return 7.5625f * f * f + 0.984375f;
    }
};

} // namespace seashyne
