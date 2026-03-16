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

## License

Proprietary - All rights reserved © 2026 Eburon
