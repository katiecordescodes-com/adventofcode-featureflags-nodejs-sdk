/// <reference lib="dom" />
import { FeatureFlagServiceInterface } from './FeatureFlagServiceInterface';

export class FeatureFlagService implements FeatureFlagServiceInterface {

  constructor(private readonly baseUrl: string) {}

  async isFeatureFlagEnabled(id: string): Promise<boolean | null> {
    const response = await fetch(`${this.baseUrl}/v1/featureflags/${id}/enabled`);
    const body = await response.json();

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error getting feature flag enabled status: ${JSON.stringify(body.error)}`);
    }

    return body.data;
  }
}