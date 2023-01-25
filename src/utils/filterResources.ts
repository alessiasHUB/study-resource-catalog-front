import { IResourceData, ITypes } from "./interfaces";
import { ResourceType } from "./types";

//allTypesStatusObj = object of all possible types with true (checked) or false (no checked) values
//checkedTypes = an array created from allTypesStatusObjthat only contains the names of types who's values were set to true
export const filterResources = (
  searchInput: string,
  allTypesStatusObj: ITypes,
  allTagsStatusArr: string[],
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
      if (checkedTypes.includes(resource.type as keyof ITypes)) return true;
    } else {
      return true;
    }
  });
  //---------------------------------------------------------------------Filter by tags checkboxes
  const filteredByTagsCheckbox = filteredByTypeCheckbox.filter((resource) => {
    if (allTagsStatusArr.length > 0) {
      for (let tag of resource.tags) {
        if (allTagsStatusArr.includes(tag)) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  });
  return filteredByTagsCheckbox;
};

//   sample: ['react', 'front-end', 'html']
//1. for each resoruce in resourceData
// 2.  for each tag of single resource tagArr prop
//is this tag included in allTagsStatus Arr? if yes return true
//..........which returns this particular resoruce
