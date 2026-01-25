<script lang="ts">
  import {validateArray} from '@tuspe/components'
  import {introductory, metaData} from '$lib'
  import VideoList from '$lib/VideoList.svelte'
  import type {IntroductoryValue, Tag} from '$lib/types'

  let {data}: {data: {page: Tag}} = $props(),
    page = $state<Tag | null>(null),
    pageId = $state(0),
    content = $state<IntroductoryValue | null>(null)

  $effect(() => {
    if (data?.page?.id && pageId !== data.page.id) {
      pageId = data.page.id
      page = data.page

      content = introductory[page.slug]

      $metaData = {
        description: content.description,
        title: page.title
      }
    }
  })
</script>

{#if content?.about}
  <p class="max-w-screen-sm mb-10 mx-auto text-center">{content.about}</p>
{/if}

{#if validateArray(data.page?.videos)}
  <VideoList values={data.page.videos} />
{/if}
