"use strict";

// Copyright 2016 Sean McAfee

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

//  An implementation of a Maybe monad.
//
//  The maybe() function returns either a Some object if its argument
//  is anything other than null or undefined, and a None object
//  otherwise.
//
//  Originally based on https://gist.github.com/andyhd/1618403.

function maybe(value) {
    return value !== null && value !== undefined ? Some(value) : None();
}

function Some(value) {
    const obj = {
        map: f => maybe(f(value)),
        foreach: f => (f(value), obj),
        orElse: _ => obj,
        getOrElse: _ => value,
        toString: () => "Some(" + value + ")",
        get empty() { return false },
        get nonempty() { return true }
    };
    return obj;
}

function None() {
    const obj = {
        map: _ => obj,
        foreach: _ => obj,
        orElse: f => f(),
        getOrElse: x => x,
        toString: () => "None",
        get empty() { return true },
        get nonempty() { return false }
    };
    return obj;
}
