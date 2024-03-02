export interface UserState {
  id: number;
  iat?: number;
  exp?: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles: string[];
}

export interface OnboardingRequestBody {
  organization: {
    organization_name: string;
    country: string;
    location_name: string;
    street_address: string;
    city: string;
    postal_code: string;
  };
  programs: string[] | [];
  timezone: {
    date_format: string;
    time_format: string;
    timezone: string;
  };
  billing: {
    currency: string;
    billing_date: string;
    allow_cancellation: 1 | 0;
  };
}
