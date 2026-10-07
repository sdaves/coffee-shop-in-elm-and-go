(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.3/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (Object.prototype.hasOwnProperty.call(value, key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	var unwrapped = _Json_unwrap(value);
	if (!(key === 'toJSON' && typeof unwrapped === 'function'))
	{
		object[key] = unwrapped;
	}
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}



// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (
		(typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		||
		(Array.isArray(_Json_unwrap(value)) && _VirtualDom_RE_js_html.test(String(_Json_unwrap(value))))
	)
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return $elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}





// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{tail: tail, nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\u000A    ',
		A2($elm$core$String$split, '\u000A', str));
};
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\u000A\u000A(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\u0027' + (f + '\u0027]'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\u000A\u000A',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\u000A\u000A';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\u000A\u000A    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\u000A\u000A' + msg));
			}
		}
	});
var $elm$json$Json$Decode$map = _Json_map1;
var $author$project$Api$baseUrl = '';
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					url: r.url,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					method: r.method,
					headers: r.headers,
					timeout: r.timeout,
					tracker: r.tracker,
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{url: r.url, body: r.body, expect: r.expect, method: r.method, headers: r.headers, timeout: r.timeout, tracker: r.tracker, allowCookiesFromOtherDomains: false}));
};
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $author$project$Api$request = F6(
	function (method, path, headers, payload, decoder, toMsg) {
		return $elm$http$Http$request(
			{
				url: _Utils_ap($author$project$Api$baseUrl, path),
				body: function () {
					if (payload.$ === 'Just') {
						var value = payload.a;
						return $elm$http$Http$jsonBody(value);
					} else {
						return $elm$http$Http$emptyBody;
					}
				}(),
				expect: A2($elm$http$Http$expectJson, toMsg, decoder),
				method: method,
				headers: headers,
				timeout: $elm$core$Maybe$Just(10000),
				tracker: $elm$core$Maybe$Nothing
			});
	});
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $author$project$Api$authHeader = function (token) {
	return _List_fromArray(
		[
			A2($elm$http$Http$header, 'Authorization', 'Bearer ' + token)
		]);
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Types$Session = F5(
	function (token, id, email, name, role) {
		return {id: id, name: name, role: role, email: email, token: token};
	});
var $author$project$Types$AdminRole = {$: 'AdminRole'};
var $author$project$Types$CustomerRole = {$: 'CustomerRole'};
var $author$project$Api$roleDecoder = A2(
	$elm$json$Json$Decode$map,
	function (value) {
		return (value === 'admin') ? $author$project$Types$AdminRole : $author$project$Types$CustomerRole;
	},
	$elm$json$Json$Decode$string);
var $author$project$Api$sessionDecoder = A5(
	$elm$json$Json$Decode$map4,
	F4(
		function (id, email, name, role) {
			return A5($author$project$Types$Session, '', id, email, name, role);
		}),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'email', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'role', $author$project$Api$roleDecoder));
var $author$project$Api$me = F2(
	function (token, toMsg) {
		return A6(
			$author$project$Api$request,
			'GET',
			'/auth/me',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			$author$project$Api$sessionDecoder,
			toMsg);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $author$project$Types$Idle = {$: 'Idle'};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $author$project$Types$Catalog = {$: 'Catalog'};
var $author$project$Types$Loading = {$: 'Loading'};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Main$TimeTick = function (a) {
	return {$: 'TimeTick', a: a};
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Types$StockRow = F4(
	function (sku, name, stock, reorderLevel) {
		return {sku: sku, name: name, stock: stock, reorderLevel: reorderLevel};
	});
var $author$project$Api$stockDecoder = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Types$StockRow,
	A2($elm$json$Json$Decode$field, 'sku', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'stock', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'reorder_level', $elm$json$Json$Decode$int));
var $author$project$Api$lowStock = function (toMsg) {
	return A6(
		$author$project$Api$request,
		'GET',
		'/store/low_stock',
		_List_Nil,
		$elm$core$Maybe$Nothing,
		$elm$json$Json$Decode$list($author$project$Api$stockDecoder),
		toMsg);
};
var $author$project$Main$SignInMode = {$: 'SignInMode'};
var $author$project$Types$AdminProducts = {$: 'AdminProducts'};
var $author$project$Main$defaultTab = function (role) {
	if (role.$ === 'AdminRole') {
		return $author$project$Types$AdminProducts;
	} else {
		return $author$project$Types$Catalog;
	}
};
var $author$project$Main$GotLowStock = function (a) {
	return {$: 'GotLowStock', a: a};
};
var $author$project$Types$CartItem = F4(
	function (sku, name, priceCents, quantity) {
		return {sku: sku, name: name, quantity: quantity, priceCents: priceCents};
	});
var $author$project$Api$cartDecoder = $elm$json$Json$Decode$list(
	A5(
		$elm$json$Json$Decode$map4,
		$author$project$Types$CartItem,
		A2($elm$json$Json$Decode$field, 'sku', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'price_cents', $elm$json$Json$Decode$int),
		A2($elm$json$Json$Decode$field, 'quantity', $elm$json$Json$Decode$int)));
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $author$project$Types$Page = F4(
	function (items, offset, pageSize, total) {
		return {items: items, total: total, offset: offset, pageSize: pageSize};
	});
var $author$project$Api$pageDecoder = function (item) {
	return A5(
		$elm$json$Json$Decode$map4,
		$author$project$Types$Page,
		A2(
			$elm$json$Json$Decode$field,
			'data',
			$elm$json$Json$Decode$list(item)),
		A2($elm$json$Json$Decode$field, 'offset', $elm$json$Json$Decode$int),
		A2($elm$json$Json$Decode$field, 'page_size', $elm$json$Json$Decode$int),
		A2($elm$json$Json$Decode$field, 'total', $elm$json$Json$Decode$int));
};
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $author$project$Api$queryString = function (params) {
	if (!params.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2(
				$elm$core$List$map,
				function (_v1) {
					var k = _v1.a;
					var v = _v1.b;
					return $elm$url$Url$percentEncode(k) + ('=' + $elm$url$Url$percentEncode(v));
				},
				params));
	}
};
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$map8 = _Json_map8;
var $author$project$Types$Product = F9(
	function (sku, name, category, priceCents, stock, reorderLevel, active, image, description) {
		return {sku: sku, name: name, image: image, stock: stock, active: active, category: category, priceCents: priceCents, description: description, reorderLevel: reorderLevel};
	});
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $author$project$Api$withDefault = F2(
	function (fallback, decoder) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					decoder,
					$elm$json$Json$Decode$succeed(fallback)
				]));
	});
var $author$project$Api$productDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (build, description) {
			return build(description);
		}),
	A9(
		$elm$json$Json$Decode$map8,
		$author$project$Types$Product,
		A2($elm$json$Json$Decode$field, 'sku', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'category', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'price_cents', $elm$json$Json$Decode$int),
		A2($elm$json$Json$Decode$field, 'stock', $elm$json$Json$Decode$int),
		A2(
			$author$project$Api$withDefault,
			0,
			A2($elm$json$Json$Decode$field, 'reorder_level', $elm$json$Json$Decode$int)),
		A2(
			$author$project$Api$withDefault,
			1,
			A2($elm$json$Json$Decode$field, 'active', $elm$json$Json$Decode$int)),
		A2(
			$author$project$Api$withDefault,
			'',
			A2($elm$json$Json$Decode$field, 'image', $elm$json$Json$Decode$string))),
	A2(
		$author$project$Api$withDefault,
		'',
		A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string)));
var $author$project$Api$products = F2(
	function (opts, toMsg) {
		var params = _Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'.page_size',
					$elm$core$String$fromInt(opts.pageSize)),
					_Utils_Tuple2(
					'.offset',
					$elm$core$String$fromInt(opts.offset)),
					_Utils_Tuple2('.order_by', opts.orderBy)
				]),
			function () {
				var _v0 = opts.category;
				if (_v0.$ === 'Just') {
					var category = _v0.a;
					return _List_fromArray(
						[
							_Utils_Tuple2('category', category)
						]);
				} else {
					return _List_Nil;
				}
			}());
		return A6(
			$author$project$Api$request,
			'GET',
			'/store/products' + $author$project$Api$queryString(params),
			_List_Nil,
			$elm$core$Maybe$Nothing,
			$author$project$Api$pageDecoder($author$project$Api$productDecoder),
			toMsg);
	});
var $author$project$Main$GotProducts = function (a) {
	return {$: 'GotProducts', a: a};
};
var $author$project$Main$fetchProducts = function (model) {
	return A2(
		$author$project$Api$products,
		{
			offset: model.page * model.pageSize,
			orderBy: 'NAME ASC',
			category: $elm$core$String$isEmpty(model.category) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(model.category),
			pageSize: model.pageSize
		},
		$author$project$Main$GotProducts);
};
var $author$project$Types$RevenueRow = F4(
	function (category, orders, units, revenueCents) {
		return {units: units, orders: orders, category: category, revenueCents: revenueCents};
	});
var $author$project$Api$revenueDecoder = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Types$RevenueRow,
	A2($elm$json$Json$Decode$field, 'category', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'orders', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'units', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'revenue_cents', $elm$json$Json$Decode$int));
var $author$project$Api$revenue = F2(
	function (token, toMsg) {
		return A6(
			$author$project$Api$request,
			'GET',
			'/admin/revenue',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			$elm$json$Json$Decode$list($author$project$Api$revenueDecoder),
			toMsg);
	});
var $author$project$Types$SignupReport = F4(
	function (today, last7Days, last30Days, last90Days) {
		return {today: today, last7Days: last7Days, last30Days: last30Days, last90Days: last90Days};
	});
var $author$project$Api$signupReportDecoder = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Types$SignupReport,
	A2($elm$json$Json$Decode$field, 'today', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'last_7_days', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'last_30_days', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'last_90_days', $elm$json$Json$Decode$int));
var $author$project$Api$signups = F2(
	function (token, toMsg) {
		return A6(
			$author$project$Api$request,
			'GET',
			'/admin/signups',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			$author$project$Api$signupReportDecoder,
			toMsg);
	});
var $author$project$Types$Order = F8(
	function (id, customerId, customerEmail, customerName, status, placedAt, totalCents, items) {
		return {id: id, items: items, status: status, placedAt: placedAt, customerId: customerId, totalCents: totalCents, customerName: customerName, customerEmail: customerEmail};
	});
var $author$project$Types$OrderItem = F4(
	function (sku, name, quantity, unitPriceCents) {
		return {sku: sku, name: name, quantity: quantity, unitPriceCents: unitPriceCents};
	});
var $author$project$Api$orderItemDecoder = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Types$OrderItem,
	A2($elm$json$Json$Decode$field, 'sku', $elm$json$Json$Decode$string),
	A2(
		$author$project$Api$withDefault,
		'',
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'quantity', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'unit_price_cents', $elm$json$Json$Decode$int));
var $author$project$Api$orderDecoder = A9(
	$elm$json$Json$Decode$map8,
	$author$project$Types$Order,
	A2($elm$json$Json$Decode$field, 'order_id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'customer_id', $elm$json$Json$Decode$int),
	A2(
		$author$project$Api$withDefault,
		'',
		A2($elm$json$Json$Decode$field, 'customer_email', $elm$json$Json$Decode$string)),
	A2(
		$author$project$Api$withDefault,
		'',
		A2($elm$json$Json$Decode$field, 'customer_name', $elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'status', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'placed_at', $elm$json$Json$Decode$string),
	A2(
		$author$project$Api$withDefault,
		0,
		A2($elm$json$Json$Decode$field, 'total_cents', $elm$json$Json$Decode$int)),
	A2(
		$author$project$Api$withDefault,
		_List_Nil,
		A2(
			$elm$json$Json$Decode$field,
			'items',
			$elm$json$Json$Decode$list($author$project$Api$orderItemDecoder))));
var $author$project$Api$myOrders = F2(
	function (token, toMsg) {
		return A6(
			$author$project$Api$request,
			'GET',
			'/my/orders',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			$elm$json$Json$Decode$list($author$project$Api$orderDecoder),
			toMsg);
	});
var $author$project$Main$GotRevenue = function (a) {
	return {$: 'GotRevenue', a: a};
};
var $author$project$Main$GotSignups = function (a) {
	return {$: 'GotSignups', a: a};
};
var $author$project$Main$GotMyOrders = function (a) {
	return {$: 'GotMyOrders', a: a};
};
var $author$project$Api$adminOrders = F2(
	function (token, toMsg) {
		return A6(
			$author$project$Api$request,
			'GET',
			'/admin/orders',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			$elm$json$Json$Decode$list($author$project$Api$orderDecoder),
			toMsg);
	});
var $author$project$Api$adminProducts = F2(
	function (token, toMsg) {
		return A6(
			$author$project$Api$request,
			'GET',
			'/admin/products',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			$elm$json$Json$Decode$list($author$project$Api$productDecoder),
			toMsg);
	});
var $author$project$Main$GotAdminOrders = function (a) {
	return {$: 'GotAdminOrders', a: a};
};
var $elm$json$Json$Decode$map6 = _Json_map6;
var $author$project$Types$Customer = F6(
	function (id, email, fullName, country, role, createdAt) {
		return {id: id, role: role, email: email, country: country, fullName: fullName, createdAt: createdAt};
	});
var $author$project$Api$customerDecoder = A7(
	$elm$json$Json$Decode$map6,
	$author$project$Types$Customer,
	A2($elm$json$Json$Decode$field, 'customer_id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'email', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'full_name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'country', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'role', $author$project$Api$roleDecoder),
	A2(
		$author$project$Api$withDefault,
		'',
		A2($elm$json$Json$Decode$field, 'created_at', $elm$json$Json$Decode$string)));
var $author$project$Api$adminCustomers = F2(
	function (token, toMsg) {
		return A6(
			$author$project$Api$request,
			'GET',
			'/admin/customers',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			$elm$json$Json$Decode$list($author$project$Api$customerDecoder),
			toMsg);
	});
var $author$project$Main$GotAdminProducts = function (a) {
	return {$: 'GotAdminProducts', a: a};
};
var $author$project$Main$GotAdminCustomers = function (a) {
	return {$: 'GotAdminCustomers', a: a};
};
var $author$project$Main$loadForSession = function (session) {
	var _v0 = session.role;
	if (_v0.$ === 'AdminRole') {
		return $elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2($author$project$Api$adminProducts, session.token, $author$project$Main$GotAdminProducts),
					A2($author$project$Api$adminOrders, session.token, $author$project$Main$GotAdminOrders),
					A2($author$project$Api$adminCustomers, session.token, $author$project$Main$GotAdminCustomers),
					A2($author$project$Api$revenue, session.token, $author$project$Main$GotRevenue),
					A2($author$project$Api$signups, session.token, $author$project$Main$GotSignups)
				]));
	} else {
		return A2($author$project$Api$myOrders, session.token, $author$project$Main$GotMyOrders);
	}
};
var $author$project$Main$initialPageSize = 6;
var $author$project$Main$GotSessionValidated = function (a) {
	return {$: 'GotSessionValidated', a: a};
};
var $elm$json$Json$Decode$map5 = _Json_map5;
var $author$project$Api$storedSessionDecoder = A6(
	$elm$json$Json$Decode$map5,
	$author$project$Types$Session,
	A2($elm$json$Json$Decode$field, 'token', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'email', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'role', $author$project$Api$roleDecoder));
var $author$project$Main$init = function (flags) {
	var restoredCart = A2(
		$elm$core$Maybe$withDefault,
		_List_Nil,
		A2(
			$elm$core$Maybe$andThen,
			function (json) {
				return $elm$core$Result$toMaybe(
					A2($elm$json$Json$Decode$decodeString, $author$project$Api$cartDecoder, json));
			},
			flags.cart));
	var restored = A2(
		$elm$core$Maybe$andThen,
		function (json) {
			return $elm$core$Result$toMaybe(
				A2($elm$json$Json$Decode$decodeString, $author$project$Api$storedSessionDecoder, json));
		},
		flags.session);
	var model = {
		now: $elm$time$Time$millisToPosix(0),
		tab: A2(
			$elm$core$Maybe$withDefault,
			$author$project$Types$Catalog,
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.role;
					},
					$author$project$Main$defaultTab),
				restored)),
		cart: restoredCart,
		page: 0,
		orders: $author$project$Types$Idle,
		cartQty: 1,
		revenue: $author$project$Types$Idle,
		session: restored,
		signups: $author$project$Types$Idle,
		authBusy: false,
		authMode: $author$project$Main$SignInMode,
		authName: '',
		category: '',
		lowStock: $author$project$Types$Loading,
		pageSize: $author$project$Main$initialPageSize,
		products: $author$project$Types$Loading,
		selected: $elm$core$Maybe$Nothing,
		authEmail: '',
		authError: $elm$core$Maybe$Nothing,
		adminOrders: $author$project$Types$Idle,
		orderNotice: $elm$core$Maybe$Nothing,
		authPassword: '',
		productDraft: $elm$core$Maybe$Nothing,
		productError: $elm$core$Maybe$Nothing,
		adminProducts: $author$project$Types$Idle,
		customerDraft: $elm$core$Maybe$Nothing,
		deleteRequest: $elm$core$Maybe$Nothing,
		expandedTimes: $elm$core$Set$empty,
		adminCustomers: $author$project$Types$Idle,
		imageUploading: false
	};
	return _Utils_Tuple2(
		model,
		$elm$core$Platform$Cmd$batch(
			A2(
				$elm$core$List$cons,
				$author$project$Main$fetchProducts(model),
				A2(
					$elm$core$List$cons,
					$author$project$Api$lowStock($author$project$Main$GotLowStock),
					A2(
						$elm$core$List$cons,
						A2($elm$core$Task$perform, $author$project$Main$TimeTick, $elm$time$Time$now),
						function () {
							if (restored.$ === 'Just') {
								var session = restored.a;
								return _List_fromArray(
									[
										$author$project$Main$loadForSession(session),
										A2($author$project$Api$me, session.token, $author$project$Main$GotSessionValidated)
									]);
							} else {
								return _List_Nil;
							}
						}())))));
};
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Types$Reports = {$: 'Reports'};
var $author$project$Types$MyOrders = {$: 'MyOrders'};
var $author$project$Types$AdminOrders = {$: 'AdminOrders'};
var $author$project$Types$AdminCustomers = {$: 'AdminCustomers'};
var $author$project$Main$tabsFor = function (model) {
	var _v0 = model.session;
	if (_v0.$ === 'Just') {
		var session = _v0.a;
		var _v1 = session.role;
		if (_v1.$ === 'AdminRole') {
			return _List_fromArray(
				[
					_Utils_Tuple2($author$project$Types$AdminProducts, 'Products'),
					_Utils_Tuple2($author$project$Types$AdminOrders, 'Orders'),
					_Utils_Tuple2($author$project$Types$AdminCustomers, 'Customers'),
					_Utils_Tuple2($author$project$Types$Reports, 'Reports')
				]);
		} else {
			return _List_fromArray(
				[
					_Utils_Tuple2($author$project$Types$Catalog, 'Catalog'),
					_Utils_Tuple2($author$project$Types$MyOrders, 'My Orders')
				]);
		}
	} else {
		return _List_fromArray(
			[
				_Utils_Tuple2($author$project$Types$Catalog, 'Catalog')
			]);
	}
};
var $author$project$Radix$Size2 = {$: 'Size2'};
var $author$project$Radix$Button$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Button$VSolid = {$: 'VSolid'};
var $author$project$Radix$Button$new = function (options) {
	return $author$project$Radix$Button$Config(
		{size: $author$project$Radix$Size2, content: options.content, onClick: options.onClick, variant: $author$project$Radix$Button$VSolid, isLoading: false, isDisabled: false, accentColor: $elm$core$Maybe$Nothing, isHighContrast: false, radiusOverride: $elm$core$Maybe$Nothing});
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Radix$Spinner$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Spinner$new = $author$project$Radix$Spinner$Config(
	{icon: $elm$core$Maybe$Nothing, size: $author$project$Radix$Size2, isSpinning: false});
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $author$project$Radix$sizeToCss = function (size) {
	return 'rt-r-size-' + function () {
		switch (size.$) {
			case 'Size1':
				return '1';
			case 'Size2':
				return '2';
			case 'Size3':
				return '3';
			default:
				return '4';
		}
	}();
};
var $author$project$Radix$Spinner$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2(
						$author$project$Radix$sizeToCss(config.size),
						true),
						_Utils_Tuple2(
						'rt-r-ai-center',
						!_Utils_eq(config.icon, $elm$core$Maybe$Nothing)),
						_Utils_Tuple2(
						'rt-r-jc-center',
						!_Utils_eq(config.icon, $elm$core$Maybe$Nothing)),
						_Utils_Tuple2(
						'rt-r-position-absolute',
						_Utils_eq(config.icon, $elm$core$Maybe$Nothing)),
						_Utils_Tuple2(
						'rt-r-position-relative',
						!_Utils_eq(config.icon, $elm$core$Maybe$Nothing)),
						_Utils_Tuple2(
						'rt-r-inset-0',
						!_Utils_eq(config.icon, $elm$core$Maybe$Nothing))
					]))
			]),
		_List_fromArray(
			[
				function () {
				var _v1 = config.icon;
				if (_v1.$ === 'Nothing') {
					return $elm$html$Html$text('');
				} else {
					var icon = _v1.a;
					return A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'contents'),
								A2($elm$html$Html$Attributes$style, 'visibility', 'hidden'),
								A2($elm$html$Html$Attributes$attribute, 'inert', ''),
								A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
							]),
						_List_fromArray(
							[icon]));
				}
			}(),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('rt-Spinner', true),
								_Utils_Tuple2(
								$author$project$Radix$sizeToCss(config.size),
								true),
								_Utils_Tuple2(
								'rt-r-ai-center',
								!_Utils_eq(config.icon, $elm$core$Maybe$Nothing)),
								_Utils_Tuple2(
								'rt-r-jc-center',
								!_Utils_eq(config.icon, $elm$core$Maybe$Nothing)),
								_Utils_Tuple2(
								'rt-r-position-absolute',
								!_Utils_eq(config.icon, $elm$core$Maybe$Nothing)),
								_Utils_Tuple2(
								'rt-r-inset-0',
								!_Utils_eq(config.icon, $elm$core$Maybe$Nothing))
							]))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-SpinnerLeaf')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-SpinnerLeaf')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-SpinnerLeaf')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-SpinnerLeaf')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-SpinnerLeaf')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-SpinnerLeaf')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-SpinnerLeaf')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-SpinnerLeaf')
							]),
						_List_Nil)
					]))
			]));
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $author$project$Radix$Spinner$withSize = F2(
	function (size, _v0) {
		var config = _v0.a;
		return $author$project$Radix$Spinner$Config(
			_Utils_update(
				config,
				{size: size}));
	});
var $author$project$Radix$Internal$attributeIf = F2(
	function (condition, attribute) {
		return condition ? attribute : $elm$html$Html$Attributes$class('');
	});
var $author$project$Radix$Spinner$withLoading = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Spinner$Config(
		_Utils_update(
			config,
			{isSpinning: true}));
};
var $author$project$Radix$Button$variantToCss = function (variant) {
	return 'rt-variant-' + function () {
		switch (variant.$) {
			case 'VClassic':
				return 'classic';
			case 'VSolid':
				return 'solid';
			case 'VSoft':
				return 'soft';
			case 'VSurface':
				return 'surface';
			case 'VOutline':
				return 'outline';
			default:
				return 'ghost';
		}
	}();
};
var $author$project$Radix$colorToString = function (color) {
	switch (color.$) {
		case 'Amber':
			return 'amber';
		case 'Blue':
			return 'blue';
		case 'Bronze':
			return 'bronze';
		case 'Brown':
			return 'brown';
		case 'Crimson':
			return 'crimson';
		case 'Cyan':
			return 'cyan';
		case 'Gold':
			return 'gold';
		case 'Grass':
			return 'grass';
		case 'Gray':
			return 'gray';
		case 'Green':
			return 'green';
		case 'Indigo':
			return 'indigo';
		case 'Iris':
			return 'iris';
		case 'Jade':
			return 'jade';
		case 'Lime':
			return 'lime';
		case 'Mauve':
			return 'mauve';
		case 'Mint':
			return 'mint';
		case 'Olive':
			return 'olive';
		case 'Orange':
			return 'orange';
		case 'Pink':
			return 'pink';
		case 'Plum':
			return 'plum';
		case 'Purple':
			return 'purple';
		case 'Red':
			return 'red';
		case 'Ruby':
			return 'ruby';
		case 'Sage':
			return 'sage';
		case 'Sand':
			return 'sand';
		case 'Sky':
			return 'sky';
		case 'Slate':
			return 'slate';
		case 'Teal':
			return 'teal';
		case 'Tomato':
			return 'tomato';
		case 'Violet':
			return 'violet';
		default:
			return 'yellow';
	}
};
var $author$project$Radix$Internal$attributeMaybe = F2(
	function (attribute, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return attribute(value);
		} else {
			return $elm$html$Html$Attributes$class('');
		}
	});
var $author$project$Radix$radiusToString = function (radius) {
	switch (radius.$) {
		case 'None':
			return 'none';
		case 'Small':
			return 'small';
		case 'Medium':
			return 'medium';
		case 'Large':
			return 'large';
		default:
			return 'full';
	}
};
var $author$project$Radix$Button$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-reset', true),
						_Utils_Tuple2('rt-BaseButton', true),
						_Utils_Tuple2('rt-Button', true),
						_Utils_Tuple2(
						$author$project$Radix$sizeToCss(config.size),
						true),
						_Utils_Tuple2(
						$author$project$Radix$Button$variantToCss(config.variant),
						true),
						_Utils_Tuple2('rt-high-contrast', config.isHighContrast),
						_Utils_Tuple2('rt-loading', config.isLoading)
					])),
				$elm$html$Html$Attributes$type_('button'),
				$elm$html$Html$Events$onClick(config.onClick),
				A2(
				$author$project$Radix$Internal$attributeIf,
				config.isDisabled || config.isLoading,
				A2($elm$html$Html$Attributes$attribute, 'data-disabled', '')),
				$elm$html$Html$Attributes$disabled(config.isDisabled || config.isLoading),
				A2(
				$author$project$Radix$Internal$attributeIf,
				config.isHighContrast,
				A2($elm$html$Html$Attributes$attribute, 'highContrast', '')),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (accentColor) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-accent-color',
						$author$project$Radix$colorToString(accentColor));
				},
				config.accentColor),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (radiusOverride) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-radius',
						$author$project$Radix$radiusToString(radiusOverride));
				},
				config.radiusOverride)
			]),
		config.isLoading ? _List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'contents'),
						A2($elm$html$Html$Attributes$style, 'visibility', 'hidden'),
						A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
					]),
				config.content),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'border', '0px'),
						A2($elm$html$Html$Attributes$style, 'width', '1px'),
						A2($elm$html$Html$Attributes$style, 'height', '1px'),
						A2($elm$html$Html$Attributes$style, 'padding', '0px'),
						A2($elm$html$Html$Attributes$style, 'margin', '-1px'),
						A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
						A2($elm$html$Html$Attributes$style, 'clip', 'rect(0px, 0px, 0px, 0px)'),
						A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
						A2($elm$html$Html$Attributes$style, 'overflow-wrap', 'normal')
					]),
				config.content),
				$author$project$Radix$Spinner$view(
				A2(
					$author$project$Radix$Spinner$withSize,
					config.size,
					$author$project$Radix$Spinner$withLoading($author$project$Radix$Spinner$new)))
			]) : config.content);
};
var $author$project$Radix$Button$VSoft = {$: 'VSoft'};
var $author$project$Radix$Button$withVariantSoft = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Button$Config(
		_Utils_update(
			config,
			{variant: $author$project$Radix$Button$VSoft}));
};
var $author$project$Main$rSoft = F2(
	function (onClick_, label) {
		return $author$project$Radix$Button$view(
			$author$project$Radix$Button$withVariantSoft(
				$author$project$Radix$Button$new(
					{
						content: _List_fromArray(
							[
								$elm$html$Html$text(label)
							]),
						onClick: onClick_
					})));
	});
var $author$project$Main$rPrimary = F2(
	function (onClick_, label) {
		return $author$project$Radix$Button$view(
			$author$project$Radix$Button$new(
				{
					content: _List_fromArray(
						[
							$elm$html$Html$text(label)
						]),
					onClick: onClick_
				}));
	});
var $author$project$Main$SelectTab = function (a) {
	return {$: 'SelectTab', a: a};
};
var $author$project$Main$tabButton = F2(
	function (model, _v0) {
		var tab = _v0.a;
		var label = _v0.b;
		return _Utils_eq(model.tab, tab) ? A2(
			$author$project$Main$rPrimary,
			$author$project$Main$SelectTab(tab),
			label) : A2(
			$author$project$Main$rSoft,
			$author$project$Main$SelectTab(tab),
			label);
	});
var $author$project$Main$viewTabs = function (model) {
	return A2(
		$elm$html$Html$nav,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('tabs')
			]),
		A2(
			$elm$core$List$map,
			$author$project$Main$tabButton(model),
			$author$project$Main$tabsFor(model)));
};
var $elm$html$Html$header = _VirtualDom_node('header');
var $author$project$Radix$Button$VGhost = {$: 'VGhost'};
var $author$project$Radix$Button$withVariantGhost = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Button$Config(
		_Utils_update(
			config,
			{variant: $author$project$Radix$Button$VGhost}));
};
var $author$project$Main$rGhost = F2(
	function (onClick_, label) {
		return $author$project$Radix$Button$view(
			$author$project$Radix$Button$withVariantGhost(
				$author$project$Radix$Button$new(
					{
						content: _List_fromArray(
							[
								$elm$html$Html$text(label)
							]),
						onClick: onClick_
					})));
	});
var $author$project$Radix$Text$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Text$new = function (content) {
	return $author$project$Radix$Text$Config(
		{node: 'span', size: $elm$core$Maybe$Nothing, trim: $elm$core$Maybe$Nothing, wrap: $elm$core$Maybe$Nothing, color: $elm$core$Maybe$Nothing, weight: $elm$core$Maybe$Nothing, content: content, truncate: false, alignment: $elm$core$Maybe$Nothing, customStyles: _List_Nil, isHighContrast: false, customClassList: _List_Nil, customAttributes: _List_Nil});
};
var $author$project$Radix$Gray = {$: 'Gray'};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $author$project$Radix$styles = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map(
		function (_v0) {
			var key = _v0.a;
			var value = _v0.b;
			return key + (':' + value);
		}),
	A2(
		$elm$core$Basics$composeR,
		$elm$core$String$join('; '),
		$elm$html$Html$Attributes$attribute('style')));
var $author$project$Radix$Text$trimToCss = function (trim) {
	return 'rt-r-lt-' + function () {
		switch (trim.$) {
			case 'Normal':
				return 'normal';
			case 'Start':
				return 'start';
			case 'End':
				return 'end';
			default:
				return 'both';
		}
	}();
};
var $author$project$Radix$Text$wrapToCss = function (wrap) {
	return 'rt-r-tw-' + function () {
		switch (wrap.$) {
			case 'Wrap':
				return 'wrap';
			case 'Nowrap':
				return 'nowrap';
			case 'Pretty':
				return 'pretty';
			default:
				return 'balance';
		}
	}();
};
var $author$project$Radix$Text$alignToCss = function (align) {
	return 'rt-r-ta-' + function () {
		switch (align.$) {
			case 'Left':
				return 'left';
			case 'Center':
				return 'center';
			default:
				return 'right';
		}
	}();
};
var $author$project$Radix$Text$weightToCss = function (weight) {
	return 'rt-r-weight-' + function () {
		switch (weight.$) {
			case 'Light':
				return 'light';
			case 'Regular':
				return 'regular';
			case 'Medium':
				return 'medium';
			default:
				return 'bold';
		}
	}();
};
var $author$project$Radix$Internal$classListMaybe = F2(
	function (f, maybe) {
		if (maybe.$ === 'Nothing') {
			return _Utils_Tuple2('', false);
		} else {
			var a = maybe.a;
			return _Utils_Tuple2(
				f(a),
				true);
		}
	});
var $author$project$Radix$Text$view = function (_v0) {
	var config = _v0.a;
	return A3(
		$elm$html$Html$node,
		config.node,
		_Utils_ap(
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_Utils_ap(
						_List_fromArray(
							[
								_Utils_Tuple2('rt-Text', true),
								_Utils_Tuple2('rt-truncate', config.truncate),
								_Utils_Tuple2('rt-high-contrast', config.isHighContrast),
								A2(
								$author$project$Radix$Internal$classListMaybe,
								function (size) {
									return 'rt-r-size-' + $elm$core$String$fromInt(size);
								},
								config.size),
								A2(
								$author$project$Radix$Internal$classListMaybe,
								function (weight) {
									return $author$project$Radix$Text$weightToCss(weight);
								},
								config.weight),
								A2(
								$author$project$Radix$Internal$classListMaybe,
								function (alignment) {
									return $author$project$Radix$Text$alignToCss(alignment);
								},
								config.alignment),
								A2(
								$author$project$Radix$Internal$classListMaybe,
								function (trim) {
									return $author$project$Radix$Text$trimToCss(trim);
								},
								config.trim),
								A2(
								$author$project$Radix$Internal$classListMaybe,
								function (wrap) {
									return $author$project$Radix$Text$wrapToCss(wrap);
								},
								config.wrap)
							]),
						config.customClassList)),
					A2(
					$author$project$Radix$Internal$attributeMaybe,
					function (color) {
						return A2(
							$elm$html$Html$Attributes$attribute,
							'data-accent-color',
							$author$project$Radix$colorToString(color));
					},
					config.color),
					$author$project$Radix$styles(config.customStyles)
				]),
			config.customAttributes),
		config.content);
};
var $author$project$Radix$Text$withColor = F2(
	function (color, _v0) {
		var config = _v0.a;
		return $author$project$Radix$Text$Config(
			_Utils_update(
				config,
				{
					color: $elm$core$Maybe$Just(color)
				}));
	});
var $author$project$Main$rMuted = function (s) {
	return $author$project$Radix$Text$view(
		A2(
			$author$project$Radix$Text$withColor,
			$author$project$Radix$Gray,
			$author$project$Radix$Text$new(
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]))));
};
var $author$project$Main$SignOut = {$: 'SignOut'};
var $author$project$Radix$Heading$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Heading$new = function (content) {
	return $author$project$Radix$Heading$Config(
		{node: 'h1', size: 6, trim: $elm$core$Maybe$Nothing, wrap: $elm$core$Maybe$Nothing, color: $elm$core$Maybe$Nothing, weight: $elm$core$Maybe$Nothing, content: content, truncate: false, alignment: $elm$core$Maybe$Nothing, isHighContrast: false});
};
var $author$project$Radix$Heading$asH3 = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Heading$Config(
		_Utils_update(
			config,
			{node: 'h3'}));
};
var $author$project$Radix$Heading$view = function (_v0) {
	var config = _v0.a;
	return A3(
		$elm$html$Html$node,
		config.node,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-Heading', true),
						_Utils_Tuple2(
						'rt-r-size-' + $elm$core$String$fromInt(config.size),
						true),
						_Utils_Tuple2('rt-truncate', config.truncate),
						_Utils_Tuple2('rt-high-contrast', config.isHighContrast),
						A2(
						$author$project$Radix$Internal$classListMaybe,
						function (weight) {
							return $author$project$Radix$Text$weightToCss(weight);
						},
						config.weight),
						A2(
						$author$project$Radix$Internal$classListMaybe,
						function (alignment) {
							return $author$project$Radix$Text$alignToCss(alignment);
						},
						config.alignment),
						A2(
						$author$project$Radix$Internal$classListMaybe,
						function (trim) {
							return $author$project$Radix$Text$trimToCss(trim);
						},
						config.trim),
						A2(
						$author$project$Radix$Internal$classListMaybe,
						function (wrap) {
							return $author$project$Radix$Text$wrapToCss(wrap);
						},
						config.wrap)
					])),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (color) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-accent-color',
						$author$project$Radix$colorToString(color));
				},
				config.color)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(config.content)
			]));
};
var $author$project$Main$rHeading = function (label) {
	return $author$project$Radix$Heading$view(
		$author$project$Radix$Heading$asH3(
			$author$project$Radix$Heading$new(label)));
};
var $author$project$Main$roleLabel = function (role) {
	if (role.$ === 'AdminRole') {
		return 'admin';
	} else {
		return 'customer';
	}
};
var $author$project$Main$cred = F2(
	function (email, password) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('cred')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('cred-email')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(email)
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('cred-pass')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(password)
						]))
				]));
	});
var $elm$html$Html$form = _VirtualDom_node('form');
var $author$project$Radix$Red = {$: 'Red'};
var $author$project$Radix$Callout$Soft = {$: 'Soft'};
var $author$project$Radix$Callout$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Callout$new = function (options) {
	return $author$project$Radix$Callout$Config(
		{icon: options.icon, size: 2, color: $elm$core$Maybe$Nothing, content: options.content, isAlert: false, variant: $author$project$Radix$Callout$Soft, isHighContrast: false});
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Radix$Callout$variantToCss = function (variant) {
	switch (variant.$) {
		case 'Soft':
			return 'rt-variant-soft';
		case 'Surface':
			return 'rt-variant-surface';
		default:
			return 'rt-variant-outline';
	}
};
var $author$project$Radix$Callout$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-CalloutRoot', true),
						_Utils_Tuple2(
						$author$project$Radix$Callout$variantToCss(config.variant),
						true),
						_Utils_Tuple2(
						'rt-r-size-' + $elm$core$String$fromInt(config.size),
						true),
						_Utils_Tuple2('rt-high-contrast', config.isHighContrast)
					])),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (color) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-accent-color',
						$author$project$Radix$colorToString(color));
				},
				config.color),
				A2(
				$author$project$Radix$Internal$attributeIf,
				config.isAlert,
				A2($elm$html$Html$Attributes$attribute, 'role', 'alert'))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('rt-Text', true),
								_Utils_Tuple2('rt-CalloutIcon', true),
								_Utils_Tuple2(
								$author$project$Radix$Callout$variantToCss(config.variant),
								true),
								_Utils_Tuple2(
								'rt-r-size-' + $elm$core$String$fromInt(config.size),
								true)
							]))
					]),
				_List_fromArray(
					[config.icon])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('rt-Text', true),
								_Utils_Tuple2('rt-CalloutText', true),
								_Utils_Tuple2(
								'rt-r-size-' + $elm$core$String$fromInt(config.size),
								true)
							]))
					]),
				config.content)
			]));
};
var $author$project$Radix$Callout$withColor = F2(
	function (color, _v0) {
		var config = _v0.a;
		return $author$project$Radix$Callout$Config(
			_Utils_update(
				config,
				{
					color: $elm$core$Maybe$Just(color)
				}));
	});
var $author$project$Radix$Callout$withIsAlert = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Callout$Config(
		_Utils_update(
			config,
			{isAlert: true}));
};
var $author$project$Main$rAlert = function (message) {
	return $author$project$Radix$Callout$view(
		$author$project$Radix$Callout$withIsAlert(
			A2(
				$author$project$Radix$Callout$withColor,
				$author$project$Radix$Red,
				$author$project$Radix$Callout$new(
					{
						icon: $elm$html$Html$text('!'),
						content: _List_fromArray(
							[
								$elm$html$Html$text(message)
							])
					}))));
};
var $author$project$Radix$TextField$Size2 = {$: 'Size2'};
var $author$project$Radix$TextField$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$TextField$Surface = {$: 'Surface'};
var $author$project$Radix$TextField$new = function (options) {
	return $author$project$Radix$TextField$Config(
		{size: $author$project$Radix$TextField$Size2, slot: $elm$core$Maybe$Nothing, color: $elm$core$Maybe$Nothing, value: options.value, radius: $elm$core$Maybe$Nothing, onInput: options.onInput, variant: $author$project$Radix$TextField$Surface, customStyles: _List_Nil, customClassList: _List_Nil, customAttributes: _List_Nil});
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $author$project$Radix$TextField$sizeToClass = function (size) {
	return 'rt-r-size-' + function () {
		switch (size.$) {
			case 'Size1':
				return '1';
			case 'Size2':
				return '2';
			default:
				return '3';
		}
	}();
};
var $author$project$Radix$TextField$variantToCss = function (variant) {
	return 'rt-variant-' + function () {
		switch (variant.$) {
			case 'Classic':
				return 'classic';
			case 'Surface':
				return 'surface';
			default:
				return 'soft';
		}
	}();
};
var $author$project$Radix$TextField$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-TextFieldRoot', true),
						_Utils_Tuple2(
						$author$project$Radix$TextField$sizeToClass(config.size),
						true),
						_Utils_Tuple2(
						$author$project$Radix$TextField$variantToCss(config.variant),
						true)
					])),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (color) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-accent-color',
						$author$project$Radix$colorToString(color));
				},
				config.color),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (radius) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-radius',
						$author$project$Radix$radiusToString(radius));
				},
				config.radius)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$input,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$classList(
							_Utils_ap(
								_List_fromArray(
									[
										_Utils_Tuple2('rt-reset', true),
										_Utils_Tuple2('rt-TextFieldInput', true)
									]),
								config.customClassList)),
							$elm$html$Html$Attributes$value(config.value),
							$elm$html$Html$Events$onInput(config.onInput),
							$author$project$Radix$styles(config.customStyles)
						]),
					config.customAttributes),
				_List_Nil),
				function () {
				var _v1 = config.slot;
				if (_v1.$ === 'Nothing') {
					return $elm$html$Html$text('');
				} else {
					var slot = _v1.a;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-TextFieldSlot')
							]),
						_List_fromArray(
							[slot]));
				}
			}()
			]));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $author$project$Radix$TextField$withCustomAttributes = F2(
	function (customAttributes, _v0) {
		var config = _v0.a;
		return $author$project$Radix$TextField$Config(
			_Utils_update(
				config,
				{customAttributes: customAttributes}));
	});
var $author$project$Main$rInput = function (options) {
	return $author$project$Radix$TextField$view(
		A2(
			$author$project$Radix$TextField$withCustomAttributes,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$type_(options.inputType),
					$elm$html$Html$Attributes$placeholder(options.label),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', options.label),
					$elm$html$Html$Attributes$disabled(options.isDisabled)
				]),
			$author$project$Radix$TextField$new(
				{value: options.value, onInput: options.onInput})));
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var $elm$html$Html$Events$onSubmit = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysPreventDefault,
			$elm$json$Json$Decode$succeed(msg)));
};
var $author$project$Main$SubmitAuth = {$: 'SubmitAuth'};
var $author$project$Main$SetAuthMode = function (a) {
	return {$: 'SetAuthMode', a: a};
};
var $author$project$Main$SetAuthName = function (a) {
	return {$: 'SetAuthName', a: a};
};
var $author$project$Main$RegisterMode = {$: 'RegisterMode'};
var $author$project$Main$SetAuthEmail = function (a) {
	return {$: 'SetAuthEmail', a: a};
};
var $author$project$Main$SetAuthPassword = function (a) {
	return {$: 'SetAuthPassword', a: a};
};
var $author$project$Radix$Button$withIsDisabled = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Button$Config(
		_Utils_update(
			config,
			{isDisabled: true}));
};
var $author$project$Main$rPrimaryDisabled = F3(
	function (onClick_, label, isDisabled) {
		return $author$project$Radix$Button$view(
			function (c) {
				return isDisabled ? $author$project$Radix$Button$withIsDisabled(c) : c;
			}(
				$author$project$Radix$Button$new(
					{
						content: _List_fromArray(
							[
								$elm$html$Html$text(label)
							]),
						onClick: onClick_
					})));
	});
var $author$project$Main$viewAuthForm = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('auth auth-form')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('segmented')
					]),
				_List_fromArray(
					[
						_Utils_eq(model.authMode, $author$project$Main$SignInMode) ? A2(
						$author$project$Main$rPrimary,
						$author$project$Main$SetAuthMode($author$project$Main$SignInMode),
						'Sign in') : A2(
						$author$project$Main$rSoft,
						$author$project$Main$SetAuthMode($author$project$Main$SignInMode),
						'Sign in'),
						_Utils_eq(model.authMode, $author$project$Main$RegisterMode) ? A2(
						$author$project$Main$rPrimary,
						$author$project$Main$SetAuthMode($author$project$Main$RegisterMode),
						'Register') : A2(
						$author$project$Main$rSoft,
						$author$project$Main$SetAuthMode($author$project$Main$RegisterMode),
						'Register')
					])),
				A2(
				$elm$html$Html$form,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('auth-fields'),
						$elm$html$Html$Events$onSubmit($author$project$Main$SubmitAuth)
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('auth-inputs')
							]),
						_List_fromArray(
							[
								$author$project$Main$rInput(
								{label: 'Email', value: model.authEmail, onInput: $author$project$Main$SetAuthEmail, inputType: 'email', isDisabled: false}),
								$author$project$Main$rInput(
								{label: 'Password', value: model.authPassword, onInput: $author$project$Main$SetAuthPassword, inputType: 'password', isDisabled: false}),
								_Utils_eq(model.authMode, $author$project$Main$RegisterMode) ? $author$project$Main$rInput(
								{label: 'Full name', value: model.authName, onInput: $author$project$Main$SetAuthName, inputType: 'text', isDisabled: false}) : $elm$html$Html$text('')
							])),
						function () {
						var _v0 = model.authError;
						if (_v0.$ === 'Just') {
							var message = _v0.a;
							return $author$project$Main$rAlert(message);
						} else {
							return $elm$html$Html$text('');
						}
					}(),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('auth-actions')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('hint creds')
									]),
								_List_fromArray(
									[
										A2($author$project$Main$cred, 'admin@acme.test', 'admin123'),
										A2($author$project$Main$cred, 'ada@example.com', 'customer123')
									])),
								A3(
								$author$project$Main$rPrimaryDisabled,
								$author$project$Main$SubmitAuth,
								model.authBusy ? '…' : 'Go',
								model.authBusy)
							]))
					]))
			]));
};
var $author$project$Main$viewHeader = function (model) {
	return A2(
		$elm$html$Html$header,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('topbar')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('brand')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('logo')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('☕')
							])),
						$author$project$Main$rHeading('Kafejo')
					])),
				function () {
				var _v0 = model.session;
				if (_v0.$ === 'Just') {
					var session = _v0.a;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('auth')
							]),
						_List_fromArray(
							[
								$author$project$Main$rMuted(
								session.name + (' · ' + $author$project$Main$roleLabel(session.role))),
								A2($author$project$Main$rGhost, $author$project$Main$SignOut, 'Sign out')
							]));
				} else {
					return $author$project$Main$viewAuthForm(model);
				}
			}()
			]));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$String$length = _String_length;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $author$project$Main$money = function (cents) {
	return '$' + ($elm$core$String$fromInt((cents / 100) | 0) + ('.' + A3(
		$elm$core$String$padLeft,
		2,
		_Utils_chr('0'),
		$elm$core$String$fromInt(
			A2($elm$core$Basics$modBy, 100, cents)))));
};
var $author$project$Radix$Table$Ghost = {$: 'Ghost'};
var $author$project$Radix$Table$Size2 = {$: 'Size2'};
var $author$project$Radix$Table$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Table$new = function (options) {
	return $author$project$Radix$Table$Config(
		{data: options.data, size: $author$project$Radix$Table$Size2, layout: $elm$core$Maybe$Nothing, columns: options.columns, variant: $author$project$Radix$Table$Ghost, customStyles: _List_Nil, customClassList: _List_Nil, customAttributes: _List_Nil});
};
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $elm$html$Html$Attributes$scope = $elm$html$Html$Attributes$stringProperty('scope');
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $author$project$Radix$Table$sizeToCss = function (size) {
	return 'rt-r-size-' + function () {
		switch (size.$) {
			case 'Size1':
				return '1';
			case 'Size2':
				return '2';
			default:
				return '3';
		}
	}();
};
var $author$project$Radix$Table$variantToCss = function (variant) {
	return 'rt-variant-' + function () {
		if (variant.$ === 'Ghost') {
			return 'ghost';
		} else {
			return 'surface';
		}
	}();
};
var $author$project$Radix$Table$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-TableRoot', true),
						_Utils_Tuple2(
						$author$project$Radix$Table$sizeToCss(config.size),
						true),
						_Utils_Tuple2(
						$author$project$Radix$Table$variantToCss(config.variant),
						true)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$table,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$classList(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2('rt-TableRootTable', true),
								config.customClassList)),
							$author$project$Radix$styles(config.customStyles)
						]),
					config.customAttributes),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$thead,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-TableHeader')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('rt-TableRow')
									]),
								A2(
									$elm$core$List$map,
									function (column) {
										return A2(
											$elm$html$Html$th,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('rt-TableCell  rt-TableColumnHeaderCell'),
													$elm$html$Html$Attributes$scope('col')
												]),
											_List_fromArray(
												[column.header]));
									},
									config.columns))
							])),
						A2(
						$elm$html$Html$tbody,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rt-TableBody')
							]),
						A2(
							$elm$core$List$map,
							function (rowData) {
								return A2(
									$elm$html$Html$tr,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('rt-TableRow')
										]),
									A2(
										$elm$core$List$indexedMap,
										F2(
											function (index, column) {
												var content = column.cell(rowData);
												return (!index) ? A2(
													$elm$html$Html$th,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('rt-TableCell rt-TableRowHeaderCell'),
															$elm$html$Html$Attributes$scope('row')
														]),
													_List_fromArray(
														[content])) : A2(
													$elm$html$Html$td,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('rt-TableCell')
														]),
													_List_fromArray(
														[content]));
											}),
										config.columns));
							},
							config.data))
					]))
			]));
};
var $author$project$Main$rTable = function (options) {
	return $author$project$Radix$Table$view(
		$author$project$Radix$Table$new(options));
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Radix$Green = {$: 'Green'};
var $author$project$Main$rNotice = function (message) {
	return $author$project$Radix$Callout$view(
		A2(
			$author$project$Radix$Callout$withColor,
			$author$project$Radix$Green,
			$author$project$Radix$Callout$new(
				{
					icon: $elm$html$Html$text('+'),
					content: _List_fromArray(
						[
							$elm$html$Html$text(message)
						])
				})));
};
var $author$project$Radix$Strong$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Strong$new = function (content) {
	return $author$project$Radix$Strong$Config(
		{wrap: $elm$core$Maybe$Nothing, content: content, truncate: false});
};
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $author$project$Radix$Strong$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$strong,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-Strong', true),
						_Utils_Tuple2('rt-truncate', config.truncate),
						A2(
						$author$project$Radix$Internal$classListMaybe,
						function (wrap) {
							return $author$project$Radix$Text$wrapToCss(wrap);
						},
						config.wrap)
					]))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(config.content)
			]));
};
var $author$project$Main$rStrong = function (s) {
	return $author$project$Radix$Strong$view(
		$author$project$Radix$Strong$new(s));
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Main$cartTotal = function (cart) {
	return $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (item) {
				return item.priceCents * item.quantity;
			},
			cart));
};
var $author$project$Main$PlaceOrder = {$: 'PlaceOrder'};
var $author$project$Main$rText = function (s) {
	return $author$project$Radix$Text$view(
		$author$project$Radix$Text$new(
			_List_fromArray(
				[
					$elm$html$Html$text(s)
				])));
};
var $author$project$Main$RemoveCart = function (a) {
	return {$: 'RemoveCart', a: a};
};
var $author$project$Main$cartColumns = _List_fromArray(
	[
		{
		cell: function (item) {
			return $author$project$Main$rText(item.name);
		},
		header: $elm$html$Html$text('Item')
	},
		{
		cell: function (item) {
			return $author$project$Main$rText(
				$elm$core$String$fromInt(item.quantity));
		},
		header: $elm$html$Html$text('Qty')
	},
		{
		cell: function (item) {
			return $author$project$Main$rText(
				$author$project$Main$money(item.priceCents * item.quantity));
		},
		header: $elm$html$Html$text('Price')
	},
		{
		cell: function (item) {
			return A2(
				$author$project$Main$rGhost,
				$author$project$Main$RemoveCart(item.sku),
				'Remove');
		},
		header: $elm$html$Html$text('')
	}
	]);
var $author$project$Main$viewCart = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('cart')
			]),
		_List_fromArray(
			[
				$author$project$Main$rHeading('Your cart'),
				$elm$core$List$isEmpty(model.cart) ? $author$project$Main$rMuted('No items yet. Open a product to add it.') : A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Main$rTable(
						{data: model.cart, columns: $author$project$Main$cartColumns}),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('cart-total')
							]),
						_List_fromArray(
							[
								$author$project$Main$rStrong(
								'Total: ' + $author$project$Main$money(
									$author$project$Main$cartTotal(model.cart))),
								A2($author$project$Main$rPrimary, $author$project$Main$PlaceOrder, 'Place order')
							]))
					])),
				function () {
				var _v0 = model.orderNotice;
				if (_v0.$ === 'Just') {
					var notice = _v0.a;
					return $author$project$Main$rNotice(notice);
				} else {
					return $elm$html$Html$text('');
				}
			}()
			]));
};
var $elm$core$Basics$not = _Basics_not;
var $author$project$Main$NextPage = {$: 'NextPage'};
var $author$project$Main$PrevPage = {$: 'PrevPage'};
var $author$project$Main$rSoftDisabled = F3(
	function (onClick_, label, isDisabled) {
		return $author$project$Radix$Button$view(
			function (c) {
				return isDisabled ? $author$project$Radix$Button$withIsDisabled(c) : c;
			}(
				$author$project$Radix$Button$withVariantSoft(
					$author$project$Radix$Button$new(
						{
							content: _List_fromArray(
								[
									$elm$html$Html$text(label)
								]),
							onClick: onClick_
						}))));
	});
var $author$project$Main$viewPager = function (model) {
	var _v0 = model.products;
	if (_v0.$ === 'Success') {
		var page = _v0.a;
		var hasPrev = model.page > 0;
		var hasNext = _Utils_cmp(
			page.offset + $elm$core$List$length(page.items),
			page.total) < 0;
		var from = page.offset + 1;
		var to = page.offset + $elm$core$List$length(page.items);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('pager')
				]),
			_List_fromArray(
				[
					A3($author$project$Main$rSoftDisabled, $author$project$Main$PrevPage, '← Prev', !hasPrev),
					$author$project$Main$rMuted(
					$elm$core$String$fromInt(from) + ('–' + ($elm$core$String$fromInt(to) + (' of ' + $elm$core$String$fromInt(page.total))))),
					A3($author$project$Main$rSoftDisabled, $author$project$Main$NextPage, 'Next →', !hasNext)
				]));
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Main$isCustomer = function (model) {
	var _v0 = model.session;
	if (_v0.$ === 'Just') {
		var session = _v0.a;
		return _Utils_eq(session.role, $author$project$Types$CustomerRole);
	} else {
		return false;
	}
};
var $author$project$Main$viewRemote = F2(
	function (remote, render) {
		switch (remote.$) {
			case 'Idle':
				return $elm$html$Html$text('');
			case 'Loading':
				return $author$project$Radix$Spinner$view($author$project$Radix$Spinner$new);
			case 'Failure':
				var message = remote.a;
				return $author$project$Main$rAlert(message);
			default:
				var value = remote.a;
				return render(value);
		}
	});
var $author$project$Main$SetCategory = function (a) {
	return {$: 'SetCategory', a: a};
};
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$img = _VirtualDom_node('img');
var $author$project$Radix$Card$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Card$Surface = {$: 'Surface'};
var $author$project$Radix$Card$new = function (content) {
	return $author$project$Radix$Card$Config(
		{size: 1, content: content, variant: $author$project$Radix$Card$Surface});
};
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $author$project$Radix$Text$Bold = {$: 'Bold'};
var $author$project$Radix$Card$variantToCss = function (variant) {
	switch (variant.$) {
		case 'Surface':
			return 'rt-variant-surface';
		case 'Classic':
			return 'rt-variant-classic';
		default:
			return 'rt-variant-ghost';
	}
};
var $author$project$Radix$Card$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-BaseCard', true),
						_Utils_Tuple2('rt-Card', true),
						_Utils_Tuple2(
						$author$project$Radix$Card$variantToCss(config.variant),
						true),
						_Utils_Tuple2(
						'rt-r-size-' + $elm$core$String$fromInt(config.size),
						true)
					]))
			]),
		config.content);
};
var $author$project$Radix$Badge$Soft = {$: 'Soft'};
var $author$project$Radix$Badge$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$Badge$new = function (content) {
	return $author$project$Radix$Badge$Config(
		{size: 1, color: $elm$core$Maybe$Nothing, radius: $elm$core$Maybe$Nothing, content: content, variant: $author$project$Radix$Badge$Soft, isHighContrast: false});
};
var $author$project$Radix$Badge$variantToCss = function (variant) {
	switch (variant.$) {
		case 'Solid':
			return 'rt-variant-solid';
		case 'Soft':
			return 'rt-variant-soft';
		case 'Surface':
			return 'rt-variant-surface';
		default:
			return 'rt-variant-outline';
	}
};
var $author$project$Radix$Badge$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-Badge', true),
						_Utils_Tuple2(
						$author$project$Radix$Badge$variantToCss(config.variant),
						true),
						_Utils_Tuple2(
						'rt-r-size-' + $elm$core$String$fromInt(config.size),
						true),
						_Utils_Tuple2('rt-high-contrast', config.isHighContrast)
					])),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (color) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-accent-color',
						$author$project$Radix$colorToString(color));
				},
				config.color),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (radius) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-radius',
						$author$project$Radix$radiusToString(radius));
				},
				config.radius)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(config.content)
			]));
};
var $author$project$Radix$Badge$withColor = F2(
	function (color, _v0) {
		var config = _v0.a;
		return $author$project$Radix$Badge$Config(
			_Utils_update(
				config,
				{
					color: $elm$core$Maybe$Just(color)
				}));
	});
var $author$project$Radix$Badge$Surface = {$: 'Surface'};
var $author$project$Radix$Badge$withVariantSurface = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Badge$Config(
		_Utils_update(
			config,
			{variant: $author$project$Radix$Badge$Surface}));
};
var $author$project$Main$rBadge = F2(
	function (color, label) {
		return $author$project$Radix$Badge$view(
			$author$project$Radix$Badge$withVariantSurface(
				A2(
					$author$project$Radix$Badge$withColor,
					color,
					$author$project$Radix$Badge$new(label))));
	});
var $author$project$Main$imageUrl = function (image) {
	return $elm$core$String$isEmpty(image) ? '/uploads/placeholder.svg' : ('/uploads/' + image);
};
var $author$project$Radix$Heading$asH4 = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Heading$Config(
		_Utils_update(
			config,
			{node: 'h4'}));
};
var $author$project$Main$rCardTitle = function (label) {
	return $author$project$Radix$Heading$view(
		$author$project$Radix$Heading$asH4(
			$author$project$Radix$Heading$new(label)));
};
var $author$project$Radix$Text$withWeight = F2(
	function (weight, _v0) {
		var config = _v0.a;
		return $author$project$Radix$Text$Config(
			_Utils_update(
				config,
				{
					weight: $elm$core$Maybe$Just(weight)
				}));
	});
var $author$project$Main$OpenProduct = function (a) {
	return {$: 'OpenProduct', a: a};
};
var $author$project$Main$viewProductCard = function (product) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('product-card'),
				$elm$html$Html$Events$onClick(
				$author$project$Main$OpenProduct(product.sku))
			]),
		_List_fromArray(
			[
				$author$project$Radix$Card$view(
				$author$project$Radix$Card$new(
					_List_fromArray(
						[
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('product-image'),
									$elm$html$Html$Attributes$src(
									$author$project$Main$imageUrl(product.image)),
									$elm$html$Html$Attributes$alt(product.name)
								]),
							_List_Nil),
							$author$project$Main$rCardTitle(product.name),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('card-bottom')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-col card-left')
										]),
									_List_fromArray(
										[
											$author$project$Main$rMuted(product.category)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-col card-center')
										]),
									_List_fromArray(
										[
											A2(
											$author$project$Main$rBadge,
											(product.stock <= 5) ? $author$project$Radix$Red : $author$project$Radix$Green,
											$elm$core$String$fromInt(product.stock) + ' in stock')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-col card-right')
										]),
									_List_fromArray(
										[
											$author$project$Radix$Text$view(
											A2(
												$author$project$Radix$Text$withWeight,
												$author$project$Radix$Text$Bold,
												$author$project$Radix$Text$new(
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$Main$money(product.priceCents))
														]))))
										]))
								]))
						])))
			]));
};
var $author$project$Main$viewProductGrid = function (page) {
	return $elm$core$List$isEmpty(page.items) ? $author$project$Main$rMuted('No products match.') : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid')
			]),
		A2($elm$core$List$map, $author$project$Main$viewProductCard, page.items));
};
var $author$project$Main$viewCatalog = function (model) {
	var cartView = $author$project$Main$isCustomer(model) ? $author$project$Main$viewCart(model) : $elm$html$Html$text('');
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('panel')
			]),
		_List_fromArray(
			[
				cartView,
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('toolbar')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('field-row')
							]),
						_List_fromArray(
							[
								$author$project$Main$rMuted('Category'),
								A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Events$onInput($author$project$Main$SetCategory)
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value(''),
												$elm$html$Html$Attributes$selected(model.category === '')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('All')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('coffee'),
												$elm$html$Html$Attributes$selected(model.category === 'coffee')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Coffee')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('tea'),
												$elm$html$Html$Attributes$selected(model.category === 'tea')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Tea')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('accessory'),
												$elm$html$Html$Attributes$selected(model.category === 'accessory')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Accessories')
											]))
									]))
							]))
					])),
				A2($author$project$Main$viewRemote, model.products, $author$project$Main$viewProductGrid),
				$author$project$Main$viewPager(model)
			]));
};
var $author$project$Main$viewStockTable = function (rows) {
	return $elm$core$List$isEmpty(rows) ? $author$project$Main$rMuted('Nothing is below its reorder level.') : $author$project$Main$rTable(
		{
			data: rows,
			columns: _List_fromArray(
				[
					{
					cell: function (row) {
						return $author$project$Main$rText(row.sku);
					},
					header: $elm$html$Html$text('SKU')
				},
					{
					cell: function (row) {
						return $author$project$Main$rText(row.name);
					},
					header: $elm$html$Html$text('Name')
				},
					{
					cell: function (row) {
						return $author$project$Main$rText(
							$elm$core$String$fromInt(row.stock));
					},
					header: $elm$html$Html$text('Stock')
				},
					{
					cell: function (row) {
						return $author$project$Main$rText(
							$elm$core$String$fromInt(row.reorderLevel));
					},
					header: $elm$html$Html$text('Reorder at')
				}
				])
		});
};
var $author$project$Main$viewSignupTable = function (report) {
	return $author$project$Main$rTable(
		{
			data: _List_fromArray(
				[
					_Utils_Tuple2('Today', report.today),
					_Utils_Tuple2('Last 7 days', report.last7Days),
					_Utils_Tuple2('Last 30 days', report.last30Days),
					_Utils_Tuple2('Last 90 days', report.last90Days)
				]),
			columns: _List_fromArray(
				[
					{
					cell: function (_v0) {
						var label = _v0.a;
						return $author$project$Main$rText(label);
					},
					header: $elm$html$Html$text('Window')
				},
					{
					cell: function (_v1) {
						var count = _v1.b;
						return $author$project$Main$rText(
							$elm$core$String$fromInt(count));
					},
					header: $elm$html$Html$text('New users')
				}
				])
		});
};
var $author$project$Main$viewRevenueTable = function (rows) {
	return $author$project$Main$rTable(
		{
			data: rows,
			columns: _List_fromArray(
				[
					{
					cell: function (row) {
						return $author$project$Main$rText(row.category);
					},
					header: $elm$html$Html$text('Category')
				},
					{
					cell: function (row) {
						return $author$project$Main$rText(
							$elm$core$String$fromInt(row.orders));
					},
					header: $elm$html$Html$text('Orders')
				},
					{
					cell: function (row) {
						return $author$project$Main$rText(
							$elm$core$String$fromInt(row.units));
					},
					header: $elm$html$Html$text('Units')
				},
					{
					cell: function (row) {
						return $author$project$Main$rText(
							$author$project$Main$money(row.revenueCents));
					},
					header: $elm$html$Html$text('Revenue')
				}
				])
		});
};
var $author$project$Main$viewReports = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('panel')
			]),
		_List_fromArray(
			[
				$author$project$Main$rHeading('New users'),
				A2($author$project$Main$viewRemote, model.signups, $author$project$Main$viewSignupTable),
				$author$project$Main$rHeading('Low stock'),
				A2($author$project$Main$viewRemote, model.lowStock, $author$project$Main$viewStockTable),
				$author$project$Main$rHeading('Revenue by category'),
				A2($author$project$Main$viewRemote, model.revenue, $author$project$Main$viewRevenueTable)
			]));
};
var $author$project$Radix$Blue = {$: 'Blue'};
var $author$project$Radix$Amber = {$: 'Amber'};
var $author$project$Main$statusColor = function (status) {
	switch (status) {
		case 'paid':
			return $author$project$Radix$Green;
		case 'shipped':
			return $author$project$Radix$Blue;
		case 'cancelled':
			return $author$project$Radix$Red;
		default:
			return $author$project$Radix$Amber;
	}
};
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$TimeAgo$fixed = F2(
	function (n, unit) {
		return $elm$core$String$fromInt(n) + (' ' + (unit + ' ago'));
	});
var $author$project$TimeAgo$suffix = function (n) {
	return (n === 1) ? '' : 's';
};
var $author$project$TimeAgo$plural = F2(
	function (n, unit) {
		return $elm$core$String$fromInt(n) + (' ' + (unit + ($author$project$TimeAgo$suffix(n) + ' ago')));
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $author$project$TimeAgo$fromPosix = F2(
	function (now, then_) {
		var ms = $elm$time$Time$posixToMillis(now) - $elm$time$Time$posixToMillis(then_);
		if (ms < 1000) {
			return 'just now';
		} else {
			var seconds = (ms / 1000) | 0;
			if (seconds < 60) {
				return A2($author$project$TimeAgo$fixed, seconds, 'sec');
			} else {
				var minutes = (seconds / 60) | 0;
				if (minutes < 60) {
					return A2($author$project$TimeAgo$fixed, minutes, 'min');
				} else {
					var hours = (minutes / 60) | 0;
					if (hours < 24) {
						return A2($author$project$TimeAgo$fixed, hours, 'hr');
					} else {
						var days = (hours / 24) | 0;
						return (days < 7) ? A2($author$project$TimeAgo$plural, days, 'day') : ((days < 30) ? A2($author$project$TimeAgo$plural, (days / 7) | 0, 'week') : ((days < 365) ? A2($author$project$TimeAgo$plural, (days / 30) | 0, 'month') : A2($author$project$TimeAgo$plural, (days / 365) | 0, 'yr')));
					}
				}
			}
		}
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm$core$String$trim = _String_trim;
var $elm$core$String$toInt = _String_toInt;
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$TimeAgo$daysFromCivil = F3(
	function (y, m, d) {
		var doy = (((((153 * ((m > 2) ? (m - 3) : (m + 9))) + 2) / 5) | 0) + d) - 1;
		var y2 = (m <= 2) ? (y - 1) : y;
		var era = (((y2 >= 0) ? y2 : (y2 - 399)) / 400) | 0;
		var yoe = y2 - (era * 400);
		var doe = (((yoe * 365) + ((yoe / 4) | 0)) - ((yoe / 100) | 0)) + doy;
		return ((era * 146097) + doe) - 719468;
	});
var $author$project$TimeAgo$parseDate = function (date) {
	var parts = A2($elm$core$String$split, '-', date);
	var _v0 = _Utils_Tuple2(
		$elm$core$List$length(parts),
		A2($elm$core$List$filterMap, $elm$core$String$toInt, parts));
	if (((((_v0.a === 3) && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && (!_v0.b.b.b.b.b)) {
		var _v1 = _v0.b;
		var y = _v1.a;
		var _v2 = _v1.b;
		var mo = _v2.a;
		var _v3 = _v2.b;
		var d = _v3.a;
		return $elm$core$Maybe$Just(
			A3($author$project$TimeAgo$daysFromCivil, y, mo, d));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$TimeAgo$parseClock = function (clock) {
	var parts = A2($elm$core$String$split, ':', clock);
	var _v0 = _Utils_Tuple2(
		$elm$core$List$length(parts),
		A2($elm$core$List$filterMap, $elm$core$String$toInt, parts));
	if (((((_v0.a === 3) && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && (!_v0.b.b.b.b.b)) {
		var _v1 = _v0.b;
		var h = _v1.a;
		var _v2 = _v1.b;
		var m = _v2.a;
		var _v3 = _v2.b;
		var s = _v3.a;
		return $elm$core$Maybe$Just(
			_Utils_Tuple3(h, m, s));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$TimeAgo$parseTimestamp = function (stamp) {
	var _v0 = A2(
		$elm$core$String$split,
		' ',
		$elm$core$String$trim(stamp));
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var date = _v0.a;
		var _v1 = _v0.b;
		var clock = _v1.a;
		return A3(
			$elm$core$Maybe$map2,
			F2(
				function (days, _v2) {
					var h = _v2.a;
					var m = _v2.b;
					var s = _v2.c;
					return $elm$time$Time$millisToPosix(((((days * 86400) + (h * 3600)) + (m * 60)) + s) * 1000);
				}),
			$author$project$TimeAgo$parseDate(date),
			$author$project$TimeAgo$parseClock(clock));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$TimeAgo$fromTimestamp = F2(
	function (now, stamp) {
		var _v0 = $author$project$TimeAgo$parseTimestamp(stamp);
		if (_v0.$ === 'Just') {
			var then_ = _v0.a;
			return A2($author$project$TimeAgo$fromPosix, now, then_);
		} else {
			return stamp;
		}
	});
var $author$project$Main$orderTimeText = F2(
	function (model, order) {
		return A2($elm$core$Set$member, order.id, model.expandedTimes) ? order.placedAt : A2($author$project$TimeAgo$fromTimestamp, model.now, order.placedAt);
	});
var $author$project$Main$ToggleOrderTime = function (a) {
	return {$: 'ToggleOrderTime', a: a};
};
var $author$project$Main$orderItemColumns = _List_fromArray(
	[
		{
		cell: function (item) {
			return $author$project$Main$rText(item.name);
		},
		header: $elm$html$Html$text('Item')
	},
		{
		cell: function (item) {
			return $author$project$Main$rText(
				$elm$core$String$fromInt(item.quantity));
		},
		header: $elm$html$Html$text('Qty')
	},
		{
		cell: function (item) {
			return $author$project$Main$rText(
				$author$project$Main$money(item.unitPriceCents));
		},
		header: $elm$html$Html$text('Unit')
	},
		{
		cell: function (item) {
			return $author$project$Main$rText(
				$author$project$Main$money(item.unitPriceCents * item.quantity));
		},
		header: $elm$html$Html$text('Subtotal')
	}
	]);
var $author$project$Radix$Text$withCustomClassList = F2(
	function (customClassList, _v0) {
		var config = _v0.a;
		return $author$project$Radix$Text$Config(
			_Utils_update(
				config,
				{customClassList: customClassList}));
	});
var $author$project$Radix$Text$withCustomAttributes = F2(
	function (customAttributes, _v0) {
		var config = _v0.a;
		return $author$project$Radix$Text$Config(
			_Utils_update(
				config,
				{customAttributes: customAttributes}));
	});
var $author$project$Main$viewOrderCard = F2(
	function (model, order) {
		return $author$project$Radix$Card$view(
			$author$project$Radix$Card$new(
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('order-head')
							]),
						_List_fromArray(
							[
								$author$project$Main$rStrong(
								'Order #' + $elm$core$String$fromInt(order.id)),
								A2(
								$author$project$Main$rBadge,
								$author$project$Main$statusColor(order.status),
								order.status),
								$author$project$Radix$Text$view(
								A2(
									$author$project$Radix$Text$withCustomAttributes,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$ToggleOrderTime(order.id))
										]),
									A2(
										$author$project$Radix$Text$withCustomClassList,
										_List_fromArray(
											[
												_Utils_Tuple2('time-toggle', true)
											]),
										A2(
											$author$project$Radix$Text$withColor,
											$author$project$Radix$Gray,
											$author$project$Radix$Text$new(
												_List_fromArray(
													[
														$elm$html$Html$text(
														A2($author$project$Main$orderTimeText, model, order))
													]))))))
							])),
						$author$project$Main$rTable(
						{data: order.items, columns: $author$project$Main$orderItemColumns}),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('order-total')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								'Total: ' + $author$project$Main$money(order.totalCents))
							]))
					])));
	});
var $author$project$Main$viewOrdersList = F2(
	function (model, orders) {
		return $elm$core$List$isEmpty(orders) ? $author$project$Main$rMuted('You have not placed any orders yet.') : A2(
			$elm$html$Html$div,
			_List_Nil,
			A2(
				$elm$core$List$map,
				$author$project$Main$viewOrderCard(model),
				orders));
	});
var $author$project$Main$viewMyOrders = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('panel')
			]),
		_List_fromArray(
			[
				$author$project$Main$rHeading('My orders'),
				A2(
				$author$project$Main$viewRemote,
				model.orders,
				$author$project$Main$viewOrdersList(model))
			]));
};
var $author$project$Main$statusOption = F2(
	function (current, status) {
		return A2(
			$elm$html$Html$option,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value(status),
					$elm$html$Html$Attributes$selected(
					_Utils_eq(current, status))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(status)
				]));
	});
var $author$project$Main$SetOrderStatus = F2(
	function (a, b) {
		return {$: 'SetOrderStatus', a: a, b: b};
	});
var $author$project$Main$statusSelect = function (order) {
	return A2(
		$elm$html$Html$select,
		_List_fromArray(
			[
				$elm$html$Html$Events$onInput(
				$author$project$Main$SetOrderStatus(order.id))
			]),
		A2(
			$elm$core$List$map,
			$author$project$Main$statusOption(order.status),
			_List_fromArray(
				['pending', 'paid', 'shipped', 'cancelled'])));
};
var $author$project$Main$adminOrderColumns = _List_fromArray(
	[
		{
		cell: function (order) {
			return $author$project$Main$rText(
				$elm$core$String$fromInt(order.id));
		},
		header: $elm$html$Html$text('Order')
	},
		{
		cell: function (order) {
			return $author$project$Main$rText(order.customerName + (' (' + (order.customerEmail + ')')));
		},
		header: $elm$html$Html$text('Customer')
	},
		{
		cell: function (order) {
			return $author$project$Main$rText(
				$author$project$Main$money(order.totalCents));
		},
		header: $elm$html$Html$text('Total')
	},
		{
		cell: function (order) {
			return $author$project$Main$rText(order.placedAt);
		},
		header: $elm$html$Html$text('Placed')
	},
		{
		cell: function (order) {
			return $author$project$Main$statusSelect(order);
		},
		header: $elm$html$Html$text('Status')
	}
	]);
var $author$project$Main$viewAdminOrderTable = function (orders) {
	return $author$project$Main$rTable(
		{data: orders, columns: $author$project$Main$adminOrderColumns});
};
var $author$project$Main$viewAdminOrders = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('panel')
			]),
		_List_fromArray(
			[
				$author$project$Main$rHeading('All orders'),
				A2($author$project$Main$viewRemote, model.adminOrders, $author$project$Main$viewAdminOrderTable)
			]));
};
var $author$project$Main$NoOp = {$: 'NoOp'};
var $author$project$Main$modalClick = A2(
	$elm$html$Html$Events$stopPropagationOn,
	'click',
	$elm$json$Json$Decode$succeed(
		_Utils_Tuple2($author$project$Main$NoOp, true)));
var $author$project$Main$CloseProduct = {$: 'CloseProduct'};
var $author$project$Radix$Text$asDiv = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$Text$Config(
		_Utils_update(
			config,
			{node: 'div'}));
};
var $author$project$Main$isGuest = function (model) {
	var _v0 = model.session;
	if (_v0.$ === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Main$AddToCart = function (a) {
	return {$: 'AddToCart', a: a};
};
var $author$project$Main$SetCartQty = function (a) {
	return {$: 'SetCartQty', a: a};
};
var $author$project$Main$rTextBlock = function (s) {
	return $author$project$Radix$Text$view(
		$author$project$Radix$Text$asDiv(
			$author$project$Radix$Text$new(
				_List_fromArray(
					[
						$elm$html$Html$text(s)
					]))));
};
var $author$project$Main$rMutedBlock = function (s) {
	return $author$project$Radix$Text$view(
		$author$project$Radix$Text$asDiv(
			A2(
				$author$project$Radix$Text$withColor,
				$author$project$Radix$Gray,
				$author$project$Radix$Text$new(
					_List_fromArray(
						[
							$elm$html$Html$text(s)
						])))));
};
var $author$project$Main$viewProductDetail = F2(
	function (model, product) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('product-image product-image-lg'),
							$elm$html$Html$Attributes$src(
							$author$project$Main$imageUrl(product.image)),
							$elm$html$Html$Attributes$alt(product.name)
						]),
					_List_Nil),
					$author$project$Main$rHeading(product.name),
					$author$project$Main$rMutedBlock(product.sku),
					$author$project$Main$rTextBlock('Category: ' + product.category),
					$author$project$Radix$Text$view(
					$author$project$Radix$Text$asDiv(
						A2(
							$author$project$Radix$Text$withWeight,
							$author$project$Radix$Text$Bold,
							$author$project$Radix$Text$new(
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Price: ' + $author$project$Main$money(product.priceCents))
									]))))),
					$author$project$Main$rTextBlock(
					'In stock: ' + $elm$core$String$fromInt(product.stock)),
					$author$project$Main$isCustomer(model) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('add-row')
						]),
					_List_fromArray(
						[
							$author$project$Main$rInput(
							{
								label: 'Qty',
								value: $elm$core$String$fromInt(model.cartQty),
								onInput: $author$project$Main$SetCartQty,
								inputType: 'number',
								isDisabled: false
							}),
							A2(
							$author$project$Main$rPrimary,
							$author$project$Main$AddToCart(product),
							'Add to cart')
						])) : ($author$project$Main$isGuest(model) ? $author$project$Main$rMuted('Sign in or register to add to cart.') : $elm$html$Html$text('')),
					$elm$core$String$isEmpty(product.description) ? $elm$html$Html$text('') : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('product-description')
						]),
					_List_fromArray(
						[
							$author$project$Main$rTextBlock(product.description)
						]))
				]));
	});
var $author$project$Main$viewProductModal = function (model) {
	var _v0 = model.selected;
	if (_v0.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		var remote = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('modal-backdrop'),
					$elm$html$Html$Events$onClick($author$project$Main$CloseProduct)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal'),
							$author$project$Main$modalClick
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-close')
								]),
							_List_fromArray(
								[
									A2($author$project$Main$rGhost, $author$project$Main$CloseProduct, '×')
								])),
							A2(
							$author$project$Main$viewRemote,
							remote,
							$author$project$Main$viewProductDetail(model))
						]))
				]));
	}
};
var $author$project$Main$NewProduct = {$: 'NewProduct'};
var $author$project$Main$EditProduct = function (a) {
	return {$: 'EditProduct', a: a};
};
var $author$project$Main$RequestDeleteProduct = function (a) {
	return {$: 'RequestDeleteProduct', a: a};
};
var $author$project$Main$adminProductColumns = _List_fromArray(
	[
		{
		cell: function (product) {
			return $author$project$Main$rText(product.sku);
		},
		header: $elm$html$Html$text('SKU')
	},
		{
		cell: function (product) {
			return $author$project$Main$rText(product.name);
		},
		header: $elm$html$Html$text('Name')
	},
		{
		cell: function (product) {
			return $author$project$Main$rText(product.category);
		},
		header: $elm$html$Html$text('Category')
	},
		{
		cell: function (product) {
			return $author$project$Main$rText(
				$author$project$Main$money(product.priceCents));
		},
		header: $elm$html$Html$text('Price')
	},
		{
		cell: function (product) {
			return $author$project$Main$rText(
				$elm$core$String$fromInt(product.stock));
		},
		header: $elm$html$Html$text('Stock')
	},
		{
		cell: function (product) {
			return $author$project$Main$rText(
				(!(!product.active)) ? 'yes' : 'no');
		},
		header: $elm$html$Html$text('Active')
	},
		{
		cell: function (product) {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$author$project$Main$rGhost,
						$author$project$Main$EditProduct(product),
						'Edit'),
						A2(
						$author$project$Main$rGhost,
						$author$project$Main$RequestDeleteProduct(product),
						'Delete')
					]));
		},
		header: $elm$html$Html$text('')
	}
	]);
var $author$project$Main$viewAdminProductTable = function (products) {
	return $author$project$Main$rTable(
		{data: products, columns: $author$project$Main$adminProductColumns});
};
var $author$project$Main$viewAdminProducts = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('panel')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('panel-head')
					]),
				_List_fromArray(
					[
						$author$project$Main$rHeading('Products'),
						A2($author$project$Main$rPrimary, $author$project$Main$NewProduct, 'New product')
					])),
				A2($author$project$Main$viewRemote, model.adminProducts, $author$project$Main$viewAdminProductTable)
			]));
};
var $author$project$Radix$Button$withAccentColor = F2(
	function (color, _v0) {
		var config = _v0.a;
		return $author$project$Radix$Button$Config(
			_Utils_update(
				config,
				{
					accentColor: $elm$core$Maybe$Just(color)
				}));
	});
var $author$project$Main$rDanger = F2(
	function (onClick_, label) {
		return $author$project$Radix$Button$view(
			A2(
				$author$project$Radix$Button$withAccentColor,
				$author$project$Radix$Red,
				$author$project$Radix$Button$new(
					{
						content: _List_fromArray(
							[
								$elm$html$Html$text(label)
							]),
						onClick: onClick_
					})));
	});
var $author$project$Main$CancelDelete = {$: 'CancelDelete'};
var $author$project$Main$ConfirmDelete = {$: 'ConfirmDelete'};
var $author$project$Main$deleteMessage = function (request) {
	if (request.$ === 'DeleteProductRequest') {
		var product = request.a;
		return 'Delete product \u0022' + (product.name + ('\u0022 (' + (product.sku + ')? This cannot be undone.')));
	} else {
		var customer = request.a;
		return 'Delete customer \u0022' + (customer.fullName + '\u0022? This cannot be undone.');
	}
};
var $author$project$Main$viewConfirmDelete = function (model) {
	var _v0 = model.deleteRequest;
	if (_v0.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		var request = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('modal-backdrop'),
					$elm$html$Html$Events$onClick($author$project$Main$CancelDelete)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal'),
							$author$project$Main$modalClick
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-close')
								]),
							_List_fromArray(
								[
									A2($author$project$Main$rGhost, $author$project$Main$CancelDelete, '×')
								])),
							$author$project$Main$rHeading('Confirm delete'),
							$author$project$Main$rTextBlock(
							$author$project$Main$deleteMessage(request)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-actions')
								]),
							_List_fromArray(
								[
									A2($author$project$Main$rDanger, $author$project$Main$ConfirmDelete, 'Delete'),
									A2($author$project$Main$rGhost, $author$project$Main$CancelDelete, 'Cancel')
								]))
						]))
				]));
	}
};
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $elm$html$Html$Attributes$accept = $elm$html$Html$Attributes$stringProperty('accept');
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$file$File$decoder = _File_decoder;
var $author$project$Main$labeled = F2(
	function (label, content) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('stack')
				]),
			_List_fromArray(
				[
					$author$project$Main$rMuted(label),
					content
				]));
	});
var $author$project$Radix$TextArea$None = {$: 'None'};
var $author$project$Radix$TextArea$Size2 = {$: 'Size2'};
var $author$project$Radix$TextArea$Config = function (a) {
	return {$: 'Config', a: a};
};
var $author$project$Radix$TextArea$Surface = {$: 'Surface'};
var $author$project$Radix$TextArea$new = function (options) {
	return $author$project$Radix$TextArea$Config(
		{size: $author$project$Radix$TextArea$Size2, color: $elm$core$Maybe$Nothing, value: options.value, radius: $elm$core$Maybe$Nothing, resize: $author$project$Radix$TextArea$None, onInput: options.onInput, variant: $author$project$Radix$TextArea$Surface, customStyles: _List_Nil, customClassList: _List_Nil, customAttributes: _List_Nil});
};
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $author$project$Radix$TextArea$resizeToCss = function (resize) {
	return 'rt-r-resize-' + function () {
		switch (resize.$) {
			case 'None':
				return 'none';
			case 'Vertical':
				return 'vertical';
			case 'Horizontal':
				return 'horizontal';
			default:
				return 'both';
		}
	}();
};
var $author$project$Radix$TextArea$sizeToClass = function (size) {
	return 'rt-r-size-' + function () {
		switch (size.$) {
			case 'Size1':
				return '1';
			case 'Size2':
				return '2';
			default:
				return '3';
		}
	}();
};
var $author$project$Radix$TextArea$variantToCss = function (variant) {
	return 'rt-variant-' + function () {
		switch (variant.$) {
			case 'Classic':
				return 'classic';
			case 'Surface':
				return 'surface';
			default:
				return 'soft';
		}
	}();
};
var $author$project$Radix$TextArea$view = function (_v0) {
	var config = _v0.a;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('rt-TextAreaRoot', true),
						_Utils_Tuple2(
						$author$project$Radix$TextArea$sizeToClass(config.size),
						true),
						_Utils_Tuple2(
						$author$project$Radix$TextArea$variantToCss(config.variant),
						true),
						_Utils_Tuple2(
						$author$project$Radix$TextArea$resizeToCss(config.resize),
						true)
					])),
				A2(
				$author$project$Radix$Internal$attributeMaybe,
				function (radius) {
					return A2(
						$elm$html$Html$Attributes$attribute,
						'data-radius',
						$author$project$Radix$radiusToString(radius));
				},
				config.radius)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$textarea,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$classList(
							_Utils_ap(
								_List_fromArray(
									[
										_Utils_Tuple2('rt-reset', true),
										_Utils_Tuple2('rt-TextAreaInput', true)
									]),
								config.customClassList)),
							$elm$html$Html$Attributes$value(config.value),
							$elm$html$Html$Events$onInput(config.onInput),
							$author$project$Radix$styles(config.customStyles)
						]),
					config.customAttributes),
				_List_Nil)
			]));
};
var $author$project$Radix$TextArea$Vertical = {$: 'Vertical'};
var $author$project$Radix$TextArea$withResizeVertical = function (_v0) {
	var config = _v0.a;
	return $author$project$Radix$TextArea$Config(
		_Utils_update(
			config,
			{resize: $author$project$Radix$TextArea$Vertical}));
};
var $author$project$Radix$TextArea$withCustomAttributes = F2(
	function (customAttributes, _v0) {
		var config = _v0.a;
		return $author$project$Radix$TextArea$Config(
			_Utils_update(
				config,
				{customAttributes: customAttributes}));
	});
var $author$project$Main$rTextarea = function (options) {
	return $author$project$Radix$TextArea$view(
		A2(
			$author$project$Radix$TextArea$withCustomAttributes,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$placeholder(options.label),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', options.label)
				]),
			$author$project$Radix$TextArea$withResizeVertical(
				$author$project$Radix$TextArea$new(
					{value: options.value, onInput: options.onInput}))));
};
var $author$project$Main$CancelProduct = {$: 'CancelProduct'};
var $author$project$Main$SelectedImage = function (a) {
	return {$: 'SelectedImage', a: a};
};
var $author$project$Main$SubmitProduct = {$: 'SubmitProduct'};
var $author$project$Main$SetProductField = F2(
	function (a, b) {
		return {$: 'SetProductField', a: a, b: b};
	});
var $author$project$Main$SetProductActive = function (a) {
	return {$: 'SetProductActive', a: a};
};
var $author$project$Main$viewProductEditor = function (model) {
	var _v0 = model.productDraft;
	if (_v0.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		var draft = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('modal-backdrop'),
					$elm$html$Html$Events$onClick($author$project$Main$CancelProduct)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal'),
							$author$project$Main$modalClick
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-close')
								]),
							_List_fromArray(
								[
									A2($author$project$Main$rGhost, $author$project$Main$CancelProduct, '×')
								])),
							$author$project$Main$rHeading(
							draft.isNew ? 'New product' : 'Edit product'),
							A2(
							$author$project$Main$labeled,
							'SKU',
							$author$project$Main$rInput(
								{
									label: 'SKU',
									value: draft.sku,
									onInput: $author$project$Main$SetProductField('sku'),
									inputType: 'text',
									isDisabled: !draft.isNew
								})),
							A2(
							$author$project$Main$labeled,
							'Name',
							$author$project$Main$rInput(
								{
									label: 'Name',
									value: draft.name,
									onInput: $author$project$Main$SetProductField('name'),
									inputType: 'text',
									isDisabled: false
								})),
							A2(
							$author$project$Main$labeled,
							'Category',
							A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Events$onInput(
										$author$project$Main$SetProductField('category'))
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('coffee'),
												$elm$html$Html$Attributes$selected(draft.category === 'coffee')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('coffee')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('tea'),
												$elm$html$Html$Attributes$selected(draft.category === 'tea')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('tea')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('accessory'),
												$elm$html$Html$Attributes$selected(draft.category === 'accessory')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('accessory')
											]))
									]))),
							A2(
							$author$project$Main$labeled,
							'Price (cents)',
							$author$project$Main$rInput(
								{
									label: 'Price',
									value: draft.price,
									onInput: $author$project$Main$SetProductField('price'),
									inputType: 'number',
									isDisabled: false
								})),
							A2(
							$author$project$Main$labeled,
							'Stock',
							$author$project$Main$rInput(
								{
									label: 'Stock',
									value: draft.stock,
									onInput: $author$project$Main$SetProductField('stock'),
									inputType: 'number',
									isDisabled: false
								})),
							A2(
							$author$project$Main$labeled,
							'Reorder level',
							$author$project$Main$rInput(
								{
									label: 'Reorder level',
									value: draft.reorder,
									onInput: $author$project$Main$SetProductField('reorder'),
									inputType: 'number',
									isDisabled: false
								})),
							A2(
							$author$project$Main$labeled,
							'Image',
							$author$project$Main$rInput(
								{
									label: 'Image',
									value: draft.image,
									onInput: $author$project$Main$SetProductField('image'),
									inputType: 'text',
									isDisabled: false
								})),
							A2(
							$author$project$Main$labeled,
							'Description',
							$author$project$Main$rTextarea(
								{
									label: 'Description',
									value: draft.description,
									onInput: $author$project$Main$SetProductField('description')
								})),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('uploader')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$img,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('product-image'),
											$elm$html$Html$Attributes$src(
											$author$project$Main$imageUrl(draft.image)),
											$elm$html$Html$Attributes$alt(draft.name)
										]),
									_List_Nil),
									A2(
									$elm$html$Html$input,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('file'),
											$elm$html$Html$Attributes$accept('image/*,image/svg+xml'),
											A2(
											$elm$html$Html$Events$on,
											'change',
											A2(
												$elm$json$Json$Decode$map,
												$author$project$Main$SelectedImage,
												A2(
													$elm$json$Json$Decode$at,
													_List_fromArray(
														['target', 'files']),
													A2($elm$json$Json$Decode$index, 0, $elm$file$File$decoder))))
										]),
									_List_Nil),
									model.imageUploading ? $author$project$Main$rMuted('Uploading…') : $elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('checkbox-row'),
									$elm$html$Html$Events$onClick(
									$author$project$Main$SetProductActive(!draft.active))
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$input,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$type_('checkbox'),
											$elm$html$Html$Attributes$checked(draft.active),
											A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
											A2($elm$html$Html$Attributes$attribute, 'tabindex', '-1')
										]),
									_List_Nil),
									$elm$html$Html$text('Active')
								])),
							function () {
							var _v1 = model.productError;
							if (_v1.$ === 'Just') {
								var message = _v1.a;
								return $author$project$Main$rAlert(message);
							} else {
								return $elm$html$Html$text('');
							}
						}(),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-actions')
								]),
							_List_fromArray(
								[
									A2($author$project$Main$rPrimary, $author$project$Main$SubmitProduct, 'Save'),
									A2($author$project$Main$rGhost, $author$project$Main$CancelProduct, 'Cancel')
								]))
						]))
				]));
	}
};
var $author$project$Main$EditCustomer = function (a) {
	return {$: 'EditCustomer', a: a};
};
var $author$project$Main$RequestDeleteCustomer = function (a) {
	return {$: 'RequestDeleteCustomer', a: a};
};
var $author$project$Main$adminCustomerColumns = _List_fromArray(
	[
		{
		cell: function (customer) {
			return $author$project$Main$rText(
				$elm$core$String$fromInt(customer.id));
		},
		header: $elm$html$Html$text('ID')
	},
		{
		cell: function (customer) {
			return $author$project$Main$rText(customer.fullName);
		},
		header: $elm$html$Html$text('Name')
	},
		{
		cell: function (customer) {
			return $author$project$Main$rText(customer.email);
		},
		header: $elm$html$Html$text('Email')
	},
		{
		cell: function (customer) {
			return $author$project$Main$rText(customer.country);
		},
		header: $elm$html$Html$text('Country')
	},
		{
		cell: function (customer) {
			return $author$project$Main$rText(
				$author$project$Main$roleLabel(customer.role));
		},
		header: $elm$html$Html$text('Role')
	},
		{
		cell: function (customer) {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$author$project$Main$rGhost,
						$author$project$Main$EditCustomer(customer),
						'Edit'),
						A2(
						$author$project$Main$rGhost,
						$author$project$Main$RequestDeleteCustomer(customer),
						'Delete')
					]));
		},
		header: $elm$html$Html$text('')
	}
	]);
var $author$project$Main$viewAdminCustomerTable = function (customers) {
	return $author$project$Main$rTable(
		{data: customers, columns: $author$project$Main$adminCustomerColumns});
};
var $author$project$Main$viewAdminCustomers = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('panel')
			]),
		_List_fromArray(
			[
				$author$project$Main$rHeading('Customers'),
				A2($author$project$Main$viewRemote, model.adminCustomers, $author$project$Main$viewAdminCustomerTable)
			]));
};
var $author$project$Main$CancelCustomer = {$: 'CancelCustomer'};
var $author$project$Main$SubmitCustomer = {$: 'SubmitCustomer'};
var $author$project$Main$SetCustomerRole = function (a) {
	return {$: 'SetCustomerRole', a: a};
};
var $author$project$Main$SetCustomerField = F2(
	function (a, b) {
		return {$: 'SetCustomerField', a: a, b: b};
	});
var $author$project$Main$viewCustomerEditor = function (model) {
	var _v0 = model.customerDraft;
	if (_v0.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		var draft = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('modal-backdrop'),
					$elm$html$Html$Events$onClick($author$project$Main$CancelCustomer)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal'),
							$author$project$Main$modalClick
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-close')
								]),
							_List_fromArray(
								[
									A2($author$project$Main$rGhost, $author$project$Main$CancelCustomer, '×')
								])),
							$author$project$Main$rHeading(
							'Edit customer #' + $elm$core$String$fromInt(draft.id)),
							A2(
							$author$project$Main$labeled,
							'Full name',
							$author$project$Main$rInput(
								{
									label: 'Full name',
									value: draft.fullName,
									onInput: $author$project$Main$SetCustomerField('name'),
									inputType: 'text',
									isDisabled: false
								})),
							A2(
							$author$project$Main$labeled,
							'Role',
							A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Events$onInput(
										function (v) {
											return $author$project$Main$SetCustomerRole(v === 'admin');
										})
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('customer'),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(draft.role, $author$project$Types$CustomerRole))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('customer')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('admin'),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(draft.role, $author$project$Types$AdminRole))
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('admin')
											]))
									]))),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-actions')
								]),
							_List_fromArray(
								[
									A2($author$project$Main$rPrimary, $author$project$Main$SubmitCustomer, 'Save'),
									A2($author$project$Main$rGhost, $author$project$Main$CancelCustomer, 'Cancel')
								]))
						]))
				]));
	}
};
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('app')
			]),
		_List_fromArray(
			[
				$author$project$Main$viewHeader(model),
				$author$project$Main$viewTabs(model),
				function () {
				var _v0 = model.tab;
				switch (_v0.$) {
					case 'Catalog':
						return $author$project$Main$viewCatalog(model);
					case 'MyOrders':
						return $author$project$Main$viewMyOrders(model);
					case 'AdminProducts':
						return $author$project$Main$viewAdminProducts(model);
					case 'AdminOrders':
						return $author$project$Main$viewAdminOrders(model);
					case 'AdminCustomers':
						return $author$project$Main$viewAdminCustomers(model);
					default:
						return $author$project$Main$viewReports(model);
				}
			}(),
				$author$project$Main$viewProductModal(model),
				$author$project$Main$viewProductEditor(model),
				$author$project$Main$viewCustomerEditor(model),
				$author$project$Main$viewConfirmDelete(model)
			]));
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {taggers: taggers, processes: processes};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$file$File$size = _File_size;
var $author$project$Api$authDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (token, user) {
			return _Utils_update(
				user,
				{token: token});
		}),
	A2($elm$json$Json$Decode$field, 'token', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'user', $author$project$Api$sessionDecoder));
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Api$encodeCredentials = F3(
	function (email, password, name) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'email',
					$elm$json$Json$Encode$string(email)),
					_Utils_Tuple2(
					'password',
					$elm$json$Json$Encode$string(password)),
					_Utils_Tuple2(
					'full_name',
					$elm$json$Json$Encode$string(name))
				]));
	});
var $author$project$Api$login = F2(
	function (creds, toMsg) {
		return A6(
			$author$project$Api$request,
			'POST',
			'/auth/login',
			_List_Nil,
			$elm$core$Maybe$Just(
				A3($author$project$Api$encodeCredentials, creds.email, creds.password, '')),
			$author$project$Api$authDecoder,
			toMsg);
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$remove, key, dict));
	});
var $author$project$Types$Failure = function (a) {
	return {$: 'Failure', a: a};
};
var $author$project$Main$GotAuth = function (a) {
	return {$: 'GotAuth', a: a};
};
var $author$project$Types$Success = function (a) {
	return {$: 'Success', a: a};
};
var $author$project$Main$GotOrder = function (a) {
	return {$: 'GotOrder', a: a};
};
var $author$project$Api$register = F2(
	function (creds, toMsg) {
		return A6(
			$author$project$Api$request,
			'POST',
			'/auth/register',
			_List_Nil,
			$elm$core$Maybe$Just(
				A3($author$project$Api$encodeCredentials, creds.email, creds.password, creds.name)),
			$author$project$Api$authDecoder,
			toMsg);
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$Main$addToCart = F3(
	function (product, quantity, cart) {
		return A2(
			$elm$core$List$any,
			function (item) {
				return _Utils_eq(item.sku, product.sku);
			},
			cart) ? A2(
			$elm$core$List$map,
			function (item) {
				return _Utils_eq(item.sku, product.sku) ? _Utils_update(
					item,
					{quantity: item.quantity + quantity}) : item;
			},
			cart) : _Utils_ap(
			cart,
			_List_fromArray(
				[
					{sku: product.sku, name: product.name, quantity: quantity, priceCents: product.priceCents}
				]));
	});
var $author$project$Main$withToken = F2(
	function (model, toCmd) {
		var _v0 = model.session;
		if (_v0.$ === 'Just') {
			var session = _v0.a;
			return toCmd(session.token);
		} else {
			return $elm$core$Platform$Cmd$none;
		}
	});
var $author$project$Main$GotProduct = function (a) {
	return {$: 'GotProduct', a: a};
};
var $author$project$Main$emptyDraft = {sku: '', name: '', image: '', isNew: true, price: '0', stock: '0', active: true, reorder: '10', category: 'coffee', description: ''};
var $author$project$Api$getProduct = F2(
	function (sku, toMsg) {
		return A6(
			$author$project$Api$request,
			'GET',
			'/store/products/' + $elm$url$Url$percentEncode(sku),
			_List_Nil,
			$elm$core$Maybe$Nothing,
			$author$project$Api$productDecoder,
			toMsg);
	});
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$Api$encodeOrder = function (lines) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'items',
				A2(
					$elm$json$Json$Encode$list,
					function (line) {
						return $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'sku',
									$elm$json$Json$Encode$string(line.sku)),
									_Utils_Tuple2(
									'quantity',
									$elm$json$Json$Encode$int(line.quantity))
								]));
					},
					lines))
			]));
};
var $author$project$Api$placeOrder = F3(
	function (token, lines, toMsg) {
		return A6(
			$author$project$Api$request,
			'POST',
			'/my/orders',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Just(
				$author$project$Api$encodeOrder(lines)),
			$author$project$Api$orderDecoder,
			toMsg);
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $elm$core$Maybe$destruct = F3(
	function (_default, func, maybe) {
		if (maybe.$ === 'Just') {
			var a = maybe.a;
			return func(a);
		} else {
			return _default;
		}
	});
var $author$project$Main$storeCart = _Platform_outgoingPort(
	'storeCart',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'cart',
					function ($) {
						return A3($elm$core$Maybe$destruct, $elm$json$Json$Encode$null, $elm$json$Json$Encode$string, $);
					}($.cart)),
					_Utils_Tuple2(
					'userId',
					$elm$json$Json$Encode$int($.userId))
				]));
	});
var $author$project$Api$encodeCart = function (cart) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		A2(
			$elm$json$Json$Encode$list,
			function (item) {
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'sku',
							$elm$json$Json$Encode$string(item.sku)),
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string(item.name)),
							_Utils_Tuple2(
							'price_cents',
							$elm$json$Json$Encode$int(item.priceCents)),
							_Utils_Tuple2(
							'quantity',
							$elm$json$Json$Encode$int(item.quantity))
						]));
			},
			cart));
};
var $author$project$Main$persistCart = F2(
	function (model, cart) {
		var _v0 = model.session;
		if (_v0.$ === 'Just') {
			var session = _v0.a;
			return $author$project$Main$storeCart(
				{
					cart: $elm$core$Maybe$Just(
						$author$project$Api$encodeCart(cart)),
					userId: session.id
				});
		} else {
			return $elm$core$Platform$Cmd$none;
		}
	});
var $author$project$Main$requestCart = _Platform_outgoingPort('requestCart', $elm$json$Json$Encode$int);
var $elm$http$Http$filePart = _Http_pair;
var $elm$http$Http$multipartBody = function (parts) {
	return A2(
		_Http_pair,
		'',
		_Http_toFormData(parts));
};
var $author$project$Api$uploadDecoder = A2($elm$json$Json$Decode$field, 'image', $elm$json$Json$Decode$string);
var $author$project$Api$uploadImage = F3(
	function (token, file, toMsg) {
		return $elm$http$Http$request(
			{
				url: $author$project$Api$baseUrl + '/admin/uploads',
				body: $elm$http$Http$multipartBody(
					_List_fromArray(
						[
							A2($elm$http$Http$filePart, 'file', file)
						])),
				expect: A2($elm$http$Http$expectJson, toMsg, $author$project$Api$uploadDecoder),
				method: 'POST',
				headers: $author$project$Api$authHeader(token),
				timeout: $elm$core$Maybe$Just(60000),
				tracker: $elm$core$Maybe$Nothing
			});
	});
var $author$project$Main$draftToInput = function (draft) {
	if (($elm$core$String$trim(draft.name) === '') || ($elm$core$String$trim(draft.category) === '')) {
		return $elm$core$Result$Err('Name and category are required.');
	} else {
		if (draft.isNew && ($elm$core$String$trim(draft.sku) === '')) {
			return $elm$core$Result$Err('SKU is required for a new product.');
		} else {
			var _v0 = _Utils_Tuple3(
				$elm$core$String$toInt(
					$elm$core$String$trim(draft.price)),
				$elm$core$String$toInt(
					$elm$core$String$trim(draft.stock)),
				$elm$core$String$toInt(
					$elm$core$String$trim(draft.reorder)));
			if (((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) && (_v0.c.$ === 'Just')) {
				var price = _v0.a.a;
				var stock = _v0.b.a;
				var reorder = _v0.c.a;
				return ((price < 0) || ((stock < 0) || (reorder < 0))) ? $elm$core$Result$Err('Price, stock and reorder level cannot be negative.') : $elm$core$Result$Ok(
					{
						sku: $elm$core$String$trim(draft.sku),
						name: $elm$core$String$trim(draft.name),
						image: $elm$core$String$trim(draft.image),
						stock: stock,
						active: draft.active,
						category: $elm$core$String$trim(draft.category),
						priceCents: price,
						description: $elm$core$String$trim(draft.description),
						reorderLevel: reorder
					});
			} else {
				return $elm$core$Result$Err('Price, stock and reorder level must be whole numbers.');
			}
		}
	}
};
var $author$project$Main$roleFromBool = function (isAdmin) {
	return isAdmin ? $author$project$Types$AdminRole : $author$project$Types$CustomerRole;
};
var $author$project$Main$storeSession = _Platform_outgoingPort(
	'storeSession',
	function ($) {
		return A3($elm$core$Maybe$destruct, $elm$json$Json$Encode$null, $elm$json$Json$Encode$string, $);
	});
var $author$project$Api$boolToInt = function (value) {
	return value ? 1 : 0;
};
var $author$project$Api$encodeProduct = function (product) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'sku',
				$elm$json$Json$Encode$string(product.sku)),
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(product.name)),
				_Utils_Tuple2(
				'category',
				$elm$json$Json$Encode$string(product.category)),
				_Utils_Tuple2(
				'price_cents',
				$elm$json$Json$Encode$int(product.priceCents)),
				_Utils_Tuple2(
				'stock',
				$elm$json$Json$Encode$int(product.stock)),
				_Utils_Tuple2(
				'reorder_level',
				$elm$json$Json$Encode$int(product.reorderLevel)),
				_Utils_Tuple2(
				'active',
				$elm$json$Json$Encode$int(
					$author$project$Api$boolToInt(product.active))),
				_Utils_Tuple2(
				'image',
				$elm$json$Json$Encode$string(product.image)),
				_Utils_Tuple2(
				'description',
				$elm$json$Json$Encode$string(product.description))
			]));
};
var $author$project$Api$createProduct = F3(
	function (token, product, toMsg) {
		return A6(
			$author$project$Api$request,
			'POST',
			'/admin/products',
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Just(
				$author$project$Api$encodeProduct(product)),
			$author$project$Api$productDecoder,
			toMsg);
	});
var $author$project$Api$deleteProduct = F3(
	function (token, sku, toMsg) {
		return A6(
			$author$project$Api$request,
			'DELETE',
			'/admin/products/' + $elm$url$Url$percentEncode(sku),
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			A2($elm$json$Json$Decode$field, 'deleted', $elm$json$Json$Decode$string),
			toMsg);
	});
var $author$project$Api$roleEncode = function (role) {
	if (role.$ === 'AdminRole') {
		return 'admin';
	} else {
		return 'customer';
	}
};
var $author$project$Api$encodeSession = function (session) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'token',
					$elm$json$Json$Encode$string(session.token)),
					_Utils_Tuple2(
					'id',
					$elm$json$Json$Encode$int(session.id)),
					_Utils_Tuple2(
					'email',
					$elm$json$Json$Encode$string(session.email)),
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(session.name)),
					_Utils_Tuple2(
					'role',
					$elm$json$Json$Encode$string(
						$author$project$Api$roleEncode(session.role)))
				])));
};
var $author$project$Api$updateProduct = F3(
	function (token, product, toMsg) {
		return A6(
			$author$project$Api$request,
			'PUT',
			'/admin/products/' + $elm$url$Url$percentEncode(product.sku),
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Just(
				$author$project$Api$encodeProduct(product)),
			$author$project$Api$productDecoder,
			toMsg);
	});
var $author$project$Api$deleteCustomer = F3(
	function (token, id, toMsg) {
		return A6(
			$author$project$Api$request,
			'DELETE',
			'/admin/customers/' + $elm$core$String$fromInt(id),
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Nothing,
			A2($elm$json$Json$Decode$field, 'deleted', $elm$json$Json$Decode$int),
			toMsg);
	});
var $author$project$Api$encodeCustomer = function (customer) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'full_name',
				$elm$json$Json$Encode$string(customer.fullName)),
				_Utils_Tuple2(
				'country',
				$elm$json$Json$Encode$string(customer.country)),
				_Utils_Tuple2(
				'role',
				$elm$json$Json$Encode$string(
					$author$project$Api$roleEncode(customer.role)))
			]));
};
var $author$project$Api$updateCustomer = F4(
	function (token, id, customer, toMsg) {
		return A6(
			$author$project$Api$request,
			'PUT',
			'/admin/customers/' + $elm$core$String$fromInt(id),
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Just(
				$author$project$Api$encodeCustomer(customer)),
			$author$project$Api$customerDecoder,
			toMsg);
	});
var $author$project$Main$GotSavedProduct = function (a) {
	return {$: 'GotSavedProduct', a: a};
};
var $author$project$Main$GotUpdatedOrder = function (a) {
	return {$: 'GotUpdatedOrder', a: a};
};
var $author$project$Main$setProductField = F3(
	function (field, raw, draft) {
		switch (field) {
			case 'sku':
				return _Utils_update(
					draft,
					{sku: raw});
			case 'name':
				return _Utils_update(
					draft,
					{name: raw});
			case 'category':
				return _Utils_update(
					draft,
					{category: raw});
			case 'price':
				return _Utils_update(
					draft,
					{price: raw});
			case 'stock':
				return _Utils_update(
					draft,
					{stock: raw});
			case 'reorder':
				return _Utils_update(
					draft,
					{reorder: raw});
			case 'image':
				return _Utils_update(
					draft,
					{image: raw});
			case 'description':
				return _Utils_update(
					draft,
					{description: raw});
			default:
				return draft;
		}
	});
var $author$project$Main$GotSavedCustomer = function (a) {
	return {$: 'GotSavedCustomer', a: a};
};
var $author$project$Main$GotUploadedImage = function (a) {
	return {$: 'GotUploadedImage', a: a};
};
var $author$project$Main$draftFromProduct = function (product) {
	return {
		sku: product.sku,
		name: product.name,
		image: product.image,
		isNew: false,
		price: $elm$core$String$fromInt(product.priceCents),
		stock: $elm$core$String$fromInt(product.stock),
		active: !(!product.active),
		reorder: $elm$core$String$fromInt(product.reorderLevel),
		category: product.category,
		description: product.description
	};
};
var $author$project$Main$setCustomerField = F3(
	function (field, raw, draft) {
		if (field === 'name') {
			return _Utils_update(
				draft,
				{fullName: raw});
		} else {
			return draft;
		}
	});
var $author$project$Main$GotDeletedProduct = function (a) {
	return {$: 'GotDeletedProduct', a: a};
};
var $author$project$Main$httpErrorToString = function (err) {
	switch (err.$) {
		case 'BadUrl':
			var u = err.a;
			return 'Bad URL: ' + u;
		case 'Timeout':
			return 'Request timed out.';
		case 'NetworkError':
			return 'Network error. Is the API server running?';
		case 'BadStatus':
			var code = err.a;
			return 'Server returned HTTP ' + ($elm$core$String$fromInt(code) + '.');
		default:
			var body = err.a;
			return 'Unexpected response: ' + body;
	}
};
var $author$project$Api$updateOrderStatus = F4(
	function (token, orderId, status, toMsg) {
		return A6(
			$author$project$Api$request,
			'PUT',
			'/admin/orders/' + $elm$core$String$fromInt(orderId),
			$author$project$Api$authHeader(token),
			$elm$core$Maybe$Just(
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'status',
							$elm$json$Json$Encode$string(status))
						]))),
			$author$project$Api$orderDecoder,
			toMsg);
	});
var $author$project$Main$GotDeletedCustomer = function (a) {
	return {$: 'GotDeletedCustomer', a: a};
};
var $author$project$Main$DeleteProductRequest = function (a) {
	return {$: 'DeleteProductRequest', a: a};
};
var $author$project$Main$DeleteCustomerRequest = function (a) {
	return {$: 'DeleteCustomerRequest', a: a};
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'SetAuthMode':
				var mode = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{authMode: mode, authError: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SetAuthEmail':
				var value_ = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{authEmail: value_}),
					$elm$core$Platform$Cmd$none);
			case 'SetAuthPassword':
				var value_ = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{authPassword: value_}),
					$elm$core$Platform$Cmd$none);
			case 'SetAuthName':
				var value_ = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{authName: value_}),
					$elm$core$Platform$Cmd$none);
			case 'SubmitAuth':
				var email = $elm$core$String$trim(model.authEmail);
				return ($elm$core$String$isEmpty(email) || $elm$core$String$isEmpty(model.authPassword)) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							authError: $elm$core$Maybe$Just('Email and password are required.')
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{authBusy: true, authError: $elm$core$Maybe$Nothing}),
					function () {
						var _v1 = model.authMode;
						if (_v1.$ === 'SignInMode') {
							return A2(
								$author$project$Api$login,
								{email: email, password: model.authPassword},
								$author$project$Main$GotAuth);
						} else {
							return A2(
								$author$project$Api$register,
								{
									name: $elm$core$String$trim(model.authName),
									email: email,
									password: model.authPassword
								},
								$author$project$Main$GotAuth);
						}
					}());
			case 'GotAuth':
				if (msg.a.$ === 'Ok') {
					var session = msg.a.a;
					var next = _Utils_update(
						model,
						{
							tab: $author$project$Main$defaultTab(session.role),
							cart: _List_Nil,
							orders: $author$project$Types$Idle,
							revenue: $author$project$Types$Idle,
							session: $elm$core$Maybe$Just(session),
							signups: $author$project$Types$Idle,
							authBusy: false,
							authError: $elm$core$Maybe$Nothing,
							adminOrders: $author$project$Types$Idle,
							authPassword: '',
							adminProducts: $author$project$Types$Idle,
							adminCustomers: $author$project$Types$Idle
						});
					return _Utils_Tuple2(
						next,
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$loadForSession(session),
									$author$project$Main$storeSession(
									$elm$core$Maybe$Just(
										$author$project$Api$encodeSession(session))),
									$author$project$Main$requestCart(session.id)
								])));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								authBusy: false,
								authError: $elm$core$Maybe$Just(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotSessionValidated':
				if (msg.a.$ === 'Ok') {
					var user = msg.a.a;
					var _v2 = model.session;
					if (_v2.$ === 'Just') {
						var session = _v2.a;
						var validated = _Utils_update(
							user,
							{token: session.token});
						var next = _Utils_update(
							model,
							{
								tab: $author$project$Main$defaultTab(validated.role),
								session: $elm$core$Maybe$Just(validated)
							});
						return _Utils_Tuple2(
							next,
							$author$project$Main$storeSession(
								$elm$core$Maybe$Just(
									$author$project$Api$encodeSession(validated))));
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{tab: $author$project$Types$Catalog, cart: _List_Nil, session: $elm$core$Maybe$Nothing}),
						$author$project$Main$storeSession($elm$core$Maybe$Nothing));
				}
			case 'SignOut':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{tab: $author$project$Types$Catalog, cart: _List_Nil, orders: $author$project$Types$Idle, revenue: $author$project$Types$Idle, session: $elm$core$Maybe$Nothing, signups: $author$project$Types$Idle, authMode: $author$project$Main$SignInMode, authEmail: '', adminOrders: $author$project$Types$Idle, orderNotice: $elm$core$Maybe$Nothing, authPassword: '', adminProducts: $author$project$Types$Idle, adminCustomers: $author$project$Types$Idle}),
					$author$project$Main$storeSession($elm$core$Maybe$Nothing));
			case 'SelectTab':
				var tab = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{tab: tab}),
					$elm$core$Platform$Cmd$none);
			case 'SetCategory':
				var category = msg.a;
				var next = _Utils_update(
					model,
					{page: 0, category: category, products: $author$project$Types$Loading});
				return _Utils_Tuple2(
					next,
					$author$project$Main$fetchProducts(next));
			case 'NextPage':
				var next = _Utils_update(
					model,
					{page: model.page + 1, products: $author$project$Types$Loading});
				return _Utils_Tuple2(
					next,
					$author$project$Main$fetchProducts(next));
			case 'PrevPage':
				var next = _Utils_update(
					model,
					{
						page: A2($elm$core$Basics$max, 0, model.page - 1),
						products: $author$project$Types$Loading
					});
				return _Utils_Tuple2(
					next,
					$author$project$Main$fetchProducts(next));
			case 'OpenProduct':
				var sku = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cartQty: 1,
							selected: $elm$core$Maybe$Just($author$project$Types$Loading)
						}),
					A2($author$project$Api$getProduct, sku, $author$project$Main$GotProduct));
			case 'CloseProduct':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selected: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'GotProducts':
				if (msg.a.$ === 'Ok') {
					var page = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								products: $author$project$Types$Success(page)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								products: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotProduct':
				if (msg.a.$ === 'Ok') {
					var product = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selected: $elm$core$Maybe$Just(
									$author$project$Types$Success(product))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selected: $elm$core$Maybe$Just(
									$author$project$Types$Failure(
										$author$project$Main$httpErrorToString(err)))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'SetCartQty':
				var raw = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cartQty: A2(
								$elm$core$Maybe$withDefault,
								1,
								$elm$core$String$toInt(raw))
						}),
					$elm$core$Platform$Cmd$none);
			case 'AddToCart':
				var product = msg.a;
				var qty = A2($elm$core$Basics$max, 1, model.cartQty);
				var cart = A3($author$project$Main$addToCart, product, qty, model.cart);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cart: cart,
							cartQty: 1,
							selected: $elm$core$Maybe$Nothing,
							orderNotice: $elm$core$Maybe$Just('Added item to cart')
						}),
					A2($author$project$Main$persistCart, model, cart));
			case 'RemoveCart':
				var sku = msg.a;
				var cart = A2(
					$elm$core$List$filter,
					function (item) {
						return !_Utils_eq(item.sku, sku);
					},
					model.cart);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cart: cart}),
					A2($author$project$Main$persistCart, model, cart));
			case 'PlaceOrder':
				var _v3 = model.session;
				if (_v3.$ === 'Just') {
					var session = _v3.a;
					return $elm$core$List$isEmpty(model.cart) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{orderNotice: $elm$core$Maybe$Nothing}),
						A3(
							$author$project$Api$placeOrder,
							session.token,
							A2(
								$elm$core$List$map,
								function (item) {
									return {sku: item.sku, quantity: item.quantity};
								},
								model.cart),
							$author$project$Main$GotOrder));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'GotOrder':
				if (msg.a.$ === 'Ok') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								tab: $author$project$Types$MyOrders,
								cart: _List_Nil,
								products: $author$project$Types$Loading,
								orderNotice: $elm$core$Maybe$Just('Order placed!')
							}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$fetchProducts(model),
									A2(
									$author$project$Main$withToken,
									model,
									function (t) {
										return A2($author$project$Api$myOrders, t, $author$project$Main$GotMyOrders);
									}),
									A2($author$project$Main$persistCart, model, _List_Nil)
								])));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								orderNotice: $elm$core$Maybe$Just(
									'Could not place order: ' + $author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'ReceiveCart':
				var raw = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cart: A2(
								$elm$core$Maybe$withDefault,
								_List_Nil,
								A2(
									$elm$core$Maybe$andThen,
									function (json) {
										return $elm$core$Result$toMaybe(
											A2($elm$json$Json$Decode$decodeString, $author$project$Api$cartDecoder, json));
									},
									raw))
						}),
					$elm$core$Platform$Cmd$none);
			case 'GotMyOrders':
				if (msg.a.$ === 'Ok') {
					var orders = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								orders: $author$project$Types$Success(orders)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								orders: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotLowStock':
				if (msg.a.$ === 'Ok') {
					var rows = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								lowStock: $author$project$Types$Success(rows)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								lowStock: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotAdminProducts':
				if (msg.a.$ === 'Ok') {
					var list = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminProducts: $author$project$Types$Success(list)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminProducts: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotAdminOrders':
				if (msg.a.$ === 'Ok') {
					var list = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminOrders: $author$project$Types$Success(list)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminOrders: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotAdminCustomers':
				if (msg.a.$ === 'Ok') {
					var list = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminCustomers: $author$project$Types$Success(list)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminCustomers: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotRevenue':
				if (msg.a.$ === 'Ok') {
					var rows = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								revenue: $author$project$Types$Success(rows)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								revenue: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotSignups':
				if (msg.a.$ === 'Ok') {
					var report = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								signups: $author$project$Types$Success(report)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								signups: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'NewProduct':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							productDraft: $elm$core$Maybe$Just($author$project$Main$emptyDraft),
							productError: $elm$core$Maybe$Nothing,
							imageUploading: false
						}),
					$elm$core$Platform$Cmd$none);
			case 'EditProduct':
				var product = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							productDraft: $elm$core$Maybe$Just(
								$author$project$Main$draftFromProduct(product)),
							productError: $elm$core$Maybe$Nothing,
							imageUploading: false
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetProductField':
				var field = msg.a;
				var raw = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							productDraft: A2(
								$elm$core$Maybe$map,
								A2($author$project$Main$setProductField, field, raw),
								model.productDraft)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetProductActive':
				var active = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							productDraft: A2(
								$elm$core$Maybe$map,
								function (draft) {
									return _Utils_update(
										draft,
										{active: active});
								},
								model.productDraft)
						}),
					$elm$core$Platform$Cmd$none);
			case 'CancelProduct':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{productDraft: $elm$core$Maybe$Nothing, productError: $elm$core$Maybe$Nothing, imageUploading: false}),
					$elm$core$Platform$Cmd$none);
			case 'SubmitProduct':
				var _v4 = model.productDraft;
				if (_v4.$ === 'Nothing') {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var draft = _v4.a;
					var _v5 = $author$project$Main$draftToInput(draft);
					if (_v5.$ === 'Err') {
						var message = _v5.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									productError: $elm$core$Maybe$Just(message)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var input = _v5.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{productError: $elm$core$Maybe$Nothing}),
							A2(
								$author$project$Main$withToken,
								model,
								function (token) {
									return draft.isNew ? A3($author$project$Api$createProduct, token, input, $author$project$Main$GotSavedProduct) : A3($author$project$Api$updateProduct, token, input, $author$project$Main$GotSavedProduct);
								}));
					}
				}
			case 'GotSavedProduct':
				if (msg.a.$ === 'Ok') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{productDraft: $elm$core$Maybe$Nothing, adminProducts: $author$project$Types$Loading, imageUploading: false}),
						A2(
							$author$project$Main$withToken,
							model,
							function (t) {
								return A2($author$project$Api$adminProducts, t, $author$project$Main$GotAdminProducts);
							}));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								productError: $elm$core$Maybe$Just(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'SelectedImage':
				var file = msg.a;
				return (_Utils_cmp(
					$elm$file$File$size(file),
					(5 * 1024) * 1024) > 0) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							productError: $elm$core$Maybe$Just('Image must be 5 MB or smaller.')
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{productError: $elm$core$Maybe$Nothing, imageUploading: true}),
					A2(
						$author$project$Main$withToken,
						model,
						function (token) {
							return A3($author$project$Api$uploadImage, token, file, $author$project$Main$GotUploadedImage);
						}));
			case 'GotUploadedImage':
				if (msg.a.$ === 'Ok') {
					var image = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								productDraft: A2(
									$elm$core$Maybe$map,
									function (draft) {
										return _Utils_update(
											draft,
											{image: image});
									},
									model.productDraft),
								imageUploading: false
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								productError: $elm$core$Maybe$Just(
									$author$project$Main$httpErrorToString(err)),
								imageUploading: false
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'RequestDeleteProduct':
				var product = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							deleteRequest: $elm$core$Maybe$Just(
								$author$project$Main$DeleteProductRequest(product))
						}),
					$elm$core$Platform$Cmd$none);
			case 'GotDeletedProduct':
				if (msg.a.$ === 'Ok') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{adminProducts: $author$project$Types$Loading}),
						A2(
							$author$project$Main$withToken,
							model,
							function (t) {
								return A2($author$project$Api$adminProducts, t, $author$project$Main$GotAdminProducts);
							}));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminProducts: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'SetOrderStatus':
				var orderId = msg.a;
				var status = msg.b;
				return _Utils_Tuple2(
					model,
					A2(
						$author$project$Main$withToken,
						model,
						function (t) {
							return A4($author$project$Api$updateOrderStatus, t, orderId, status, $author$project$Main$GotUpdatedOrder);
						}));
			case 'GotUpdatedOrder':
				if (msg.a.$ === 'Ok') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{adminOrders: $author$project$Types$Loading}),
						A2(
							$author$project$Main$withToken,
							model,
							function (t) {
								return A2($author$project$Api$adminOrders, t, $author$project$Main$GotAdminOrders);
							}));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminOrders: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'EditCustomer':
				var customer = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							customerDraft: $elm$core$Maybe$Just(
								{id: customer.id, role: customer.role, country: customer.country, fullName: customer.fullName})
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetCustomerField':
				var field = msg.a;
				var raw = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							customerDraft: A2(
								$elm$core$Maybe$map,
								A2($author$project$Main$setCustomerField, field, raw),
								model.customerDraft)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetCustomerRole':
				var isAdmin = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							customerDraft: A2(
								$elm$core$Maybe$map,
								function (draft) {
									return _Utils_update(
										draft,
										{
											role: $author$project$Main$roleFromBool(isAdmin)
										});
								},
								model.customerDraft)
						}),
					$elm$core$Platform$Cmd$none);
			case 'CancelCustomer':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{customerDraft: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'SubmitCustomer':
				var _v6 = model.customerDraft;
				if (_v6.$ === 'Just') {
					var draft = _v6.a;
					return _Utils_Tuple2(
						model,
						A2(
							$author$project$Main$withToken,
							model,
							function (token) {
								return A4(
									$author$project$Api$updateCustomer,
									token,
									draft.id,
									{
										role: draft.role,
										country: $elm$core$String$trim(draft.country),
										fullName: $elm$core$String$trim(draft.fullName)
									},
									$author$project$Main$GotSavedCustomer);
							}));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'GotSavedCustomer':
				if (msg.a.$ === 'Ok') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{customerDraft: $elm$core$Maybe$Nothing, adminCustomers: $author$project$Types$Loading}),
						A2(
							$author$project$Main$withToken,
							model,
							function (t) {
								return A2($author$project$Api$adminCustomers, t, $author$project$Main$GotAdminCustomers);
							}));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminCustomers: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'RequestDeleteCustomer':
				var customer = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							deleteRequest: $elm$core$Maybe$Just(
								$author$project$Main$DeleteCustomerRequest(customer))
						}),
					$elm$core$Platform$Cmd$none);
			case 'ConfirmDelete':
				var _v7 = model.deleteRequest;
				if (_v7.$ === 'Just') {
					if (_v7.a.$ === 'DeleteProductRequest') {
						var product = _v7.a.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{deleteRequest: $elm$core$Maybe$Nothing}),
							A2(
								$author$project$Main$withToken,
								model,
								function (t) {
									return A3($author$project$Api$deleteProduct, t, product.sku, $author$project$Main$GotDeletedProduct);
								}));
					} else {
						var customer = _v7.a.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{deleteRequest: $elm$core$Maybe$Nothing}),
							A2(
								$author$project$Main$withToken,
								model,
								function (t) {
									return A3($author$project$Api$deleteCustomer, t, customer.id, $author$project$Main$GotDeletedCustomer);
								}));
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'CancelDelete':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{deleteRequest: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'GotDeletedCustomer':
				if (msg.a.$ === 'Ok') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{adminCustomers: $author$project$Types$Loading}),
						A2(
							$author$project$Main$withToken,
							model,
							function (t) {
								return A2($author$project$Api$adminCustomers, t, $author$project$Main$GotAdminCustomers);
							}));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								adminCustomers: $author$project$Types$Failure(
									$author$project$Main$httpErrorToString(err))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'TimeTick':
				var now = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{now: now}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleOrderTime':
				var orderId = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							expandedTimes: A2($elm$core$Set$member, orderId, model.expandedTimes) ? A2($elm$core$Set$remove, orderId, model.expandedTimes) : A2($elm$core$Set$insert, orderId, model.expandedTimes)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {host: host, path: path, port_: port_, query: query, fragment: fragment, protocol: protocol};
	});
var $elm$core$String$contains = _String_contains;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$ReceiveCart = function (a) {
	return {$: 'ReceiveCart', a: a};
};
var $author$project$Main$receiveCart = _Platform_incomingPort(
	'receiveCart',
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
			])));
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: $author$project$Main$init,
		view: $author$project$Main$view,
		update: $author$project$Main$update,
		subscriptions: function (_v0) {
			return $elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						$author$project$Main$receiveCart($author$project$Main$ReceiveCart),
						A2($elm$time$Time$every, 1000, $author$project$Main$TimeTick)
					]));
		}
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (session) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (cart) {
					return $elm$json$Json$Decode$succeed(
						{cart: cart, session: session});
				},
				A2(
					$elm$json$Json$Decode$field,
					'cart',
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
								A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
							]))));
		},
		A2(
			$elm$json$Json$Decode$field,
			'session',
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
						A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
					])))))(0)}});}(this));