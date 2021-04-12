import * as pagesData from '../data/internet.json';

const getLinksForPageAddress = (pageAddress) => {
  const enteredPage = pagesData.pages.find(
    (obj) => obj.address.toLowerCase() === pageAddress.toLowerCase(),
  );
  if (enteredPage) {
    return enteredPage.links;
  }
  return [];
};

export default {
  getLinksForPageAddress,
};
