import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CanComponentDeactivate } from '../../../../core/guards/can-deactivate.guard';

@Component({
  selector: 'app-admin-add-team',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-add-team.html',
  styleUrl: './admin-add-team.css',
})
export class AdminAddTeam implements CanComponentDeactivate {
  @Output() teamAdded = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<void>();
  @Output() formDirtyChange = new EventEmitter<boolean>();

  addTeamForm: FormGroup;
  termsAccepted = false;
  private formSubmitted = false;

  directories = ['Dash / C', 'Boards.sales /D', 'Analytics Hub', 'Reports / Q', 'Data Center'];

  constructor(private fb: FormBuilder) {
    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      directory: ['', Validators.required],
      teamStatus: [true],
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }

ngOnInit() {
    // Listen to form changes and emit to parent
    this.addTeamForm.valueChanges.subscribe(() => {
      this.formDirtyChange.emit(this.addTeamForm.dirty);
    });
  }

  onSubmit() {
    if (this.addTeamForm.valid && this.termsAccepted) {
      this.formSubmitted = true;
      const formData = this.addTeamForm.value;
      this.teamAdded.emit(formData);
      this.addTeamForm.reset();
      this.termsAccepted = false;
    }
  }

  onCancel() {
    this.formSubmitted = true;
    this.closeForm.emit();
    this.addTeamForm.reset();
    this.termsAccepted = false;
  }

  canDeactivate(): boolean {
    if (this.formSubmitted) {
      return true;
    }
    return !this.addTeamForm.dirty;
  }

  toggleTerms() {
    this.termsAccepted = !this.termsAccepted;
  }
}
