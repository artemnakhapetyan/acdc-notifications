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