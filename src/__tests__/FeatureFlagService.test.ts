import mockFetch from 'jest-fetch-mock';

import { FeatureFlagService } from '../FeatureFlagService';

afterEach(() => {
  mockFetch.resetMocks();
});

describe('FeatureFlagService', () => {
  describe('isFeatureFlagEnabled', () => {
    it('should return successful with true if the flag is enabled', async () => {
      mockFetch.mockResponseOnce(JSON.stringify({
        data: true,
        error: null,
      }));

      const featureFlagService = new FeatureFlagService('http://featureflags');

      const enabled = featureFlagService.isFeatureFlagEnabled('test_enabled');
      expect(enabled).toBeTruthy();
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('http://featureflags/v1/featureflags/test_enabled/enabled');
    });

    it('should return successful with false if the flag is disabled', async () => {
      mockFetch.mockResponseOnce(JSON.stringify({
        data: false,
        error: null,
      }));

      const featureFlagService = new FeatureFlagService('http://featureflags');

      const enabled = await featureFlagService.isFeatureFlagEnabled('test_disabled');
      expect(enabled).toBeFalsy();
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('http://featureflags/v1/featureflags/test_disabled/enabled');
    });

    it('should return null if the flag doesn\'t exist', async () => {
      mockFetch.mockResponseOnce(JSON.stringify({
        data: null,
        error: {
          message: 'Not found',
        },
      }), { status: 404 });

      const featureFlagService = new FeatureFlagService('http://featureflags');

      const enabled = await featureFlagService.isFeatureFlagEnabled('test_not_found');
      expect(enabled).toBeNull();
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('http://featureflags/v1/featureflags/test_not_found/enabled');
    });

    it('should throw an error if the fetch returns any error response', async () => {
      mockFetch.mockResponseOnce(JSON.stringify({
        data: null,
        error: {
          message: 'Unknown error',
        },
      }), { status: 500 });

      const featureFlagService = new FeatureFlagService('http://featureflags');

      await expect(featureFlagService.isFeatureFlagEnabled('test_not_found')).rejects.toThrow(new Error('Error getting feature flag enabled status: {"message":"Unknown error"}'));
    });
  });
});

export {};
