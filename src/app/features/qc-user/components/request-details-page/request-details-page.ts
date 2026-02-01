import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { TableRequest } from '../request-table/request-table';
import { Subject } from 'rxjs';
import { ApproveModal } from '../approve-modal/approve-modal';
import { RejectModal } from '../reject-modal/reject-modal';
import { CanComponentDeactivate } from '../../../../core/guards/can-deactivate.guard';

@Component({
  selector: 'app-request-details-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ApproveModal, RejectModal],
  templateUrl: './request-details-page.html',
  styleUrl: './request-details-page.css',
})
export class RequestDetailsPage implements OnInit, OnDestroy, CanComponentDeactivate {
  @Input() selectedRequest: TableRequest | null = null;
  @Input() onClose: (() => void) | null = null;
  @Output() changesDetected = new EventEmitter<boolean>();

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }

  private destroy$ = new Subject<void>();
  private formSubmitted = false;
  // gradingForm: FormGroup;

  comment = '';
  showApproveModal = false;
  showRejectModal = false;

  // Grading scores
  scores = {
    dataCustomization: 0,
    visualRepresentation1: 0,
    dataLabeling: 0,
    visualRepresentation2: 0,
    brandGuidelines: 0,
    avoidTables: 0,
  };

  ngOnInit() {
      this.checkForChanges();
  }

 
  onScoreChange() {
  this.checkForChanges();
}

onCommentChange() {
  this.checkForChanges();
}

onRejectionReasonChange() {
  this.checkForChanges();
}

private checkForChanges() {
  const hasChanges = Object.values(this.scores).some(score => score > 0) || this.comment.trim().length > 0;
  this.changesDetected.emit(hasChanges);
}

  openApproveModal(): void {
    this.showApproveModal = true;
  }

  openRejectModal(): void {
    this.showRejectModal = true;
  }

  canDeactivate(): boolean {
    if (this.formSubmitted) {
      return true;
    }
    const hasChanges =
      Object.values(this.scores).some((score) => score > 0) || this.comment.trim().length > 0;
    if (hasChanges) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
  handleApprove(): void {
    this.formSubmitted = true;
    console.log('Request approved');
    this.showApproveModal = false;
  }

  handleReject(reason: string): void {
    this.formSubmitted = true;
    console.log('Request rejected with reason:', reason);
    this.showRejectModal = false;
  }

  handleCancel(): void {
    this.showApproveModal = false;
    this.showRejectModal = false;
  }

  closeDetailsPage(): void {
    if (this.onClose) {
      this.onClose();
    }
  }

  getTotalScore(): number {
    return Object.values(this.scores).reduce((sum, score) => sum + score, 0);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return '#28a745';
      case 'Rejected':
        return '#dc3545';
      case 'Under Review':
      case 'Need Review':
        return '#17a2b8';
      case 'Validation Failed':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High':
        return '#FF3B30';
      case 'Medium':
        return '#FFCC00';
      case 'Low':
        return '#B2BBC6';
      default:
        return '#999';
    }
  }
  validateScore(event: any, scoreKey: keyof typeof this.scores) {
  let value = parseInt(event.target.value) || 0;
  if (value > 10) {
    value = 10;
    event.target.value = '10';
  }
  if (value < 0) {
    value = 0;
    event.target.value = '0';
  }
  this.scores[scoreKey] = value;
  this.onScoreChange();
}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
