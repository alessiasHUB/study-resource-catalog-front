import { IStudyListData } from "./interfaces";

function checkForResourceInStudyList(
  resource_id: number,
  studyListArr: IStudyListData[]
): boolean {
  for (const resource of studyListArr) {
    if (resource.resource_id === resource_id) {
      return true;
    }
  }
  return false;
}

export default checkForResourceInStudyList;
