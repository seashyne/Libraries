using System;
using System.Collections.Generic;

namespace Seashyne.Core.Events
{
    public class Signal<T>
    {
        private readonly List<Action<T>> _listeners = new List<Action<T>>();

        public Action Connect(Action<T> listener)
        {
            if (listener == null) throw new ArgumentNullException(nameof(listener));
            _listeners.Add(listener);
            bool disconnected = false;
            return () =>
            {
                if (disconnected) return;
                disconnected = true;
                _listeners.Remove(listener);
            };
        }

        public void Emit(T arg)
        {
            var snapshot = _listeners.ToArray();
            foreach (var listener in snapshot)
            {
                listener(arg);
            }
        }

        public void Clear() => _listeners.Clear();
        public int Count => _listeners.Count;
    }

    public class Signal
    {
        private readonly List<Action> _listeners = new List<Action>();

        public Action Connect(Action listener)
        {
            if (listener == null) throw new ArgumentNullException(nameof(listener));
            _listeners.Add(listener);
            bool disconnected = false;
            return () =>
            {
                if (disconnected) return;
                disconnected = true;
                _listeners.Remove(listener);
            };
        }

        public void Emit()
        {
            var snapshot = _listeners.ToArray();
            foreach (var listener in snapshot)
            {
                listener();
            }
        }

        public void Clear() => _listeners.Clear();
        public int Count => _listeners.Count;
    }
}
