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

function make_descriptors(data) {
    let out = "", err = "";
    const fds = [
        { output: async_binary_string_writer(data || "")  },
        { input:  async_binary_reader(s => out += s || "") },
        { input:  async_binary_reader(s => err += s || "") }
    ];
    return [ fds, () => out, () => err ];
}

Map.prototype.lookup = function (key) {
    if (this.has(key)) {
        return Some(this.get(key));
    } else {
        return None();
    }
};

function DefaultMap(generate, ...content) {
    Map.apply(this, content);
    this.get = function (key) {
        if (this.has(key)) {
            return Map.prototype.get.call(this, key);
        } else {
            const value = generate();
            this.set(key, value);
            return value;
        }
    };
}

DefaultMap.prototype = Map.prototype;

function ArrayMap(...content) {
    DefaultMap.apply(this, [ () => [], ...content ]);
    this.push = function (key, value) {
        this.get(key).push(value);
        return this;
    };
}

ArrayMap.prototype = DefaultMap.prototype;
