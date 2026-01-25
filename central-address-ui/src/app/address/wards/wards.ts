import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WardsService } from './wards.service';

@Component({
  selector: 'app-wards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wards.html',
  styleUrl: './wards.css'
})
export class WardComponent implements OnInit {

  private fb = inject(FormBuilder);
  private service = inject(WardsService);

  wards: any[] = [];
  message = '';

  wardForm = this.fb.group({
    wardNumber: ['', Validators.required],
    municipalityId: ['', Validators.required]
  });

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: res => this.wards = res,
      error: err => console.error(err)
    });
  }

  submit() {
    if (this.wardForm.invalid) return;

    this.service.create(this.wardForm.value).subscribe({
      next: () => {
        this.message = 'Ward saved successfully ✅';
        this.wardForm.reset();
        this.load();
      },
      error: () => this.message = 'Failed to save ward ❌'
    });
  }

  delete(id: number) {
    if (!confirm('Delete this ward?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }
}
