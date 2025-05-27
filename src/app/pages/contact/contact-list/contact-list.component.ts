import { Component, OnInit } from '@angular/core';

// Định nghĩa interfaces
interface TeamMember {
  id: number;
  avatar: string;
}

interface Compliance {
  kyc: boolean;
  cc: boolean;
  ra: boolean;
  ag: boolean;
}

interface Metrics {
  matters: number;
  projects: number;
}

interface ContactDetails {
  phone: string;
  address: string;
  city: string;
  googleMapUrl: string;
  metrics: Metrics;
  team: TeamMember[];
  compliance: Compliance;
}

interface Stages {
  type: string;
  numbers: number[];
  completed: number[];
  pending: number[];
  toDo: number[];
}

interface Contact {
  id: number;
  name: string;
  email: string;
  type: 'Lead' | 'Client' | 'Prospect' | 'Opponent' | 'User';
  phone: string;
  avatar: string;
  stages: Stages;
  responsible: string;
  status: 'Active' | 'Pending' | 'Inactive';
  expanded: boolean;
  details: ContactDetails;
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less'],
})
export class ContactListComponent implements OnInit {
  contactList: Contact[] = [
    {
      id: 1,
      name: 'Sophia Martin',
      email: 'sophia.martin@abclawfirm.com',
      type: 'Lead',
      phone: '+971 50 275 3299',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=150&h=150&fit=crop&crop=face',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [1],
        pending: [2],
        toDo: [3, 4],
      },
      responsible: 'Jennifer Adams',
      status: 'Active',
      expanded: false,
      details: {
        phone: '+971 50 275 3299',
        address: '350, Building 17, Bay Square, Business Bay',
        city: 'Dubai, UAE',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 5,
          projects: 9,
        },
        team: [
          {
            id: 1,
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          },
          {
            id: 2,
            avatar:
              'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face',
          },
          { id: 3, avatar: '' },
        ],
        compliance: {
          kyc: true,
          cc: true,
          ra: false,
          ag: false,
        },
      },
    },
    {
      id: 2,
      name: 'Ahmed Al Rashid',
      email: 'ahmed.rashid@dubailaw.ae',
      type: 'Client',
      phone: '+971 55 123 4567',
      avatar: '',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [1, 2, 3],
        pending: [4],
        toDo: [],
      },
      responsible: 'John Smith',
      status: 'Active',
      expanded: false,
      details: {
        phone: '+971 55 123 4567',
        address: 'Al Wasl Road, Jumeirah',
        city: 'Dubai, UAE',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 8,
          projects: 12,
        },
        team: [
          {
            id: 1,
            avatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          },
          { id: 2, avatar: '' },
        ],
        compliance: {
          kyc: true,
          cc: true,
          ra: true,
          ag: false,
        },
      },
    },
    {
      id: 3,
      name: 'Emily Johnson',
      email: 'emily.johnson@legalpartners.com',
      type: 'Prospect',
      phone: '+1 555 987 6543',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [1, 2],
        pending: [3],
        toDo: [4],
      },
      responsible: 'Sarah Wilson',
      status: 'Pending',
      expanded: false,
      details: {
        phone: '+1 555 987 6543',
        address: '123 Main Street',
        city: 'New York, USA',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 3,
          projects: 6,
        },
        team: [
          {
            id: 1,
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          },
          { id: 2, avatar: '' },
          { id: 3, avatar: '' },
        ],
        compliance: {
          kyc: false,
          cc: true,
          ra: false,
          ag: false,
        },
      },
    },
    {
      id: 4,
      name: 'Mohammed Hassan',
      email: 'mohammed.hassan@gulf-legal.com',
      type: 'Lead',
      phone: '+971 50 999 8888',
      avatar: '',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [],
        pending: [1],
        toDo: [2, 3, 4],
      },
      responsible: 'Ali Ibrahim',
      status: 'Active',
      expanded: false,
      details: {
        phone: '+971 50 999 8888',
        address: 'Sheikh Zayed Road',
        city: 'Abu Dhabi, UAE',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 2,
          projects: 4,
        },
        team: [
          { id: 1, avatar: '' },
          { id: 2, avatar: '' },
        ],
        compliance: {
          kyc: false,
          cc: false,
          ra: false,
          ag: false,
        },
      },
    },
    {
      id: 5,
      name: 'Lisa Chen',
      email: 'lisa.chen@international-law.sg',
      type: 'Client',
      phone: '+65 9876 5432',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [1, 2, 3, 4],
        pending: [],
        toDo: [],
      },
      responsible: 'David Lee',
      status: 'Active',
      expanded: false,
      details: {
        phone: '+65 9876 5432',
        address: 'Marina Bay Sands',
        city: 'Singapore',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 15,
          projects: 22,
        },
        team: [
          {
            id: 1,
            avatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          },
          {
            id: 2,
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          },
          { id: 3, avatar: '' },
          { id: 4, avatar: '' },
        ],
        compliance: {
          kyc: true,
          cc: true,
          ra: true,
          ag: true,
        },
      },
    },
    {
      id: 6,
      name: 'Robert Brown',
      email: 'robert.brown@uk-solicitors.co.uk',
      type: 'Opponent',
      phone: '+44 20 7946 0958',
      avatar: '',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [1],
        pending: [2, 3],
        toDo: [4],
      },
      responsible: 'James Parker',
      status: 'Inactive',
      expanded: false,
      details: {
        phone: '+44 20 7946 0958',
        address: 'Canary Wharf',
        city: 'London, UK',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 4,
          projects: 7,
        },
        team: [{ id: 1, avatar: '' }],
        compliance: {
          kyc: true,
          cc: false,
          ra: false,
          ag: false,
        },
      },
    },
    {
      id: 7,
      name: 'Fatima Al Zahra',
      email: 'fatima.alzahra@mena-legal.com',
      type: 'Lead',
      phone: '+971 56 777 1234',
      avatar:
        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [1, 2],
        pending: [3, 4],
        toDo: [],
      },
      responsible: 'Omar Khalil',
      status: 'Active',
      expanded: false,
      details: {
        phone: '+971 56 777 1234',
        address: 'Dubai Marina',
        city: 'Dubai, UAE',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 6,
          projects: 10,
        },
        team: [
          {
            id: 1,
            avatar:
              'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face',
          },
          { id: 2, avatar: '' },
          { id: 3, avatar: '' },
        ],
        compliance: {
          kyc: true,
          cc: false,
          ra: true,
          ag: false,
        },
      },
    },
    {
      id: 8,
      name: 'Michael Thompson',
      email: 'michael.thompson@global-law.au',
      type: 'User',
      phone: '+61 2 9876 5432',
      avatar: '',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [1, 2, 3],
        pending: [],
        toDo: [4],
      },
      responsible: 'Internal',
      status: 'Active',
      expanded: false,
      details: {
        phone: '+61 2 9876 5432',
        address: 'Sydney Opera House',
        city: 'Sydney, Australia',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 1,
          projects: 2,
        },
        team: [{ id: 1, avatar: '' }],
        compliance: {
          kyc: true,
          cc: true,
          ra: false,
          ag: false,
        },
      },
    },
    {
      id: 9,
      name: 'Anna Petrov',
      email: 'anna.petrov@euro-legal.de',
      type: 'Prospect',
      phone: '+49 30 1234 5678',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [],
        pending: [1],
        toDo: [2, 3, 4],
      },
      responsible: 'Maria Schmidt',
      status: 'Pending',
      expanded: false,
      details: {
        phone: '+49 30 1234 5678',
        address: 'Brandenburg Gate',
        city: 'Berlin, Germany',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 2,
          projects: 3,
        },
        team: [
          {
            id: 1,
            avatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          },
          { id: 2, avatar: '' },
        ],
        compliance: {
          kyc: false,
          cc: true,
          ra: false,
          ag: false,
        },
      },
    },
    {
      id: 10,
      name: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@latam-legal.mx',
      type: 'Client',
      phone: '+52 55 9876 5432',
      avatar: '',
      stages: {
        type: 'KYC',
        numbers: [1, 2, 3, 4],
        completed: [1, 2],
        pending: [],
        toDo: [3, 4],
      },
      responsible: 'Isabella Garcia',
      status: 'Active',
      expanded: false,
      details: {
        phone: '+52 55 9876 5432',
        address: 'Polanco District',
        city: 'Mexico City, Mexico',
        googleMapUrl: 'https://maps.google.com',
        metrics: {
          matters: 9,
          projects: 14,
        },
        team: [
          { id: 1, avatar: '' },
          {
            id: 2,
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          },
          { id: 3, avatar: '' },
        ],
        compliance: {
          kyc: true,
          cc: true,
          ra: true,
          ag: false,
        },
      },
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleExpand(contact: Contact): void {
    contact.expanded = !contact.expanded;
  }

  getFirstLetter(name: string): string {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '';
  }

  // Helper functions to handle stages display
  isStageComplete(contact: Contact, stageNum: number): boolean {
    return contact.stages?.completed?.includes(stageNum) ?? false;
  }

  isStagePending(contact: Contact, stageNum: number): boolean {
    return contact.stages?.pending?.includes(stageNum) ?? false;
  }

  isStageToDo(contact: Contact, stageNum: number): boolean {
    return contact.stages?.toDo?.includes(stageNum) ?? false;
  }

  // Function to handle avatar display
  getExtraAvatarCount(contact: Contact): number {
    const visibleAvatars = 4; // Number of avatars to show before +X
    return contact.details?.team
      ? Math.max(0, contact.details.team.length - visibleAvatars)
      : 0;
  }

  getInitials(name: string): string {
    if (!name) return '';

    // Nếu tên có 2 từ trở lên, lấy chữ cái đầu của từ đầu tiên và từ cuối cùng
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
      ).toUpperCase();
    }

    // Nếu chỉ có 1 từ, lấy 2 chữ cái đầu tiên
    return name.substring(0, 2).toUpperCase();
  }

  getAvatarColor(name: string): string {
    if (!name) return '#1890ff';

    // Tạo màu dựa vào tên (có thể điều chỉnh)
    const colors: string[] = [
      '#1890ff',
      '#52c41a',
      '#faad14',
      '#f5222d',
      '#722ed1',
      '#13c2c2',
    ];
    const hash = name.split('').reduce((acc: number, char: string) => {
      return acc + char.charCodeAt(0);
    }, 0);

    return colors[hash % colors.length];
  }

  // Additional helper methods với proper typing
  getContactById(id: number): Contact | undefined {
    return this.contactList.find((contact) => contact.id === id);
  }

  getContactsByType(type: Contact['type']): Contact[] {
    return this.contactList.filter((contact) => contact.type === type);
  }

  getContactsByStatus(status: Contact['status']): Contact[] {
    return this.contactList.filter((contact) => contact.status === status);
  }

  updateContactStatus(contactId: number, status: Contact['status']): void {
    const contact = this.getContactById(contactId);
    if (contact) {
      contact.status = status;
    }
  }

  getTeamMemberCount(contact: Contact): number {
    return contact.details?.team?.length ?? 0;
  }

  hasCompletedAllStages(contact: Contact): boolean {
    return (
      contact.stages?.completed?.length === contact.stages?.numbers?.length
    );
  }

  getStageProgress(contact: Contact): number {
    if (!contact.stages?.numbers?.length) return 0;
    const completedCount = contact.stages.completed?.length ?? 0;
    return (completedCount / contact.stages.numbers.length) * 100;
  }
}
