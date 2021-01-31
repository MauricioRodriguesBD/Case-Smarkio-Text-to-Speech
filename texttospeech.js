const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({ apikey: '<hkiM58lk2uPOrMHuq0rwkaTIyiZ7FAa6tVig--xI3IT6>' }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/56497605-e01a-4d89-af3a-966e64147cec'
});

const params = {
  text: 'Hello from IBM Watsonaaa',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav'
};

// Synthesize speech, correct the wav header, then save to disk
// (wav header requires a file length, but this is unknown until after the header is already generated and sent)
// note that `repairWavHeaderStream` will read the whole stream into memory in order to process it.
// the method returns a Promise that resolves with the repaired buffer
textToSpeech
  .synthesize(params)
  .then(response => {
    const audio = response.result;
    return textToSpeech.repairWavHeaderStream(audio);
  })
  .then(repairedFile => {
    fs.writeFileSync('audio.wav', repairedFile);
    console.log('audio.wav written with a corrected wav header');
  })
  .catch(err => {
    console.log(err);
  });


// or, using WebSockets
textToSpeech.synthesizeUsingWebSocket(params);
synthStream.pipe(fs.createWriteStream('./audio.wav'));
// see more information in examples/text_to_speech_websocket.js