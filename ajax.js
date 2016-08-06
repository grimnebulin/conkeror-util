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

function WebRequest(url, callback, responseType) {
    let async = true;
    let headers = { };
    return {
        async: function (flag) { async = flag; return this },
        withHeader: function (name, value) { headers[name] = value; return this },
        responseType: function (newType) { responseType = newType; return this },
        start: function () {
            const req = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"]
                .createInstance(Ci.nsIXMLHttpRequest);
            req.open("GET", url, async);
            req.responseType = responseType !== undefined ? responseType : "text";
            req.onreadystatechange = function () {
                if (this.readyState == 4) {
                    callback(this.response);
                }
            };
            for (let header in headers) {
                req.setRequestHeader(header, headers[header]);
            }
            req.send(null);
        }
    };
}
