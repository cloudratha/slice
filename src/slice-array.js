import Slice from './slice';


class SliceArray extends Array {
  constructor(...args) {
    super(...args);

    // Helper method that constructs either a `get` or `set` trap.
    const constructTrap = action => (target, name, value) => {
      const key = (name || '').toString()
        // Remove all whitespace.
        .replace(/\s/g, '')
        // Replace commas with colons.
        .replace(/,/g, ':');

      // Handle negative indices.
      if (/^-\d+$/.test(key)) {
        return Reflect[action](target, this.length + parseInt(key, 10), value);
      }

      // Handle slices.
      if (/^(-?\d+)?(:(-?\d+)?(:(-?\d+)?)?)$/.test(key)) {
        const [start, stop, step] = key.split(':').map(part => (
          part.length ? part : undefined
        ));
        const slice = new Slice(start, stop, step);
        return slice[action](target, value);
      }

      // Fall back to the array's own properties.
      return Reflect[action](target, name, value);
    };

    return new Proxy(this, {
      get: constructTrap('get'),
      set: constructTrap('set'),
    });
  }
}

// A little bit of a hack to allow both `new SliceArray()` and `SliceArray()`.
function constructSliceArray(...args) {
  return new SliceArray(...args);
}
constructSliceArray.__proto__ = SliceArray.__proto__;
constructSliceArray.prototype = SliceArray.prototype;


export default constructSliceArray;
