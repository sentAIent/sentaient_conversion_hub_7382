export enum AccountType {
  personal = 'personal',
  venue = 'venue',
  event = 'event'
}

export enum PrivacyTier {
  exact = 'exact',
  neighborhood = 'neighborhood',
  city = 'city',
  ghost = 'ghost'
}

export enum Color {
  GREEN = 'GREEN',
  RED = 'RED',
  ELECTRIC_BLUE = 'ELECTRIC_BLUE',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  DARK_BLUE = 'DARK_BLUE'
}

export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN'
}

export enum ContentType {
  photo = 'photo',
  video = 'video',
  audio = 'audio',
  text = 'text',
  doodle = 'doodle',
  moment = 'moment'
}

export enum SourceFlag {
  in_app_camera = 'in_app_camera',
  in_app_recorder = 'in_app_recorder',
  in_app_audio = 'in_app_audio',
  in_app_draw = 'in_app_draw',
  in_app_text = 'in_app_text'
}

export enum MeetingStatus {
  scheduled = 'scheduled',
  confirmed = 'confirmed',
  completed = 'completed',
  cancelled = 'cancelled'
}

export enum RsvpStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  declined = 'declined'
}

export enum ReferralStatus {
  pending = 'pending',
  completed = 'completed',
  expired = 'expired'
}

export enum PrivacyMode {
  public = 'public',
  private = 'private'
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  phoneVerified: boolean;
  profilePhotoUrl?: string;
  bio?: string;
  city?: string;
  cityCheckInCompleted: boolean;
  dateOfBirth?: string;
  ageVerified: boolean;
  accountType: AccountType;
  privacy: PrivacyMode;
  isActive: boolean;
  isPaused: boolean;
  trustScore: number;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  proStatus: boolean;
  proExpiresAt?: string;
  createdAt: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  venueId?: string;
  eventId?: string;
  popUpRoomId?: string;
  privacyTier: PrivacyTier;
  latitude: number;
  longitude: number;
  fuzzyLatitude: number;
  fuzzyLongitude: number;
  isActive: boolean;
  autoCheckIn: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface OpennessProfile {
  id: string;
  userId: string;
  activeColors: Color[];
  calendarSyncEnabled: boolean;
  showOnColorMap: boolean;
  updatedAt: string;
}

export interface ScheduleBlock {
  id: string;
  opennessProfileId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  colors: Color[];
}

export interface Content {
  id: string;
  userId: string;
  type: ContentType;
  mediaUrl?: string;
  textBody?: string;
  sourceFlag: SourceFlag;
  isMoment: boolean;
  expiresAt?: string;
  venueId?: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface Meeting {
  id: string;
  creatorId: string;
  title: string;
  venueId: string;
  scheduledAt: string;
  status: MeetingStatus;
  autoConfirmWindow: number;
  createdAt: string;
}

export interface MeetingParticipant {
  id: string;
  meetingId: string;
  userId: string;
  rsvpStatus: RsvpStatus;
  checkedIn: boolean;
  postMeetingRating?: number;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referralCode: string;
  status: ReferralStatus;
  completedAt?: string;
  expiresAt: string;
  rewardGranted: boolean;
}
