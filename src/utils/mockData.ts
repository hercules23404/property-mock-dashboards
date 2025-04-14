
import { Building, Home, FileSpreadsheet, FileText, BarChart3, Bell, Settings, UserCircle, Wrench, Calendar, Mail, ShieldCheck, Users, HelpCircle } from "lucide-react";

export type UserRole = "admin" | "tenant";

export const adminNavigationItems = [
  { 
    name: "Dashboard", 
    href: "/admin", 
    icon: BarChart3 
  },
  { 
    name: "Society Management", 
    href: "/admin/society", 
    icon: Building 
  },
  { 
    name: "Tenant Management", 
    href: "/admin/tenants", 
    icon: Users 
  },
  { 
    name: "Property Listings", 
    href: "/admin/properties", 
    icon: Home 
  },
  { 
    name: "Maintenance Requests", 
    href: "/admin/maintenance", 
    icon: Wrench 
  },
  { 
    name: "Notice Board", 
    href: "/admin/notices", 
    icon: Bell 
  },
  { 
    name: "Settings", 
    href: "/admin/settings", 
    icon: Settings 
  },
];

export const tenantNavigationItems = [
  { 
    name: "Dashboard", 
    href: "/tenant", 
    icon: BarChart3 
  },
  { 
    name: "My Property", 
    href: "/tenant/property", 
    icon: Home 
  },
  { 
    name: "Maintenance Requests", 
    href: "/tenant/maintenance", 
    icon: Wrench 
  },
  { 
    name: "Notice Board", 
    href: "/tenant/notices", 
    icon: Bell 
  },
  { 
    name: "My Documents", 
    href: "/tenant/documents", 
    icon: FileText 
  },
  { 
    name: "Settings", 
    href: "/tenant/settings", 
    icon: Settings 
  },
];

export const mockAdminUser = {
  name: "Alex Morgan",
  email: "alex.morgan@propertymanagement.com",
  role: "admin",
  avatar: "https://i.pravatar.cc/150?img=11"
};

export const mockTenantUser = {
  name: "Jordan Smith",
  email: "jordan.smith@example.com",
  role: "tenant",
  avatar: "https://i.pravatar.cc/150?img=12"
};

export const mockProperties = [
  {
    id: 1,
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90210",
    type: "Apartment Complex",
    units: 24,
    occupancyRate: 92,
    maintenanceRequests: 5,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Oceanview Residences",
    address: "456 Ocean Ave, Miami, FL 33139",
    type: "Condominium",
    units: 18,
    occupancyRate: 78,
    maintenanceRequests: 3,
    image: "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Highland Towers",
    address: "789 Highland St, Seattle, WA 98101",
    type: "High-rise",
    units: 36,
    occupancyRate: 84,
    maintenanceRequests: 8,
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Park Place Residences",
    address: "101 Park Pl, New York, NY 10007",
    type: "Apartment Complex",
    units: 42,
    occupancyRate: 95,
    maintenanceRequests: 4,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Riverside Villas",
    address: "222 River Rd, Chicago, IL 60608",
    type: "Townhouses",
    units: 16,
    occupancyRate: 81,
    maintenanceRequests: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop"
  }
];

export const mockTenants = [
  {
    id: 1,
    name: "Jordan Smith",
    email: "jordan.smith@example.com",
    phone: "(555) 123-4567",
    property: "Sunset Apartments",
    unit: "A-101",
    moveInDate: "2023-01-15",
    leaseEnd: "2024-01-14",
    rentStatus: "Paid",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 2,
    name: "Riley Johnson",
    email: "riley.johnson@example.com",
    phone: "(555) 234-5678",
    property: "Sunset Apartments",
    unit: "B-202",
    moveInDate: "2022-08-01",
    leaseEnd: "2023-08-01",
    rentStatus: "Late",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: 3,
    name: "Casey Williams",
    email: "casey.williams@example.com",
    phone: "(555) 345-6789",
    property: "Oceanview Residences",
    unit: "505",
    moveInDate: "2023-03-10",
    leaseEnd: "2024-03-09",
    rentStatus: "Paid",
    avatar: "https://i.pravatar.cc/150?img=23"
  },
  {
    id: 4,
    name: "Taylor Brown",
    email: "taylor.brown@example.com",
    phone: "(555) 456-7890",
    property: "Highland Towers",
    unit: "1201",
    moveInDate: "2022-11-01",
    leaseEnd: "2023-11-01",
    rentStatus: "Paid",
    avatar: "https://i.pravatar.cc/150?img=54"
  },
  {
    id: 5,
    name: "Morgan Davis",
    email: "morgan.davis@example.com",
    phone: "(555) 567-8901",
    property: "Park Place Residences",
    unit: "D-303",
    moveInDate: "2023-05-15",
    leaseEnd: "2024-05-14",
    rentStatus: "Pending",
    avatar: "https://i.pravatar.cc/150?img=45"
  }
];

export const mockMaintenanceRequests = [
  {
    id: 1,
    property: "Sunset Apartments",
    unit: "A-101",
    tenant: "Jordan Smith",
    category: "Plumbing",
    issue: "Leaky faucet in kitchen",
    priority: "Medium",
    status: "Open",
    dateSubmitted: "2023-06-10",
    assignedTo: "Mike Technician",
    dueDate: "2023-06-15"
  },
  {
    id: 2,
    property: "Oceanview Residences",
    unit: "505",
    tenant: "Casey Williams",
    category: "Electrical",
    issue: "Outlet not working in bedroom",
    priority: "High",
    status: "In Progress",
    dateSubmitted: "2023-06-05",
    assignedTo: "Sarah Electrician",
    dueDate: "2023-06-12"
  },
  {
    id: 3,
    property: "Highland Towers",
    unit: "1201",
    tenant: "Taylor Brown",
    category: "HVAC",
    issue: "AC not cooling properly",
    priority: "High",
    status: "In Progress",
    dateSubmitted: "2023-06-08",
    assignedTo: "John Technician",
    dueDate: "2023-06-13"
  },
  {
    id: 4,
    property: "Sunset Apartments",
    unit: "B-202",
    tenant: "Riley Johnson",
    category: "Appliance",
    issue: "Refrigerator making loud noise",
    priority: "Low",
    status: "Open",
    dateSubmitted: "2023-06-11",
    assignedTo: "Unassigned",
    dueDate: "2023-06-18"
  },
  {
    id: 5,
    property: "Park Place Residences",
    unit: "D-303",
    tenant: "Morgan Davis",
    category: "Structural",
    issue: "Ceiling crack in bathroom",
    priority: "Medium",
    status: "Open",
    dateSubmitted: "2023-06-09",
    assignedTo: "Unassigned",
    dueDate: "2023-06-16"
  },
  {
    id: 6,
    property: "Highland Towers",
    unit: "908",
    tenant: "Jamie Wilson",
    category: "Plumbing",
    issue: "Clogged toilet",
    priority: "Medium",
    status: "Completed",
    dateSubmitted: "2023-06-02",
    assignedTo: "Mike Technician",
    dueDate: "2023-06-05"
  }
];

export const mockNotices = [
  {
    id: 1,
    title: "Annual Building Maintenance",
    content: "We will be conducting annual maintenance checks on all units starting June 20th. Access to your unit will be required for approximately 30 minutes.",
    category: "Maintenance",
    priority: "Medium",
    datePosted: "2023-06-05",
    postedBy: "Alex Morgan",
    properties: ["All Properties"]
  },
  {
    id: 2,
    title: "Pool Closure for Cleaning",
    content: "The community pool will be closed for cleaning and maintenance from June 15th to June 17th. We apologize for any inconvenience.",
    category: "Amenities",
    priority: "Low",
    datePosted: "2023-06-08",
    postedBy: "Alex Morgan",
    properties: ["Sunset Apartments", "Oceanview Residences"]
  },
  {
    id: 3,
    title: "Fire Alarm Testing",
    content: "Mandatory fire alarm testing will be conducted on June 22nd from 10 AM to 12 PM. Brief alarm sounds will occur during this period.",
    category: "Safety",
    priority: "High",
    datePosted: "2023-06-10",
    postedBy: "Building Safety Officer",
    properties: ["Highland Towers", "Park Place Residences"]
  },
  {
    id: 4,
    title: "New Package Delivery System",
    content: "We're implementing a new digital package notification system starting July 1st. Please register your email to receive delivery notifications.",
    category: "Building Update",
    priority: "Medium",
    datePosted: "2023-06-12",
    postedBy: "Management Office",
    properties: ["All Properties"]
  },
  {
    id: 5,
    title: "Resident Summer BBQ",
    content: "Join us for our annual summer BBQ on July 8th from 4 PM to 8 PM in the courtyard. Food and refreshments will be provided.",
    category: "Community Event",
    priority: "Low",
    datePosted: "2023-06-15",
    postedBy: "Community Manager",
    properties: ["Sunset Apartments"]
  }
];

export const mockDocuments = [
  {
    id: 1,
    name: "Lease Agreement",
    type: "PDF",
    size: "2.4 MB",
    uploaded: "2023-01-15",
    category: "Contract",
    status: "Active"
  },
  {
    id: 2,
    name: "Renter's Insurance",
    type: "PDF",
    size: "1.8 MB",
    uploaded: "2023-01-20",
    category: "Insurance",
    status: "Active"
  },
  {
    id: 3,
    name: "Move-in Checklist",
    type: "DOCX",
    size: "650 KB",
    uploaded: "2023-01-15",
    category: "Inspection",
    status: "Completed"
  },
  {
    id: 4,
    name: "Building Rules & Regulations",
    type: "PDF",
    size: "1.2 MB",
    uploaded: "2023-01-15",
    category: "Policies",
    status: "Active"
  },
  {
    id: 5,
    name: "Parking Permit Application",
    type: "PDF",
    size: "890 KB",
    uploaded: "2023-02-10",
    category: "Application",
    status: "Approved"
  }
];

export const mockDashboardStats = {
  admin: {
    properties: 5,
    tenants: 98,
    vacancies: 12,
    maintenanceRequests: 24,
    pendingRent: "$24,500",
    collectedRent: "$142,800",
  },
  tenant: {
    nextPayment: "$1,250",
    dueDate: "July 1, 2023",
    maintenanceRequests: 2,
    documents: 5,
    messages: 3,
    upcomingEvents: 2,
  }
};

export const mockActivities = {
  admin: [
    { id: 1, action: "New tenant signed lease", property: "Sunset Apartments, Unit A-304", time: "2 hours ago" },
    { id: 2, action: "Maintenance request completed", property: "Highland Towers, Unit 908", time: "4 hours ago" },
    { id: 3, action: "Rent payment received", property: "Oceanview Residences, Unit 505", time: "Yesterday" },
    { id: 4, action: "New maintenance request", property: "Park Place Residences, Unit D-303", time: "Yesterday" },
    { id: 5, action: "Lease renewal processed", property: "Sunset Apartments, Unit B-202", time: "2 days ago" }
  ],
  tenant: [
    { id: 1, action: "Maintenance request updated", details: "Status changed to 'In Progress'", time: "1 day ago" },
    { id: 2, action: "Rent payment confirmed", details: "Payment for June 2023", time: "5 days ago" },
    { id: 3, action: "New notice posted", details: "Annual Building Maintenance", time: "1 week ago" },
    { id: 4, action: "Document uploaded", details: "Updated Renter's Insurance", time: "2 weeks ago" },
  ]
};
