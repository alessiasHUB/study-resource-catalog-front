export default function dateFormatting(inputDate: Date): string {
  // 2023-01-18T15:50:04.198Z ---> 2023/01/18
  return inputDate.toString().slice(0, 10).split("-").reverse().join("/");
}
