export interface ValidationError {
  field: string
  message: string
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\d{9,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateNationalId = (id: string): boolean => {
  const idRegex = /^\d{10,12}$/
  return idRegex.test(id.replace(/\s/g, ''))
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const validateOTP = (otp: string): boolean => {
  return /^\d{4,6}$/.test(otp)
}

export const validateFormStep = (
  step: number,
  data: Record<string, string>
): ValidationError[] => {
  const errors: ValidationError[] = []

  switch (step) {
    case 2: // Personal Info
      if (!data.fullName || data.fullName.trim().length < 3) {
        errors.push({ field: 'fullName', message: 'الاسم الكامل مطلوب (3 أحرف على الأقل)' })
      }
      if (!validatePhoneNumber(data.phoneNumber)) {
        errors.push({ field: 'phoneNumber', message: 'رقم الهاتف غير صحيح (أرقام فقط، 9-15 رقم)' })
      }
      if (!validateNationalId(data.nationalId)) {
        errors.push({ field: 'nationalId', message: 'رقم الهوية غير صحيح (أرقام فقط، 10-12 رقم)' })
      }
      if (!data.address || data.address.trim().length < 5) {
        errors.push({ field: 'address', message: 'العنوان مطلوب (5 أحرف على الأقل)' })
      }
      break

    case 3: // Email & Password
      if (!validateEmail(data.email)) {
        errors.push({ field: 'email', message: 'البريد الإلكتروني غير صحيح' })
      }
      if (!validatePassword(data.password)) {
        errors.push({ field: 'password', message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' })
      }
      break

    case 4: // OTP
      if (!validateOTP(data.otp)) {
        errors.push({ field: 'otp', message: 'الكود يجب أن يكون 4-6 أرقام' })
      }
      break
  }

  return errors
}

export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@')
  const masked = localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1)
  return `${masked}@${domain}`
}

export const maskPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  return `${cleaned.slice(0, 3)}****${cleaned.slice(-2)}`
}

export const maskNationalId = (id: string): string => {
  const cleaned = id.replace(/\D/g, '')
  return `${cleaned.slice(0, 2)}****${cleaned.slice(-2)}`
}
