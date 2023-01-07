import { Injectable } from '@nestjs/common';
import fetch from "node-fetch";
import {parseDocument} from 'htmlparser2';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {
    const IS_TESTING = true;

    const base = "https://www.internate.org/";
    const testBases = ["https://animallogic.com","https://www.angrybirds.com"];
    const testBase = testBases[0];

    const suffix = "/wp-json/wp/v2/posts";
    const URI = `${IS_TESTING ? testBase : base}${suffix}`;

    function handleCountMap(string:string){
      return string.split(" ").filter(e=>e!=="").reduce((acc,curr)=>{
        acc[curr]=(acc[curr]||0)+1;
        return acc;
      },{})
    }

    function parseString(string:string){
      const REG = /(<([^>]+)>)/ig;
      const strippedTags= string.replace(REG, '');
      const strippedHTMLEntities = stripHTMLEntities(strippedTags);
      const strippedCharacters = strippedHTMLEntities.replace(/[.,;:!?()[\]{}"“\\$”/*&\-\–\s]/g,()=>{
        // TODO refactor to allow urls to stay untouched
        return " ";
      });
      const strippedLowered = strippedCharacters.toLowerCase();

      return strippedLowered;
    }

    /**
      * Credit to https://stackoverflow.com/questions/44195322/a-plain-javascript-way-to-decode-html-entities-works-on-both-browsers-and-node
      */
    function stripHTMLEntities(encodedString: string) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, () => "");
}

    return fetch(URI)
      .then(response => response.json())
      .then(json => {
        Array.from(json).map((e:any)=>{
          const rendered = e?.content?.rendered || "";
          const parsed = parseString(rendered);
          const res = handleCountMap(parsed);
          console.log(res);
        })
        return {message:JSON.stringify(json)};
      })
    .catch((e)=>{return{message:"Failed",e}});
    //return { message: 'Welcome to server!' };
  }
}
