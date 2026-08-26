export type AnnouncementCategory =
  | "Call for Papers"
  | "Event"
  | "Membership"
  | "Publication"
  | "General";

export type Announcement = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: AnnouncementCategory;
  publishedAt: string;
  isPinned?: boolean;
};
