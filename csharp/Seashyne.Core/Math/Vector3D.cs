using System;

namespace Seashyne.Core.Math
{
    public readonly struct Vector3D : IEquatable<Vector3D>
    {
        public readonly float X;
        public readonly float Y;
        public readonly float Z;

        public static readonly Vector3D Zero = new Vector3D(0f, 0f, 0f);
        public static readonly Vector3D One = new Vector3D(1f, 1f, 1f);
        public static readonly Vector3D Up = new Vector3D(0f, 1f, 0f);

        public Vector3D(float x, float y, float z)
        {
            X = x;
            Y = y;
            Z = z;
        }

        public static Vector3D operator +(Vector3D a, Vector3D b) => new Vector3D(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
        public static Vector3D operator -(Vector3D a, Vector3D b) => new Vector3D(a.X - b.X, a.Y - b.Y, a.Z - b.Z);
        public static Vector3D operator *(Vector3D a, float s) => new Vector3D(a.X * s, a.Y * s, a.Z * s);
        public static Vector3D operator /(Vector3D a, float s) => new Vector3D(a.X / s, a.Y / s, a.Z / s);

        public float LengthSquared => X * X + Y * Y + Z * Z;
        public float Length => (float)System.Math.Sqrt(LengthSquared);

        public Vector3D Normalize()
        {
            float len = Length;
            return len > 1e-6f ? this / len : Zero;
        }

        public float Dot(Vector3D other) => X * other.X + Y * other.Y + Z * other.Z;

        public Vector3D Cross(Vector3D other) => new Vector3D(
            Y * other.Z - Z * other.Y,
            Z * other.X - X * other.Z,
            X * other.Y - Y * other.X
        );

        public float DistanceTo(Vector3D other) => (this - other).Length;

        public Vector3D Lerp(Vector3D target, float t)
        {
            t = System.Math.Max(0f, System.Math.Min(1f, t));
            return this + (target - this) * t;
        }

        public bool Equals(Vector3D other) => X == other.X && Y == other.Y && Z == other.Z;
        public override bool Equals(object? obj) => obj is Vector3D other && Equals(other);
        public override int GetHashCode() => HashCode.Combine(X, Y, Z);
        public override string ToString() => $"Vector3D({X}, {Y}, {Z})";
    }
}
