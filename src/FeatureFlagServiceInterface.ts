export interface FeatureFlagServiceInterface {
  isFeatureFlagEnabled(id: string): Promise<boolean | null>;
}
