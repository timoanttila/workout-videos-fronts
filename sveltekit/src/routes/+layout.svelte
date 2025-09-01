<script lang="ts">
  import {goto} from '$app/navigation'
  import {page} from '$app/state'
  import {ButtonClose} from '@tuspe/components'
  import {defaultDescription, metaData, siteName, siteUrl} from '$lib'
  import '../app.css'

  let {children} = $props()

  const reset = () => {
    goto('/')
  }
</script>

<svelte:head>
  {#if $metaData?.title}
    <title>{$metaData.title !== siteName ? `${$metaData.title} | ${siteName}` : siteName}</title>
    <meta name="twitter:title" property="og:title" content={$metaData.title} />
    <meta name="description" content={$metaData.description ?? defaultDescription} />
    <meta name="twitter:description" property="og:description" content={$metaData.description ?? defaultDescription} />
    <meta name="canonical" property="og:url" content={page.url.origin + page.url.pathname} />
    <meta name="twitter:image" property="og:image" content={$metaData.image ? $metaData.image : page.url.origin + '/familyworkout.jpg'} />
  {/if}
</svelte:head>

<div class="flex flex-col min-h-screen relative">
  {#if page.url.pathname !== '/'}
    <ButtonClose color="blue-900" onclick={reset} />
  {/if}
  <main class="block grow-1 max-w-screen-xl mx-auto px-4 py-10 w-full">
    {#if $metaData?.title}
      <div class="mb-10 text-center" id="page-title">
        {#if $metaData.subTitle}
          <div id="page-subTitle">{$metaData.subTitle}</div>
        {/if}
        <h1>{$metaData.title}</h1>
        {#if $metaData.titleLink && $metaData.titleLinkText}
          <a class="inline-block mt-4 uppercase" href={$metaData.titleLink} rel="noopener noreferrer" target="_blank">- {$metaData.titleLinkText} -</a>
        {/if}
      </div>
    {/if}
    {@render children?.()}
  </main>

  <footer class="bg-blue-900 px-4 py-1 text-center text-sm">
    <a href="htpps://tuspe.com/en" class="text-gray-200" rel="noopener noreferrer">Tuspe Design</a>
  </footer>
</div>
