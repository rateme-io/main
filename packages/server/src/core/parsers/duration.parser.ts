export class DurationParser {
  static parse(duration: string): number {
    if (duration.endsWith('h')) {
      return parseInt(duration.replace('h', '')) * 60;
    }

    if (duration.endsWith('d')) {
      return parseInt(duration.replace('d', '')) * 60 * 24;
    }

    return parseInt(duration);
  }
}
