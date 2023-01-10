import type { WP_Post } from 'wp-types'

export type CountMap = Record<string, number>
export interface IGatewayResponse extends WP_Post {
  countmap: CountMap
}
