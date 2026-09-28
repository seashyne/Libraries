--[[
  inspect.lua - Original Table Inspector & Serializer
  Author: Seashyne (https://github.com/seashyne/Libraries)
  License: MIT
--]]

local function inspect(root, options)
    options = options or {}
    local indentStr = options.indent or "  "
    local maxDepth = options.depth or 10
    local visited = {}

    local function formatValue(val, depth)
        local valType = type(val)

        if valType == "string" then
            return string.format("%q", val)
        elseif valType == "number" or valType == "boolean" or valType == "nil" then
            return tostring(val)
        elseif valType == "function" or valType == "thread" or valType == "userdata" then
            return "<" .. tostring(val) .. ">"
        elseif valType == "table" then
            if visited[val] then
                return "<cycle " .. tostring(val) .. ">"
            end
            if depth >= maxDepth then
                return "{ ... }"
            end

            visited[val] = true
            local indent = string.rep(indentStr, depth)
            local nextIndent = string.rep(indentStr, depth + 1)
            local lines = {}

            -- Check if it's a sequence/array
            local isArray = true
            local maxIndex = 0
            for k, _ in pairs(val) do
                if type(k) == "number" and k > 0 and math.floor(k) == k then
                    if k > maxIndex then maxIndex = k end
                else
                    isArray = false
                    break
                end
            end
            if maxIndex == 0 then isArray = false end

            if isArray then
                local allSimple = true
                for i = 1, maxIndex do
                    if type(val[i]) == "table" then allSimple = false break end
                end
                if allSimple and maxIndex <= 6 then
                    local items = {}
                    for i = 1, maxIndex do
                        table.insert(items, formatValue(val[i], depth + 1))
                    end
                    visited[val] = nil
                    return "{ " .. table.concat(items, ", ") .. " }"
                end
            end

            -- Sort keys for deterministic output
            local keys = {}
            for k in pairs(val) do table.insert(keys, k) end
            table.sort(keys, function(a, b)
                if type(a) == type(b) then
                    return tostring(a) < tostring(b)
                end
                return type(a) < type(b)
            end)

            for _, k in ipairs(keys) do
                local keyStr
                if type(k) == "string" and k:match("^[%a_][%w_]*$") then
                    keyStr = k
                else
                    keyStr = "[" .. formatValue(k, depth + 1) .. "]"
                end
                local valStr = formatValue(val[k], depth + 1)
                table.insert(lines, nextIndent .. keyStr .. " = " .. valStr)
            end

            visited[val] = nil
            if #lines == 0 then
                return "{}"
            end
            return "{\n" .. table.concat(lines, ",\n") .. "\n" .. indent .. "}"
        end
        return tostring(val)
    end

    return formatValue(root, 0)
end

return setmetatable({}, {
    __call = function(_, root, options)
        return inspect(root, options)
    end
})
