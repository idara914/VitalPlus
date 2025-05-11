const { default: Link } = require("next/link");

export const resourseItems = [
  {
    key: "training",
    label: <Link href={"/resource/training"}>Training</Link>,
  },
  {
    key: "missing-compliance",
    label: (
      <Link href={"/resource/missing-compliance"}>Missing Compliance</Link>
    ),
  },
  {
    key: "texas-evv",
    label: <Link href={"/resource/texas-evv"}>Texas EVV</Link>,
  },
];

export const adminItems = [
  {
    key: "manage-report-subscription",
    label: (
      <Link href={"/admin/manage-report-subscription"}>
        Manage Report Subscription
      </Link>
    ),
  },
  {
    key: "import-files",
    label: <Link href={"/admin/import-files"}>Import Files</Link>,
  },
  {
    key: "evv-aggregation-transaction-manager",
    label: (
      <Link href={"/admin/evv-aggregation-transaction-manager"}>
        EVV Aggregation Transaction Manager
      </Link>
    ),
  },
  {
    key: "mobile-user-management",
    label: (
      <Link href={"/admin/mobile-user-management"}>Mobile User Management</Link>
    ),
  },
  {
    key: "user-management",
    label: <Link href={"/admin/user-management"}>User Management</Link>,
  },
  {
    key: "change-password",
    label: <Link href={"/admin/change-password"}>Change Password</Link>,
  },
  {
    key: "payer-setup",
    label: <Link href={"/admin/payer-setup"}>Payer Setup</Link>,
  },
  {
    key: "coordinator-setup",
    label: <Link href={"/admin/coordinator-setup"}>Coordinator Setup</Link>,
  },
  {
    key: "compliance-setup",
    label: <Link href={"/admin/compliance-setup"}>Compliance Setup</Link>,
  },
  {
    key: "reference-table-management",
    label: (
      <Link href={"/admin/reference-table-management"}>
        Reference Table Management
      </Link>
    ),
  },
  {
    key: "provider-profile",
    label: <Link href={"/admin/provider-profile"}>Provider Profile</Link>,
  },
  {
    key: "process-monitor",
    label: <Link href={"/admin/process-monitor"}>Process Monitor</Link>,
  },
  {
    key: "search-payer",
    label: <Link href={"/admin/search-payer"}>Search Payer</Link>,
  },
  {
    key: "background-report-monitor",
    label: (
      <Link href={"/admin/background-report-monitor"}>
        Background Report Monitor
      </Link>
    ),
  },
  {
    key: "duty-list-setup",
    label: <Link href={"/admin/duty-list-setup"}>Duty List Setup</Link>,
  },
  {
    key: "org-structure",
    label: <Link href={"/admin/org-structure"}>Org Structure</Link>,
  },
  {
    key: "office-setup",
    label: <Link href={"/admin/office-setup"}>Office Setup</Link>,
  },
  {
    key: "payroll-setup",
    label: <Link href={"/admin/payroll-setup"}>Payroll Setup</Link>,
  },
];

export const reportItems = [
  {
    key: "members",
    label: <Link href={"/report/members"}>Members</Link>,
  },
  {
    key: "member-roster",
    label: <Link href={"/report/member-roster"}>Member Roster</Link>,
  },
  {
    key: "expiring-benefit-plan",
    label: (
      <Link href={"/report/expiring-benefit-plan"}>Expiring Benefit Plan</Link>
    ),
  },
  {
    key: "payroll",
    label: <Link href={"/report/payroll"}>Payroll</Link>,
  },
  {
    key: "payroll-metrics",
    label: <Link href={"/report/payroll-metrics"}>Payroll Metrics</Link>,
  },
  {
    key: "referrals",
    label: <Link href={"/report/referrals"}>Referrals</Link>,
  },
  {
    key: "sales",
    label: <Link href={"/report/sales"}>Sales</Link>,
  },
  {
    key: "time-and-attendance",
    label: (
      <Link href={"/report/time-and-attendance"}>Time and Attendance</Link>
    ),
  },
  {
    key: "provider",
    label: <Link href={"/report/provider"}>Provider</Link>,
  },
  {
    key: "visits",
    label: <Link href={"/report/visits"}>Visits</Link>,
  },
];

export const memberItems = [
  {
    key: "member-search",
    label: <Link href={"/member/search"}>Member Search</Link>,
  },
  {
    key: "new-member",
    label: <Link href={"/member/new"}>New Member</Link>,
  },
  {
    key: "PreAuthorization",
    label: <Link href={"/member/PreAuthorization"}>PreAuthorization</Link>,
  },
  {
    key: "Eligibility Verification",
    label: <Link href={"/member/eligibility"}>eligibility</Link>,
  },
  {
    key: "assessments",
    label: <Link href={"/member/assesments"}>Assessments</Link>,
  },
];

export const careProviderItems = [
  {
    key: "new-provider",
    label: <Link href={"/care-provider/new"}>New Provider</Link>,
  },
  {
    key: "provider-search",
    label: <Link href={"/care-provider/search"}>Provider Search</Link>,
  },
  {
    key: "bulk-provider-manager",
    label: (
      <Link href={"/care-provider/bulk-manager"}>Bulk Provider Manager</Link>
    ),
  },
  {
    key: "contact-provider",
    label: <Link href={"/care-provider/contact"}>Contact Provider</Link>,
  },
];

export const visitItems = [
  {
    key: "call-dashboard",
    label: <Link href={"/visit/call-dashboard"}>Call Dashboard</Link>,
  },
  {
    key: "visit-search",
    label: <Link href={"/visit/search"}>Visit Search</Link>,
  },
  {
    key: "appointments",
    label: <Link href={"/visit/appointments"}>Appointments</Link>,
  },
  {
    key: "bulk-visit-maintenance",
    label: (
      <Link href={"/visit/bulk-visit-maintenance"}>Bulk Visit Maintenance</Link>
    ),
  },
];

export const actionItems = [
  {
    key: "in-service",
    label: <Link href={"/action/in-service"}>In Service</Link>,
  },
  {
    key: "bulk-shift-manager",
    label: <Link href={"/action/bulk-shift-manager"}>Bulk Shift Manager</Link>,
  },
  {
    key: "payroll",
    label: <Link href={"/action/payroll"}>Payroll</Link>,
  },
  {
    key: "order-tracking",
    label: <Link href={"/action/order-tracking"}>Order Tracking</Link>,
  },
  {
    key: "confirm-timesheet",
    label: <Link href={"/action/confirm-timesheet"}>Confirm Timesheet</Link>,
  },
  {
    key: "broadcast-message",
    label: <Link href={"/action/broadcast-message"}>Broadcast Message</Link>,
  },
  {
    key: "exclusion-verification-lists",
    label: (
      <Link href={"/action/exclusion-verification-lists"}>
        Exclusion/Verification Lists
      </Link>
    ),
  },
  {
    key: "collection",
    label: <Link href={"/action/collection"}>Collection</Link>,
  },
  {
    key: "overtime-dashboard",
    label: <Link href={"/action/overtime-dashboard"}>Overtime Dashboard</Link>,
  },
  {
    key: "pto-approval",
    label: <Link href={"/action/pto-approval"}>PTO Approval</Link>,
  },
  {
    key: "bulk-pay-rate-adjust",
    label: (
      <Link href={"/action/bulk-pay-rate-adjust"}>Bulk Pay Rate Adjust</Link>
    ),
  },
  {
    key: "travel-time",
    label: <Link href={"/action/travel-time"}>Travel Time</Link>,
  },
  {
    key: "broadcast-dashboard",
    label: (
      <Link href={"/action/broadcast-dashboard"}>Broadcast Dashboard</Link>
    ),
  },
  {
    key: "operation-worklist",
    label: <Link href={"/action/operation-worklist"}>Operation Worklist</Link>,
  },
];

export const billingItems = [
  {
    key: "print-invoices",
    label: <Link href={"/billings/print-invoices"}>Print Invoices</Link>,
  },
  {
    key: "print-duty-sheets",
    label: <Link href={"/billings/print-duty-sheets"}>Print Duty Sheets</Link>,
  },
  {
    key: "new-invoice-batch",
    label: <Link href={"/billings/new-invoice-batch"}>New Invoice Batch</Link>,
  },
  {
    key: "new-invoice-internal",
    label: (
      <Link href={"/billings/new-invoice-internal"}>
        New Invoice (Internal)
      </Link>
    ),
  },
  {
    key: "electronic-billing",
    label: (
      <Link href={"/billings/electronic-billing"}>Electronic Billing</Link>
    ),
  },
  {
    key: "cash-payment",
    label: <Link href={"/billings/cash-payment"}>Cash Payment</Link>,
  },
  {
    key: "bulk-claim-maintenance",
    label: (
      <Link href={"/billings/bulk-claim-maintenance"}>
        Bulk Claim Maintenance
      </Link>
    ),
  },
];
