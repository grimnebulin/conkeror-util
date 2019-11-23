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

//  This function returns a pair of functions that take care of some
//  of the boilerplate required to define a page mode.  The first
//  function in the returned list is a mode-enable function suitable
//  for passing as the third argument to Conkeror's built-in
//  define_page_mode function, and the second function is a
//  mode-disable function suitable for passing as the fourth argument
//  to define_page_mode.  MODALITY is as per Conkeror's built-in
//  define_page_mode function; the optional CLASSES is a mapping the
//  will be added to the buffer's default_browser_object_classes
//  object in the enable function and removed in the disable function.
//
//  Example of use:
//
//  let [enable, disable] = setup_mode({ normal: foo_keymap });
//  define_page_mode("foo-mode", /foo\.com/, enable, disable);

function setup_mode(modality, classes, on_enable, on_disable) {
    classes = classes || { };

    function enable(buffer) {
        buffer.content_modalities.push(modality);
        for (let key in classes) {
            buffer.default_browser_object_classes[key] = classes[key];
        }
        if (on_enable) on_enable(buffer);
    }

    function disable(buffer) {
        const i = buffer.content_modalities.indexOf(modality);
        if (i >= 0) buffer.content_modalities.splice(i, 1);
        for (let key in classes) {
            delete buffer.default_browser_object_classes[key];
        }
        if (on_disable) on_disable(buffer);
    }

    return [ enable, disable ];

}
