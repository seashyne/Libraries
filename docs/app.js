/* ══════════════════════════════════════════════════
   Seashyne Libraries — Documentation App
   ══════════════════════════════════════════════════ */

// ── Utilities ──────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('✓ Copied to clipboard!'));
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ── Library Data ───────────────────────────────────
const LANG_GROUPS = [
  { id:'lua',    label:'Lua Libraries',   dot:'dot-lua',    open:true  },
  { id:'c',      label:'C Libraries',     dot:'dot-c',      open:false },
  { id:'cpp',    label:'C++ Libraries',   dot:'dot-cpp',    open:false },
  { id:'csharp', label:'C# Libraries',    dot:'dot-csharp', open:false },
  { id:'python', label:'Python Libraries',dot:'dot-python', open:false },
];

const LIBS = {

  /* ════════════ LUA ════════════ */

  'classic': {
    id:'classic', lang:'lua', name:'classic.lua',
    author:'rxi', type:'curated-mit',
    version:'0.1.0',
    sourceUrl:'https://github.com/rxi/classic',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/lua/classic.lua',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/classic.lua',
    tagline:'Tiny and fast class-based Object-Oriented Programming for Lua.',
    description:'classic.lua is a minimal OOP library by rxi that provides a simple class system with single inheritance. It allows creating class hierarchies, implementing mixins, and checking types — all in about 50 lines of pure Lua.',
    install:'local Object = require("classic")',
    note:'classic.lua is bundled with Shyne Core (Tier 2). You can use <code>require("classic")</code> in any avatar script without downloading.',
    sections:[
      { id:'library-api', title:'Library API', items:[
        {
          id:'object-extend', name:'Object:extend',
          sig:'Object:extend() → Class',
          ret:'Class',
          desc:'Creates and returns a new class that inherits from <code>Object</code>. Call this on any class to create a subclass.',
          params:[],
          example:'local Animal = Object:extend()\n\nfunction Animal:new(name, sound)\n  self.name  = name\n  self.sound = sound\nend\n\nfunction Animal:speak()\n  print(self.name .. " says " .. self.sound)\nend\n\nlocal Dog = Animal:extend()\n\nfunction Dog:new(name)\n  Dog.super.new(self, name, "Woof")\nend\n\nlocal d = Dog("Rex")\nd:speak()  --> Rex says Woof'
        },
        {
          id:'object-implement', name:'Object:implement',
          sig:'Object:implement(...) → void',
          ret:'void',
          desc:'Mixes one or more trait tables into the class. Only copies functions that do not already exist on the class (non-destructive).',
          params:[
            { name:'...', type:'table', opt:false, desc:'One or more tables containing functions to mix in.' }
          ],
          example:'local Drawable = {\n  draw = function(self)\n    print("drawing " .. tostring(self))\n  end\n}\n\nlocal Widget = Object:extend()\nWidget:implement(Drawable)\n\nlocal w = Widget()\nw:draw()  --> drawing Widget'
        },
        {
          id:'object-is', name:'Object:is',
          sig:'Object:is(T) → boolean',
          ret:'boolean',
          desc:'Returns <code>true</code> if <code>self</code> is an instance of class <code>T</code> or any subclass of it.',
          params:[
            { name:'T', type:'Class', opt:false, desc:'The class to test against.' }
          ],
          example:'local Animal = Object:extend()\nlocal Dog    = Animal:extend()\n\nlocal d = Dog()\nprint(d:is(Dog))    --> true\nprint(d:is(Animal)) --> true\nprint(d:is(Object)) --> true'
        },
        {
          id:'object-new', name:'Object:new',
          sig:'Object:new(...) → void',
          ret:'void',
          desc:'Constructor called automatically when a class is instantiated by calling it as a function, e.g. <code>MyClass()</code>. Override this in your subclass to initialize instance fields.',
          params:[
            { name:'...', type:'any', opt:true, desc:'Arguments passed to the constructor.' }
          ],
          example:'local Vec2 = Object:extend()\n\nfunction Vec2:new(x, y)\n  self.x = x or 0\n  self.y = y or 0\nend\n\nlocal v = Vec2(10, 20)  -- calls Vec2:new(10, 20)\nprint(v.x, v.y)  --> 10  20'
        },
      ]},
    ],
  },

  'tween': {
    id:'tween', lang:'lua', name:'tween.lua',
    author:'Enrique García Cota (kikito)', type:'curated-mit',
    version:'2.1.1',
    sourceUrl:'https://github.com/kikito/tween.lua',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/lua/tween.lua',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/tween.lua',
    tagline:'Tweening library with all standard Robert Penner easing equations.',
    description:'tween.lua interpolates any numeric field of a Lua table over a given duration, using one of 28+ easing functions. Perfect for animating avatar positions, scales, rotations, and colors in Minecraft Shyne scripts.',
    install:'local tween = require("tween")',
    sections:[
      { id:'library-api', title:'Library API', items:[
        {
          id:'tween-new', name:'tween.new',
          sig:'tween.new(duration, subject, target, easing?) → Tween',
          ret:'Tween',
          desc:'Creates and returns a new Tween object that will animate all numeric fields of <code>subject</code> toward the values in <code>target</code> over <code>duration</code> seconds.',
          params:[
            { name:'duration', type:'number', opt:false, desc:'Total animation time in seconds.' },
            { name:'subject',  type:'table',  opt:false, desc:'The table whose fields will be animated (mutated in-place).' },
            { name:'target',   type:'table',  opt:false, desc:'A table with the destination values for each field.' },
            { name:'easing',   type:'string|function', opt:true, desc:'Easing name (default: <code>"linear"</code>) or a custom easing function.' },
          ],
          example:'local tween = require("tween")\n\nlocal bone = { x = 0, scaleX = 1 }\nlocal t = tween.new(1.5, bone, { x = 100, scaleX = 2 }, "outBounce")\n\n-- In your avatar tick/render function:\nfunction events.tick()\n  local dt = 1/20  -- Minecraft: 20 ticks/second\n  local done = t:update(dt)\n  if done then print("Animation complete!") end\nend'
        },
      ]},
      { id:'tween-api', title:'Tween API', items:[
        {
          id:'tween-update', name:'Tween:update',
          sig:'Tween:update(dt) → boolean',
          ret:'boolean',
          desc:'Advances the tween by <code>dt</code> seconds and updates the subject table. Returns <code>true</code> when the tween has reached or passed its end point.',
          params:[
            { name:'dt', type:'number', opt:false, desc:'Delta time in seconds since the last update call.' }
          ],
          example:'local done = t:update(dt)\nif done then\n  print("finished!")\nend'
        },
        {
          id:'tween-reset', name:'Tween:reset',
          sig:'Tween:reset() → void',
          ret:'void',
          desc:'Resets the tween clock to 0 and restores the subject to its original values. Useful for looping animations.',
          params:[],
          example:'t:update(dt)  -- advance\nt:reset()     -- jump back to start'
        },
        {
          id:'tween-set', name:'Tween:set',
          sig:'Tween:set(clock) → void',
          ret:'void',
          desc:'Jumps the tween to a specific point in time. <code>clock</code> must be between 0 and the total duration.',
          params:[
            { name:'clock', type:'number', opt:false, desc:'Time position in seconds (0 = start, duration = end).' }
          ],
          example:'t:set(0.75)  -- jump to 75% of the way through'
        },
      ]},
      { id:'easing-types', title:'Easing Types', items:[
        {
          id:'easing-list', name:'Available Easings',
          sig:null,
          desc:'Pass any of these strings as the <code>easing</code> argument to <code>tween.new</code>.',
          params:[], example:null,
          easings:[
            'linear',
            'inQuad','outQuad','inOutQuad',
            'inCubic','outCubic','inOutCubic',
            'inQuart','outQuart','inOutQuart',
            'inQuint','outQuint','inOutQuint',
            'inSine','outSine','inOutSine',
            'inExpo','outExpo','inOutExpo',
            'inCirc','outCirc','inOutCirc',
            'inBounce','outBounce','inOutBounce',
            'inBack','outBack','inOutBack',
            'inElastic','outElastic','inOutElastic',
          ]
        }
      ]},
    ],
  },

  'vector': {
    id:'vector', lang:'lua', name:'vector.lua',
    author:'Seashyne', type:'seashyne-original',
    version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/lua/vector.lua',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/vector.lua',
    tagline:'2D and 3D vector math with operator overloads for Lua.',
    description:'vector.lua provides Vec2 and Vec3 classes with full arithmetic operator overloads (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>), plus geometric operations like dot product, cross product, lerp, and distance. Designed for Minecraft avatar bone positioning and look-vector math.',
    install:'local Vector = require("vector")',
    sections:[
      { id:'constructor', title:'Constructor', items:[
        {
          id:'vector-new', name:'Vector',
          sig:'Vector(x, y, z?) → Vector',
          ret:'Vector',
          desc:'Creates a new Vector. Omit <code>z</code> to create a 2D vector; provide all three to create a 3D vector.',
          params:[
            { name:'x', type:'number', opt:false, desc:'X component.' },
            { name:'y', type:'number', opt:false, desc:'Y component.' },
            { name:'z', type:'number', opt:true,  desc:'Z component (optional — omit for 2D).' },
          ],
          example:'local a = Vector(10, 0, 5)   -- 3D\nlocal b = Vector(3, 4)       -- 2D\nprint(a + b)  -- Vector(13, 4, 5)'
        },
      ]},
      { id:'instance-methods', title:'Instance Methods', items:[
        {
          id:'vec-length', name:'Vector:length',
          sig:'v:length() → number',
          ret:'number',
          desc:'Returns the Euclidean length (magnitude) of the vector.',
          params:[],
          example:'local v = Vector(3, 0, 4)\nprint(v:length())  --> 5'
        },
        {
          id:'vec-normalized', name:'Vector:normalized',
          sig:'v:normalized() → Vector',
          ret:'Vector',
          desc:'Returns a new vector with the same direction but a length of 1. Does not mutate <code>self</code>.',
          params:[],
          example:'local dir = Vector(0, 0, 10):normalized()\nprint(dir.z)  --> 1'
        },
        {
          id:'vec-distanceTo', name:'Vector:distanceTo',
          sig:'v:distanceTo(other) → number',
          ret:'number',
          desc:'Returns the Euclidean distance between <code>self</code> and <code>other</code>.',
          params:[
            { name:'other', type:'Vector', opt:false, desc:'The target vector.' }
          ],
          example:'local a = Vector(0,0,0)\nlocal b = Vector(3,4,0)\nprint(a:distanceTo(b))  --> 5'
        },
        {
          id:'vec-dot', name:'Vector:dot',
          sig:'v:dot(other) → number',
          ret:'number',
          desc:'Returns the dot product of <code>self</code> and <code>other</code>. Useful for projection and angle calculation.',
          params:[
            { name:'other', type:'Vector', opt:false, desc:'The other vector.' }
          ],
          example:'local forward = Vector(0, 0, 1)\nlocal right   = Vector(1, 0, 0)\nprint(forward:dot(right))  --> 0  (perpendicular)'
        },
        {
          id:'vec-cross', name:'Vector:cross',
          sig:'v:cross(other) → Vector',
          ret:'Vector',
          desc:'Returns the cross product of two 3D vectors. Result is perpendicular to both inputs. Only valid for 3D vectors.',
          params:[
            { name:'other', type:'Vector', opt:false, desc:'The other 3D vector.' }
          ],
          example:'local x = Vector(1,0,0)\nlocal y = Vector(0,1,0)\nprint(x:cross(y))  --> Vector(0, 0, 1)'
        },
        {
          id:'vec-lerp', name:'Vector:lerp',
          sig:'v:lerp(other, t) → Vector',
          ret:'Vector',
          desc:'Linearly interpolates between <code>self</code> and <code>other</code> by factor <code>t</code> (0 = self, 1 = other).',
          params:[
            { name:'other', type:'Vector', opt:false, desc:'Target vector.' },
            { name:'t',     type:'number', opt:false, desc:'Interpolation factor (0–1).' },
          ],
          example:'local a = Vector(0, 0, 0)\nlocal b = Vector(10, 0, 0)\nprint(a:lerp(b, 0.5))  --> Vector(5, 0, 0)'
        },
        {
          id:'vec-clone', name:'Vector:clone',
          sig:'v:clone() → Vector',
          ret:'Vector',
          desc:'Returns a copy of the vector.',
          params:[],
          example:'local copy = myVector:clone()'
        },
      ]},
      { id:'operators', title:'Arithmetic Operators', items:[
        {
          id:'vec-ops', name:'Operator Overloads',
          sig:null,
          desc:'Vectors support standard Lua arithmetic metamethods.',
          params:[],
          example:'local a = Vector(1, 2, 3)\nlocal b = Vector(4, 5, 6)\n\nprint(a + b)   --> Vector(5, 7, 9)\nprint(b - a)   --> Vector(3, 3, 3)\nprint(a * 2)   --> Vector(2, 4, 6)\nprint(b / 2)   --> Vector(2, 2.5, 3)\nprint(-a)      --> Vector(-1, -2, -3)\nprint(a == a)  --> true\nprint(tostring(a)) --> "(1, 2, 3)"'
        }
      ]},
    ],
  },

  'signal': {
    id:'signal', lang:'lua', name:'signal.lua',
    author:'Seashyne', type:'seashyne-original',
    version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/lua/signal.lua',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/signal.lua',
    tagline:'Lightweight event/observer dispatcher for decoupled Lua scripting.',
    description:'signal.lua provides a typed signal (event emitter) pattern that lets you connect callbacks to events and fire them with any number of arguments. Ideal for separating avatar logic from rendering in Shyne scripts.',
    install:'local Signal = require("signal")',
    sections:[
      { id:'constructor', title:'Constructor', items:[
        {
          id:'signal-new', name:'Signal',
          sig:'Signal() → Signal',
          ret:'Signal',
          desc:'Creates and returns a new signal object.',
          params:[],
          example:'local onDamage = Signal()\nlocal onDeath  = Signal()'
        }
      ]},
      { id:'signal-api', title:'Signal API', items:[
        {
          id:'signal-connect', name:'signal:connect',
          sig:'s:connect(callback) → disconnect',
          ret:'function',
          desc:'Subscribes <code>callback</code> to the signal. Returns a <code>disconnect</code> function that removes the subscription when called.',
          params:[
            { name:'callback', type:'function', opt:false, desc:'The function to call when the signal fires. Receives all fire arguments.' }
          ],
          example:'local disconnect = onDamage:connect(function(amount, src)\n  print("Took " .. amount .. " dmg from " .. src)\nend)\n\nonDamage:fire(25, "Lava")\n\ndisconnect()  -- unsubscribe'
        },
        {
          id:'signal-fire', name:'signal:fire',
          sig:'s:fire(...) → void',
          ret:'void',
          desc:'Fires the signal, calling all connected callbacks with the provided arguments.',
          params:[
            { name:'...', type:'any', opt:true, desc:'Arguments forwarded to every connected callback.' }
          ],
          example:'onDamage:fire(10, "Arrow")\nonDeath:fire("PVP")'
        },
        {
          id:'signal-disconnectAll', name:'signal:disconnectAll',
          sig:'s:disconnectAll() → void',
          ret:'void',
          desc:'Removes all connected callbacks from the signal.',
          params:[],
          example:'onDamage:disconnectAll()'
        },
        {
          id:'signal-destroy', name:'signal:destroy',
          sig:'s:destroy() → void',
          ret:'void',
          desc:'Disconnects all callbacks and marks the signal as destroyed. Fires after this point will silently do nothing.',
          params:[],
          example:'onDamage:destroy()'
        },
      ]},
    ],
  },

  'color': {
    id:'color', lang:'lua', name:'color.lua',
    author:'Seashyne', type:'seashyne-original',
    version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/lua/color.lua',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/color.lua',
    tagline:'RGBA color utility with hex parsing, integer packing, and lerp.',
    description:'color.lua provides an immutable Color type that supports hex string parsing, 32-bit integer packing/unpacking, and smooth linear interpolation. Designed for Figura/Shyne avatar glow effects and color animations.',
    install:'local Color = require("color")',
    sections:[
      { id:'constructors', title:'Constructors', items:[
        {
          id:'color-new', name:'Color',
          sig:'Color(r, g, b, a?) → Color',
          ret:'Color',
          desc:'Creates a color from normalized RGBA components (each in the range 0–1).',
          params:[
            { name:'r', type:'number', opt:false, desc:'Red component (0–1).' },
            { name:'g', type:'number', opt:false, desc:'Green component (0–1).' },
            { name:'b', type:'number', opt:false, desc:'Blue component (0–1).' },
            { name:'a', type:'number', opt:true,  desc:'Alpha component (0–1, default 1).' },
          ],
          example:'local white = Color(1, 1, 1)\nlocal halfRed = Color(1, 0, 0, 0.5)'
        },
        {
          id:'color-fromHex', name:'Color.fromHex',
          sig:'Color.fromHex(hex) → Color',
          ret:'Color',
          desc:'Parses a hex color string. Accepts <code>#RGB</code>, <code>#RRGGBB</code>, and <code>#RRGGBBAA</code> formats.',
          params:[
            { name:'hex', type:'string', opt:false, desc:'Hex color string, e.g. <code>"#FF5500"</code>.' }
          ],
          example:'local orange = Color.fromHex("#FF8800")\nlocal cyan   = Color.fromHex("#00FFFF")'
        },
        {
          id:'color-fromInt', name:'Color.fromInt',
          sig:'Color.fromInt(int) → Color',
          ret:'Color',
          desc:'Unpacks a 32-bit integer in <code>0xRRGGBBAA</code> format into a Color.',
          params:[
            { name:'int', type:'integer', opt:false, desc:'32-bit RGBA packed integer.' }
          ],
          example:'local red = Color.fromInt(0xFF0000FF)'
        },
      ]},
      { id:'color-api', title:'Color API', items:[
        {
          id:'color-lerp', name:'Color:lerp',
          sig:'c:lerp(other, t) → Color',
          ret:'Color',
          desc:'Returns a new Color interpolated between <code>self</code> and <code>other</code> by factor <code>t</code> (0–1). All channels including alpha are interpolated.',
          params:[
            { name:'other', type:'Color', opt:false, desc:'Target color.' },
            { name:'t',     type:'number',opt:false, desc:'Blend factor (0 = self, 1 = other).' },
          ],
          example:'local red  = Color.fromHex("#FF0000")\nlocal blue = Color.fromHex("#0000FF")\nlocal mid  = red:lerp(blue, 0.5)\nprint(mid:toHex())  --> #7F007F'
        },
        {
          id:'color-toHex', name:'Color:toHex',
          sig:'c:toHex() → string',
          ret:'string',
          desc:'Returns the color as a hex string in <code>#RRGGBB</code> format (alpha omitted if 1).',
          params:[],
          example:'print(Color(1, 0.5, 0):toHex())  --> #FF8000'
        },
        {
          id:'color-toInt', name:'Color:toInt',
          sig:'c:toInt() → integer',
          ret:'integer',
          desc:'Packs the color into a 32-bit integer (<code>0xRRGGBBAA</code>).',
          params:[],
          example:'print(Color.fromHex("#FF0000"):toInt())  --> 4278190335 (0xFF0000FF)'
        },
        {
          id:'color-toTable', name:'Color:toTable',
          sig:'c:toTable() → table',
          ret:'table',
          desc:'Returns a plain table <code>{r, g, b, a}</code> with normalized values.',
          params:[],
          example:'local t = Color(1, 0.5, 0.25, 1):toTable()\nprint(t.r, t.g, t.b, t.a)  --> 1  0.5  0.25  1'
        },
      ]},
    ],
  },

  'timer': {
    id:'timer', lang:'lua', name:'timer.lua',
    author:'Seashyne', type:'seashyne-original',
    version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/lua/timer.lua',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/timer.lua',
    tagline:'Frame-rate independent delay and periodic task scheduler.',
    description:'timer.lua lets you schedule one-shot and repeating callbacks without manually tracking counters. Call <code>timer.update(dt)</code> once per tick and all active timers fire automatically.',
    install:'local timer = require("timer")',
    note:'You must call <strong>timer.update(dt)</strong> inside your tick/render event handler for timers to fire.',
    sections:[
      { id:'library-api', title:'Library API', items:[
        {
          id:'timer-after', name:'timer.after',
          sig:'timer.after(delay, callback) → handle',
          ret:'handle',
          desc:'Schedules <code>callback</code> to run once after <code>delay</code> seconds. Returns a handle that can be passed to <code>timer.cancel</code>.',
          params:[
            { name:'delay',    type:'number',   opt:false, desc:'Seconds to wait before calling callback.' },
            { name:'callback', type:'function', opt:false, desc:'The function to execute after the delay.' },
          ],
          example:'local h = timer.after(2.0, function()\n  print("2 seconds have passed!")\nend)'
        },
        {
          id:'timer-every', name:'timer.every',
          sig:'timer.every(interval, callback, limit?) → handle',
          ret:'handle',
          desc:'Schedules <code>callback</code> to run repeatedly every <code>interval</code> seconds. Optionally limits to <code>limit</code> invocations.',
          params:[
            { name:'interval', type:'number',   opt:false, desc:'Seconds between each call.' },
            { name:'callback', type:'function', opt:false, desc:'The function to execute on each interval.' },
            { name:'limit',    type:'integer',  opt:true,  desc:'Maximum number of times to fire (default: unlimited).' },
          ],
          example:'-- Flash an effect 5 times, once per second\nlocal h = timer.every(1.0, function()\n  toggleGlow()\nend, 5)'
        },
        {
          id:'timer-cancel', name:'timer.cancel',
          sig:'timer.cancel(handle) → void',
          ret:'void',
          desc:'Cancels a specific timer before it fires. The handle becomes invalid after cancellation.',
          params:[
            { name:'handle', type:'handle', opt:false, desc:'The handle returned by <code>timer.after</code> or <code>timer.every</code>.' }
          ],
          example:'local h = timer.after(5.0, doSomething)\ntimer.cancel(h)  -- prevent it from firing'
        },
        {
          id:'timer-clear', name:'timer.clear',
          sig:'timer.clear() → void',
          ret:'void',
          desc:'Cancels all active timers immediately.',
          params:[],
          example:'timer.clear()  -- stop everything'
        },
        {
          id:'timer-update', name:'timer.update',
          sig:'timer.update(dt) → void',
          ret:'void',
          desc:'Advances the timer system by <code>dt</code> seconds and fires any callbacks that are due. Must be called every tick.',
          params:[
            { name:'dt', type:'number', opt:false, desc:'Delta time in seconds since the last call.' }
          ],
          example:'-- In your Figura/Shyne tick event:\nfunction events.tick()\n  timer.update(1/20)  -- 20 ticks per second\nend'
        },
      ]},
    ],
  },

  'noise': {
    id:'noise', lang:'lua', name:'noise.lua',
    author:'Seashyne', type:'seashyne-original',
    version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/lua/noise.lua',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/noise.lua',
    tagline:'Fast 1D, 2D, and 3D Perlin noise generator for procedural animation.',
    description:'noise.lua implements a seeded Perlin gradient noise algorithm returning values in the range −1 to 1. Ideal for organic movement: cloth, floating hair, breathing, and terrain heightmaps inside Shyne Core avatar scripts.',
    install:'local noise = require("noise")',
    sections:[
      { id:'library-api', title:'Library API', items:[
        {
          id:'noise-perlin1d', name:'noise.perlin1d',
          sig:'noise.perlin1d(x) → number',
          ret:'number (−1..1)',
          desc:'Evaluates 1D Perlin noise at coordinate <code>x</code>.',
          params:[{ name:'x', type:'number', opt:false, desc:'Sample coordinate.' }],
          example:'local wave = noise.perlin1d(time * 0.5)'
        },
        {
          id:'noise-perlin2d', name:'noise.perlin2d',
          sig:'noise.perlin2d(x, y) → number',
          ret:'number (−1..1)',
          desc:'Evaluates 2D Perlin noise at coordinates <code>(x, y)</code>. Most commonly used for terrain and cloth simulation.',
          params:[
            { name:'x', type:'number', opt:false, desc:'X coordinate.' },
            { name:'y', type:'number', opt:false, desc:'Y coordinate.' },
          ],
          example:'local height = noise.perlin2d(worldX * 0.05, time * 0.3)\nbone:setPos(0, height * 2, 0)'
        },
        {
          id:'noise-perlin3d', name:'noise.perlin3d',
          sig:'noise.perlin3d(x, y, z) → number',
          ret:'number (−1..1)',
          desc:'Evaluates 3D Perlin noise at coordinates <code>(x, y, z)</code>. The third axis can be used as a time dimension for animated noise.',
          params:[
            { name:'x', type:'number', opt:false, desc:'X coordinate.' },
            { name:'y', type:'number', opt:false, desc:'Y coordinate.' },
            { name:'z', type:'number', opt:false, desc:'Z coordinate (often used as time).' },
          ],
          example:'local jitter = noise.perlin3d(boneX*0.1, boneY*0.1, time*0.2)'
        },
        {
          id:'noise-setSeed', name:'noise.setSeed',
          sig:'noise.setSeed(seed) → void',
          ret:'void',
          desc:'Re-seeds the noise permutation table. Different seeds produce completely different noise patterns. Default seed is 0.',
          params:[{ name:'seed', type:'integer', opt:false, desc:'An integer seed value.' }],
          example:'noise.setSeed(42)\nlocal n = noise.perlin2d(0, 0)  -- deterministic for seed 42'
        },
        {
          id:'noise-fbm2d', name:'noise.fbm2d',
          sig:'noise.fbm2d(x, y, octaves?, persistence?) → number',
          ret:'number',
          desc:'Fractal Brownian Motion — sums multiple octaves of Perlin noise for richer, more natural-looking results. Returns a value roughly in −1..1.',
          params:[
            { name:'x',           type:'number',  opt:false, desc:'X coordinate.' },
            { name:'y',           type:'number',  opt:false, desc:'Y coordinate.' },
            { name:'octaves',     type:'integer', opt:true,  desc:'Number of noise layers (default: 4).' },
            { name:'persistence', type:'number',  opt:true,  desc:'Amplitude decay per octave (default: 0.5).' },
          ],
          example:'-- Rich terrain heightmap\nlocal h = noise.fbm2d(x * 0.02, z * 0.02, 6, 0.5)'
        },
      ]},
    ],
  },

  'inspect': {
    id:'inspect', lang:'lua', name:'inspect.lua',
    author:'Enrique García Cota (kikito)', type:'curated-mit',
    version:'3.1.0',
    sourceUrl:'https://github.com/kikito/inspect.lua',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/lua/inspect.lua',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/lua/inspect.lua',
    tagline:'Human-readable Lua table serialization and debug printer.',
    description:'inspect.lua converts any Lua value — including deeply nested tables and cyclic structures — into a readable string. Essential for debugging avatar scripts in Shyne Core.',
    install:'local inspect = require("inspect")',
    sections:[
      { id:'library-api', title:'Library API', items:[
        {
          id:'inspect-call', name:'inspect',
          sig:'inspect(value, options?) → string',
          ret:'string',
          desc:'Returns a human-readable string representation of <code>value</code>. Handles all Lua types, nested tables, metatables, and cyclic references.',
          params:[
            { name:'value',   type:'any',   opt:false, desc:'The value to serialize.' },
            { name:'options', type:'table', opt:true,  desc:'Optional configuration table (see Options below).' },
          ],
          example:'local inspect = require("inspect")\n\nlocal data = {\n  player = "Shyne",\n  stats  = { hp = 100, mana = 80 },\n  tags   = { "hero", "avatar" },\n}\nprint(inspect(data))\n-- {\n--   player = "Shyne",\n--   stats = { hp = 100, mana = 80 },\n--   tags = { "hero", "avatar" }\n-- }'
        },
      ]},
      { id:'options', title:'Options', items:[
        {
          id:'inspect-options', name:'options table',
          sig:null,
          desc:'Pass an options table as the second argument to customize output.',
          params:[
            { name:'depth',   type:'number',   opt:true, desc:'Maximum recursion depth (default: <code>math.huge</code>).' },
            { name:'newline', type:'string',   opt:true, desc:'Newline character (default: <code>"\\n"</code>).' },
            { name:'indent',  type:'string',   opt:true, desc:'Indentation string (default: <code>"  "</code>).' },
            { name:'process', type:'function', opt:true, desc:'Filter/transform function called on each value: <code>function(item, path)</code>.' },
          ],
          example:'-- Limit depth\nprint(inspect(bigTable, { depth = 2 }))\n\n-- Compact one-liner\nprint(inspect(data, { newline="", indent="" }))'
        }
      ]},
    ],
  },

  /* ════════════ C ════════════ */

  'c-tween': {
    id:'c-tween', lang:'c', name:'seashyne_tween.h',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/c/include/seashyne_tween.h',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/c/include/seashyne_tween.h',
    tagline:'Single-header C99 easing curves and lerp functions.',
    description:'seashyne_tween.h is a drop-in single-header C99 library. Define <code>SEASHYNE_TWEEN_IMPL</code> once in one .c file before including. Provides all standard Penner easing functions and linear interpolation.',
    install:'#define SEASHYNE_TWEEN_IMPL\n#include "seashyne_tween.h"',
    sections:[
      { id:'functions', title:'Functions', items:[
        { id:'c-ease', name:'seashyne_ease', sig:'float seashyne_ease(SeashyneEase type, float t)', ret:'float', desc:'Evaluates an easing curve at position <code>t</code> (0..1). Returns the eased value (also 0..1 for most curves).',
          params:[
            { name:'type', type:'SeashyneEase', opt:false, desc:'Easing enum constant, e.g. <code>SEASHYNE_EASE_OUT_BOUNCE</code>.' },
            { name:'t',    type:'float',        opt:false, desc:'Progress value from 0 to 1.' },
          ],
          example:'float alpha = seashyne_ease(SEASHYNE_EASE_OUT_CUBIC, 0.5f);\nfloat x = seashyne_lerp(0.0f, 100.0f, alpha);'
        },
        { id:'c-lerp', name:'seashyne_lerp', sig:'float seashyne_lerp(float a, float b, float t)', ret:'float', desc:'Linear interpolation between <code>a</code> and <code>b</code> by factor <code>t</code>.',
          params:[
            { name:'a', type:'float', opt:false, desc:'Start value.' },
            { name:'b', type:'float', opt:false, desc:'End value.' },
            { name:'t', type:'float', opt:false, desc:'Factor (0 = a, 1 = b).' },
          ], example:'float pos = seashyne_lerp(0.0f, 200.0f, 0.75f);  // 150.0'
        },
      ]},
    ],
  },

  'c-math': {
    id:'c-math', lang:'c', name:'seashyne_math.h',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/c/include/seashyne_math.h',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/c/include/seashyne_math.h',
    tagline:'Single-header C99 Vec2/Vec3 math with dot, cross, lerp, and distance.',
    description:'seashyne_math.h provides <code>SeashyneVec2</code> and <code>SeashyneVec3</code> structs with complete math utility functions as a single-header C99 library.',
    install:'#define SEASHYNE_MATH_IMPL\n#include "seashyne_math.h"',
    sections:[
      { id:'functions', title:'Functions', items:[
        { id:'c-vec3', name:'seashyne_vec3', sig:'SeashyneVec3 seashyne_vec3(float x, float y, float z)', ret:'SeashyneVec3', desc:'Creates a Vec3 struct.',params:[],example:'SeashyneVec3 pos = seashyne_vec3(10.0f, 0.0f, 5.0f);' },
        { id:'c-vec3-add', name:'seashyne_vec3_add', sig:'SeashyneVec3 seashyne_vec3_add(SeashyneVec3 a, SeashyneVec3 b)', ret:'SeashyneVec3', desc:'Adds two Vec3s.',params:[],example:'SeashyneVec3 c = seashyne_vec3_add(a, b);' },
        { id:'c-vec3-lerp', name:'seashyne_vec3_lerp', sig:'SeashyneVec3 seashyne_vec3_lerp(SeashyneVec3 a, SeashyneVec3 b, float t)', ret:'SeashyneVec3', desc:'Linearly interpolates between two Vec3s.',params:[],example:'SeashyneVec3 mid = seashyne_vec3_lerp(start, end, 0.5f);' },
        { id:'c-vec3-dist', name:'seashyne_vec3_distance', sig:'float seashyne_vec3_distance(SeashyneVec3 a, SeashyneVec3 b)', ret:'float', desc:'Returns the distance between two points.',params:[],example:'float d = seashyne_vec3_distance(player, target);' },
        { id:'c-vec3-dot', name:'seashyne_vec3_dot', sig:'float seashyne_vec3_dot(SeashyneVec3 a, SeashyneVec3 b)', ret:'float', desc:'Dot product.',params:[],example:'float d = seashyne_vec3_dot(forward, up);' },
        { id:'c-vec3-norm', name:'seashyne_vec3_normalize', sig:'SeashyneVec3 seashyne_vec3_normalize(SeashyneVec3 v)', ret:'SeashyneVec3', desc:'Returns a unit-length vector.',params:[],example:'SeashyneVec3 dir = seashyne_vec3_normalize(velocity);' },
      ]},
    ],
  },

  'c-noise': {
    id:'c-noise', lang:'c', name:'seashyne_noise.h',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/c/include/seashyne_noise.h',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/c/include/seashyne_noise.h',
    tagline:'Single-header C99 2D/3D Perlin noise generator.',
    description:'seashyne_noise.h implements a seeded Perlin gradient noise algorithm in plain C99. Include once with the implementation macro and call the functions directly.',
    install:'#define SEASHYNE_NOISE_IMPL\n#include "seashyne_noise.h"',
    sections:[
      { id:'functions', title:'Functions', items:[
        { id:'c-perlin2d', name:'seashyne_perlin2d', sig:'float seashyne_perlin2d(float x, float y)', ret:'float (−1..1)', desc:'2D Perlin noise.',params:[],example:'float h = seashyne_perlin2d(x * 0.05f, z * 0.05f);' },
        { id:'c-perlin3d', name:'seashyne_perlin3d', sig:'float seashyne_perlin3d(float x, float y, float z)', ret:'float (−1..1)', desc:'3D Perlin noise.',params:[],example:'float n = seashyne_perlin3d(px, py, time);' },
        { id:'c-noise-seed', name:'seashyne_noise_seed', sig:'void seashyne_noise_seed(int seed)', ret:'void', desc:'Sets the noise seed.',params:[],example:'seashyne_noise_seed(42);' },
      ]},
    ],
  },

  /* ════════════ C++ ════════════ */

  'cpp-tween': {
    id:'cpp-tween', lang:'cpp', name:'seashyne/tween.hpp',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/cpp/include/seashyne/tween.hpp',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/cpp/include/seashyne/tween.hpp',
    tagline:'Modern C++20 header-only easing engine.',
    description:'seashyne/tween.hpp provides all Penner easing equations as a type-safe C++20 header-only library using a scoped enum <code>Ease</code> and a static utility class <code>Tween</code>.',
    install:'#include <seashyne/tween.hpp>',
    sections:[
      { id:'api', title:'Tween API', items:[
        { id:'cpp-tween-apply', name:'Tween::apply', sig:'static float Tween::apply(Ease type, float t)', ret:'float', desc:'Evaluates easing function.',params:[],example:'float v = Tween::apply(Ease::OutBounce, 0.7f);' },
        { id:'cpp-tween-lerp', name:'Tween::lerp', sig:'static float Tween::lerp(float a, float b, float t)', ret:'float', desc:'Linearly interpolates between a and b.',params:[],example:'float x = Tween::lerp(0.0f, 500.0f, v);' },
        { id:'cpp-tween-easedLerp', name:'Tween::easedLerp', sig:'static float Tween::easedLerp(float a, float b, Ease type, float t)', ret:'float', desc:'Combines easing + lerp in one call.',params:[],example:'float x = Tween::easedLerp(0,100, Ease::OutBack, t);' },
      ]},
    ],
  },

  'cpp-math': {
    id:'cpp-math', lang:'cpp', name:'seashyne/math.hpp',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/cpp/include/seashyne/math.hpp',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/cpp/include/seashyne/math.hpp',
    tagline:'C++20 Vec2 and Vec3 structs with full operator overloads.',
    description:'seashyne/math.hpp provides <code>Vec2</code> and <code>Vec3</code> structs in the <code>seashyne</code> namespace with operator overloads, dot, cross, lerp, distance, normalize, and length methods.',
    install:'#include <seashyne/math.hpp>',
    sections:[
      { id:'api', title:'Vec3 API', items:[
        { id:'cpp-vec3-ctor', name:'Vec3 constructor', sig:'Vec3(float x, float y, float z)', ret:'Vec3', desc:'Aggregate initialization.',params:[],example:'seashyne::Vec3 pos{0.0f, 10.0f, 0.0f};' },
        { id:'cpp-vec3-lerp', name:'Vec3::lerp', sig:'Vec3 lerp(Vec3 other, float t) const', ret:'Vec3', desc:'Linearly interpolates.',params:[],example:'Vec3 mid = start.lerp(end, 0.5f);' },
        { id:'cpp-vec3-dot', name:'Vec3::dot', sig:'float dot(Vec3 other) const', ret:'float', desc:'Dot product.',params:[],example:'float d = a.dot(b);' },
        { id:'cpp-vec3-cross', name:'Vec3::cross', sig:'Vec3 cross(Vec3 other) const', ret:'Vec3', desc:'Cross product.',params:[],example:'Vec3 n = a.cross(b);' },
        { id:'cpp-vec3-norm', name:'Vec3::normalized', sig:'Vec3 normalized() const', ret:'Vec3', desc:'Unit-length vector.',params:[],example:'Vec3 dir = velocity.normalized();' },
        { id:'cpp-vec3-dist', name:'Vec3::distance', sig:'float distance(Vec3 other) const', ret:'float', desc:'Distance to another point.',params:[],example:'float d = a.distance(b);' },
      ]},
    ],
  },

  'cpp-signal': {
    id:'cpp-signal', lang:'cpp', name:'seashyne/signal.hpp',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/cpp/include/seashyne/signal.hpp',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/cpp/include/seashyne/signal.hpp',
    tagline:'Type-safe C++ event signal using variadic templates.',
    description:'seashyne/signal.hpp provides a type-safe, header-only signal/event system for C++17+. Connections are RAII-managed and auto-disconnect when the connection object is destroyed.',
    install:'#include <seashyne/signal.hpp>',
    sections:[
      { id:'api', title:'Signal API', items:[
        { id:'cpp-sig-connect', name:'Signal::connect', sig:'Connection Signal<Ts...>::connect(std::function<void(Ts...)> fn)', ret:'Connection', desc:'Subscribes a callback. Returns a Connection that auto-disconnects when destructed.',params:[],example:'seashyne::Signal<int, float> onHit;\nauto conn = onHit.connect([](int dmg, float kb) {\n    std::cout << "Hit: " << dmg << "\\n";\n});' },
        { id:'cpp-sig-emit', name:'Signal::emit', sig:'void Signal<Ts...>::emit(Ts... args)', ret:'void', desc:'Fires the signal, calling all connected handlers.',params:[],example:'onHit.emit(50, 1.5f);' },
        { id:'cpp-sig-disconnect', name:'Signal::disconnectAll', sig:'void Signal<Ts...>::disconnectAll()', ret:'void', desc:'Disconnects all listeners.',params:[],example:'onHit.disconnectAll();' },
      ]},
    ],
  },

  'cpp-noise': {
    id:'cpp-noise', lang:'cpp', name:'seashyne/noise.hpp',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/cpp/include/seashyne/noise.hpp',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/cpp/include/seashyne/noise.hpp',
    tagline:'C++ header-only Perlin noise generator.',
    description:'seashyne/noise.hpp wraps a seeded Perlin noise implementation in the <code>seashyne</code> namespace with a clean object-oriented API.',
    install:'#include <seashyne/noise.hpp>',
    sections:[
      { id:'api', title:'Noise API', items:[
        { id:'cpp-noise-ctor', name:'PerlinNoise constructor', sig:'PerlinNoise(int seed = 0)', ret:'PerlinNoise', desc:'Creates a noise generator with optional seed.',params:[],example:'seashyne::PerlinNoise noise(42);' },
        { id:'cpp-noise-2d', name:'PerlinNoise::sample2d', sig:'double sample2d(double x, double y) const', ret:'double', desc:'2D Perlin noise sample.',params:[],example:'double h = noise.sample2d(x * 0.05, z * 0.05);' },
        { id:'cpp-noise-3d', name:'PerlinNoise::sample3d', sig:'double sample3d(double x, double y, double z) const', ret:'double', desc:'3D Perlin noise sample.',params:[],example:'double n = noise.sample3d(x, y, time);' },
      ]},
    ],
  },

  /* ════════════ C# ════════════ */

  'csharp-core': {
    id:'csharp-core', lang:'csharp', name:'Seashyne.Core',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/csharp/Seashyne.Core/',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/csharp/Seashyne.Core/',
    tagline:'C# .NET 8 / Unity / Godot library: math, animation, noise, and events.',
    description:'Seashyne.Core is a zero-dependency C# package compatible with .NET Standard 2.0, .NET 8, Unity, and Godot. It includes <code>Vector3D</code>, <code>Tweener</code>, <code>PerlinNoise</code>, and <code>Signal&lt;T&gt;</code>.',
    install:'using Seashyne.Core.Math;\nusing Seashyne.Core.Animation;\nusing Seashyne.Core.Noise;\nusing Seashyne.Core.Events;',
    sections:[
      { id:'namespaces', title:'Namespaces & Classes', items:[
        { id:'cs-vec3d', name:'Vector3D', sig:'struct Vector3D(double X, double Y, double Z)', ret:'Vector3D', desc:'Immutable 3D vector with Lerp, Dot, Cross, Distance, Normalize.',params:[],example:'var pos = new Vector3D(0, 10, 0);\nvar mid = pos.Lerp(new Vector3D(100,10,0), 0.5f);\ndouble len = pos.Length();' },
        { id:'cs-tweener', name:'Tweener.Ease', sig:'static float Tweener.Ease(EaseType type, float t)', ret:'float', desc:'Evaluates a Robert Penner easing equation at position t.',params:[],example:'float v = Tweener.Ease(EaseType.OutBounce, 0.75f);' },
        { id:'cs-noise', name:'PerlinNoise', sig:'class PerlinNoise(int seed = 0)', ret:'PerlinNoise', desc:'Perlin noise sampler for 2D and 3D.',params:[],example:'var pn = new PerlinNoise(42);\ndouble h = pn.Sample2D(x * 0.05, z * 0.05);' },
        { id:'cs-signal', name:'Signal<T>', sig:'class Signal<T>', ret:'Signal<T>', desc:'Type-safe event emitter. Connect, Fire, and Disconnect callbacks.',params:[],example:'var onDmg = new Signal<int>();\nvar unsub = onDmg.Connect(dmg => Console.WriteLine(dmg));\nonDmg.Fire(25);\nunsub();' },
      ]},
    ],
  },

  /* ════════════ Python ════════════ */

  'python-seashyne': {
    id:'python-seashyne', lang:'python', name:'seashyne',
    author:'Seashyne', type:'seashyne-original', version:'1.0.0',
    rawUrl:'https://raw.githubusercontent.com/seashyne/Libraries/main/python/seashyne/',
    cdnUrl:'https://cdn.jsdelivr.net/gh/seashyne/Libraries@main/python/seashyne/',
    tagline:'Zero-dependency Python package: math, easing, noise, and signals.',
    description:'The seashyne Python package provides Vec2, Vec3, ease functions, Perlin noise, and a Signal event emitter — all in pure Python 3.9+ with no external dependencies. Useful in Blender scripting, automation tools, and data pipelines.',
    install:'# Clone or download the python/seashyne/ folder\nfrom seashyne import Vec3, ease, Ease, perlin2d, Signal',
    sections:[
      { id:'math', title:'Math', items:[
        { id:'py-vec3', name:'Vec3', sig:'Vec3(x: float, y: float, z: float)', ret:'Vec3', desc:'3D vector with lerp, dot, cross, distance, normalized.',params:[],example:'from seashyne import Vec3\na = Vec3(0, 10, 0)\nb = Vec3(100, 10, 0)\nmid = a.lerp(b, 0.5)\nprint(mid)  # Vec3(50, 10, 0)' },
      ]},
      { id:'easing', title:'Easing', items:[
        { id:'py-ease', name:'ease', sig:'ease(type: Ease, t: float) → float', ret:'float', desc:'Evaluates an easing curve.',params:[],example:'from seashyne import ease, Ease\nv = ease(Ease.OUT_BOUNCE, 0.75)' },
      ]},
      { id:'noise', title:'Noise', items:[
        { id:'py-perlin2d', name:'perlin2d', sig:'perlin2d(x: float, y: float) → float', ret:'float', desc:'2D Perlin noise, returns −1..1.',params:[],example:'from seashyne import perlin2d\nh = perlin2d(10.5, 42.1)' },
        { id:'py-perlin3d', name:'perlin3d', sig:'perlin3d(x: float, y: float, z: float) → float', ret:'float', desc:'3D Perlin noise.',params:[],example:'n = perlin3d(x, y, time)' },
      ]},
      { id:'events', title:'Events', items:[
        { id:'py-signal', name:'Signal', sig:'class Signal', ret:'Signal', desc:'Observer pattern event emitter.',params:[],example:'from seashyne import Signal\nonHit = Signal()\nunsub = onHit.connect(lambda dmg: print(f"Hit {dmg}"))\nonHit.fire(30)\nunsub()' },
      ]},
    ],
  },

};

// Group mapping
const LANG_LIB_MAP = {
  lua:    ['classic','tween','vector','signal','color','timer','noise','inspect'],
  c:      ['c-tween','c-math','c-noise'],
  cpp:    ['cpp-tween','cpp-math','cpp-signal','cpp-noise'],
  csharp: ['csharp-core'],
  python: ['python-seashyne'],
};

// ── State ──────────────────────────────────────────
let currentLibId = null;

// ── Sidebar ─────────────────────────────────────────
function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  let html = `<div class="sidebar-overview ${!currentLibId ? 'active':''}" onclick="navigate('overview')">
    <span style="font-size:14px">🌊</span> Overview
  </div>`;

  LANG_GROUPS.forEach(g => {
    const libs = LANG_LIB_MAP[g.id];
    const isOpen = g.open || libs.some(id => id === currentLibId);
    html += `<div class="nav-group ${isOpen?'open':''}" id="grp-${g.id}">
      <div class="nav-group-header" onclick="toggleGroup('grp-${g.id}')">
        <span>${g.label}</span>
        <span class="nav-arrow">▶</span>
      </div>
      <div class="nav-group-items">`;
    libs.forEach(id => {
      const lib = LIBS[id];
      if (!lib) return;
      html += `<div class="nav-item ${id===currentLibId?'active':''}" onclick="navigate('${id}')">
        <span class="nav-dot ${g.dot}"></span>
        ${esc(lib.name)}
      </div>`;
    });
    html += `</div></div>`;
  });
  nav.innerHTML = html;
}

function toggleGroup(id) {
  document.getElementById(id)?.classList.toggle('open');
}

// ── Sidebar Filter ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const filter = document.getElementById('sidebarFilter');
  const topSearch = document.getElementById('topSearch');

  filter?.addEventListener('input', e => filterSidebar(e.target.value));
  topSearch?.addEventListener('input', e => filterSidebar(e.target.value));
});

function filterSidebar(q) {
  q = q.toLowerCase().trim();
  document.querySelectorAll('.nav-item').forEach(el => {
    const match = !q || el.textContent.toLowerCase().includes(q);
    el.classList.toggle('hidden', !match);
  });
  document.querySelectorAll('.nav-group').forEach(g => {
    const hasVisible = [...g.querySelectorAll('.nav-item')].some(el => !el.classList.contains('hidden'));
    if (q) { g.classList.toggle('open', hasVisible); }
  });
}

// ── Navigation ──────────────────────────────────────
function navigate(id) {
  currentLibId = (id === 'overview') ? null : id;
  renderSidebar();
  const main = document.getElementById('contentMain');
  if (id === 'overview') {
    main.innerHTML = renderOverview();
  } else {
    const lib = LIBS[id];
    if (!lib) { main.innerHTML = '<p style="padding:40px;color:var(--text-muted)">Library not found.</p>'; return; }
    main.innerHTML = renderLibPage(lib);
  }
  buildTOC();
  window.scrollTo(0,0);
}

// ── Overview Page ────────────────────────────────────
function renderOverview() {
  let html = `<div class="overview-hero">
    <h1>🌊 Seashyne <span>Libraries</span></h1>
    <p>A unified cross-language developer ecosystem — pure Lua, C, C++, C#, and Python.
    Crafted for Minecraft avatar scripting (Shyne Core), game engines, native plugins, and standalone tooling.</p>
  </div>`;

  LANG_GROUPS.forEach(g => {
    const libs = LANG_LIB_MAP[g.id].map(id => LIBS[id]).filter(Boolean);
    html += `<div class="overview-section">
      <div class="overview-section-title">${g.label}</div>
      <div class="overview-list">`;
    libs.forEach(lib => {
      const isCurated = lib.type === 'curated-mit';
      html += `<div class="overview-row" onclick="navigate('${lib.id}')">
        <div class="overview-row-left">
          <span class="nav-dot ${LANG_GROUPS.find(x=>x.id===lib.lang)?.dot}" style="width:8px;height:8px;flex-shrink:0"></span>
          <span class="overview-row-name">${esc(lib.name)}</span>
          <span class="overview-row-desc">${esc(lib.tagline)}</span>
        </div>
        <div class="overview-row-right">
          ${isCurated
            ? `<span class="badge badge-curated">MIT Curated</span>`
            : `<span class="badge badge-seashyne">Original</span>`}
          <span class="badge badge-version">v${esc(lib.version)}</span>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  });
  return html;
}

// ── Library Page ─────────────────────────────────────
function renderLibPage(lib) {
  const langBadgeClass = `badge-${lib.lang}`;
  const isCurated = lib.type === 'curated-mit';
  const authorBadge = isCurated
    ? `<span class="badge badge-curated">By ${esc(lib.author)} · MIT Curated</span>`
    : `<span class="badge badge-seashyne">By Seashyne · Original</span>`;
  const srcLink = lib.sourceUrl
    ? `<a href="${lib.sourceUrl}" target="_blank" rel="noopener" style="font-size:12px;color:var(--text-muted)">↗ Source Repo</a>`
    : '';

  let html = `<div class="lib-hero">
    <h1 class="lib-title">${esc(lib.name)}</h1>
    <div class="lib-meta">
      <span class="badge ${langBadgeClass}">${lib.lang.toUpperCase()}</span>
      ${authorBadge}
      <span class="badge badge-version">v${esc(lib.version)}</span>
      <span class="badge badge-mit">MIT</span>
      ${srcLink}
    </div>
    <p class="lib-description">${lib.description}</p>
  </div>`;

  if (lib.note) {
    html += `<div class="note-block">${lib.note}</div>`;
  }

  // Install block
  html += `<h2 id="installation">Installation</h2>
  <div class="install-block">
    <div class="install-block-header">
      <span>Quick Start</span>
      <button class="copy-btn" onclick="copyText(${JSON.stringify(lib.install)})">Copy</button>
    </div>
    <pre><code>${esc(lib.install)}</code></pre>
  </div>`;

  // CDN block
  html += `<h2 id="download">Download &amp; CDN</h2>
  <div class="cdn-block">
    <div class="cdn-row">
      <span class="cdn-label">Raw</span>
      <span class="cdn-url">${esc(lib.rawUrl)}</span>
      <button class="copy-btn" onclick="copyText('${lib.rawUrl}')">Copy</button>
    </div>
    <div class="cdn-row">
      <span class="cdn-label">CDN</span>
      <span class="cdn-url">${esc(lib.cdnUrl)}</span>
      <button class="copy-btn" onclick="copyText('${lib.cdnUrl}')">Copy</button>
    </div>
  </div>`;

  // Sections
  lib.sections.forEach(section => {
    html += `<h2 id="${section.id}">${esc(section.title)}</h2>`;
    section.items.forEach(item => {
      html += renderApiItem(item);
    });
  });

  return html;
}

// ── API Item ─────────────────────────────────────────
function renderApiItem(item) {
  let html = `<h3 id="${item.id}">${esc(item.name)}</h3>`;

  // Signature block
  if (item.sig) {
    const parts = item.sig.split('→');
    const code = parts[0].trim();
    const ret  = parts[1] ? parts[1].trim() : '';
    html += `<div class="api-sig">
      <span class="api-sig-icon">fn</span>
      <code class="api-sig-code">${esc(code)}</code>
      ${ret ? `<span class="api-sig-return">→ ${esc(ret)}</span>` : ''}
    </div>`;
  }

  // Description block
  if (item.desc) {
    html += `<div class="api-desc">${item.desc}</div>`;
  }

  // Easing grid (special case)
  if (item.easings && item.easings.length) {
    html += `<div class="easing-grid">`;
    item.easings.forEach(e => { html += `<div class="easing-item">${esc(e)}</div>`; });
    html += `</div>`;
  }

  // Params table
  if (item.params && item.params.length) {
    html += `<table class="param-table">
      <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>`;
    item.params.forEach(p => {
      html += `<tr>
        <td>${esc(p.name)}${p.opt ? ' <span class="opt">(optional)</span>':''}</td>
        <td>${esc(p.type)}</td>
        <td>${p.desc}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  }

  // Code example
  if (item.example) {
    html += `<div class="code-block">
      <div class="code-block-header">
        <span>Example</span>
        <button class="copy-btn" onclick="copyText(${JSON.stringify(item.example)})">Copy</button>
      </div>
      <pre><code>${esc(item.example)}</code></pre>
    </div>`;
  }

  return html;
}

// ── TOC ──────────────────────────────────────────────
function buildTOC() {
  const toc = document.getElementById('tocNav');
  if (!toc) return;
  const main = document.getElementById('contentMain');
  const headings = [...main.querySelectorAll('h2, h3')];
  if (!headings.length) { toc.innerHTML = ''; return; }

  toc.innerHTML = headings.map(h => {
    const isH3 = h.tagName === 'H3';
    return `<div class="toc-item ${isH3?'toc-item-h3':''}"
      onclick="document.getElementById('${h.id}')?.scrollIntoView({behavior:'smooth',block:'start'})"
    >${esc(h.textContent)}</div>`;
  }).join('');

  // Scroll spy
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        toc.querySelectorAll('.toc-item').forEach(el => el.classList.remove('active'));
        const t = toc.querySelector(`[onclick*="${e.target.id}"]`);
        if (t) t.classList.add('active');
      }
    });
  }, { rootMargin: '-60px 0px -70% 0px' });

  headings.forEach(h => observer.observe(h));
}

// ── Init ──────────────────────────────────────────────
(function init() {
  navigate('overview');
})();
