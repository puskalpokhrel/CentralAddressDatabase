export interface District {
  id: string;           // Guid
  name: string;
  code: string;
  provinceId: string;   // FK → Province
}

export interface CreateDistrict {
  name: string;
  code: string;
  provinceId: string;
}
