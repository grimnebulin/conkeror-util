# SUMMARY

This is a small group of utility routines that don't seem to fit in
well with any other Conkeror module.

# Submodules

## Maybe

A simple implementation of the well-known Maybe monad.  The
constructor function, `maybe`, returns a `None` object if its argument
is either `null` or `undefined`, and a `Some` object otherwise.

In the documentation that follows, `maybe` is either a `Some` or a
`None` object, and `value` is the value wrapped by `maybe` if it is a
`Some`.

- `maybe.map(f)`

Returns `maybe` if `maybe` is a `None`.  Otherwise, calls `f` with
`value` as the argument, and returns the result of passing the result
of that function to the `Maybe` constructor.

- `maybe.foreach(f)`

If `maybe` is a `Some`, calls `f` with `value` as its argument.
Otherwise, does nothing.  Returns `maybe` in either case.

- `maybe.orElse(f)`

If `maybe` is a None, calls `f` with no arguments and returns its
result.  Otherwise, returns `maybe`.  Typically, `f` would return
another `Maybe`.

- `maybe.getOrElse(v)`

If `maybe` is a `Some`, returns `value`; otherwise returns `v`.

- `maybe.empty`

Returns `true` if `maybe` is a `None`, `false` otherwise.

- `maybe.nonempty`

Returns `true` is `maybe` is a `Some`, `false` otherwise.

Note that `empty` and `nonempty` are attributes, not functions.

## WebRequest

This is a thin wrapper around Conkeror's `XMLHttpRequest` interface
which can be used outside of any web page.  It's pretty clunky, but
it's still better than using `XMLHttpRequest` in the raw.

Example:

    new WebRequest(url, callback, "document")
      .async(true)
      .withHeader("Referer", "No one")
      .start();
      

### Constructor

    new WebRequest(url, callback, responseType)
    
Returns a new `WebRequest` object which will dispatch to the given URL
when its `start` method is called and the request returns.  The
request's response will be passed to the `callback` function at that
time.  `responseType` is an optional argument that describes the
desired reponse type.  The default is `"text"`, but `"document"` may
be useful sometimes as well.
    
### Methods

- `request.async(flag)`

Sets the request's asynchronous attribute.  If unset, defaults to
`true`.  Returns `request`.

- `request.withHeader(name, value)`

Adds an HTTP header `name` to the request with `value` as its value.
Returns `request`.

- `request.responseType(type)`

Sets the response type of the request and returns `request`.

- `request.start()`

Initiates the request.

## Page Modes

The function `setup_mode` is provided to eliminate some of the
boilerplate involved in writing a new Conkeror
[page mode](http://conkeror.org/PageModes).

    let [enable, disable] = setup_mode(modality, classes);
    
`setup_mode` returns a pair of functions which can be provided as the
third and fourth arguments to Conkeror's `define_page_mode` function.

The `enable` function pushes `modality` onto the current buffer's
`content_modalities` attribute, and also adds all of the key-value
pairs from `classes` into the buffer's
`default_browser_object_classes` attribute.  The `disable` function
undoes the actions performed by the `enable` function.
