import { simulateLucky } from './lucky-simulation.js';
self.onmessage=({data})=>{try{self.postMessage({result:simulateLucky(data.reference,data.plan)});}catch{self.postMessage({error:true});}};
