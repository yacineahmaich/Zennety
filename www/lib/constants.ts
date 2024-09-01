import { Priority, Role } from "@/types/enums";

export const roles = [Role.OWNER, Role.ADMIN, Role.MEMBER, Role.VIEWER];

export const priorties = [
  {
    label: Priority.NORMAL,
    color: "#E7F0DC",
  },
  {
    label: Priority.MEDIUM,
    color: "#9195F6",
  },
  {
    label: Priority.HIGH,
    color: "#F6FB7A",
  },
  {
    label: Priority.URGENT,
    color: "#EE4E4E",
  },
];
