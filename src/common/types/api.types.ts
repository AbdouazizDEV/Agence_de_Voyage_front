/**
 * Types pour les réponses API standardisées
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: {
    code: string
    message: string
    details?: any
  }
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext?: boolean
    hasPrevious?: boolean
  }
}

export type ApiErrorCode =
  | 'INTERNAL_SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INVALID_CREDENTIALS'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'RESOURCE_NOT_FOUND'
  | 'RESOURCE_ALREADY_EXISTS'
  | 'RESOURCE_CONFLICT'
  | 'INVALID_INPUT'
  | 'MISSING_REQUIRED_FIELD'
  | 'FILE_TOO_LARGE'
  | 'INVALID_FILE_TYPE'
  | 'UPLOAD_FAILED'

