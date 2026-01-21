<script lang="ts">
  import {Image, validateArray} from '@tuspe/components'
  import {dateFormat} from '$lib'
  import type {Query, Video} from './types'

  type Props = {
    query?: Query
    values: Video[]
    hasPubliser?: boolean
  }

  let {hasPubliser = true, query, values}: Props = $props()
</script>

{#if query}
  <div class="mb-6">{values.length ?? 0} / {query.total} videos</div>
{/if}

{#if validateArray(values)}
  <div class="gap-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    {#each values as video}
      <div aria-labelledby={`video-title-${video.id}`} class="video" id={`video-${video.id}`}>
        <a class="video-link" href={`/video/${video.id}`} id={`video-link-${video.id}`}>
          <figure>
            <Image image={{alt: video.title, height: 180, src: `https://img.youtube.com/vi_webp/${video.video_id}/mqdefault.webp`, width: 320}} />
            <figcaption id={`video-title-${video.id}`} class="px-2">{video.title}</figcaption>
          </figure>
        </a>

        <div class="desc flex mt-1 px-2 space-x-2">
          <span>{dateFormat(video.published_at)}</span>
          {#if hasPubliser && video.publisher?.title}
            <span>|</span>
            <a class="video-channel" href={`/channel/${video.publisher.channel_id}`}>{video.publisher.title}</a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/if}
