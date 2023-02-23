/// <reference lib="dom" />
import { FeatureFlagServiceInterface } from './FeatureFlagServiceInterface';

export class FeatureFlagService implements FeatureFlagServiceInterface {
  private readonly baseUrl: string;
  private readonly protocol: string;

  constructor(baseUrl: string = 'featureflags', isSecure: boolean = false) {
    this.baseUrl = baseUrl;
    this.protocol = 'http';
    if (isSecure) {
      this.protocol += 's';
    }
  }

  async isFeatureFlagEnabled(id: string): Promise<boolean | null> {
    const response = await fetch(`${this.protocol}://${this.baseUrl}/v1/featureflags/${id}/enabled`);
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