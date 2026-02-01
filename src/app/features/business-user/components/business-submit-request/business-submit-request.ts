import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CanComponentDeactivate } from '../../../../core/guards/can-deactivate.guard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-business-submit-request',
  imports: [CommonModule, FormsModule],
  templateUrl: './business-submit-request.html',
  styleUrl: './business-submit-request.css',
})
export class BusinessSubmitRequest implements OnInit, CanComponentDeactivate {
  @Input() onClose: (() => void) | null = null;
  @Output() changesDetected = new EventEmitter<boolean>();
private formSubmitted = false;

  currentTime: string = '';
  isOpen = false;
  searchTerm = '';
  selectedOption: any = null;
  isValidating = false;
  showDashboard = false;

  // Dashboard data
  dashboardData = {
    title: 'Traffic Accident Hotspots Dashboard',
    department: 'Traffic Dept',
    submittedBy: 'Hassan El Rashidy',
    theme: 'TD Theme#1',
    rankingCharts: '8',
    currentQAScore: '80%',
    latestRefresh: ''
  };

  @HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any): void {
  if (!this.canDeactivate()) {
    $event.returnValue = true;
  }
}


canDeactivate(): boolean {
  if (this.formSubmitted) {
    return true;
  }
  // Check if dashboard is showing (means user has selected an option)
  if (this.showDashboard) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }
  return true;
}

private notifyChanges(): void {
  this.changesDetected.emit(this.showDashboard);
}

  ngOnInit(): void {
    this.updateTime();
    // Update time every minute
    setInterval(() => this.updateTime(), 60000);
  }

  options = [
    { value: 'traffic', label: 'Traffic Spot Dashboard', subtitle: 'Traffic analytics overview' },
    { value: 'analysis', label: 'Accident Rate Analysis Q4', subtitle: 'Quarterly report' },
    { value: 'pedestrian', label: 'Pedestrian Accident Hotspots', subtitle: 'Risk zones' },
    { value: 'bicycle', label: 'Bicycle Accident Hotspots', subtitle: 'Cyclist safety data' }
  ];

  get filteredOptions() {
    return this.options.filter(option =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

 selectOption(option: any) {
  // Check if we should confirm before changing selection
  if (this.showDashboard && !this.formSubmitted) {
    const confirmed = confirm('You have unsaved changes. Do you really want to change the selection?');
    if (!confirmed) {
      return;
    }
  }
  
  this.selectedOption = option;
  this.isOpen = false;
  this.searchTerm = '';
  
  // Start validation process
  this.isValidating = true;
  this.showDashboard = false;
  
  // Simulate validation for 3 seconds
  setTimeout(() => {
    this.isValidating = false;
    this.showDashboard = true;
    this.updateDashboardData();
    this.notifyChanges(); 
  }, 3000);
}

cancelSelection(): void {
  this.formSubmitted = true; 
  this.showDashboard = false;
  this.selectedOption = null;
  this.notifyChanges(); 
}

  updateDashboardData(): void {
    // Update dashboard data based on selected option
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    this.dashboardData.latestRefresh = `Today, ${now.toLocaleTimeString('en-US', options)}`;
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



 submitToQC(): void {
  this.formSubmitted = true;
  console.log('Submitting to QC:', this.dashboardData);
  this.notifyChanges(); 
}

  closeSubmitPage(): void {
     this.formSubmitted = true;
     if (this.onClose) {
    this.onClose();
  }
}
}