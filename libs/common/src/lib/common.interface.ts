export type CountMap = Record<string, number>;
export interface IGatewayResponse {
  [index: string]: any;
  countmap: CountMap;
}
