import { format, formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

/**
 * Utilitaires de formatage
 */

export const formatDate = (date: Date | string, pattern = 'dd/MM/yyyy'): string => {
  return format(new Date(date), pattern, { locale: fr })
}

export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr })
}

export const formatRelativeTime = (date: Date | string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr })
}

/**
 * Mappe les codes de devise personnalisés vers les codes ISO 4217
 */
const currencyMap: Record<string, string> = {
  FCFA: 'XOF', // Franc CFA -> Franc CFA de l'Afrique de l'Ouest
  CFA: 'XOF',
}

/**
 * Formate un montant en devise
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  // Mapper les codes de devise personnalisés
  const isoCurrency = currencyMap[currency] || currency
  
  // Déterminer la locale selon la devise
  let locale = 'en-US'
  if (isoCurrency === 'EUR' || isoCurrency === 'XOF' || isoCurrency === 'XAF') {
    locale = 'fr-FR'
  }
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: isoCurrency,
    }).format(amount)
  } catch (error) {
    // Fallback si le code de devise n'est pas reconnu
    console.warn(`Currency code "${currency}" not recognized, using fallback format`)
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ` ${currency}`
  }
}

