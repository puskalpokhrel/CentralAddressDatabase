import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ProvinceService } from '../province/province.service';
import { DistrictService } from '../district/district.service';
import { MunicipalityService } from '../municipality/municipality.service';
import { WardService } from '../wards/wards.service';

import { Province } from '../../models/province.model';
import { District } from '../../models/district.model';
import { Municipality } from '../../models/municipality.model';
import { Ward } from '../../models/ward.model';

@Component({
  selector: 'app-localaddress',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './localaddress.html'
})
export class LocalAddressComponent implements OnInit {

  localAddressForm!: FormGroup;

  provinces: Province[] = [];
  districts: District[] = [];
  municipalities: Municipality[] = [];
  wards: Ward[] = [];

  constructor(
    private fb: FormBuilder,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private municipalityService: MunicipalityService,
    private wardService: WardService
  ) {}

  ngOnInit(): void {
    this.localAddressForm = this.fb.group({
      provinceId: ['', Validators.required],
      districtId: ['', Validators.required],
      municipalityId: ['', Validators.required],
      wardId: ['', Validators.required],
      tole: ['', [Validators.required, Validators.minLength(3)]],
      street: [''],
      houseNo: ['', Validators.required]
    });

    this.loadProvinces();
  }

  loadProvinces() {
    this.provinceService.getAll().subscribe(res => {
      this.provinces = res;
    });
  }

  onProvinceChange() {
    const provinceId = this.localAddressForm.value.provinceId;
    if (!provinceId) return;

    this.districtService.getByProvince(provinceId).subscribe(res => {
      this.districts = res;
      this.municipalities = [];
      this.wards = [];
    });
  }

  onDistrictChange() {
    const districtId = this.localAddressForm.value.districtId;
    if (!districtId) return;

    this.municipalityService.getByDistrict(districtId).subscribe(res => {
      this.municipalities = res;
      this.wards = [];
    });
  }

  onMunicipalityChange() {
    const municipalityId = this.localAddressForm.value.municipalityId;
    if (!municipalityId) return;

    this.wardService.getByMunicipality(municipalityId).subscribe(res => {
      this.wards = res;
    });
  }

  submit() {
    if (this.localAddressForm.invalid) return;

    console.log(this.localAddressForm.value);
  }
}
