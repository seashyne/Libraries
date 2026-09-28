"""
events.py - Event and Signal Dispatcher for Python
Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
License: MIT
"""

from typing import Callable, Any, List

class Signal:
    def __init__(self):
        self._listeners: List[Callable[..., Any]] = []

    def connect(self, fn: Callable[..., Any]) -> Callable[[], None]:
        if not callable(fn):
            raise TypeError("Signal listener must be callable")
        self._listeners.append(fn)

        disconnected = False
        def disconnect():
            nonlocal disconnected
            if disconnected:
                return
            disconnected = True
            if fn in self._listeners:
                self._listeners.remove(fn)

        return disconnect

    def emit(self, *args: Any, **kwargs: Any) -> None:
        for fn in list(self._listeners):
            fn(*args, **kwargs)

    def clear(self) -> None:
        self._listeners.clear()

    def __len__(self) -> int:
        return len(self._listeners)
