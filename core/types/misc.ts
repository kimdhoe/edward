export interface ValidationReport<F> {
  isValid: boolean
  messages: Partial<F>
}
