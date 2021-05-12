export class utils {
  public static NotNullOrWhiteSpace(x: string | null | undefined): x is string | null | undefined {
    return x !== undefined && x !== null && x.trim() !== '';
  }
}
