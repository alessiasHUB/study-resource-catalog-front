import { IResourceData, ITypes } from "./interfaces";
import { ResourceType } from "./types";

//selectedTypes = object of all possible types with true (checked) or false (no checked) values
//checkedTypes = an array created from selectedTypes that only contains the names of types who's values were set to true
export const filterResources = (
  searchInput: string,
  selectedTypes: ITypes,
  resourcesData: IResourceData[]
): IResourceData[] => {
  //Filter by search
  const lowerCaseInput = searchInput.toLowerCase();
  const filteredBySearch = resourcesData.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerCaseInput) ||
      resource.description.toLowerCase().includes(lowerCaseInput)
  );

  //Find all the 'types' that the user has selected
  const checkedTypes: ResourceType[] = [];

  //Fix Typing!
  for (let key in selectedTypes) {
    if (selectedTypes[key as keyof ITypes] === true) {
      checkedTypes.push(key as keyof ITypes);
    }
  }
  console.log("CHECKED TYPES", checkedTypes);

  //Filter by the 'type' checkbox
  const filteredByTypeCheckbox = filteredBySearch.filter((resource) => {
    if (checkedTypes.length > 0) {
      if (checkedTypes.includes(resource.type as keyof ITypes)) return true;
    } else {
      return true;
    }
  });
  return filteredByTypeCheckbox;
};
