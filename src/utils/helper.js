const isDuplicate = (arrayList, value) => {
  if (arrayList.includes(value.toLowerCase())) {
    return true;
  }
  return false;
};

export default {
  isDuplicate,
};
