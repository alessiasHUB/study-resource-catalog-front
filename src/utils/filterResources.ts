import { IResourceData, ITypes } from "./interfaces";
import { ResourceType } from "./types";

//allTypesStatusObj = object of all possible types with true (checked) or false (no checked) values
//checkedTypes = an array created from allTypesStatusObjthat only contains the names of types who's values were set to true
export const filterResources = (
  searchInput: string,
  allTypesStatusObj: ITypes,
  selectedTagsArr: string[],
  resourcesData: IResourceData[]
): IResourceData[] => {
  //----------------------------------------------------FIRST: Filter by search
  const lowerCaseInput = searchInput.toLowerCase();
  const filteredBySearch = resourcesData.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerCaseInput) ||
      resource.description.toLowerCase().includes(lowerCaseInput)
  );

  //Find all the 'types' that the user has selected
  const checkedTypes: ResourceType[] = [];

  //Fix Typing!
  for (let key in allTypesStatusObj) {
    //TYS doesn't realise the key is def going to be one of the keys of ITypes
    if (allTypesStatusObj[key as keyof ITypes] === true) {
      checkedTypes.push(key as keyof ITypes);
    }
  }
  //-----------------------------------------------------------------------Filter by the 'type' checkbox
  const filteredByTypeCheckbox = filteredBySearch.filter((resource) => {
    if (checkedTypes.length > 0) {
      return checkedTypes.includes(resource.type as keyof ITypes)
        ? true
        : false;
    } else {
      return true;
    }
  });
  //---------------------------------------------------------------------Filter by tags checkboxes
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
