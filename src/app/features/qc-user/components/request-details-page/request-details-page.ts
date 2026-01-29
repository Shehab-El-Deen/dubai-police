import { Component, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableRequest } from '../request-table/request-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApproveModal } from '../approve-modal/approve-modal';
import { RejectModal } from '../reject-modal/reject-modal';

@Component({
  selector: 'app-request-details-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ApproveModal, RejectModal],
  templateUrl: './request-details-page.html',
  styleUrl: './request-details-page.css',
})
export class RequestDetailsPage implements OnInit, OnDestroy {
  @Input() selectedRequest: TableRequest | null = null;
  @Input() onClose: (() => void) | null = null;

  private destroy$ = new Subject<void>();
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
    avoidTables: 0
  };

  ngOnInit() {
    // Component initialized
  }

  openApproveModal(): void {
    this.showApproveModal = true;
  }

  openRejectModal(): void {
    this.showRejectModal = true;
  }

  handleApprove(): void {
    console.log('Request approved');
    this.showApproveModal = false;
  }

  handleReject(reason: string): void {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}