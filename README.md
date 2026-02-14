# Advanced User & Viewer Control Panel - Professional System Design Prompt

## 🎯 Project Objective

Design and implement a sophisticated, feature-rich control panel specifically tailored for **Users** and **Viewers** in the IoT Lumina Smart Lighting Platform. This panel provides comprehensive device monitoring, sensor telemetry visualization, real-time notifications, activity tracking, and granular permission-based access control - all integrated with the existing Admin API for seamless data synchronization.

---

## 📊 System Overview

### **Target User Roles**

**1. User Role (Standard Access)**
- Full control over assigned lamps and controllers
- Create, modify, and delete schedules for permitted devices
- View real-time sensor data and health metrics
- Receive notifications about device status and anomalies
- Access personal activity logs and usage analytics
- Manage account settings and preferences

**2. Viewer Role (Read-Only Access)**
- Monitor assigned devices (no control permissions)
- View sensor data, telemetry, and health metrics
- Receive informational notifications
- Access activity logs for visibility
- View analytics and reports
- No ability to modify device states or configurations

### **Default Simulation Configuration**

For demonstration and testing purposes, the system should initialize with:
- **4 ESP32/ESP8266 Controllers** (2 online, 2 offline)
- **12 Smart Lamps** (distributed across controllers)
- **Realistic sensor data streams** (temperature, humidity, power consumption, WiFi RSSI)
- **Pre-populated notifications** (last 7 days)
- **Activity history** (last 30 days of interactions)
- **Sample dashboard charts** with time-series data

---

## 🏗️ Architecture Components

### **1. Enhanced Data Model - New Entities**

#### **Sensor Reading**
```typescript
interface SensorReading {
  id: string;                          // UUID v4
  controller_id: string;               // FK to Controllers
  sensor_type: SensorType;             // Enum of sensor types
  value: number;                       // Measured value
  unit: string;                        // Unit of measurement
  timestamp: string;                   // ISO 8601
  quality: 'good' | 'fair' | 'poor';  // Data quality indicator
}

type SensorType = 
  | 'temperature'       // °C or °F
  | 'humidity'          // % RH
  | 'light_level'       // Lux
  | 'power_consumption' // Watts
  | 'voltage'           // Volts
  | 'current'           // Amperes
  | 'wifi_rssi'         // dBm
  | 'cpu_usage'         // %
  | 'memory_usage'      // %
  | 'uptime';           // seconds
```

#### **Enhanced Notification System**
```typescript
interface Notification {
  id: string;                          // UUID v4
  user_id: string;                     // FK to Users
  type: NotificationType;              
  category: NotificationCategory;      // Grouping for filtering
  title: string;                       // Short headline
  message: string;                     // Detailed message
  severity: NotificationSeverity;      
  is_read: boolean;                    
  is_dismissed: boolean;               
  action_url?: string;                 // Deep link to relevant view
  action_label?: string;               // CTA button text
  related_resource_type?: string;      // 'controller', 'lamp', etc.
  related_resource_id?: string;        // ID of related entity
  metadata?: Record<string, any>;      // Additional context
  created_at: string;                  // ISO 8601
  read_at?: string;                    // ISO 8601
  expires_at?: string;                 // Auto-dismiss time
}

type NotificationType = 
  | 'info' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'critical';

type NotificationCategory = 
  | 'device_status'      // Controller online/offline
  | 'sensor_alert'       // Threshold violations
  | 'schedule'           // Schedule execution
  | 'system'             // System updates
  | 'security'           // Security events
  | 'energy'             // Energy consumption alerts
  | 'maintenance';       // Maintenance reminders

type NotificationSeverity = 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'urgent';
```

#### **Enhanced Activity Log**
```typescript
interface EnhancedActivityLog {
  id: string;                          
  user_id: string;                     
  username: string;                    // Denormalized for display
  action: ActivityAction;              
  resource_type: string;               
  resource_id?: string;                
  resource_name?: string;              // Denormalized for display
  description: string;                 // Human-readable description
  ip_address?: string;                 
  user_agent?: string;                 
  location?: {                         // GeoIP data
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  previous_state?: any;                // State before action
  new_state?: any;                     // State after action
  success: boolean;                    
  error_message?: string;              
  duration_ms?: number;                // Action execution time
  metadata?: Record<string, any>;      
  created_at: string;                  
}

type ActivityAction = 
  | 'user_login' 
  | 'user_logout' 
  | 'lamp_toggle' 
  | 'lamp_brightness_change'
  | 'lamp_color_change'
  | 'schedule_create'
  | 'schedule_update'
  | 'schedule_delete'
  | 'schedule_execute'
  | 'controller_view'
  | 'sensor_read'
  | 'notification_read'
  | 'account_update'
  | 'permission_granted'
  | 'permission_revoked';
```

#### **User Account Status**
```typescript
interface UserAccountStatus {
  user_id: string;
  is_active: boolean;
  is_verified: boolean;
  two_factor_enabled: boolean;
  last_login: string;
  login_count: number;
  last_ip_address?: string;
  account_created_at: string;
  subscription_tier?: 'free' | 'basic' | 'premium' | 'enterprise';
  subscription_expires_at?: string;
  storage_used_bytes: number;
  storage_limit_bytes: number;
  api_calls_today: number;
  api_limit_daily: number;
  device_limit: number;
  lamp_limit: number;
  preferences: {
    theme: 'dark' | 'light' | 'auto';
    language: string;
    timezone: string;
    notifications_enabled: boolean;
    email_notifications: boolean;
    sms_notifications: boolean;
    notification_frequency: 'realtime' | 'hourly' | 'daily';
  };
  security: {
    last_password_change: string;
    failed_login_attempts: number;
    account_locked_until?: string;
    active_sessions: number;
  };
}
```

#### **Dashboard Widget Configuration**
```typescript
interface DashboardWidget {
  id: string;
  user_id: string;
  type: WidgetType;
  title: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  configuration: WidgetConfig;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

type WidgetType = 
  | 'device_status'          // List of controller statuses
  | 'lamp_grid'              // Visual lamp control grid
  | 'sensor_gauge'           // Single sensor gauge
  | 'sensor_chart'           // Time-series chart
  | 'energy_consumption'     // Energy usage graph
  | 'activity_feed'          // Recent activities
  | 'notification_list'      // Unread notifications
  | 'schedule_calendar'      // Upcoming schedules
  | 'system_health'          // Overall health metrics
  | 'quick_actions';         // Shortcuts

interface WidgetConfig {
  refresh_interval?: number;           // Seconds
  chart_type?: 'line' | 'bar' | 'area' | 'gauge';
  time_range?: '1h' | '6h' | '24h' | '7d' | '30d';
  devices?: string[];                  // Filter by device IDs
  sensors?: SensorType[];              // Filter by sensor types
  color_scheme?: string;               // Hex color
  show_legend?: boolean;
  show_grid?: boolean;
  aggregation?: 'avg' | 'min' | 'max' | 'sum';
}
```

---

## 🎨 UI/UX Design Requirements

### **Dashboard Layout Structure**

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Logo | Dashboard | Notifications (badge) | Profile ▼     │  │
│  └──────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  MAIN CONTENT AREA                                              │
│  ┌────────────┬───────────────────────────────────────────┐    │
│  │            │                                            │    │
│  │  SIDEBAR   │  DASHBOARD WIDGETS (Drag & Drop Grid)     │    │
│  │            │                                            │    │
│  │  - Overview│  ┌──────────┬──────────┬─────────────┐   │    │
│  │  - Devices │  │ Controllers│ Sensors │ Quick Actions│   │    │
│  │  - Sensors │  │  Status   │  Gauges  │   Buttons   │   │    │
│  │  - Activity│  └──────────┴──────────┴─────────────┘   │    │
│  │  - Notif.  │  ┌────────────────────────────────────┐   │    │
│  │  - Settings│  │   Energy Consumption Chart         │   │    │
│  │            │  │   (Time Series - Last 7 Days)      │   │    │
│  │            │  └────────────────────────────────────┘   │    │
│  │            │  ┌──────────────┬──────────────────────┐  │    │
│  │            │  │ Activity Feed│ Notification Panel  │  │    │
│  │            │  │  (Real-time) │  (Unread: 5)        │  │    │
│  │            │  └──────────────┴──────────────────────┘  │    │
│  └────────────┴───────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### **Key UI Components**

#### **1. Device Status Cards**
```
┌────────────────────────────────────┐
│ 🟢 ESP32-Living Room              │
│ ───────────────────────────────── │
│ Status: Online                     │
│ Uptime: 4d 12h 35m                │
│ Signal: -45 dBm (Excellent)       │
│ Temp: 42°C  Memory: 67%           │
│ ───────────────────────────────── │
│ 💡 3 Lamps  |  📊 5 Sensors        │
│ [View Details] [Control Lamps]    │
└────────────────────────────────────┘
```

#### **2. Sensor Gauge Widgets**
```
┌─────────────────────┐  ┌─────────────────────┐
│  TEMPERATURE        │  │  HUMIDITY           │
│                     │  │                     │
│      ╱─────╲        │  │      ╱─────╲        │
│     │  42°C │       │  │     │  65%  │       │
│      ╲─────╱        │  │      ╲─────╱        │
│                     │  │                     │
│  Target: 20-30°C    │  │  Target: 40-60%     │
│  🔴 Above Threshold │  │  🟢 Normal          │
└─────────────────────┘  └─────────────────────┘
```

#### **3. Time-Series Charts**
```
┌──────────────────────────────────────────────────┐
│  Power Consumption - Last 7 Days                 │
│  ─────────────────────────────────────────────   │
│  150W ┤                                ╱╲        │
│  100W ┤            ╱╲    ╱╲    ╱╲    ╱  ╲       │
│   50W ┤    ╱╲    ╱  ╲  ╱  ╲  ╱  ╲  ╱    ╲      │
│    0W ┴────┴────┴────┴──┴────┴──┴────┴──────     │
│        Mon  Tue  Wed  Thu  Fri  Sat  Sun        │
│  ─────────────────────────────────────────────   │
│  Total: 45.2 kWh  |  Avg: 6.5 kWh/day           │
│  Cost: $5.42 (est.)  |  vs Last Week: -12% ⬇   │
└──────────────────────────────────────────────────┘
```

#### **4. Lamp Control Grid**
```
┌────────────────────────────────────────────┐
│  Living Room Lamps                          │
│  ──────────────────────────────────────    │
│  ┌─────────┬─────────┬─────────┐          │
│  │ 💡 Main │ 💡 Corner│💡 Accent│          │
│  │ ═══════ │ ─────── │ ─────── │          │
│  │ ● ON    │ ○ OFF   │ ○ OFF   │          │
│  │ 100%    │  0%     │  0%     │          │
│  │ #FFE4B5 │  -      │  -      │          │
│  └─────────┴─────────┴─────────┘          │
│  [Toggle All] [Create Scene] [Schedule]   │
└────────────────────────────────────────────┘
```

#### **5. Notification Panel**
```
┌────────────────────────────────────────────┐
│  Notifications (5 unread)                  │
│  Filter: [All▼] [Mark All Read] [Settings]│
│  ──────────────────────────────────────    │
│  🔴 CRITICAL - 2 min ago                   │
│  Controller "Kitchen" went offline         │
│  Last seen: 2:45 PM | [View] [Dismiss]    │
│  ──────────────────────────────────────    │
│  🟡 WARNING - 15 min ago                   │
│  Temperature sensor above threshold        │
│  ESP32-Bedroom: 45°C (max: 40°C)          │
│  [View Details] [Acknowledge]              │
│  ──────────────────────────────────────    │
│  🟢 SUCCESS - 1 hour ago                   │
│  Schedule executed: Evening lights ON      │
│  3 lamps activated | [View Activity]       │
│  ──────────────────────────────────────    │
│  ℹ️  INFO - 2 hours ago                     │
│  New firmware available (v2.3.1)           │
│  [Update Now] [Learn More]                 │
│  ──────────────────────────────────────    │
│  [Load More] [View All Notifications]      │
└────────────────────────────────────────────┘
```

#### **6. Activity Feed**
```
┌────────────────────────────────────────────┐
│  Recent Activity                            │
│  ──────────────────────────────────────    │
│  🔵 You toggled "Kitchen Main Light" ON    │
│      2 minutes ago | From: Home Network    │
│  ──────────────────────────────────────    │
│  ⚡ Schedule "Morning Routine" executed    │
│      15 minutes ago | 5 lamps affected     │
│  ──────────────────────────────────────    │
│  🟡 Temperature alert on "Bedroom ESP32"   │
│      45 minutes ago | 42°C recorded        │
│  ──────────────────────────────────────    │
│  🔵 admin granted you control permission   │
│      2 hours ago | Controller: Garage      │
│  ──────────────────────────────────────    │
│  🟢 You logged in                          │
│      3 hours ago | Chrome, Windows 11      │
│  ──────────────────────────────────────    │
│  [View Full History] [Export Log]          │
└────────────────────────────────────────────┘
```

#### **7. Account Status Dashboard**
```
┌────────────────────────────────────────────┐
│  Account Status                             │
│  ──────────────────────────────────────    │
│  👤 john_doe | Role: User                  │
│  📧 john@example.com | ✓ Verified          │
│  ──────────────────────────────────────    │
│  Subscription: Premium                      │
│  Status: Active | Renews: Mar 15, 2026     │
│  ──────────────────────────────────────    │
│  USAGE LIMITS                              │
│  Devices:    4/10     ████████──  80%      │
│  Lamps:     12/50     ████──────  24%      │
│  Storage:  1.2/5 GB   ███───────  24%      │
│  API Calls: 245/1000  ███───────  25%      │
│  ──────────────────────────────────────    │
│  SECURITY                                   │
│  🔐 2FA: Enabled                           │
│  🔑 Last Password Change: Jan 15, 2026     │
│  🌐 Active Sessions: 2                     │
│  ──────────────────────────────────────    │
│  [Manage Account] [Security Settings]      │
└────────────────────────────────────────────┘
```

---

## 🔌 API Integration Architecture

### **API Endpoints for User/Viewer Panel**

#### **Dashboard & Statistics**
```http
GET    /api/v1/user/dashboard
GET    /api/v1/user/stats
GET    /api/v1/user/widgets
POST   /api/v1/user/widgets
PUT    /api/v1/user/widgets/:id
DELETE /api/v1/user/widgets/:id
```

**Response Example: User Dashboard**
```json
{
  "user": {
    "id": "uuid",
    "username": "john_doe",
    "role": "user",
    "account_status": {
      "is_active": true,
      "subscription_tier": "premium",
      "device_count": 4,
      "device_limit": 10,
      "lamp_count": 12,
      "lamp_limit": 50
    }
  },
  "stats": {
    "accessible_controllers": 4,
    "online_controllers": 3,
    "accessible_lamps": 12,
    "active_lamps": 7,
    "unread_notifications": 5,
    "today_activities": 23,
    "energy_today_kwh": 3.4,
    "energy_month_kwh": 87.2
  },
  "quick_metrics": {
    "avg_temperature_c": 24.5,
    "avg_humidity_percent": 58,
    "avg_wifi_rssi_dbm": -52,
    "total_uptime_hours": 720
  }
}
```

#### **Device & Sensor Management**
```http
GET    /api/v1/user/controllers              # Accessible controllers
GET    /api/v1/user/controllers/:id          # Controller details
GET    /api/v1/user/controllers/:id/sensors  # Sensor readings
GET    /api/v1/user/lamps                    # Accessible lamps
GET    /api/v1/user/lamps/:id                # Lamp details
POST   /api/v1/user/lamps/:id/toggle         # Toggle lamp (User only)
POST   /api/v1/user/lamps/:id/brightness     # Set brightness (User only)
POST   /api/v1/user/lamps/:id/color          # Set color (User only)
```

**Response Example: Controller with Sensors**
```json
{
  "controller": {
    "id": "ctrl-001",
    "name": "Living Room ESP32",
    "model": "ESP32",
    "is_online": true,
    "last_seen": "2026-02-14T10:30:00Z",
    "firmware_version": "2.1.3",
    "uptime_seconds": 345600,
    "access_level": "control"
  },
  "sensors": [
    {
      "id": "sensor-001",
      "type": "temperature",
      "value": 24.5,
      "unit": "°C",
      "quality": "good",
      "timestamp": "2026-02-14T10:30:00Z",
      "threshold": {
        "min": 18,
        "max": 30,
        "is_violated": false
      }
    },
    {
      "id": "sensor-002",
      "type": "humidity",
      "value": 58,
      "unit": "%",
      "quality": "good",
      "timestamp": "2026-02-14T10:30:00Z",
      "threshold": {
        "min": 40,
        "max": 70,
        "is_violated": false
      }
    },
    {
      "id": "sensor-003",
      "type": "power_consumption",
      "value": 45.2,
      "unit": "W",
      "quality": "good",
      "timestamp": "2026-02-14T10:30:00Z"
    }
  ],
  "lamps": [
    {
      "id": "lamp-001",
      "name": "Main Light",
      "gpio_pin": 2,
      "status": true,
      "brightness": 80,
      "color_hex": "#FFE4B5"
    }
  ]
}
```

#### **Sensor Data & Analytics**
```http
GET    /api/v1/user/sensors/readings         # Recent sensor readings
GET    /api/v1/user/sensors/history          # Time-series data
GET    /api/v1/user/sensors/statistics       # Aggregated stats
GET    /api/v1/user/energy/consumption       # Energy metrics
GET    /api/v1/user/energy/cost              # Cost estimation
```

**Response Example: Sensor History**
```json
{
  "controller_id": "ctrl-001",
  "sensor_type": "temperature",
  "time_range": {
    "start": "2026-02-07T00:00:00Z",
    "end": "2026-02-14T00:00:00Z"
  },
  "resolution": "1h",
  "data_points": [
    {
      "timestamp": "2026-02-07T00:00:00Z",
      "value": 22.3,
      "quality": "good"
    },
    {
      "timestamp": "2026-02-07T01:00:00Z",
      "value": 22.5,
      "quality": "good"
    }
    // ... more data points
  ],
  "statistics": {
    "min": 18.2,
    "max": 28.7,
    "avg": 24.1,
    "median": 24.0,
    "std_dev": 2.3
  }
}
```

#### **Notification Management**
```http
GET    /api/v1/user/notifications            # List notifications
GET    /api/v1/user/notifications/unread     # Unread count
PUT    /api/v1/user/notifications/:id/read   # Mark as read
PUT    /api/v1/user/notifications/:id/dismiss # Dismiss
POST   /api/v1/user/notifications/mark-all-read
GET    /api/v1/user/notifications/settings   # Preferences
PUT    /api/v1/user/notifications/settings   # Update preferences
```

**Response Example: Notifications**
```json
{
  "notifications": [
    {
      "id": "notif-001",
      "type": "critical",
      "category": "device_status",
      "severity": "urgent",
      "title": "Controller Offline",
      "message": "ESP32 'Kitchen' has gone offline",
      "is_read": false,
      "is_dismissed": false,
      "action_url": "/devices/ctrl-002",
      "action_label": "View Device",
      "related_resource_type": "controller",
      "related_resource_id": "ctrl-002",
      "created_at": "2026-02-14T10:28:00Z",
      "expires_at": "2026-02-21T10:28:00Z"
    },
    {
      "id": "notif-002",
      "type": "warning",
      "category": "sensor_alert",
      "severity": "high",
      "title": "Temperature Alert",
      "message": "Temperature sensor reading 45°C (threshold: 40°C)",
      "is_read": false,
      "is_dismissed": false,
      "related_resource_type": "controller",
      "related_resource_id": "ctrl-001",
      "metadata": {
        "sensor_type": "temperature",
        "current_value": 45,
        "threshold_value": 40,
        "unit": "°C"
      },
      "created_at": "2026-02-14T10:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 47,
    "has_more": true
  },
  "unread_count": 5
}
```

#### **Activity Logs**
```http
GET    /api/v1/user/activity                 # Personal activity
GET    /api/v1/user/activity/export          # Export CSV/JSON
GET    /api/v1/user/activity/filters         # Available filters
```

**Response Example: Activity Logs**
```json
{
  "activities": [
    {
      "id": "act-001",
      "username": "john_doe",
      "action": "lamp_toggle",
      "resource_type": "lamp",
      "resource_id": "lamp-001",
      "resource_name": "Kitchen Main Light",
      "description": "Toggled lamp ON",
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      "location": {
        "country": "Rwanda",
        "city": "Kigali"
      },
      "previous_state": {"status": false, "brightness": 0},
      "new_state": {"status": true, "brightness": 100},
      "success": true,
      "duration_ms": 234,
      "created_at": "2026-02-14T10:28:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 50,
    "total": 1247,
    "has_more": true
  }
}
```

#### **Account Management**
```http
GET    /api/v1/user/account                  # Account details
PUT    /api/v1/user/account                  # Update account
GET    /api/v1/user/account/security         # Security status
PUT    /api/v1/user/account/password         # Change password
GET    /api/v1/user/account/sessions         # Active sessions
DELETE /api/v1/user/account/sessions/:id     # Revoke session
GET    /api/v1/user/account/preferences      # User preferences
PUT    /api/v1/user/account/preferences      # Update preferences
```

---

## 📊 Default Simulation Data Structure

### **4 Controllers (Default Setup)**

```json
{
  "controllers": [
    {
      "id": "ctrl-001",
      "name": "Living Room ESP32",
      "mac_address": "AA:BB:CC:DD:EE:01",
      "ip_address": "192.168.1.101",
      "model": "ESP32",
      "firmware_version": "2.1.3",
      "is_online": true,
      "last_seen": "2026-02-14T10:30:00Z",
      "uptime_seconds": 345600,
      "sensors": {
        "temperature": 24.5,
        "humidity": 58,
        "wifi_rssi": -45,
        "power_consumption": 45.2
      }
    },
    {
      "id": "ctrl-002",
      "name": "Kitchen ESP8266",
      "mac_address": "AA:BB:CC:DD:EE:02",
      "ip_address": "192.168.1.102",
      "model": "ESP8266",
      "firmware_version": "2.0.8",
      "is_online": true,
      "last_seen": "2026-02-14T10:29:30Z",
      "uptime_seconds": 172800,
      "sensors": {
        "temperature": 26.3,
        "humidity": 62,
        "wifi_rssi": -52,
        "power_consumption": 32.7
      }
    },
    {
      "id": "ctrl-003",
      "name": "Bedroom ESP32-S3",
      "mac_address": "AA:BB:CC:DD:EE:03",
      "ip_address": "192.168.1.103",
      "model": "ESP32-S3",
      "firmware_version": "2.1.3",
      "is_online": true,
      "last_seen": "2026-02-14T10:30:15Z",
      "uptime_seconds": 518400,
      "sensors": {
        "temperature": 23.8,
        "humidity": 55,
        "wifi_rssi": -48,
        "power_consumption": 38.9
      }
    },
    {
      "id": "ctrl-004",
      "name": "Garage ESP32",
      "mac_address": "AA:BB:CC:DD:EE:04",
      "ip_address": "192.168.1.104",
      "model": "ESP32",
      "firmware_version": "2.1.2",
      "is_online": false,
      "last_seen": "2026-02-13T22:15:00Z",
      "uptime_seconds": 0,
      "sensors": null
    }
  ]
}
```

### **12 Lamps (Distributed Across Controllers)**

```json
{
  "lamps": [
    // Living Room ESP32 (ctrl-001) - 4 lamps
    {
      "id": "lamp-001",
      "name": "Living Room Main",
      "controller_id": "ctrl-001",
      "gpio_pin": 2,
      "status": true,
      "brightness": 80,
      "color_hex": "#FFE4B5",
      "power_consumption_w": 12.5
    },
    {
      "id": "lamp-002",
      "name": "Living Room Corner",
      "controller_id": "ctrl-001",
      "gpio_pin": 4,
      "status": false,
      "brightness": 0,
      "color_hex": null,
      "power_consumption_w": 0
    },
    {
      "id": "lamp-003",
      "name": "Living Room Accent 1",
      "controller_id": "ctrl-001",
      "gpio_pin": 5,
      "status": true,
      "brightness": 50,
      "color_hex": "#FF6B6B",
      "power_consumption_w": 8.3
    },
    {
      "id": "lamp-004",
      "name": "Living Room Accent 2",
      "controller_id": "ctrl-001",
      "gpio_pin": 18,
      "status": true,
      "brightness": 50,
      "color_hex": "#4ECDC4",
      "power_consumption_w": 8.2
    },
    
    // Kitchen ESP8266 (ctrl-002) - 3 lamps
    {
      "id": "lamp-005",
      "name": "Kitchen Main",
      "controller_id": "ctrl-002",
      "gpio_pin": 2,
      "status": true,
      "brightness": 100,
      "color_hex": null,
      "power_consumption_w": 15.0
    },
    {
      "id": "lamp-006",
      "name": "Kitchen Counter",
      "controller_id": "ctrl-002",
      "gpio_pin": 4,
      "status": true,
      "brightness": 70,
      "color_hex": null,
      "power_consumption_w": 10.5
    },
    {
      "id": "lamp-007",
      "name": "Kitchen Pantry",
      "controller_id": "ctrl-002",
      "gpio_pin": 5,
      "status": false,
      "brightness": 0,
      "color_hex": null,
      "power_consumption_w": 0
    },
    
    // Bedroom ESP32-S3 (ctrl-003) - 3 lamps
    {
      "id": "lamp-008",
      "name": "Bedroom Main",
      "controller_id": "ctrl-003",
      "gpio_pin": 2,
      "status": true,
      "brightness": 40,
      "color_hex": "#FFDAB9",
      "power_consumption_w": 6.0
    },
    {
      "id": "lamp-009",
      "name": "Bedroom Bedside Left",
      "controller_id": "ctrl-003",
      "gpio_pin": 4,
      "status": true,
      "brightness": 30,
      "color_hex": "#FFE4E1",
      "power_consumption_w": 4.5
    },
    {
      "id": "lamp-010",
      "name": "Bedroom Bedside Right",
      "controller_id": "ctrl-003",
      "gpio_pin": 5,
      "status": false,
      "brightness": 0,
      "color_hex": null,
      "power_consumption_w": 0
    },
    
    // Garage ESP32 (ctrl-004) - 2 lamps (offline)
    {
      "id": "lamp-011",
      "name": "Garage Main",
      "controller_id": "ctrl-004",
      "gpio_pin": 2,
      "status": false,
      "brightness": 0,
      "color_hex": null,
      "power_consumption_w": 0
    },
    {
      "id": "lamp-012",
      "name": "Garage Workbench",
      "controller_id": "ctrl-004",
      "gpio_pin": 4,
      "status": false,
      "brightness": 0,
      "color_hex": null,
      "power_consumption_w": 0
    }
  ]
}
```

### **Sample Notifications (Last 7 Days)**

```json
{
  "notifications": [
    {
      "type": "critical",
      "category": "device_status",
      "title": "Controller Offline",
      "message": "Garage ESP32 has gone offline",
      "created_at": "2026-02-14T10:25:00Z",
      "severity": "urgent"
    },
    {
      "type": "warning",
      "category": "sensor_alert",
      "title": "Temperature Alert",
      "message": "Kitchen temperature 42°C (threshold: 40°C)",
      "created_at": "2026-02-14T09:15:00Z",
      "severity": "high"
    },
    {
      "type": "success",
      "category": "schedule",
      "title": "Schedule Executed",
      "message": "Morning routine activated 5 lamps",
      "created_at": "2026-02-14T06:00:00Z",
      "severity": "low"
    },
    {
      "type": "info",
      "category": "system",
      "title": "Firmware Update Available",
      "message": "Version 2.2.0 available for 3 devices",
      "created_at": "2026-02-13T14:30:00Z",
      "severity": "medium"
    },
    {
      "type": "warning",
      "category": "energy",
      "title": "High Energy Usage",
      "message": "Daily consumption 20% above average",
      "created_at": "2026-02-12T18:00:00Z",
      "severity": "medium"
    }
  ]
}
```

---

## 🎯 Feature Implementation Checklist

### **Phase 1: Core Dashboard (Week 1-2)**
- [ ] User authentication integration with Admin API
- [ ] Permission-based routing (User vs Viewer)
- [ ] Responsive dashboard layout with drag-drop widgets
- [ ] Device status cards with real-time updates
- [ ] Basic lamp control interface (User role only)
- [ ] Sensor gauge widgets (temperature, humidity, WiFi)
- [ ] Quick actions panel

### **Phase 2: Sensor & Telemetry (Week 3-4)**
- [ ] Sensor reading API integration
- [ ] Time-series chart components (Line, Area, Bar)
- [ ] Historical data visualization (1h, 6h, 24h, 7d, 30d)
- [ ] Sensor threshold alerts
- [ ] Real-time sensor value updates (polling or WebSocket)
- [ ] Sensor statistics (min, max, avg, median)
- [ ] Export sensor data (CSV, JSON)

### **Phase 3: Notifications & Activity (Week 5)**
- [ ] Notification panel with real-time badge updates
- [ ] Notification filtering and categorization
- [ ] Mark as read/unread functionality
- [ ] Notification dismissal
- [ ] Notification preferences (email, SMS, frequency)
- [ ] Activity feed with timeline view
- [ ] Activity log filtering and search
- [ ] Activity export functionality

### **Phase 4: Account & Analytics (Week 6)**
- [ ] Account status dashboard
- [ ] Usage limit indicators
- [ ] Security settings (password change, 2FA, sessions)
- [ ] User preferences management
- [ ] Energy consumption analytics
- [ ] Cost estimation based on usage
- [ ] Comparative analytics (day-over-day, week-over-week)
- [ ] Performance metrics dashboard

### **Phase 5: Advanced Features (Week 7-8)**
- [ ] Customizable dashboard widgets
- [ ] Widget configuration (colors, time ranges, filters)
- [ ] Advanced charting (multi-sensor comparison)
- [ ] Heatmaps for usage patterns
- [ ] Predictive analytics (ML-based forecasting)
- [ ] Mobile-responsive optimizations
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n) support

---

## 🔐 Security & Permissions

### **Permission Matrix**

| Feature                    | Viewer | User | Admin | Super Admin |
|----------------------------|:------:|:----:|:-----:|:-----------:|
| View assigned devices      |   ✅   |  ✅  |  ✅   |     ✅      |
| View sensor data           |   ✅   |  ✅  |  ✅   |     ✅      |
| Toggle lamps               |   ❌   |  ✅  |  ✅   |     ✅      |
| Adjust brightness/color    |   ❌   |  ✅  |  ✅   |     ✅      |
| Create/edit schedules      |   ❌   |  ✅  |  ✅   |     ✅      |
| View notifications         |   ✅   |  ✅  |  ✅   |     ✅      |
| View activity logs         |   ✅   |  ✅  |  ✅   |     ✅      |
| Manage account settings    |   ✅   |  ✅  |  ✅   |     ✅      |
| Grant permissions          |   ❌   |  ❌  |  ✅   |     ✅      |
| Add/remove devices         |   ❌   |  ❌  |  ✅   |     ✅      |
| Manage users               |   ❌   |  ❌  |  ❌   |     ✅      |

### **API Authorization Flow**

```
1. User logs in → JWT token issued
2. Token includes: user_id, role, permissions[]
3. Every API request → Bearer token in header
4. Backend validates token and checks permissions
5. Return filtered data based on user's access level
6. Viewer: read-only, User: read+control, Admin: full
```

---

## 🚀 Technology Stack

### **Frontend**
- **Framework**: React 18 with TypeScript
- **UI Library**: Tailwind CSS 4.x + Radix UI
- **Charts**: Recharts or Chart.js
- **State Management**: React Context + React Query
- **Real-time**: Polling (upgradeable to WebSocket)
- **Icons**: Lucide React
- **Notifications**: Sonner (toast) + custom notification system

### **Backend Integration**
- **API Client**: Axios or Fetch API with interceptors
- **Authentication**: JWT with automatic refresh
- **Caching**: React Query for server state
- **WebSocket**: Socket.io (optional for real-time)

### **Data Visualization**
- **Time-Series**: Recharts LineChart, AreaChart
- **Gauges**: Custom SVG components or recharts RadialBarChart
- **Heatmaps**: Recharts or D3.js
- **Tables**: TanStack Table (React Table v8)

---

## 📈 Performance Targets

- **Dashboard Load Time**: < 2 seconds (First Contentful Paint)
- **API Response Time**: < 300ms (p95)
- **Real-time Update Latency**: < 1 second
- **Chart Rendering**: < 500ms for 1000 data points
- **Notification Badge Update**: < 2 seconds after event
- **Mobile Responsiveness**: 100% functional on 320px+ screens

---

## 🎨 Design System

### **Color Palette (Dark Cyberpunk Theme)**

```css
/* Background Layers */
--bg-primary: #020617      /* Deep navy base */
--bg-secondary: #0f172a    /* Elevated surfaces */
--bg-tertiary: #1e293b     /* Cards and panels */

/* Accent Colors */
--accent-primary: #6366f1   /* Indigo - primary actions */
--accent-success: #10b981   /* Green - success states */
--accent-warning: #f59e0b   /* Amber - warnings */
--accent-error: #ef4444     /* Red - errors */
--accent-info: #3b82f6      /* Blue - info */

/* Status Colors */
--status-online: #10b981    /* Green */
--status-offline: #64748b   /* Gray */
--status-warning: #f59e0b   /* Amber */
--status-critical: #ef4444  /* Red */

/* Text Colors */
--text-primary: #f8fafc     /* White */
--text-secondary: #cbd5e1   /* Light gray */
--text-muted: #64748b       /* Muted gray */
--text-inverse: #020617     /* Dark for light backgrounds */

/* Chart Colors */
--chart-1: #6366f1  /* Indigo */
--chart-2: #8b5cf6  /* Purple */
--chart-3: #ec4899  /* Pink */
--chart-4: #10b981  /* Green */
--chart-5: #f59e0b  /* Amber */
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
xs: 320px   /* Small phones */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large displays */
```

---

## 🎯 Success Criteria

### **Functional Requirements**
✅ Users can view all assigned devices and sensors
✅ Users can control lamps within their permissions
✅ Viewers have read-only access with no control
✅ Real-time sensor data updates every 5-10 seconds
✅ Notifications appear within 2 seconds of events
✅ Activity logs capture all user interactions
✅ Dashboard is fully responsive on all devices
✅ Charts visualize data for multiple time ranges

### **Non-Functional Requirements**
✅ 99.9% uptime for API endpoints
✅ Sub-second response times for most operations
✅ Secure API communication (HTTPS, JWT)
✅ Accessible UI (WCAG 2.1 Level AA compliance)
✅ Intuitive UX requiring minimal training
✅ Scalable to 1000+ concurrent users

---

## 📚 Documentation Deliverables

1. **User Guide**: Step-by-step usage instructions
2. **API Documentation**: Complete endpoint reference
3. **Widget Configuration Guide**: Customization options
4. **Troubleshooting Guide**: Common issues and solutions
5. **Developer Docs**: Component architecture and extension guide

---

## 🚀 Quick Start Command

```bash
# Install dependencies
npm install

# Start development server with simulation data
npm run dev:simulation

# Access dashboard at http://localhost:3000
# Test credentials:
#   User: john_doe / password123 (User role)
#   Viewer: jane_viewer / viewer123 (Viewer role)
```

---

**Project Goal**: Create a production-ready User and Viewer dashboard that provides comprehensive device monitoring, sensor visualization, activity tracking, and account management - all seamlessly integrated with the existing Admin API.

**Key Differentiators**: 
- Permission-aware UI that adapts to user role
- Rich sensor telemetry with threshold alerts
- Real-time notifications with smart categorization
- Intuitive drag-and-drop dashboard customization
- Beautiful data visualizations with actionable insights

**Status**: Ready for implementation - All specifications and designs finalized
