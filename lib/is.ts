// https://github.com/afram/is-uuid/blob/99431da687ac6b5c4ed2dde1fb57b3b158d69e95/lib/is-uuid.js#L5
const UUID_V4_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const isUUID = (v: string) => UUID_V4_RE.test(v)
