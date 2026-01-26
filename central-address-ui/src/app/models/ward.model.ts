/* These TypeScript code snippets are defining interfaces for a Ward object and a CreateWard object. */

 export interface Ward {
  id: string;              // GUID from backend
  municipalityId: string;  // FK → Municipality
  wardNo: number;          // Ward number (NOT `number`)
  name?: string;           // optional if your API sends it
}


export interface CreateWard {
  wardNumber: number;
  municipalityId: string;
  population?: number;
}
