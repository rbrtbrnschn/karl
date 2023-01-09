import { parseString, stringToCountMap } from '@karl/common'
import { Injectable } from '@nestjs/common'
import fetch from 'node-fetch'

@Injectable()
export class CountmapService {

  /**
   * Fetches WordPress blog post data. Creates wordmap from those.
   * @param {string} url - url to fetch wp data from
   */
  async createFromUrl(
    url: string,
    options: Record<any, any> = {}
  ): Promise<Record<string, number>[]> {
    //@TODO error handle non valid urls
    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        return Array.from(data).map((e: any) => {
          const rendered = e?.content?.rendered || ''
          const parsed = parseString(rendered)
          const res = stringToCountMap(parsed)
          // console.log(res);
          return res
        })
      })
      .catch((e) => {
        console.log("DID THROW,",e);
        throw new Error(e);
      })
  }
}
