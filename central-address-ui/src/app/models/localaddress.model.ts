export interface LocalAddress {
  id: string;            // Guid
  provinceId: string;
  districtId: string;
  municipalityId: string;
  wardId: string;
  tole: string;
  street?: string;
  houseNo: string;
}

export interface CreateLocalAddress {
  provinceId: string;
  districtId: string;
  municipalityId: string;
  wardId: string;
  tole: string;
  street?: string;
  houseNo: string;
}
