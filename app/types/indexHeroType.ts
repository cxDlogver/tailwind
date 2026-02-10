export enum AuditStatus {
  NORMAL = 'NORMAL',
  POLITICAL = 'POLITICAL',
  SENSITIVE = 'SENSITIVE',
}

export enum Modality {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  TEXT = 'TEXT',
  FILE = 'FILE',
}

export type AuditStage = 'INPUT' | 'AUDITING' | 'OUTPUT'

export interface AuditItem {
  id: string
  modality: Modality
  title: string
  statusEn: string
  status: AuditStatus
  description: string
  score: number
  timestamp: string
}
