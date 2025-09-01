<script lang="ts">
  import {validateArray} from '@tuspe/components'
  import {metaData} from '$lib'
  import VideoList from '$lib/VideoList.svelte'
  import type {Tag, TagVideo, Video} from '$lib/types'

  let {data}: {data: {page: Tag}} = $props(),
    page = $state<Tag | null>(null),
    pageId = $state(0),
    videos = $state<Video[]>([])

  $effect(() => {
    if (pageId !== data.page.id) {
      pageId = data.page.id
      page = data.page

      $metaData = {
        description: 'Workout YouTube videos for lazy people tagged with ' + page.title,
        title: page.title
      }

      if (page.videos) {
        videos = page.videos.map((videoTag: TagVideo) => videoTag.video)
      }
    }
  })
</script>

{#if validateArray(videos)}
  <VideoList values={videos} />
{/if}
