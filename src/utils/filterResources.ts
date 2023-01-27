import { IResourceData, ITypes } from "./interfaces";

//selectedTypesArr = an array that only contains the names of types who's values were set to true
export const filterResources = (
  searchInput: string,
  selectedTypesArr: string[],
  selectedTagsArr: string[],
  resourcesData: IResourceData[]
): IResourceData[] => {
  //----------------------------------------------------Filter by search
  const lowerCaseInput = searchInput.toLowerCase();
  const filteredBySearch = resourcesData.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerCaseInput) ||
      resource.description.toLowerCase().includes(lowerCaseInput)
  );

  //-----------------------------------------------------------------------Filter by the 'type' checkbox
  const filteredByTypeCheckbox = filteredBySearch.filter((resource) => {
    if (selectedTypesArr.length > 0) {
      return selectedTypesArr.includes(resource.type) ? true : false;
    } else {
      return true;
    }
  });
  //---------------------------------------------------------------------Filter by the 'tags' checkboxes
  const filteredByTagsCheckbox = filteredByTypeCheckbox.filter((resource) => {
    if (selectedTagsArr.length > 0) {
      for (let tag of resource.tags) {
        return selectedTagsArr.includes(tag) ? true : false;
      }
    }
    return true;
  });
  return filteredByTagsCheckbox;
};
