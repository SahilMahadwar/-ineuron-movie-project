export function convertRuntimeToHours(runtime) {
  let hours = Math.floor((runtime % 3600) / 60);
  let minutes = runtime % 60;

  return hours + "h " + minutes + "m";
}
