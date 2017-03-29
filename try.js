"use strict";

// Copyright 2017 Sean McAfee

// This file is part of conkeror-util.

// conkeror-util is free software: you can redistribute it and/or
// modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// conkeror-util is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with conkeror-util.  If not, see
// <http://www.gnu.org/licenses/>.

//  An implementation of a Try wrapper.

function Try(func, ...args) {
    try {
        return Success(func(...args));
    } catch (e) {
        return Failure(e);
    }
}

function Success(value) {
    const obj = {
        map: f => Try(f, value),
        flatMap: f => { try { return f(value) } catch (e) { return Failure(e) } },
        foreach: f => (f(value), obj),
        filter: f => obj.flatMap(v => f(v) ? obj : Failure("predicate failed")),
        toString: () => "Success(" + value + ")",
        get isSuccess() { return true }
    };
    return obj;
}

function Failure(value) {
    const obj = {
        map: _ => obj,
        flatMap: _ => obj,
        foreach: _ => obj,
        filter: _ => obj,
        toString: () => "Failure(" + value + ")",
        get isSuccess() { return false }
    };
    return obj;
}
