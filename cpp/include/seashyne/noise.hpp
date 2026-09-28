/**
 * noise.hpp - Modern C++ 2D/3D Perlin Noise Generator
 * Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
 * License: MIT
 */

#pragma once

#include <cmath>
#include <array>
#include <numeric>
#include <random>

namespace seashyne {

class Noise {
public:
    static float perlin2d(float x, float y) {
        int X = static_cast<int>(std::floor(x)) & 255;
        int Y = static_cast<int>(std::floor(y)) & 255;
        x -= std::floor(x);
        y -= std::floor(y);
        float u = fade(x);
        float v = fade(y);
        int A = PERM[X] + Y;
        int B = PERM[X + 1] + Y;
        return (1.0f - u) * ((1.0f - v) * grad(PERM[A], x, y, 0.0f) +
                             v * grad(PERM[A + 1], x, y - 1.0f, 0.0f)) +
               u * ((1.0f - v) * grad(PERM[B], x - 1.0f, y, 0.0f) +
                    v * grad(PERM[B + 1], x - 1.0f, y - 1.0f, 0.0f));
    }

    static float perlin3d(float x, float y, float z) {
        int X = static_cast<int>(std::floor(x)) & 255;
        int Y = static_cast<int>(std::floor(y)) & 255;
        int Z = static_cast<int>(std::floor(z)) & 255;
        x -= std::floor(x);
        y -= std::floor(y);
        z -= std::floor(z);
        float u = fade(x);
        float v = fade(y);
        float w = fade(z);
        int A = PERM[X] + Y;
        int AA = PERM[A] + Z;
        int AB = PERM[A + 1] + Z;
        int B = PERM[X + 1] + Y;
        int BA = PERM[B] + Z;
        int BB = PERM[B + 1] + Z;

        float r1 = (1.0f - u) * ((1.0f - v) * grad(PERM[AA], x, y, z) +
                                 v * grad(PERM[AB], x, y - 1.0f, z)) +
                   u * ((1.0f - v) * grad(PERM[BA], x - 1.0f, y, z) +
                        v * grad(PERM[BB], x - 1.0f, y - 1.0f, z));

        float r2 = (1.0f - u) * ((1.0f - v) * grad(PERM[AA + 1], x, y, z - 1.0f) +
                                 v * grad(PERM[AB + 1], x, y - 1.0f, z - 1.0f)) +
                   u * ((1.0f - v) * grad(PERM[BA + 1], x - 1.0f, y, z - 1.0f) +
                        v * grad(PERM[BB + 1], x - 1.0f, y - 1.0f, z - 1.0f));

        return (1.0f - w) * r1 + w * r2;
    }

private:
    static float fade(float t) {
        return t * t * t * (t * (t * 6.0f - 15.0f) + 10.0f);
    }

    static float grad(int hash, float x, float y, float z) {
        int h = hash & 15;
        float u = h < 8 ? x : y;
        float v = h < 4 ? y : (h == 12 || h == 14 ? x : z);
        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
    }

    static inline const std::array<int, 512> PERM = []{
        std::array<int, 256> base = {
            151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,
            8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,
            35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,
            134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,
            55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,
            18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,
            250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,
            189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,
            172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
            228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,
            107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
            138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
        };
        std::array<int, 512> p{};
        for (size_t i = 0; i < 256; ++i) {
            p[i] = base[i];
            p[i + 256] = base[i];
        }
        return p;
    }();
};

} // namespace seashyne
