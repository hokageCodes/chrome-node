const path = require('path');
const fs = require('fs');
const { Deepgram } = require("@deepgram/sdk");

const deepgramApiKey =  '550490491ccdbcb299b6dbd62877203758ffc492'
const deepgram = new Deepgram(deepgramApiKey);


const videoDirectory = path.join(__dirname, '../../uploads/');

exports.getVideo = (req, res, next) => {
    const filename = req.params.filename;
    const videoPath = path.join(videoDirectory, filename);
    console.log(videoDirectory);

     // Check if the video file exists
     if (fs.existsSync(videoPath)) {
        // Use the 'video/mp4' MIME type for video files
        res.setHeader('Content-Type', 'video/mp4');
        // Stream the video file to the response
        const videoStream = fs.createReadStream(videoPath);
        videoStream.pipe(res);
    } else {
        // Return a 404 error if the video file does not exist
        res.status(404).json({error: 'Video not found'});
    }

};

exports.uploadVideo = async (req, res, next) => {
    try {
        if (req.file) {
            // If there is a file in the request, it's a standard upload
            const videoPath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            return res.status(200).json({ success: true, link: videoPath });
        }

        // Check if it's a chunk upload or the finalization request
        if (req.body.finalize) {
            const chunkData = req.body.chunkData; //in the case of another chunk
            if (chunkData) {
                fs.appendFile('tempVideo.mp4', chunkData, (err) => {
                    if (err) {
                        console.error('Error appending video chunk:', err);
                        return res.status(500).json({ error: 'Error uploading video chunk' });
                    }

                    // After adding, proceed to finalize by renaming
                    fs.rename('tempVideo.mp4', `uploads/${req.file.filename}`, (err) => {
                        if (err) {
                            console.error('Error finalizing video upload:', err);
                            return res.status(500).json({ error: 'Error finalizing video upload' });
                        } else {
                            const videoPath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
                            return res.status(200).json({ success: true, link: videoPath });
                        }
                    });
                });
            } else {
                // in the event of no chunk left
                fs.rename('tempVideo.mp4', `uploads/${req.file.filename}`, (err) => {
                    if (err) {
                        console.error('Error finalizing video upload:', err);
                        return res.status(500).json({ error: 'Error finalizing video upload' });
                    } else {
                        const videoPath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
                        return res.status(200).json({ success: true, link: videoPath });
                    }
                });
            }
        } else {
            // Handle individual video chunk uploads
            const chunkData = req.body.chunkData; // requires chunk data field in req
            fs.appendFile('tempVideo.mp4', chunkData, (err) => {
                if (err) {
                    console.error('Error appending video chunk:', err);
                    return res.status(500).json({ error: 'Error uploading video chunk' });
                } else {
                    return res.status(200).json({ success: true, message: 'Video chunk uploaded successfully' });
                }
            });
        }
    } catch (error) {
        console.error('Error uploading video:', error);
        return res.status(500).json({ error: 'An error occurred while uploading' });
    }
};

exports.transcribeAudio = async function(file, mimeType) {
  let source;

  if (file.startsWith('http')) {
    source = {
      url: file,
    };
  } else {
    const audio = fs.readFileSync(file);

    source = {
      buffer: audio,
      mimetype: mimeType,
    };
  }

  try {
    const response = await deepgram.transcription.preRecorded(source, {
      smart_format: true,
      model: 'nova',
    });
    
    return response;
  } catch (error) {
    throw error;
  }
}