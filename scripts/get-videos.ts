import path from 'path'
import fs from 'fs'
import ytpl from 'ytpl'
import axios from 'axios'

export type Video = {
  title: string
  url: string
  thumbnail: ytpl.Image
  duration: string
}

export const getVideos = async (): Promise<Video[]> => {
  const list = await ytpl('UCKhaJ86HV7zsklPaCRxD_4A', { limit: 4 })
  fs.mkdirSync('public/youtube-images', { recursive: true })
  return Promise.all(
    list.items.map(async (item) => {
      ;(
        await axios.get(item.bestThumbnail.url, {
          responseType: 'stream',
        })
      ).data.pipe(
        fs.createWriteStream(
          path.resolve('public/youtube-images', item.id + '.jpg')
        )
      )

      return {
        title: item.title,
        url: item.shortUrl,
        thumbnail: {
          ...item.bestThumbnail,
          url: `/youtube-images/${item.id}.jpg`,
        },
        duration: item.duration,
      }
    })
  )
}
