# Eburon TTS

**Developed for Eburon AI by Master E**  
*Head of Eburon AI Development Team*

Eburon AI Text-to-Speech system with Itawit language support.

## Quick Start

### One-Click Bootstrap

```bash
./echovoice.sh
```

### Manual Setup

```bash
# Clone the repo
git clone https://github.com/eburondeveloperph-gif/echobox-tts.git
cd echobox-tts

# Install dependencies
pip install -r requirements.txt

# Run the server
python eburon_tts_server.py
```

### Docker Deployment (Railway/Render/Fly.io)

```bash
# Build the image
docker build -t eburon-tts .

# Run locally
docker run -p 8000:8000 eburon-tts
```

### Deploy to Railway

```bash
railway deploy
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info |
| `/health` | GET | Health check |
| `/generate` | POST | Generate TTS audio |
| `/clone` | POST | Clone voice |
| `/transcribe` | POST | STT transcription |

## API Usage

### Generate TTS
```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "Ma-ngo! Mabbalat.", "voice": "itawit"}'
```

### Clone Voice
```bash
curl -X POST http://localhost:8000/clone \
  -F "audio=@voice.wav"
```

### Transcribe
```bash
curl -X POST http://localhost:8000/transcribe \
  -F "audio=@speech.wav"
```

## License

Proprietary - All rights reserved © 2026 Eburon

## Desktop App (Tauri - Mac/Windows/Linux)

```bash
# Install dependencies
npm install

# Development
npm run tauri dev

# Build for production
npm run tauri build
```

This creates native desktop apps for:
- macOS (.dmg/.app)
- Windows (.exe/.msi)
- Linux (.deb/.AppImage)
