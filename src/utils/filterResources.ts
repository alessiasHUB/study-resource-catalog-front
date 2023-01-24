import { IResourceData } from "./interfaces";

export const filterResources = (
  searchInput: string,
  resourcesData: IResourceData[]
): IResourceData[] => {
  const lowerCaseInput = searchInput.toLowerCase();
  return resourcesData.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerCaseInput) ||
      resource.description.toLowerCase().includes(lowerCaseInput)
  );
};
