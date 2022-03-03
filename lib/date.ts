import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export const formatDate = (date: Date | string, format: string) => {
  return dayjs(date).format(format)
}

export const timeago = (date: Date | string) => {
  return dayjs(date).fromNow()
}
