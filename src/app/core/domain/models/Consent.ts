export interface Consent {
    id: number
    censusConsent: boolean
    censusConsentDate: string
    adultAuthorization: boolean
    adultAuthorizationConsentDate: string
    guardian: boolean
    guardianConsentDate: string
    visibleOthers: boolean
    visibleOthersConsentDate: string
    comment: string
    representativeId: number
}
