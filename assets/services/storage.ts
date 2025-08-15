import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HazardReport {
  id: string;
  type: string;
  description: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  userId?: string;
  image?: string;
}

export interface RouteRequest {
  id: string;
  origin: string;
  destination: string;
  userId: string;
  userName: string;
  transportation: string;
  timestamp: Date;
  description: string;
}

export interface RouteRating {
  id: string;
  routeId: string;
  rating: number;
  comment: string;
  timestamp: Date;
  userId: string;
}

const STORAGE_KEYS = {
  HAZARD_REPORTS: 'hazard_reports',
  ROUTE_REQUESTS: 'route_requests',
  ROUTE_RATINGS: 'route_ratings',
};

export const storageService = {
  async saveHazardReport(report: HazardReport): Promise<void> {
    try {
      const existingReports = await this.getHazardReports();
      const updatedReports = [...existingReports, report];
      await AsyncStorage.setItem(STORAGE_KEYS.HAZARD_REPORTS, JSON.stringify(updatedReports));
    } catch (error) {
      console.error('Error saving hazard report:', error);
    }
  },

  async getHazardReports(): Promise<HazardReport[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.HAZARD_REPORTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting hazard reports:', error);
      return [];
    }
  },

  async saveRouteRequest(request: RouteRequest): Promise<void> {
    try {
      const existingRequests = await this.getRouteRequests();
      const updatedRequests = [...existingRequests, request];
      await AsyncStorage.setItem(STORAGE_KEYS.ROUTE_REQUESTS, JSON.stringify(updatedRequests));
    } catch (error) {
      console.error('Error saving route request:', error);
    }
  },

  async getRouteRequests(): Promise<RouteRequest[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ROUTE_REQUESTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting route requests:', error);
      return [];
    }
  },

  async saveRouteRating(rating: RouteRating): Promise<void> {
    try {
      const existingRatings = await this.getRouteRatings();
      const updatedRatings = [...existingRatings, rating];
      await AsyncStorage.setItem(STORAGE_KEYS.ROUTE_RATINGS, JSON.stringify(updatedRatings));
    } catch (error) {
      console.error('Error saving route rating:', error);
    }
  },

  async getRouteRatings(): Promise<RouteRating[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ROUTE_RATINGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting route ratings:', error);
      return [];
    }
  },
};