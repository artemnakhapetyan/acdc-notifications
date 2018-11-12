export enum AcdcNotificationLevel {
  Success = "Success",
  Info = "Info",
  Warn = "Warn",
  Error = "Error"
}

export enum AcdcNotificationState {
  Created = "Created",
  Dismissed = "Dismissed"
}

export class AcdcToastNotifcationLevelConfig{
  titleColor?: string;
  messageColor?: string;
  backgroundColor?: string;
  iconsColor?: string;
}

export class AcdcToastsDefaultConfig{
  warn?: AcdcToastNotifcationLevelConfig;
  info?: AcdcToastNotifcationLevelConfig;
  error?: AcdcToastNotifcationLevelConfig;
  success?: AcdcToastNotifcationLevelConfig;
  titleColor?: string;
  messageColor?: string;
  backgroundColor?: string;
  iconsColor?: string;
  addToTop?: boolean;
  width?: string;
  titleFontSize?: string;
  messageFontSize?: string;
  titleFontFamily?: string;
  messageFontFamily?: string;
  zIndex?: string;
}

export class AcdcNotifcationsDefaultConfig{
  toast?: AcdcToastsDefaultConfig;
}

export interface AcdcToastConfig{
  title?: string;
  message: string;
  timeout?: number;
  notificationLevel?: string
}

export interface AcdcToast{
  id: string;
  title?: string;
  message: string;
  notificationLevel: AcdcNotificationLevel;
  timeout?: number;
  notificationState: AcdcNotificationState;
}