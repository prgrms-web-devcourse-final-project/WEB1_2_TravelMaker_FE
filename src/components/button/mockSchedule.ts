// mockSchedules.ts

export interface ScheduleItem {
  scheduleItemId: number;
  markerId?: number;
  name?: string;
  address: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  scheduleId: number; // 고유 ID
  plan: string; // 플랜 (예: "A", "B", "C")
  date: string; // 날짜 (예: "11/20")
  roomId: string; // 방 ID
  scheduleItems: ScheduleItem[]; // 일정 아이템 목록 (필수)
}

export const mockSchedules: Schedule[] = [
  {
    scheduleId: 6,
    date: "11/27",
    plan: "A",
    roomId: "3232",
    scheduleItems: [
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
    ],
  },
  {
    scheduleId: 6,
    date: "11/27",
    plan: "A",
    roomId: "3232",
    scheduleItems: [
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
    ],
  },
  {
    scheduleId: 6,
    date: "11/27",
    roomId: "3232",
    plan: "A",
    scheduleItems: [
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
    ],
  },
  {
    scheduleId: 6,
    date: "11/27",
    plan: "A",
    roomId: "3232",
    scheduleItems: [
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
      {
        scheduleItemId: 6,
        markerId: 5,
        name: "8G8CGCVP+62",
        address: "8G8CGCVP+62",
        content: "내용",
        createdAt: "2024-11-26T10:33:04.596194",
        updatedAt: "2024-11-26T10:33:04.596194",
      },
    ],
  },
];
