describe('Function updateArray check', () => {
  describe('Check first index', () => {
    it('function updateArray', () => {
      expect(updateArray([0])).toEqual([false, true, false, false, false, true, false, false, false, false]);
    });
  });
});

describe('Function updateArray check', () => {
  describe('Check last index', () => {
    it('function updateArray', () => {
      expect(updateArray([9])).toEqual([true, true, false, false, false, true, false, false, false, false]);
    });
  });
});
