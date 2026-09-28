--[[
  tween.lua - Original High-Performance Tweening & Easing Engine
  Author: Seashyne (https://github.com/seashyne/Libraries)
  License: MIT
--]]

local tween = {}
local PI = math.pi
local HALF_PI = PI * 0.5

-- Robert Penner easing equations implemented by Seashyne
local easing = {}

function easing.linear(t) return t end

function easing.inQuad(t) return t * t end
function easing.outQuad(t) return t * (2 - t) end
function easing.inOutQuad(t) return t < 0.5 and 2 * t * t or -1 + (4 - 2 * t) * t end

function easing.inCubic(t) return t * t * t end
function easing.outCubic(t) local f = t - 1 return f * f * f + 1 end
function easing.inOutCubic(t) return t < 0.5 and 4 * t * t * t or (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 end

function easing.inSine(t) return 1 - math.cos(t * HALF_PI) end
function easing.outSine(t) return math.sin(t * HALF_PI) end
function easing.inOutSine(t) return -0.5 * (math.cos(PI * t) - 1) end

function easing.inExpo(t) return (t <= 0) and 0 or math.pow(2, 10 * (t - 1)) end
function easing.outExpo(t) return (t >= 1) and 1 or 1 - math.pow(2, -10 * t) end
function easing.inOutExpo(t)
    if t <= 0 then return 0 end
    if t >= 1 then return 1 end
    if t < 0.5 then return 0.5 * math.pow(2, 20 * t - 10) end
    return 1 - 0.5 * math.pow(2, -20 * t + 10)
end

function easing.inCirc(t) return 1 - math.sqrt(1 - t * t) end
function easing.outCirc(t) local f = t - 1 return math.sqrt(1 - f * f) end
function easing.inOutCirc(t)
    if t < 0.5 then return 0.5 * (1 - math.sqrt(1 - 4 * t * t)) end
    local f = 2 * t - 2
    return 0.5 * (math.sqrt(1 - f * f) + 1)
end

function easing.outBounce(t)
    if t < (1 / 2.75) then
        return 7.5625 * t * t
    elseif t < (2 / 2.75) then
        local f = t - (1.5 / 2.75)
        return 7.5625 * f * f + 0.75
    elseif t < (2.5 / 2.75) then
        local f = t - (2.25 / 2.75)
        return 7.5625 * f * f + 0.9375
    else
        local f = t - (2.625 / 2.75)
        return 7.5625 * f * f + 0.984375
    end
end
function easing.inBounce(t) return 1 - easing.outBounce(1 - t) end
function easing.inOutBounce(t)
    if t < 0.5 then return 0.5 * easing.inBounce(t * 2) end
    return 0.5 * easing.outBounce(t * 2 - 1) + 0.5
end

function easing.outBack(t, s)
    s = s or 1.70158
    local f = t - 1
    return f * f * ((s + 1) * f + s) + 1
end
function easing.inBack(t, s)
    s = s or 1.70158
    return t * t * ((s + 1) * t - s)
end
function easing.inOutBack(t, s)
    s = (s or 1.70158) * 1.525
    if t < 0.5 then
        return 0.5 * (t * 2 * t * 2 * ((s + 1) * t * 2 - s))
    end
    local f = t * 2 - 2
    return 0.5 * (f * f * ((s + 1) * f + s) + 2)
end

tween.easing = easing

function tween.ease(name, t)
    local fn = easing[name] or easing.linear
    return fn(math.max(0, math.min(1, t)))
end

function tween.lerp(a, b, t)
    return a + (b - a) * t
end

-- Tween Instance
local TweenInstance = {}
TweenInstance.__index = TweenInstance

function TweenInstance:set(clock)
    self.clock = math.max(0, math.min(self.duration, clock))
    local progress = self.duration > 0 and (self.clock / self.duration) or 1
    local eased = self.easeFn(progress)

    for key, initial in pairs(self.initial) do
        local delta = self.diff[key]
        self.subject[key] = initial + delta * eased
    end
    return self.clock >= self.duration
end

function TweenInstance:update(dt)
    return self:set(self.clock + dt)
end

function TweenInstance:reset()
    return self:set(0)
end

function tween.new(duration, subject, target, easeName)
    assert(type(duration) == "number" and duration >= 0, "duration must be a non-negative number")
    assert(type(subject) == "table", "subject must be a table")
    assert(type(target) == "table", "target must be a table")

    local easeFn = type(easeName) == "function" and easeName or (easing[easeName] or easing.linear)
    local initial = {}
    local diff = {}

    for k, v in pairs(target) do
        if type(v) == "number" and type(subject[k]) == "number" then
            initial[k] = subject[k]
            diff[k] = v - subject[k]
        end
    end

    local inst = setmetatable({
        duration = duration,
        subject = subject,
        target = target,
        initial = initial,
        diff = diff,
        easeFn = easeFn,
        clock = 0
    }, TweenInstance)

    return inst
end

return tween
