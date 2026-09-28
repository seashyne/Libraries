using System;

namespace Seashyne.Core.Animation
{
    public enum EaseType
    {
        Linear,
        InQuad, OutQuad, InOutQuad,
        InCubic, OutCubic, InOutCubic,
        InSine, OutSine, InOutSine,
        InExpo, OutExpo, InOutExpo,
        OutBounce
    }

    public static class Tweener
    {
        private const float PI = 3.14159265358979323846f;

        public static float Ease(EaseType ease, float t)
        {
            t = System.Math.Max(0f, System.Math.Min(1f, t));
            switch (ease)
            {
                case EaseType.InQuad: return t * t;
                case EaseType.OutQuad: return t * (2f - t);
                case EaseType.InOutQuad: return t < 0.5f ? 2f * t * t : -1f + (4f - 2f * t) * t;
                case EaseType.InCubic: return t * t * t;
                case EaseType.OutCubic: { float f = t - 1f; return f * f * f + 1f; }
                case EaseType.InOutCubic: return t < 0.5f ? 4f * t * t * t : (t - 1f) * (2f * t - 2f) * (2f * t - 2f) + 1f;
                case EaseType.InSine: return 1f - (float)System.Math.Cos(t * (PI * 0.5f));
                case EaseType.OutSine: return (float)System.Math.Sin(t * (PI * 0.5f));
                case EaseType.InOutSine: return -0.5f * ((float)System.Math.Cos(PI * t) - 1f);
                case EaseType.InExpo: return t <= 0f ? 0f : (float)System.Math.Pow(2f, 10f * (t - 1f));
                case EaseType.OutExpo: return t >= 1f ? 1f : 1f - (float)System.Math.Pow(2f, -10f * t);
                case EaseType.OutBounce: return Bounce(t);
                default: return t;
            }
        }

        public static float Lerp(float a, float b, float t) => a + (b - a) * t;

        private static float Bounce(float t)
        {
            if (t < (1f / 2.75f)) return 7.5625f * t * t;
            if (t < (2f / 2.75f)) { float f = t - (1.5f / 2.75f); return 7.5625f * f * f + 0.75f; }
            if (t < (2.5f / 2.75f)) { float f = t - (2.25f / 2.75f); return 7.5625f * f * f + 0.9375f; }
            float r = t - (2.625f / 2.75f);
            return 7.5625f * r * r + 0.984375f;
        }
    }
}
