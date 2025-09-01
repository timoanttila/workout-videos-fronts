import {writable} from 'svelte/store'
import dayjs from 'dayjs'
import {PUBLIC_BACKEND} from '$env/static/public'
import type {MetaData} from './types'

export const api = PUBLIC_BACKEND
export const defaultDescription = 'Training and getting fit is hard and never seems like the right time to start. No worries. Quick and easy training videos help you get started. Just daily five or ten minutes.'
export const dateRead = 'DD.MM.YYYY'
export const metaData = writable<MetaData>({} as MetaData)
export const siteName = 'Lazy People Workouts'
export const siteUrl = 'https://lazypeopleworkouts.tuspe.com'

export const dateFormat = (value: string | undefined, format = dateRead) => {
  return dayjs(value).format(format)
}

export const requestHeaders: RequestInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

export const sendRequest = async (query: string) => {
  try {
    const response = await fetch(`${api}${query}`, requestHeaders)

    if (response.status == 429) {
      return {error: 'Too many requests'}
    }

    return await response.json()
  } catch (err) {
    return {error: err}
  }
}
