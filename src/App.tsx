import { useState, useRef } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const LANGUAGES = [
  { code: 'it', name: 'Italian' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'ilo', name: 'Ilocano' },
  { code: 'itw', name: 'Itawit' },
  { code: 'war', name: 'Waray' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'tl', name: 'Filipino' },
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
    } catch (err: any) {
      setError(err.message || 'Failed to generate');
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
    } catch (err: any) {
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
    } catch (err: any) {
      setError(err.message || 'Transcription failed');
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
