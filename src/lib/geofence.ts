/**
 * Geofencing Utility for Table QR Ordering (Spec Section 9.7)
 * Validates distance between customer browser coordinates and store lat/lng.
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calculates distance in meters between two GPS coordinates using the Haversine formula.
 */
export function calculateHaversineDistanceMeters(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371e3; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const lat1Rad = toRad(coord1.latitude);
  const lat2Rad = toRad(coord2.latitude);
  const deltaLat = toRad(coord2.latitude - coord1.latitude);
  const deltaLon = toRad(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Validates if a customer's location is within permitted store geofence radius.
 * - In permissive mode (default): permits if customer coordinates are unavailable.
 * - In strict mode: rejects if coordinates are absent or out-of-range.
 */
export function validateCustomerGeofence(params: {
  storeCoords?: Coordinates;
  customerCoords?: Coordinates;
  maxRadiusMeters?: number;
  strictMode?: boolean;
}): { allowed: boolean; distanceMeters?: number; reason?: string } {
  const { storeCoords, customerCoords, maxRadiusMeters = 300, strictMode = false } = params;

  // If store coordinates are not configured, allow
  if (!storeCoords || typeof storeCoords.latitude !== 'number' || typeof storeCoords.longitude !== 'number') {
    return { allowed: true };
  }

  // If customer didn't provide coords
  if (!customerCoords || typeof customerCoords.latitude !== 'number' || typeof customerCoords.longitude !== 'number') {
    if (strictMode) {
      return {
        allowed: false,
        reason: 'Location access is required by this cafe to place table orders.',
      };
    }
    return { allowed: true }; // Permissive fallback
  }

  const distance = calculateHaversineDistanceMeters(storeCoords, customerCoords);

  if (distance > maxRadiusMeters) {
    return {
      allowed: false,
      distanceMeters: distance,
      reason: `You appear to be ${distance}m away. Table ordering is restricted to within ${maxRadiusMeters}m of the cafe.`,
    };
  }

  return { allowed: true, distanceMeters: distance };
}
