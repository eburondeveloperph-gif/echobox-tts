import { useState, useRef, useEffect } from 'react';

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
  { code: 'ba', name: 'Bashkir' },
  { code: 'eu', name: 'Basque' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bem', name: 'Bemba' },
  { code: 'bn', name: 'Bengali' },
  { code: 'bho', name: 'Bhojpuri' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'br', name: 'Breton' },
  { code: 'bg', name: 'Bulgarian' },
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
  { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'prs', name: 'Dari' },
  { code: 'dv', name: 'Dhivehi' },
  { code: 'nl', name: 'Dutch' },
  { code: 'nl-BE', name: 'Dutch (Flemish)' },
  { code: 'dz', name: 'Dzongkha' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian' },
  { code: 'ee', name: 'Ewe' },
  { code: 'fo', name: 'Faroese' },
  { code: 'fj', name: 'Fijian' },
  { code: 'fil', name: 'Filipino' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'fr-CA', name: 'French (Canada)' },
  { code: 'fy', name: 'Frisian' },
  { code: 'gl', name: 'Galician' },
  { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'gn', name: 'Guarani' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'Hawaiian' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hil', name: 'Hiligaynon' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ilo', name: 'Ilocano' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jv', name: 'Javanese' },
  { code: 'kn', name: 'Kannada' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'km', name: 'Khmer' },
  { code: 'ko', name: 'Korean' },
  { code: 'ku', name: 'Kurdish' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'lo', name: 'Lao' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'ne', name: 'Nepali' },
  { code: 'no', name: 'Norwegian' },
  { code: 'oc', name: 'Occitan' },
  { code: 'or', name: 'Odia' },
  { code: 'om', name: 'Oromo' },
  { code: 'ps', name: 'Pashto' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'qu', name: 'Quechua' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sm', name: 'Samoan' },
  { code: 'sg', name: 'Sango' },
  { code: 'sa', name: 'Sanskrit' },
  { code: 'sr', name: 'Serbian' },
  { code: 'sn', name: 'Shona' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhala' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' },
  { code: 'es', name: 'Spanish' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' },
  { code: 'tt', name: 'Tatar' },
  { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' },
  { code: 'bo', name: 'Tibetan' },
  { code: 'ti', name: 'Tigrinya' },
  { code: 'to', name: 'Tongan' },
  { code: 'tr', name: 'Turkish' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ug', name: 'Uyghur' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'war', name: 'Waray' },
  { code: 'cy', name: 'Welsh' },
  { code: 'wo', name: 'Wolof' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'zu', name: 'Zulu' },
  { code: 'nl', name: 'Dutch (Netherlands)' },
  { code: 'nl_be', name: 'Dutch (Flemish)' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'itw', name: 'Itawit' },
  { code: 'pag', name: 'Pangasinan' },
  { code: 'kap', name: 'Kapampangan' },
  { code: 'bik', name: 'Bikol' },
];

const VOICES = [
  { id: 'itawit', name: 'Itawit (Native)' },
  { id: 'tagalog', name: 'Tagalog (Native)' },
  { id: 'dutch_nl', name: 'Dutch NL (Native)' },
  { id: 'dutch_be', name: 'Dutch BE (Native)' },
  { id: 'echo', name: 'Echo (Male)' },
  { id: 'nova', name: 'Nova (Female)' },
  { id: 'shell', name: 'Shell (Female)' },
  { id: 'wave', name: 'Wave (Male)' },
  { id: 'amber', name: 'Amber (Female)' },
  { id: 'floyd', name: 'Floyd (Male)' },
  { id: 'clone', name: 'Voice Clone' },
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

interface HistoryItem {
  id: number;
  text: string;
  voice: string;
  emotion: string;
  language: string;
  audio_path: string;
  duration: number;
  created_at: string;
}

function App() {
  const [text, setText] = useState('Ma-ngo! Mabbalat.');
  const [voice, setVoice] = useState('itawit');
  const [language, setLanguage] = useState('itw');
  const [emotion, setEmotion] = useState('neutral');
  const [sttLang, setSttLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cloneAudio, setCloneAudio] = useState<File | null>(null);
  const [cloneName, setCloneName] = useState('');
  const [uploading, setUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const voiceToLanguage: Record<string, string> = {
    'itawit': 'itw',
    'tagalog': 'tl',
    'dutch_nl': 'nl',
    'dutch_be': 'nl_be',
  };

  useEffect(() => {
    if (voice in voiceToLanguage) {
      setLanguage(voiceToLanguage[voice]);
    }
  }, [voice]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/generations`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.generations || []);
      }
    } catch {
      console.error('Failed to fetch history');
    }
  };

  const generate = async () => {
    if (!text.trim()) {
      setError('Please enter text');
      return;
    }

    setLoading(true);
    setError('');
    setAudioUrl('');

    try {
      let voicePromptId = null;
      
      if (voice === 'clone' && cloneAudio) {
        setUploading(true);
        const formData = new FormData();
        formData.append('audio', cloneAudio);
        formData.append('name', cloneName || 'Voice Clone');
        formData.append('reference_text', text);
        
        const uploadRes = await fetch(`${API_URL}/voice/clone`, {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadRes.ok) throw new Error('Failed to upload voice clone');
        
        const uploadData = await uploadRes.json();
        voicePromptId = uploadData.voice_prompt_id;
        setUploading(false);
      }

      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          voice: voice === 'clone' ? 'echo' : voice, 
          emotion, 
          language: language,
          voice_prompt_id: voicePromptId
        }),
      });

      if (!res.ok) throw new Error('Generation failed');

      const data = await res.json();
      const url = data.audio_url || `${API_URL}/audio/${data.path}`;
      setAudioUrl(url);
      fetchHistory();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate');
    } finally {
      setLoading(false);
      setUploading(false);
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

  const playHistory = (item: HistoryItem) => {
    const url = item.audio_path?.startsWith('http') 
      ? item.audio_path 
      : `${API_URL}/audio/${item.audio_path}`;
    setAudioUrl(url);
  };

  const downloadAudio = (item: HistoryItem) => {
    const url = item.audio_path?.startsWith('http') 
      ? item.audio_path 
      : `${API_URL}/audio/${item.audio_path}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `eburon_${item.id}.wav`;
    link.click();
  };

  const copyToInput = (item: HistoryItem) => {
    setText(item.text);
    setVoice(item.voice);
    setEmotion(item.emotion);
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '◀' : '▶'}
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-section">
          <h4>Language</h4>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="itw">Itawit</option>
            <option value="tl">Tagalog</option>
            <option value="nl">Dutch (Netherlands)</option>
            <option value="nl_be">Dutch (Flemish)</option>
          </select>
        </div>

        <div className="sidebar-section">
          <h4>Voice</h4>
          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            {VOICES.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>

        {voice === 'clone' && (
          <div className="sidebar-section">
            <h4>Voice Clone</h4>
            <input
              type="text"
              placeholder="Clone name"
              value={cloneName}
              onChange={(e) => setCloneName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                background: 'var(--bg)',
                border: '1px solid #333',
                borderRadius: '6px',
                color: 'var(--text)',
              }}
            />
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setCloneAudio(e.target.files?.[0] || null)}
              style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}
            />
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Upload a reference audio (5-30 sec) to clone your voice
            </p>
          </div>
        )}

        <div className="sidebar-section">
          <h4>Emotion</h4>
          <div className="sidebar-emotions">
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
        </div>

        <div className="sidebar-section">
          <h4>STT Language</h4>
          <select value={sttLang} onChange={(e) => setSttLang(e.target.value)}>
            {LANGUAGES.slice(0, 50).map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sidebar-section">
          <h4>Quick Phrases</h4>
          <div className="sidebar-phrases">
            {QUICK_PHRASES.map((p) => (
              <button
                key={p.text}
                className="phrase-btn"
                onClick={() => setText(p.text)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

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

          <div className="controls">
            <button onClick={generate} disabled={loading || uploading} style={{ width: '100%' }}>
              {uploading ? 'Uploading Voice Clone...' : loading ? 'Generating...' : 'Generate Speech'}
            </button>
          </div>
        </div>

        <div className="input-section">
          <h3>Speech to Text (STT)</h3>
          <div className="controls" style={{ marginTop: '1rem' }}>
            <button
              onClick={transcribing ? stopRecording : startRecording}
              disabled={loading}
              style={{ width: '100%', background: transcribing ? '#ff4444' : '#32CD32' }}
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

        {history.length > 0 && (
          <div className="history-section">
            <h3>Generation History</h3>
            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-header" onClick={() => toggleExpand(item.id)}>
                    <div className="history-info">
                      <span className="history-text-preview">
                        {item.text?.substring(0, 50)}...
                      </span>
                      <span className="history-meta">
                        {item.voice} • {item.emotion} • {item.duration?.toFixed(1)}s
                      </span>
                    </div>
                    <span className="expand-icon">{expandedId === item.id ? '▼' : '▶'}</span>
                  </div>
                  
                  {expandedId === item.id && (
                    <div className="history-details">
                      <div className="history-full-text">
                        <strong>Script:</strong>
                        <p>{item.text}</p>
                      </div>
                      <div className="history-metadata">
                        <span>Voice: {item.voice}</span>
                        <span>Emotion: {item.emotion}</span>
                        <span>Language: {item.language}</span>
                        <span>Duration: {item.duration?.toFixed(2)}s</span>
                        <span>Created: {new Date(item.created_at).toLocaleString()}</span>
                      </div>
                      <div className="history-actions">
                        <button onClick={() => playHistory(item)}>▶ Play</button>
                        <button onClick={() => downloadAudio(item)}>↓ Download</button>
                        <button onClick={() => copyToInput(item)}>📋 Use Text</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        © 2026 Eburon AI - All rights reserved
      </footer>
    </div>
  );
}

export default App;
