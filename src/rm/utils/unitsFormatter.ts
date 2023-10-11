export const proportion = 1024;

export function unitsFormatter(bytes: number): string {
  const megaBytes = bytes / (proportion * proportion);

  if (megaBytes < proportion) {
    return `${megaBytes.toFixed(2)}MB`;
  }

  const gigaBytes = megaBytes / proportion;
  return `${gigaBytes.toFixed(2)}GB`;
}
