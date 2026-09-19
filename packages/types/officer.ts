export type Officer = {
  id: string;
  firstname: string;
  middlename?: string | null;
  lastname: string;
  position: string;
  school: string;
  extension?: string | null;
  profile?: string | null;
  isOfficer: boolean;
  isFoundingOfficer: boolean;
  isCurrent: boolean;
};

/**
 * The RGAN XI officer hierarchy. Positions not listed here sort after these
 * roles alphabetically, so new roles can be added without a manual order.
 */
export const officerPositionPriority: Record<string, number> = {
  President: 1,
  "Vice-President for Operations": 2,
  "Vice-President for Partnerships": 3,
  Secretary: 4,
  Treasurer: 5,
  Auditor: 6,
  "Business Manager": 7,
  "Board of Directors": 8,
  Adviser: 9,
};

type SortableOfficer = Pick<Officer, "position" | "lastname" | "firstname" | "id">;

export function compareOfficersByPosition(
  left: SortableOfficer,
  right: SortableOfficer,
): number {
  const leftPriority =
    officerPositionPriority[left.position.trim()] ?? Number.MAX_SAFE_INTEGER;
  const rightPriority =
    officerPositionPriority[right.position.trim()] ?? Number.MAX_SAFE_INTEGER;

  if (leftPriority !== rightPriority) return leftPriority - rightPriority;

  return (
    left.lastname.localeCompare(right.lastname, undefined, { sensitivity: "base" }) ||
    left.firstname.localeCompare(right.firstname, undefined, { sensitivity: "base" }) ||
    left.id.localeCompare(right.id)
  );
}
