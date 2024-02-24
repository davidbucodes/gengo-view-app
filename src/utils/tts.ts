import { AsyncTimeout } from "./asyncTimeout";

export enum TextVoiceLanguage {
  JA = "JA",
  EN = "EN",
}

const languageToCode: Record<TextVoiceLanguage, string> = {
  JA: "ja",
  EN: "en",
};

export class TextToSpeech {
  private static _voices: SpeechSynthesisVoice[] = null;

  static get isSpeaking(): boolean {
    return !!this.currentMessage;
  }
  static currentMessage: SpeechSynthesisUtterance = null;

  static get isVoiceAvailable(): boolean {
    return Boolean(speechSynthesis?.getVoices().length);
  }

  static async loadAllVoices() {
    if (this._voices) {
      return this._voices;
    }

    let voices = speechSynthesis.getVoices();

    let retries = 0;
    while ((!voices || voices.length === 0) && retries < 20) {
      await new Promise<void>(res => {
        new AsyncTimeout(() => {
          return res();
        }, 10);
      });
      voices = speechSynthesis.getVoices();
      retries++;
    }
    this._voices = voices;
    console.log(voices);
    return voices;
  }

  static stopSpeaking() {
    speechSynthesis.cancel();
    if (this.currentMessage) {
      this.currentMessage.dispatchEvent(new CustomEvent("end"));
      this.currentMessage.onend = null;
      this.currentMessage = null;
    }
  }

  static async speak(
    text: string,
    language: TextVoiceLanguage,
    onEndCallback: () => void
  ): Promise<boolean> {
    const message = new SpeechSynthesisUtterance();
    if (speechSynthesis.speaking) {
      this.stopSpeaking();
    }

    this.currentMessage = message;

    const voice = await this.getVoice(language);

    if (!voice) {
      return false;
    }

    message.voice = voice;
    message.volume = 1; // From 0 to 1
    message.pitch = 1; // From 0 to 2
    message.text = text;
    message.rate = 1;

    const languageCode = languageToCode[language];
    message.lang = languageCode;

    speechSynthesis.speak(message);
    message.onend = () => {
      onEndCallback();
    };
    return true;
  }

  private static async getVoice(language: TextVoiceLanguage) {
    const voices = await TextToSpeech.loadAllVoices();
    return voices.find(voice =>
      voice.lang.toLowerCase().includes(languageToCode[language])
    );
  }
}
