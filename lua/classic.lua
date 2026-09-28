--[[
  classic.lua - Original Lightweight OOP & Class System
  Author: Seashyne (https://github.com/seashyne/Libraries)
  License: MIT
--]]

local Object = {}
Object.__index = Object

function Object:new(...)
    -- Subclasses override this constructor
end

function Object:extend()
    local cls = {}
    cls.__index = cls
    cls.super = self
    setmetatable(cls, self)
    return cls
end

function Object:implement(...)
    for i = 1, select("#", ...) do
        local trait = select(i, ...)
        for k, v in pairs(trait) do
            if self[k] == nil and type(v) == "function" then
                self[k] = v
            end
        end
    end
end

function Object:is(targetClass)
    local mt = getmetatable(self)
    while mt do
        if mt == targetClass then return true end
        mt = mt.super or getmetatable(mt)
    end
    return false
end

function Object:__tostring()
    return "Object"
end

function Object:__call(...)
    local instance = setmetatable({}, self)
    instance:new(...)
    return instance
end

return setmetatable(Object, {
    __call = function(self, ...)
        return self:__call(...)
    end
})
