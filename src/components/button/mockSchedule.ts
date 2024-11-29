// mockSchedules.ts

export interface Schedule {
    schedule_id: number;
    plan: string;
    date: string;
    room_id: string;
    scheduleItem: {
      schedule_id: number;
      marker_id?:number;
      title?: string;
      address: string;
      content: string;
    }[];
  }
  
  export const mockSchedules: Schedule[] = [
    {
      schedule_id: 1,
      plan: "A",
      date: "11/27",
      room_id: "room1",
      scheduleItem: [
        {
          schedule_id: 1,
          marker_id: 1,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
        {
          schedule_id: 1,
          marker_id: 2,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
        {
          schedule_id: 1,
          marker_id: 3,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
        {
          schedule_id: 1,
          marker_id: 4,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
      ],
    },
    {
      schedule_id: 2,
      plan: "A",
      date: "11/28",
      room_id: "room1",
      scheduleItem: [
        {
          schedule_id: 2,
          marker_id: 1,
          title: "Visit Louvre Museum",
          address: "Rue de Rivoli, Paris",
          content: "World's largest art museum.",
        },
        {
          schedule_id: 2,
          marker_id: 2,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
        {
          schedule_id: 2,
          marker_id: 3,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
      ],
    },
    {
      schedule_id: 3,
      plan: "A",
      date: "11/29",
      room_id: "room1",
      scheduleItem: [
        {
          schedule_id: 3,
          marker_id: 1,
          title: "Visit Statue of Liberty",
          address: "Liberty Island, New York",
          content: "Iconic symbol of freedom.",
        },
        {
          schedule_id: 3,
          marker_id: 2,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
        {
          schedule_id: 3,
          marker_id: 3,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
      ],
    },
    {
      schedule_id: 4,
      plan: "B",
      date: "11/27",
      room_id: "room2",
      scheduleItem: [
        {
          schedule_id: 4,
          marker_id: 1,
          title: "Visit Statue of Liberty",
          address: "Liberty Island, New York",
          content: "Iconic symbol of freedom.",
        },
        {
          schedule_id: 4,
          marker_id: 2,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
        {
          schedule_id: 4,
          marker_id: 3,
          title: "Visit Eiffel Tower",
          address: "Champ de Mars, Paris",
          content: "Iconic landmark of Paris.",
        },
      ],
    },
  ];