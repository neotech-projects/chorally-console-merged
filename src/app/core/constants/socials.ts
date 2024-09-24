export const list: Social[] = [
  /*
  const (
    FACEBOOK         = "facebook"
    INSTAGRAM        = "instagram"
    TWITTER          = "x"
    WHATSAPP         = "whatsapp"
    YOUTUBE          = "youtube"
    LINKEDIN         = "linkedin"
    TELEGRAM         = "telegram"
    GOOGLEMYBUSINESS = "google_my_business"
    TRUSTPILOT       = "trustpilot"
    POWERREVIEWS     = "powerreviews"
    MICROSOFT        = "microsoft"
    MAIL             = "mail"
)
  */
  {
    staticId: 'facebook',
    description: 'Facebook',
    enabled: true,
    selected: false,
    icon: getIcon('facebook'),
    name: 'facebook',
  },
  {
    staticId: 'instagram',
    description: 'Instagram',
    enabled: true,
    selected: false,
    icon: getIcon('instagram'),
    name: 'instagram',
  },
  {
    staticId: 'x',
    description: 'X',
    enabled: true,
    selected: false,
    icon: getIcon('twitter-x'),
    name: 'x',
  },
  {
    staticId: 'youtube',
    description: 'YouTube',
    selected: false,
    icon: getIcon('youtube'),
    name: 'youtube',
  },
  {
    staticId: 'linkedin',
    description: 'LinkedIn',
    selected: false,
    icon: getIcon('linkedin'),
    name: 'linkedin',
  },
  {
    staticId: 'whatsapp',
    description: 'WhatsApp',
    enabled: true,
    selected: false,
    icon: getIcon('whatsapp'),
    name: 'whatsapp',
  },
  {
    staticId: 'telegram',
    description: 'Telegram',
    selected: false,
    icon: getIcon('telegram'),
    name: 'telegram',
  },
  {
    staticId: 'mail',
    description: 'Email',
    selected: false,
    icon: getIcon('mail'),
    name: 'mail',
  },
  {
    staticId: 'trustpilot',
    description: 'Trustpilot',
    selected: false,
    icon: getIcon('trustpilot'),
    name: 'trustpilot',
  },
  // {
  //   staticId: 'microsoft',
  //   description: 'Microsoft 365',
  //   selected: false,
  //   icon: getIcon('microsoft'),
  //   name: 'microsoft',
  // },
  {
    staticId: 'powerreviews',
    description: 'Power Reviews',
    selected: false,
    icon: getIcon('power-reviews'),
    name: 'powerreviews',
  },
  {
    staticId: 'google_my_business',
    description: 'Google My Business',
    selected: false,
    icon: getIcon('google_my_business'),
    name: 'google_my_business',
  },
];

export function reset() {
  list.forEach((s) => (s.selected = false));
}

export interface Social {
  description: string;
  staticId: string;
  enabled?: boolean;
  selected: boolean;
  icon?: string;
  name: string;
}

function getIcon(staticId: string): string {
  return '/assets/images/template-channel-icon/unselected/' + staticId + '.svg';
}
