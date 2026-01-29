import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-business-submit-request',
  imports: [CommonModule, FormsModule],
  templateUrl: './business-submit-request.html',
  styleUrl: './business-submit-request.css',
})
export class BusinessSubmitRequest implements OnInit {
  @Input() onClose: (() => void) | null = null;
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
    }, 3000);
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

  cancelSelection(): void {
    this.showDashboard = false;
    this.selectedOption = null;
  }

  submitToQC(): void {
    // Handle QC submission
    console.log('Submitting to QC:', this.dashboardData);
    // Add your submission logic here
  }

  closeSubmitPage(): void {
    if (this.onClose) {
      this.onClose();
    }
  }
}