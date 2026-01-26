export interface Municipality {
  id: string;          // Guid
  name: string;
  type: string;        // Metropolitan / Sub-Metropolitan / Rural
  code: string;
  districtId: string;  // FK → District
}

export interface CreateMunicipality {
  name: string;
  type: string;
  code: string;
  districtId: string;
}
