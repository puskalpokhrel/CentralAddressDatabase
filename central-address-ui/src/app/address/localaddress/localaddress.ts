import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-localaddress',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './localaddress.html',
  styleUrl: './localaddress.css'
})
export class LocalAddressComponent {

  private fb = inject(FormBuilder);

  // ✅ MUST MATCH HTML NAME
  localAddressForm = this.fb.group({
    province: ['', Validators.required],
    district: ['', Validators.required],
    municipality: ['', Validators.required],
    ward: ['', Validators.required],
    tole: ['', [Validators.required, Validators.minLength(3)]],
    street: [''],
    houseNo: ['', Validators.required]
  });

  submit() {
    if (this.localAddressForm.valid) {
      console.log('Local Address Saved:', this.localAddressForm.value);
      this.localAddressForm.reset();
    }
  }
}
