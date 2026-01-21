export interface IntroductoryValue {
  about: string
  description: string
  id: number
  slug: string
  title: string
}

export interface Introductory {
  [key: string]: IntroductoryValue
}

export interface MetaData {
  description?: string
  image?: string
  subTitle?: string
  title: string
  titleLink?: string
  titleLinkText?: string
}

export interface Query {
  endDate?: string
  hasNext?: boolean
  hasPrev?: boolean
  limit: number
  page: number
  pages: number
  startDate?: string
  total: number
}

export interface Tag {
  createdAt: string
  id: number
  position: number
  slug: string
  title: string
  updatedAt: string
  videos: Video[]
}

export interface Video {
  content?: string
  description?: string
  duration?: number
  id: number
  length: number
  published_at: string
  publisher: VideoPublisher
  publisher_id: number
  start_time?: number
  tags?: Tag[]
  title: string
  updated_at?: string
  video_id: string
}

export interface VideoPublisher {
  id: number
  channel_id: string
  title: string
  started_at?: string
  videos?: Video[]
  website?: string
}
