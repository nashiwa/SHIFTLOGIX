## Project Summary: ShiftLogix Fleet Control
ShiftLogix is a modern enterprise solution designed for real-time logistics monitoring. It focuses on efficiency, data integrity, and a high-quality user experience.

### Core Functionalities
Asset Lifecycle Management: A complete system to register, monitor, and retire fleet vehicles, ensuring a clear digital paper trail for every asset.

Real-Time Status Tracking: Dynamic categorizing of vehicles into Available, In Transit, or Maintenance states to optimize dispatching decisions.

Operational Intelligence: Instant calculation of Key Performance Indicators (KPIs), including total fleet capacity, active delivery counts, and aggregate fuel efficiency.

Persistent State: Integration of browser-level storage to ensure that fleet data remains consistent and accessible even after a system reboot or page refresh.

### Technical Excellence
Signals-Driven Reactivity: Built using the latest Angular Signals API, providing a high-performance, granular update mechanism that eliminates the need for expensive global re-renders.

Robust Data Validation: Implementation of Reactive Forms with strict validation rules (Min/Max length and range checks) to prevent erroneous data entry.

Scalable Architecture: Utilization of a "Service-Component" pattern, separating business logic and data persistence from the user interface for better maintainability.

Modern Design System: A custom-designed UI utilizing SCSS variables and Flexbox/Grid layouts, ensuring a professional, dashboard-style aesthetic across all screen sizes.

### User Experience (UX) Focus
Contextual Feedback: Real-time visual validation cues (red alerts and status-specific colors) to guide the user through the data entry process.

Empty State Handling: Intelligent UI placeholders that maintain the dashboard’s professional appearance even when no data matches the current filter.

Interactive Controls: Smooth transitions and hover effects that provide immediate tactile feedback for every user action.

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/nashiwa/SHIFTLOGIX.git](https://github.com/nashiwa/SHIFTLOGIX.git)

2.  **Install Dependencies**
    ```bash
    npm install

2.  **Run the development server**
    ```bash
    ng serve