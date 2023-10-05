const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { getVideo, uploadVideo, transcribeAudio } = require('../controllers/VideoController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'VideoUpload/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('video/')){
        cb(null, true)
    }else{
        cb(new Error('Supported file types are: .mp4, .avi, .mkv'), false);
    }
}

const upload = multer({ storage, fileFilter});

const router = express.Router();

// Videos are stored in this folder
const videoDirectory = 'VideoUpload/'; 

// All videos
router.get('/api/videos', (req, res) => {
    try {
        fs.readdir(videoDirectory, (err, files) => {
            if (err) {
                console.error('Error reading video directory:', err);
                return res.status(500).json({ error: 'An error occurred while fetching videos' });
            }

            // Filter out non-video files (adjust as needed based on file types)
            const videoFiles = files.filter((file) => {
                const fileExtension = path.extname(file).toLowerCase();
                return ['.mp4', '.avi', '.mkv'].includes(fileExtension); 
            });

            const videoUrls = videoFiles.map((file) => {
                return `${req.protocol}://${req.get('host')}/VideoUpload/videos/${file}`;
            });

            return res.status(200).json({ success: true, videos: videoUrls });
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
        return res.status(500).json({ error: 'some error occurred while fetching videos' });
    }
});

router.get('/api/video/:examplevideourl.mp4', getVideo);

router.post('/api/upload',upload.single('video'), uploadVideo);

router.post('/api/videos/transcribe', async (req, res) => {
    try {
    const { fileUrl, mimeType } = req.body;

    if (!fileUrl || !mimeType) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

// Ensure that fileUrl is a valid URL
    if (!isValidUrl(fileUrl)) {
      return res.status(400).json({ error: 'Invalid file URL' });
    }

    // Ensure that mimeType is one of the allowed types
    if (!isValidMimeType(mimeType)) {
      return res.status(400).json({ error: 'Invalid MIME type' });
    }

    const transcriptionResult = await transcribeAudio(fileUrl, mimeType);

    return res.status(200).json({ success: true, transcriptionResult });
  } catch (error) {
    return res.status(500).json({ error: 'Transcription failed', details: error.message });
  }
});

module.exports = router;
