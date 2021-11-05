/**
 * Picks a random value out of an array
 * @param {Array[any]} array
 * @returns any
 */
function getRandomArrayValue(array) {
  const min = 0;
  const max = array.length;
  const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
  const value = array[randomIndex];

  return value || getRandomArrayValue(array);
}

module.exports = {
  getRandomArrayValue,
};
