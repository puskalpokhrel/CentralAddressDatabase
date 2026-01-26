// Represents data returned FROM API
export interface Province {
  id: string;      // Guid from ASP.NET
  name: string;
  code: string;
}

// Represents data sent TO API (POST / PUT)
export interface CreateProvince {
  name: string;
  code: string;
}
