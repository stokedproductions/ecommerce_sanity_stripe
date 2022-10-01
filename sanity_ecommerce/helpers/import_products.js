import fetch from 'node-fetch';
// import data from './all_exercises.json' assert { type: 'json' }

import { v4 as uuidv4 } from 'uuid';

import PQueue from 'p-queue'
const queue = new PQueue({
  concurrency: 1,
  interval: 1000 * 25
})

import sanityClient from '@sanity/client';
const SANITY_ACCESS_TOKEN = 'skESPtyCWSLhURsUCOb9a0WYNt05WeqnNqoXE9SigiUzdRy8Y9Xh1JNe0bdlk319ohRMtlC0UJMs6ZHPX9K15fXBLXfiVvOt7J5VKfg8hg7Spbihl5X4ZxbswY4WNensIsh0Kd7YzBti9UGi717fszaQcNR5PXJP3QvC1QR44odA0TEfSIW0';

const client = sanityClient({
  projectId: 'wqc8f1p7',
  dataset: 'production',
  token: SANITY_ACCESS_TOKEN, // we need this to get write access
  apiVersion: '2022-08-23',
  useCdn: false // We can't use the CDN for writing
})

const addRecord = (record) => {
    client.createOrReplace(record);
}

const record = {
    _id: '6a1d7fba-fbfd-43a2-9034-32532f37edf8',  //uuidv4(),
    slug: 'hd-labs-windstol-inject-standoject-50',
    _type: 'product',
    // brand:[
    //     {
    //         _id: '6342e34b-7e7c-4a46-bab0-401698638572',
    //     }],
    // category: [{_id: 'dda2f13c-5208-41bc-b9ff-92a95c8594ff'}],
    // image: {
    //     _id: ' image-262faa6fdfd3588ce67cdedd6d9f508e2c8adea9-1080x1080-png',
    //     _type: 'reference'
    // },
    name : 'Winstrol Inject - Stanoject 50',
    price : 220,
    quantity : '10ml Vial',
    strength: '50mg',
    subname: 'HD Labs Stanozolol (Water Solution)',   
}

addRecord(record);


// const doShit = () => {
//   const start = 1327;
//   const end = start+1;
//   for (let i=start; i < end; i++) {
//     const document = data[i];
//     console.log({doc: document.name, img: document.gifUrl});
//     queue.add(() => importImage(document.id, document.gifUrl));
//   }
//   console.log({len: data.length, left: data.length - end})
// }
// for (let i=21; i < 30; i++) {
//   console.log(data[i].name);
// }

// fetch('https://d205bpvrqc9yn1.cloudfront.net/0759.gif')
//   .then(res => res.buffer())
//   .then(buffer => client.assets.upload('image', buffer))
//   .then(assetDocument => {
//     console.log(assetDocument);
// })

// let transaction = client.transaction()
// data.forEach(document => {
//     transaction.createOrReplace(transformItem(document))
// })
// transaction.commit()

// import products
