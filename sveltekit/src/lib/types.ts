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
  videos?: TagVideo[]
}

export interface TagVideo {
  createdAt: string
  id: number
  tagId: number
  video: Video
  videoId: number
}

export interface Video {
  duration?: number
  id: number
  publisher: VideoPublisher
  publishedAt: string
  startTime?: number
  summary?: string
  tags?: Tag[]
  title: string
  updatedAt?: string
  videoId: string
}

export interface VideoPublisher {
  channelId: string
  createdAt?: string
  id: number
  slug: string
  title: string
  updatedAt?: string
  videos?: Video[]
  website?: string
}
