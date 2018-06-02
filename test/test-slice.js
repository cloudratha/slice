import assert from 'assert';

import { slice, Slice } from '../src/';


describe('Slice', () => {
  it('should not require the new keyword for the slice(start, stop, step) syntax', () => {
    const testSlice = slice(1, 2, 3);
    assert(testSlice.start === 1);
    assert(testSlice.stop === 2);
    assert(testSlice.step === 3);
  });

  it('should handle the Slice(start, stop, step) constructor syntax', () => {
    const testSlice = new Slice(1, 2, 3);
    assert(testSlice.start === 1);
    assert(testSlice.stop === 2);
    assert(testSlice.step === 3);
  });

  it('should handle the Slice(stop) constructor syntax', () => {
    const testSlice = new Slice(1);
    assert(testSlice.start == null);
    assert(testSlice.stop === 1);
  });
});
