const Sum = list => {
  return list.reduce(function(prev, cur, index, array) {
    return prev + cur;
  });
};

export default Sum;