import { Component, OnInit, OnDestroy, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RequestDetailService,
  RequestDetail,
} from '../../../../core/services/request-detail.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApproveModal } from '../approve-modal/approve-modal';
import { RejectModal } from '../reject-modal/reject-modal';

@Component({
  selector: 'app-request-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ApproveModal, RejectModal],
  templateUrl: './request-detail-modal.html',
  styleUrl: './request-detail-modal.css',
})
export class RequestDetailModal implements OnInit, OnDestroy {
  private requestDetailService = inject(RequestDetailService);
  private destroy$ = new Subject<void>();

  @Output() expandModal = new EventEmitter<void>();

  isOpen = false;
  selectedRequest: RequestDetail | null = null;
  comment = '';

  showApproveModal = false;
  showRejectModal = false;

  ngOnInit() {
    this.requestDetailService.isModalOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen: boolean) => {
        this.isOpen = isOpen;
      });

    this.requestDetailService.selectedRequest$
      .pipe(takeUntil(this.destroy$))
      .subscribe((request: RequestDetail | null) => {
        this.selectedRequest = request;
      });
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

  onExpandClick(): void {
    this.closeModal();
    this.expandModal.emit();
  }

  closeModal() {
    this.requestDetailService.closeModal();
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
