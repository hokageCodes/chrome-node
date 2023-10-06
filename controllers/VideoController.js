const path = require('path');
const fs = require('fs');
const { Deepgram } = require('@deepgram/sdk');

const deepgramApiKey = 'bb7c5f6ce3ca8373e6099ffbdc4798a7cb0d9827';
const deepgram = new Deepgram(deepgramApiKey);

const videoDirectory = path.join(__dirname, '../uploads');

exports.getVideo = (req, res, next) => {
    try {
        const filename = req.params.filename;
        const videoPath = path.join(videoDirectory, filename + '.mp4');
        console.log(videoPath)
        if (fs.existsSync(videoPath)) {
            res.setHeader('Content-Type', 'video/mp4');
            const videoStream = fs.createReadStream(videoPath);
            videoStream.pipe(res);
        } else {
            res.status(404).json({ error: 'Video not found' });
        }
    } catch (error) {
        console.log(error)
    }
};

exports.uploadVideo = async (req, res, next) => {
    try {
        if (req.file) {
            const videoPath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            return res.status(200).json({ success: true, link: videoPath });
        }

        if (req.body.finalize) {
            const chunkData = req.body.chunkData;
            if (chunkData) {
                fs.appendFile('tempVideo.mp4', chunkData, (err) => {
                    if (err) {
                        console.error('Error appending video chunk:', err);
                        return res.status(500).json({ error: 'Error uploading video chunk' });
                    }

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
            const chunkData = req.body.chunkData;
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

exports.transcribeAudio = async function (file, mimeType) {
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
};
