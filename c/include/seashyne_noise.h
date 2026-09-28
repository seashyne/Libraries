/**
 * seashyne_noise.h - C99 1D, 2D, 3D Perlin & Simplex Noise Generator
 * Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
 * License: MIT
 */

#ifndef SEASHYNE_NOISE_H
#define SEASHYNE_NOISE_H

#include <math.h>

static const int SEASHYNE_NOISE_PERM[512] = {
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
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,
    /* Repeated permutation to avoid index wrap check */
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

static inline float seashyne_noise_fade(float t) {
    return t * t * t * (t * (t * 6.0f - 15.0f) + 10.0f);
}

static inline float seashyne_noise_grad(int hash, float x, float y, float z) {
    int h = hash & 15;
    float u = h < 8 ? x : y;
    float v = h < 4 ? y : (h == 12 || h == 14 ? x : z);
    return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
}

static inline float seashyne_perlin2d(float x, float y) {
    int X = (int)floorf(x) & 255;
    int Y = (int)floorf(y) & 255;
    x -= floorf(x);
    y -= floorf(y);
    float u = seashyne_noise_fade(x);
    float v = seashyne_noise_fade(y);
    int A = SEASHYNE_NOISE_PERM[X] + Y;
    int B = SEASHYNE_NOISE_PERM[X + 1] + Y;
    float res = (1.0f - u) * ((1.0f - v) * seashyne_noise_grad(SEASHYNE_NOISE_PERM[A], x, y, 0.0f) +
                              v * seashyne_noise_grad(SEASHYNE_NOISE_PERM[A + 1], x, y - 1.0f, 0.0f)) +
                u * ((1.0f - v) * seashyne_noise_grad(SEASHYNE_NOISE_PERM[B], x - 1.0f, y, 0.0f) +
                     v * seashyne_noise_grad(SEASHYNE_NOISE_PERM[B + 1], x - 1.0f, y - 1.0f, 0.0f));
    return res;
}

static inline float seashyne_perlin3d(float x, float y, float z) {
    int X = (int)floorf(x) & 255;
    int Y = (int)floorf(y) & 255;
    int Z = (int)floorf(z) & 255;
    x -= floorf(x);
    y -= floorf(y);
    z -= floorf(z);
    float u = seashyne_noise_fade(x);
    float v = seashyne_noise_fade(y);
    float w = seashyne_noise_fade(z);
    int A = SEASHYNE_NOISE_PERM[X] + Y;
    int AA = SEASHYNE_NOISE_PERM[A] + Z;
    int AB = SEASHYNE_NOISE_PERM[A + 1] + Z;
    int B = SEASHYNE_NOISE_PERM[X + 1] + Y;
    int BA = SEASHYNE_NOISE_PERM[B] + Z;
    int BB = SEASHYNE_NOISE_PERM[B + 1] + Z;

    float r1 = (1.0f - u) * ((1.0f - v) * seashyne_noise_grad(SEASHYNE_NOISE_PERM[AA], x, y, z) +
                             v * seashyne_noise_grad(SEASHYNE_NOISE_PERM[AB], x, y - 1.0f, z)) +
               u * ((1.0f - v) * seashyne_noise_grad(SEASHYNE_NOISE_PERM[BA], x - 1.0f, y, z) +
                    v * seashyne_noise_grad(SEASHYNE_NOISE_PERM[BB], x - 1.0f, y - 1.0f, z));

    float r2 = (1.0f - u) * ((1.0f - v) * seashyne_noise_grad(SEASHYNE_NOISE_PERM[AA + 1], x, y, z - 1.0f) +
                             v * seashyne_noise_grad(SEASHYNE_NOISE_PERM[AB + 1], x, y - 1.0f, z - 1.0f)) +
               u * ((1.0f - v) * seashyne_noise_grad(SEASHYNE_NOISE_PERM[BA + 1], x - 1.0f, y, z - 1.0f) +
                    v * seashyne_noise_grad(SEASHYNE_NOISE_PERM[BB + 1], x - 1.0f, y - 1.0f, z - 1.0f));

    return (1.0f - w) * r1 + w * r2;
}

#endif /* SEASHYNE_NOISE_H */
