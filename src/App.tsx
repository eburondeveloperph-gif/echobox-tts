import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const emotions = [
  { id: 'neutral', label: 'Neutral' },
  { id: 'happy', label: 'Happy' },
  { id: 'sad', label: 'Sad' },
  { id: 'angry', label: 'Angry' },
  { id: 'excited', label: 'Excited' },
  { id: 'whisper', label: 'Whisper' },
];

const quickPhrases = [
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

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
            placeholder="Enter text in Itawit or English..."
          />

          <div className="emotions">
            {emotions.map((e) => (
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

        {(error || loading) && (
          <div className={`status ${error ? 'error' : 'loading'}`}>
            {error || 'Generating speech...'}
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
            {quickPhrases.map((p) => (
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
