/**
 * signal.hpp - Type-Safe Event & Signal Dispatcher
 * Part of Seashyne Libraries (https://github.com/seashyne/Libraries)
 * License: MIT
 */

#pragma once

#include <functional>
#include <vector>
#include <cstdint>
#include <algorithm>

namespace seashyne {

template<typename... Args>
class Signal {
public:
    using Callback = std::function<void(Args...)>;
    using ConnectionId = uint64_t;

    struct Connection {
        ConnectionId id;
        Callback callback;
    };

    ConnectionId connect(Callback cb) {
        ConnectionId id = ++next_id_;
        slots_.push_back({id, std::move(cb)});
        return id;
    }

    bool disconnect(ConnectionId id) {
        auto it = std::remove_if(slots_.begin(), slots_.end(), [id](const Connection& c) {
            return c.id == id;
        });
        if (it != slots_.end()) {
            slots_.erase(it, slots_.end());
            return true;
        }
        return false;
    }

    void emit(Args... args) const {
        // Copy slots in case callback modifies signal
        auto current_slots = slots_;
        for (const auto& slot : current_slots) {
            if (slot.callback) {
                slot.callback(args...);
            }
        }
    }

    void clear() {
        slots_.clear();
    }

    size_t size() const {
        return slots_.size();
    }

private:
    ConnectionId next_id_{0};
    std::vector<Connection> slots_;
};

} // namespace seashyne
