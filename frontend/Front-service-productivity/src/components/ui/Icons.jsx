// Coleccion de iconos SVG inline (sin dependencias externas).

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
};

export const LogoIcon = ({ className = 'h-6 w-6' }) => (
  <svg {...base} className={className}>
    <path d="M12 3 3 20h18L12 3Z" />
    <path d="m8.5 20 3.5-6.5L15.5 20" />
  </svg>
);

export const MailIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const LockIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const DashboardIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

export const ClockIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const AlertIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 9v5" />
    <path d="M12 17h.01" />
  </svg>
);

export const FlagIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <path d="M4 21V4" />
    <path d="M4 4h13l-2 4 2 4H4" />
  </svg>
);

export const CheckIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <path d="M4 12.5 9 17.5 20 6.5" />
  </svg>
);

export const LogoutIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
    <path d="M10 12h9" />
    <path d="m15 8 4 4-4 4" />
  </svg>
);

export const CalendarIcon = ({ className = 'h-4 w-4' }) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </svg>
);

export const RefreshIcon = ({ className = 'h-4 w-4' }) => (
  <svg {...base} className={className}>
    <path d="M20 11A8 8 0 1 0 18 16" />
    <path d="M20 5v6h-6" />
  </svg>
);
