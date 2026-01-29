import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-add-team',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-add-team.html',
  styleUrl: './admin-add-team.css',
})
export class AdminAddTeam {
  @Output() teamAdded = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<void>();

  addTeamForm: FormGroup;
  termsAccepted = false;

  directories = [
    'Dash / C',
    'Boards.sales /D',
    'Analytics Hub',
    'Reports / Q',
    'Data Center',
  ];

  constructor(private fb: FormBuilder) {
    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      directory: ['', Validators.required],
      teamStatus: [true],
    });
  }

  onSubmit() {
    if (this.addTeamForm.valid && this.termsAccepted) {
      const formData = this.addTeamForm.value;
      this.teamAdded.emit(formData);
      this.addTeamForm.reset();
      this.termsAccepted = false;
    }
  }

  onCancel() {
    this.closeForm.emit();
    this.addTeamForm.reset();
    this.termsAccepted = false;
  }

  toggleTerms() {
    this.termsAccepted = !this.termsAccepted;
  }
}
