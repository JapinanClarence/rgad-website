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

/**
 * The official roster order for people sharing the Board of Directors role.
 * People not listed here retain the alphabetical fallback in the comparator.
 */
const officerNamePriority: Record<string, number> = {
  "Corazon Mamon-Umblero": 1,
  "Jeralyn N. Hemillan": 2,
  "Helina Jean P. Dupa": 3,
  "Joyce C. Jasa": 4,
  "Imelda T. Lauron": 5,
  "Jhonnel P. Villegas": 6,
};

type SortableOfficer = Pick<Officer, "position" | "lastname" | "firstname" | "id">;

function officerName(officer: SortableOfficer & { middlename?: string | null }) {
  return [officer.firstname, officer.middlename, officer.lastname]
    .filter(Boolean)
    .join(" ");
}

export function compareOfficersByPosition(
  left: SortableOfficer,
  right: SortableOfficer,
): number {
  const leftPriority =
    officerPositionPriority[left.position.trim()] ?? Number.MAX_SAFE_INTEGER;
  const rightPriority =
    officerPositionPriority[right.position.trim()] ?? Number.MAX_SAFE_INTEGER;

  if (leftPriority !== rightPriority) return leftPriority - rightPriority;

  if (left.position.trim() === "Board of Directors") {
    const leftNamePriority = officerNamePriority[officerName(left)] ?? Number.MAX_SAFE_INTEGER;
    const rightNamePriority = officerNamePriority[officerName(right)] ?? Number.MAX_SAFE_INTEGER;

    if (leftNamePriority !== rightNamePriority) {
      return leftNamePriority - rightNamePriority;
    }
  }

  return (
    left.lastname.localeCompare(right.lastname, undefined, { sensitivity: "base" }) ||
    left.firstname.localeCompare(right.firstname, undefined, { sensitivity: "base" }) ||
    left.id.localeCompare(right.id)
  );
}
