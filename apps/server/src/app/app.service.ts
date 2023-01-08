import { Injectable } from '@nestjs/common';
import fetch from "node-fetch";
import {parseString, stringToCountMap, stripHTMLEntities} from "@karl/common";

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {
    const IS_TESTING = true;

    const base = "https://www.internate.org/";
    const testBases = ["https://animallogic.com","https://www.angrybirds.com"];
    const testBase = testBases[0];

    const suffix = "/wp-json/wp/v2/posts";
    const URI = `${IS_TESTING ? testBase : base}${suffix}`;

    //@TODO create new service and refactor this logic to there, and call from service on interval
      return fetch(URI)
      .then(response => response.json())
      .then(json => {
        const tbd = Array.from(json).map((e:any)=>{
          const rendered = e?.content?.rendered || "";
          const parsed = parseString(rendered);
          const res = stringToCountMap(parsed);
          console.log(res);
          return res;
        })
        return {data:tbd};
      })
    .catch((e)=>{return{message:"Failed",e}});
    //return { message: 'Welcome to server!' };
  }
}
