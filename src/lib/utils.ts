import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Lib folder ichidagi Utils file bu asosiy qiladigan ishi cv funksiyasi bor bo'lib u class lar bilan ishlaydi, classNamelar ichida turli conditionlarnini qo'yish uchun ishlatiladi.

// components.json esa shadcn.ui ning configuratsiyasi
