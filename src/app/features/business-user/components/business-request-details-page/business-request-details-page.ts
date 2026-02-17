import { Component, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableRequest } from '../business-request-table/business-request-table';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-business-request-details-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-request-details-page.html',
  styleUrl: './business-request-details-page.css',
})
export class BusinessRequestDetailsPage implements OnInit, OnDestroy {
  @Input() selectedRequest: TableRequest | null = null;
  @Input() onClose: (() => void) | null = null;

  private destroy$ = new Subject<void>();
  comment = '';
  showApproveModal = false;
  showRejectModal = false;

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

    getStatusBgColor(status: string): string {
    switch (status) {
      case 'Validation Failed':
        return '#FFFBD1'
      case 'Rejected':
        return '#FFD6D6';
      case 'Under Review':
        return '#FFFBD1';
      case 'Approved':
        return '#E4FAEF';
      case 'Need Review':
        return '#D1ECFF';
      default:
        return '#e2e3e5';
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
