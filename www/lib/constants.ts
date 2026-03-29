import { Priority, Role } from "@/types/enums";

export const roles = [Role.OWNER, Role.ADMIN, Role.MEMBER, Role.GUEST];

export const priorties = [
  {
    label: Priority.NORMAL,
    color: "#9CA3AF",
  },
  {
    label: Priority.MEDIUM,
    color: "#60A5FA",
  },
  {
    label: Priority.HIGH,
    color: "#FBBF24",
  },
  {
    label: Priority.URGENT,
    color: "#F87171",
  },
];
