const { default: Link } = require("next/link");

export const resourseItems = [
  {
    key: "training",
    label: <Link href={"/training"}>Training</Link>,
  },
  {
    key: "missing-compliance",
    label: <Link href={"/missing-compliance"}>Missing Compliance</Link>,
  },
  {
    key: "texas-evv",
    label: <Link href={"/texas-evv"}>Texas EVV</Link>,
  },
];

export const adminItems = [
  {
    key: "manage-report-subscription",
    label: (
      <Link href={"/manage-report-subscription"}>
        Manage Report Subscription
      </Link>
    ),
  },
  {
    key: "import-files",
    label: <Link href={"/import-files"}>Import Files</Link>,
  },
  {
    key: "evv-aggregation-transaction-manager",
    label: (
      <Link href={"/evv-aggregation-transaction-manager"}>
        EVV Aggregation Transaction Manager
      </Link>
    ),
  },
  {
    key: "mobile-user-management",
    label: <Link href={"/mobile-user-management"}>Mobile User Management</Link>,
  },
  {
    key: "user-management",
    label: <Link href={"/user-management"}>User Management</Link>,
  },
  {
    key: "change-password",
    label: <Link href={"/change-password"}>Change Password</Link>,
  },
  {
    key: "payer-setup",
    label: <Link href={"/payer-setup"}>Payer Setup</Link>,
  },
  {
    key: "coordinator-setup",
    label: <Link href={"/coordinator-setup"}>Coordinator Setup</Link>,
  },
  {
    key: "compliance-setup",
    label: <Link href={"/compliance-setup"}>Compliance Setup</Link>,
  },
  {
    key: "reference-table-management",
    label: (
      <Link href={"/reference-table-management"}>
        Reference Table Management
      </Link>
    ),
  },
  {
    key: "provider-profile",
    label: <Link href={"/provider-profile"}>Provider Profile</Link>,
  },
  {
    key: "process-monitor",
    label: <Link href={"/process-monitor"}>Process Monitor</Link>,
  },
  {
    key: "search-payer",
    label: <Link href={"/search-payer"}>Search Payer</Link>,
  },
  {
    key: "background-report-monitor",
    label: (
      <Link href={"/background-report-monitor"}>Background Report Monitor</Link>
    ),
  },
  {
    key: "duty-list-setup",
    label: <Link href={"/duty-list-setup"}>Duty List Setup</Link>,
  },
  {
    key: "org-structure",
    label: <Link href={"/org-structure"}>Org Structure</Link>,
  },
  {
    key: "office-setup",
    label: <Link href={"/office-setup"}>Office Setup</Link>,
  },
  {
    key: "payroll-setup",
    label: <Link href={"/payroll-setup"}>Payroll Setup</Link>,
  },
];

export const reportItems = [
  {
    key: "members",
    label: <Link href={"/members"}>Members</Link>,
  },
  {
    key: "member-roster",
    label: <Link href={"/member-roster"}>Member Roster</Link>,
  },
  {
    key: "expiring-benefit-plan",
    label: <Link href={"/expiring-benefit-plan"}>Expiring Benefit Plan</Link>,
  },
  {
    key: "payroll",
    label: <Link href={"/payroll"}>Payroll</Link>,
  },
  {
    key: "payroll-metrics",
    label: <Link href={"/payroll-metrics"}>Payroll Metrics</Link>,
  },
  {
    key: "referrals",
    label: <Link href={"/referrals"}>Referrals</Link>,
  },
  {
    key: "sales",
    label: <Link href={"/sales"}>Sales</Link>,
  },
  {
    key: "time-and-attendance",
    label: <Link href={"/time-and-attendance"}>Time and Attendance</Link>,
  },
  {
    key: "provider",
    label: <Link href={"/provider"}>Provider</Link>,
  },
  {
    key: "visits",
    label: <Link href={"/visits"}>Visits</Link>,
  },
];

export const memberItems = [
  {
    key: "member-search",
    label: <Link href={"/member-search"}>Member Search</Link>,
  },
  {
    key: "new-member",
    label: <Link href={"/new-member"}>New Member</Link>,
  },
  {
    key: "supplies-rx-search",
    label: <Link href={"/supplies-rx-search"}>Supplies/RX Search</Link>,
  },
  {
    key: "claims",
    label: <Link href={"/claims"}>Claims</Link>,
  },
  {
    key: "assessments",
    label: <Link href={"/assessments"}>Assessments</Link>,
  },
];

export const careProviderItems = [
  {
    key: "new-provider",
    label: <Link href={"/new-provider"}>New Provider</Link>,
  },
  {
    key: "provider-search",
    label: <Link href={"/provider-search"}>Provider Search</Link>,
  },
  {
    key: "bulk-provider-manager",
    label: <Link href={"/bulk-provider-manager"}>Bulk Provider Manager</Link>,
  },
  {
    key: "contact-provider",
    label: <Link href={"/contact-provider"}>Contact Provider</Link>,
  },
];

export const visitItems = [
  {
    key: "call-dashboard",
    label: <Link href={"/call-dashboard"}>Call Dashboard</Link>,
  },
  {
    key: "visit-search",
    label: <Link href={"/visit-search"}>Visit Search</Link>,
  },
  {
    key: "appointments",
    label: <Link href={"/appointments"}>Appointments</Link>,
  },
  {
    key: "bulk-visit-maintenance",
    label: <Link href={"/bulk-visit-maintenance"}>Bulk Visit Maintenance</Link>,
  },
];

export const actionItems = [
  {
    key: "in-service",
    label: <Link href={"/in-service"}>In Service</Link>,
  },
  {
    key: "bulk-shift-manager",
    label: <Link href={"/bulk-shift-manager"}>Bulk Shift Manager</Link>,
  },
  {
    key: "payroll",
    label: <Link href={"/payroll"}>Payroll</Link>,
  },
  {
    key: "order-tracking",
    label: <Link href={"/order-tracking"}>Order Tracking</Link>,
  },
  {
    key: "confirm-timesheet",
    label: <Link href={"/confirm-timesheet"}>Confirm Timesheet</Link>,
  },
  {
    key: "broadcast-message",
    label: <Link href={"/broadcast-message"}>Broadcast Message</Link>,
  },
  {
    key: "exclusion-verification-lists",
    label: (
      <Link href={"/exclusion-verification-lists"}>
        Exclusion/Verification Lists
      </Link>
    ),
  },
  {
    key: "collection",
    label: <Link href={"/collection"}>Collection</Link>,
  },
  {
    key: "overtime-dashboard",
    label: <Link href={"/overtime-dashboard"}>Overtime Dashboard</Link>,
  },
  {
    key: "pto-approval",
    label: <Link href={"/pto-approval"}>PTO Approval</Link>,
  },
  {
    key: "bulk-pay-rate-adjust",
    label: <Link href={"/bulk-pay-rate-adjust"}>Bulk Pay Rate Adjust</Link>,
  },
  {
    key: "travel-time",
    label: <Link href={"/travel-time"}>Travel Time</Link>,
  },
  {
    key: "broadcast-dashboard",
    label: <Link href={"/broadcast-dashboard"}>Broadcast Dashboard</Link>,
  },
  {
    key: "operation-worklist",
    label: <Link href={"/operation-worklist"}>Operation Worklist</Link>,
  },
];

export const billingItems = [
  {
    key: "print-invoices",
    label: <Link href={"/print-invoices"}>Print Invoices</Link>,
  },
  {
    key: "print-duty-sheets",
    label: <Link href={"/print-duty-sheets"}>Print Duty Sheets</Link>,
  },
  {
    key: "new-invoice-batch",
    label: <Link href={"/new-invoice-batch"}>New Invoice Batch</Link>,
  },
  {
    key: "new-invoice-internal",
    label: <Link href={"/new-invoice-internal"}>New Invoice (Internal)</Link>,
  },
  {
    key: "electronic-billing",
    label: <Link href={"/electronic-billing"}>Electronic Billing</Link>,
  },
  {
    key: "cash-payment",
    label: <Link href={"/cash-payment"}>Cash Payment</Link>,
  },
  {
    key: "bulk-claim-maintenance",
    label: <Link href={"/bulk-claim-maintenance"}>Bulk Claim Maintenance</Link>,
  },
];
