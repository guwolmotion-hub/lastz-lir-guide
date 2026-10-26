import { simulateLucky } from './lucky-simulation.js';
import { simulateNativeLucky } from './lucky-native-engine.js';
self.onmessage=({data})=>{try{self.postMessage({result:data.plan.goals?simulateNativeLucky(data.reference,data.plan):simulateLucky(data.reference,data.plan)});}catch{self.postMessage({error:true});}};
