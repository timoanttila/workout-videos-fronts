import {api} from '$lib'
export async function load({fetch}) {
  const tags = await fetch(`${api}tags`).then(res => res.json())
  return {tags}
}
