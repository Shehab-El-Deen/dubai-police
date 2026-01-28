import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-request',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-request.html',
  styleUrl: './create-request.css',
})
export class CreateRequest implements OnInit {
  @Input() onClose: (() => void) | null = null;
  

  requestForm: FormGroup;
  currentTime: string = '';
  selectedPriority: 'high' | 'medium' | 'low' = 'medium';

  businessDomains = [
    'Finance',
    'Healthcare',
    'Technology',
    'Education',
    'Manufacturing',
    'Retail',
    'Other'
  ];

  constructor(private fb: FormBuilder) {
    this.requestForm = this.fb.group({
      dashboardName: ['', Validators.required],
      businessDomain: ['', Validators.required],
      type: ['', Validators.required],
      dashboardDescription: ['', Validators.required],
      notesForQC: [''],
      priority: ['medium'],
      dashboardUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.updateTime();
    // Update time every minute
    setInterval(() => this.updateTime(), 60000);
  }

  
  updateTime(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    this.currentTime = `Today, ${now.toLocaleTimeString('en-US', options)}`;
  }

  selectPriority(priority: 'high' | 'medium' | 'low'): void {
    this.selectedPriority = priority;
    this.requestForm.patchValue({ priority });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      console.log('Form submitted:', this.requestForm.value);
      // Add your submission logic here
      // For example: this.requestService.createRequest(this.requestForm.value)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.requestForm.controls).forEach(key => {
        this.requestForm.get(key)?.markAsTouched();
      });
    }
  }

  closeCreatePage(): void {
    if (this.onClose) {
      this.onClose();
    }
  }
}
