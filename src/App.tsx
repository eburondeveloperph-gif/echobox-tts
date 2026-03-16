import { useState, useRef } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const LANGUAGES = [
  { code: 'ab', name: 'Abkhaz' },
  { code: 'ace', name: 'Acehnese' },
  { code: 'ach', name: 'Acholi' },
  { code: 'aa', name: 'Afar' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Albanian' },
  { code: 'alur', name: 'Alur' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hy', name: 'Armenian' },
  { code: 'as', name: 'Assamese' },
  { code: 'av', name: 'Avar' },
  { code: 'awa', name: 'Awadhi' },
  { code: 'ay', name: 'Aymara' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'ban', name: 'Balinese' },
  { code: 'bal', name: 'Baluchi' },
  { code: 'bm', name: 'Bambara' },
  { code: 'ba', name: 'Baoulé' },
  { code: 'ba', name: 'Bashkir' },
  { code: 'eu', name: 'Basque' },
  { code: 'btk', name: 'Batak Karo' },
  { code: 'btk', name: 'Batak Simalungun' },
  { code: 'btk', name: 'Batak Toba' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bem', name: 'Bemba' },
  { code: 'bn', name: 'Bengali' },
  { code: 'bew', name: 'Betawi' },
  { code: 'bho', name: 'Bhojpuri' },
  { code: 'bik', name: 'Bikol' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'br', name: 'Breton' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'bua', name: 'Buryat' },
  { code: 'yue', name: 'Cantonese' },
  { code: 'ca', name: 'Catalan' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'ch', name: 'Chamorro' },
  { code: 'ce', name: 'Chechen' },
  { code: 'ny', name: 'Chichewa' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'chk', name: 'Chuukese' },
  { code: 'cv', name: 'Chuvash' },
  { code: 'co', name: 'Corsican' },
  { code: 'crh', name: 'Crimean Tatar (Cyrillic)' },
  { code: 'crh', name: 'Crimean Tatar (Latin)' },
  { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'prs', name: 'Dari' },
  { code: 'dv', name: 'Dhivehi' },
  { code: 'din', name: 'Dinka' },
  { code: 'doi', name: 'Dogri' },
  { code: 'dyu', name: 'Dombe' },
  { code: 'nl', name: 'Dutch' },
  { code: 'nl-BE', name: 'Dutch (Flemish)' },
  { code: 'dyu', name: 'Dyula' },
  { code: 'dz', name: 'Dzongkha' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian' },
  { code: 'ee', name: 'Ewe' },
  { code: 'fo', name: 'Faroese' },
  { code: 'fj', name: 'Fijian' },
  { code: 'fil', name: 'Filipino' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fon', name: 'Fon' },
  { code: 'fr', name: 'French' },
  { code: 'fr-CA', name: 'French (Canada)' },
  { code: 'fy', name: 'Frisian' },
  { code: 'fur', name: 'Friulian' },
  { code: 'ff', name: 'Fulani' },
  { code: 'ga', name: 'Ga' },
  { code: 'gl', name: 'Galician' },
  { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'gn', name: 'Guarani' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'hlt', name: 'Hakha Chin' },
  { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'Hawaiian' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hil', name: 'Hiligaynon' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'hrx', name: 'Hunsrik' },
  { code: 'iba', name: 'Iban' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ilo', name: 'Ilocano' },
  { code: 'id', name: 'Indonesian' },
  { code: 'iu', name: 'Inuktut (Latin)' },
  { code: 'iu', name: 'Inuktut (Syllabics)' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'jam', name: 'Jamaican Patois' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jv', name: 'Javanese' },
  { code: 'kac', name: 'Jingpo' },
  { code: 'kl', name: 'Kalaallisut' },
  { code: 'kn', name: 'Kannada' },
  { code: 'kr', name: 'Kanuri' },
  { code: 'pam', name: 'Kapampangan' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'kha', name: 'Khasi' },
  { code: 'km', name: 'Khmer' },
  { code: 'cgg', name: 'Kiga' },
  { code: 'kng', name: 'Kikongo' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'ktu', name: 'Kituba' },
  { code: 'kok', name: 'Kokborok' },
  { code: 'kv', name: 'Komi' },
  { code: 'koi', name: 'Konkani' },
  { code: 'ko', name: 'Korean' },
  { code: 'kri', name: 'Krio' },
  { code: 'kmr', name: 'Kurdish (Kurmanji)' },
  { code: 'ckb', name: 'Kurdish (Sorani)' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'lo', name: 'Lao' },
  { code: 'ltg', name: 'Latgalian' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lij', name: 'Ligurian' },
  { code: 'li', name: 'Limburgish' },
  { code: 'ln', name: 'Lingala' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lmo', name: 'Lombard' },
  { code: 'lg', name: 'Luganda' },
  { code: 'luo', name: 'Luo' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'mad', name: 'Madurese' },
  { code: 'mai', name: 'Maithili' },
  { code: 'mak', name: 'Makassar' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay' },
  { code: 'ms-Arab', name: 'Malay (Jawi)' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' },
  { code: 'mam', name: 'Mam' },
  { code: 'gv', name: 'Manx' },
  { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' },
  { code: 'mh', name: 'Marshallese' },
  { code: 'mwr', name: 'Marwadi' },
  { code: 'mfe', name: 'Mauritian Creole' },
  { code: 'mhr', name: 'Meadow Mari' },
  { code: 'mni', name: 'Meiteilon (Manipuri)' },
  { code: 'min', name: 'Minang' },
  { code: 'lus', name: 'Mizo' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'nah', name: 'Nahuatl (Eastern Huasteca)' },
  { code: 'ndc', name: 'Ndau' },
  { code: 'nr', name: 'Ndebele (South)' },
  { code: 'new', name: 'Nepalbhasa (Newari)' },
  { code: 'ne', name: 'Nepali' },
  { code: 'nqo', name: 'NKo' },
  { code: 'no', name: 'Norwegian' },
  { code: 'nus', name: 'Nuer' },
  { code: 'oc', name: 'Occitan' },
  { code: 'or', name: 'Odia (Oriya)' },
  { code: 'om', name: 'Oromo' },
  { code: 'os', name: 'Ossetian' },
  { code: 'pag', name: 'Pangasinan' },
  { code: 'pap', name: 'Papiamento' },
  { code: 'ps', name: 'Pashto' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'pt', name: 'Portuguese (Portugal)' },
  { code: 'pa', name: 'Punjabi (Gurmukhi)' },
  { code: 'pa-Arab', name: 'Punjabi (Shahmukhi)' },
  { code: 'qu', name: 'Quechua' },
  { code: 'quc', name: 'Qʼeqchiʼ' },
  { code: 'rom', name: 'Romani' },
  { code: 'ro', name: 'Romanian' },
  { code: 'rn', name: 'Rundi' },
  { code: 'ru', name: 'Russian' },
  { code: 'se', name: 'Sami (North)' },
  { code: 'sm', name: 'Samoan' },
  { code: 'sg', name: 'Sango' },
  { code: 'sa', name: 'Sanskrit' },
  { code: 'sat', name: 'Santali (Latin)' },
  { code: 'sat', name: 'Santali (Ol Chiki)' },
  { code: 'gd', name: 'Scots Gaelic' },
  { code: 'nso', name: 'Sepedi' },
  { code: 'sr', name: 'Serbian' },
  { code: 'st', name: 'Sesotho' },
  { code: 'crs', name: 'Seychellois Creole' },
  { code: 'shn', name: 'Shan' },
  { code: 'sn', name: 'Shona' },
  { code: 'scn', name: 'Sicilian' },
  { code: 'szl', name: 'Silesian' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhala' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' },
  { code: 'es', name: 'Spanish' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sus', name: 'Susu' },
  { code: 'sw', name: 'Swahili' },
  { code: 'ss', name: 'Swati' },
  { code: 'sv', name: 'Swedish' },
  { code: 'ty', name: 'Tahitian' },
  { code: 'tg', name: 'Tajik' },
  { code: 'tzm', name: 'Tamazight' },
  { code: 'tzm', name: 'Tamazight (Tifinagh)' },
  { code: 'ta', name: 'Tamil' },
  { code: 'tt', name: 'Tatar' },
  { code: 'te', name: 'Telugu' },
  { code: 'tet', name: 'Tetum' },
  { code: 'th', name: 'Thai' },
  { code: 'bo', name: 'Tibetan' },
  { code: 'ti', name: 'Tigrinya' },
  { code: 'tiv', name: 'Tiv' },
  { code: 'tpi', name: 'Tok Pisin' },
  { code: 'to', name: 'Tongan' },
  { code: 'lua', name: 'Tshiluba' },
  { code: 'ts', name: 'Tsonga' },
  { code: 'tn', name: 'Tswana' },
  { code: 'tcy', name: 'Tulu' },
  { code: 'tum', name: 'Tumbuka' },
  { code: 'tr', name: 'Turkish' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'tyv', name: 'Tuvan' },
  { code: 'tw', name: 'Twi' },
  { code: 'udm', name: 'Udmurt' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ug', name: 'Uyghur' },
  { code: 'uz', name: 'Uzbek' },
  { code: 've', name: 'Venda' },
  { code: 'vec', name: 'Venetian' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'war', name: 'Waray' },
  { code: 'cy', name: 'Welsh' },
  { code: 'wo', name: 'Wolof' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'sah', name: 'Yakut' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'yua', name: 'Yucatec Maya' },
  { code: 'zap', name: 'Zapotec' },
  { code: 'zu', name: 'Zulu' },
  // Philippine languages
  { code: 'tl', name: 'Tagalog' },
  { code: 'fil', name: 'Filipino' },
  { code: 'ilo', name: 'Ilocano' },
  { code: 'itw', name: 'Itawit' },
  { code: 'war', name: 'Waray' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'pag', name: 'Pangasinan' },
  { code: 'kap', name: 'Kapampangan' },
  { code: 'hil', name: 'Hiligaynon' },
  { code: 'bik', name: 'Bikol' },
];

const EMOTIONS = [
  { id: 'neutral', label: 'Neutral' },
  { id: 'happy', label: 'Happy' },
  { id: 'sad', label: 'Sad' },
  { id: 'angry', label: 'Angry' },
  { id: 'excited', label: 'Excited' },
  { id: 'whisper', label: 'Whisper' },
];

const QUICK_PHRASES = [
  { text: 'Ma-ngo!', label: 'Hello' },
  { text: 'Mabbalat.', label: 'Thank you' },
  { text: 'Oon.', label: 'Yes' },
  { text: 'Awan.', label: 'No' },
  { text: 'Jehova i Dios.', label: 'Jehova is God' },
  { text: 'Kunnasi ka?', label: 'How are you?' },
];

function App() {
  const [text, setText] = useState('Ma-ngo! Mabbalat.');
  const [voice, setVoice] = useState('itawit');
  const [emotion, setEmotion] = useState('neutral');
  const [sttLang, setSttLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const generate = async () => {
    if (!text.trim()) {
      setError('Please enter text');
      return;
    }

    setLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, emotion, language: 'itawit' }),
      });

      if (!res.ok) throw new Error('Generation failed');

      const data = await res.json();
      const url = data.audio_url || `${API_URL}/audio/${data.path}`;
      setAudioUrl(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate');
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setTranscribing(true);
      setError('');
    } catch {
      setError('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && transcribing) {
      mediaRecorderRef.current.stop();
      setTranscribing(false);
    }
  };

  const transcribeAudio = async (blob: Blob) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');
      formData.append('language', sttLang);

      const res = await fetch(`${API_URL}/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Transcription failed');

      const data = await res.json();
      setText(data.text || data.transcription || '');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Transcription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="logo">Eburon TTS</div>
          <div className="tagline">Developed by Master E</div>
        </div>
      </header>

      <main className="main">
        <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or record speech..."
          />

          <div className="emotions">
            {EMOTIONS.map((e) => (
              <button
                key={e.id}
                className={`emotion-btn ${emotion === e.id ? 'active' : ''}`}
                onClick={() => setEmotion(e.id)}
              >
                {e.label}
              </button>
            ))}
          </div>

          <div className="controls">
            <select value={voice} onChange={(e) => setVoice(e.target.value)}>
              <option value="itawit">Itawit (Native)</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <button onClick={generate} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Speech'}
            </button>
          </div>
        </div>

        <div className="input-section">
          <h3>Speech to Text (STT)</h3>
          <div className="controls" style={{ marginTop: '1rem' }}>
            <select value={sttLang} onChange={(e) => setSttLang(e.target.value)}>
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={transcribing ? stopRecording : startRecording}
              disabled={loading}
              style={{ background: transcribing ? '#ff4444' : '#32CD32' }}
            >
              {transcribing ? 'Stop Recording' : 'Record & Transcribe'}
            </button>
          </div>
        </div>

        {(error || loading) && (
          <div className={`status ${error ? 'error' : 'loading'}`}>
            {error || (transcribing ? 'Recording...' : 'Processing...')}
          </div>
        )}

        {audioUrl && (
          <div className="result">
            <h3>Generated Audio</h3>
            <audio src={audioUrl} controls />
          </div>
        )}

        <div className="quick-phrases">
          <h3>Quick Phrases</h3>
          <div className="emotions">
            {QUICK_PHRASES.map((p) => (
              <button
                key={p.text}
                className="emotion-btn"
                onClick={() => setText(p.text)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        © 2026 Eburon AI - All rights reserved
      </footer>
    </div>
  );
}

export default App;
