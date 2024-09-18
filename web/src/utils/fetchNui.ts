import { isEnvBrowser } from './misc';

/**
 * Simple wrapper around the fetch API tailored for CEF/NUI use.
 * This function allows you to send data to a NUI callback in the FiveM environment.
 * It can also return mock data when in a browser environment for easier local development.
 *
 * @param eventName - The NUI event name to target
 * @param data - Data to send to the NUI callback (optional)
 * @param mockData - Mock data to return if in a browser environment (optional)
 *
 * @return A promise containing the data returned by the NUI callback
 */

export async function fetchNui<T = unknown>(
  eventName: string,
  data?: unknown,
  mockData?: T
): Promise<T> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  // If running in a browser environment, return mock data if provided
  if (isEnvBrowser() && mockData) return mockData;

  // Get the resource name from the NUI environment
  const resourceName = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'nui-frame-app'; // Default to 'nui-frame-app' in case GetParentResourceName is unavailable

  // Send the fetch request to the NUI callback
  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  // Parse the response JSON
  const respFormatted = await resp.json();
  return respFormatted;
}
