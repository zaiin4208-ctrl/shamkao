import { create } from 'zustand'

export interface FormData {
  fullName: string
  phoneNumber: string
  nationalId: string
  address: string
  email: string
  password: string
  otp: string
}

export interface FormStore {
  currentStep: number
  formData: FormData
  setStep: (step: number) => void
  updateFormData: (data: Partial<FormData>) => void
  resetForm: () => void
}

const initialFormData: FormData = {
  fullName: '',
  phoneNumber: '',
  nationalId: '',
  address: '',
  email: '',
  password: '',
  otp: '',
}

export const useFormStore = create<FormStore>((set) => ({
  currentStep: 1,
  formData: initialFormData,
  setStep: (step) => set({ currentStep: step }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ currentStep: 1, formData: initialFormData }),
}))
