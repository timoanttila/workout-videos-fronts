import {writable} from 'svelte/store'
import dayjs from 'dayjs'
import {PUBLIC_BACKEND} from '$env/static/public'
import type {Introductory, MetaData} from './types'

export const api = PUBLIC_BACKEND
export const category = '?category_id=2'
export const dateRead = 'DD.MM.YYYY'
export const defaultDescription = 'Training and getting fit is hard and never seems like the right time to start. No worries. Quick and easy training videos help you get started. Just daily five or ten minutes.'
export const metaData = writable<MetaData>({} as MetaData)
export const siteName = 'Lazy People Workouts'
export const siteUrl = 'https://lazypeopleworkouts.com'

export const introductory: Introductory = {
  strength: {
    about: 'Quick and effective exercises to strengthen muscles and tone your body at home or outdoors.',
    description: 'Build muscle and tone your body using resistance exercises, weights, or bodyweight moves.',
    id: 5,
    slug: 'strength',
    title: 'Strength'
  },
  core: {
    about: 'Short workouts to build core stability and strengthen your abs, obliques, and lower back.',
    description: 'Focus on abs, obliques, and lower back to strengthen and stabilize your core muscles.',
    id: 7,
    slug: 'core',
    title: 'Core'
  },
  cardio: {
    about: 'Fast-paced exercises to get your heart pumping and boost energy in just a few minutes.',
    description: 'Boost your heart rate and stamina with dynamic, fat-burning exercises.',
    id: 6,
    slug: 'cardio',
    title: 'Cardio'
  },
  flexibility: {
    about: 'Simple stretches to increase mobility, release tension, and feel more relaxed.',
    description: 'Stretch and loosen your muscles to improve mobility and prevent injury.',
    id: 9,
    slug: 'flexibility',
    title: 'Flexibility'
  },
  'full-body': {
    about: 'Efficient routines that work multiple muscle groups for a complete workout in little time.',
    description: 'Engage multiple muscle groups at once for a complete, all-over workout.',
    id: 8,
    slug: 'full-body',
    title: 'Full Body'
  },
  'pain-relief': {
    about: 'Targeted moves to relieve tension and discomfort, perfect for backs, hips, or shoulders.',
    description: 'Gentle exercises targeting areas of tension or discomfort to reduce pain and stiffness.',
    id: 10,
    slug: 'pain-relief',
    title: 'Pain Relief'
  }
}

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

export const sendRequest = async (endpoint: string, params = '') => {
  try {
    let query = `${api}${endpoint}${category}`
    if (params) {
      query += `&${params}`
    }
    const response = await fetch(query, requestHeaders)

    if (response.status == 429) {
      return {error: 'Too many requests'}
    }

    return await response.json()
  } catch (err) {
    return {error: err}
  }
}
