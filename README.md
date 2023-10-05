# Video Sharing and Transcription Backend

This Node.js backend server provides video management and transcription functionalities. Users can upload, manage, and transcribe video files using the Deepgram API.

## Getting Started
[Live Link](https://chrome-node.onrender.com/)

To set up and run the server:

- Clone this repository.
- Navigate to the project directory.
- Install the required dependencies using npm.
- Set up your Deepgram API key from the [Deepgram website].
- Start the server.

The server will run on port 3000 by default, but you can change the port by setting the `PORT` environment variable.

## API Endpoints

### Get a Video

- **Endpoint**: `GET /api/video/:filename.mp4`
- **Description**: Stream and serve a specific video by providing its filename.
- **Authentication**: Not required.
- **Expected Response**:
  - `200 OK`: The video file will be streamed in response.
  - `404 Not Found`: If the video file does not exist.

### List All Videos

- **Endpoint**: `GET /api/videos`
- **Description**: Get a list of all available video files.
- **Authentication**: Not required.
- **Expected Response**:
  - `200 OK`: JSON response with an array of video URLs.

### Upload a Video

- **Endpoint**: `POST /api/upload`
- **Description**: Upload a video file in MP4, AVI, or MKV format.
- **Authentication**: Not required.
- **Request Body**:
  - `video` (file): The video file to upload.
- **Expected Response**:
  - `200 OK`: JSON response with a success message and the link to the uploaded video.
  - `400 Bad Request`: No file uploaded.
  - `401 Unauthorized`: User not logged in (if authentication is added in the future).

### Transcribe Audio from Video

- **Endpoint**: `POST /api/videos/transcribe`
- **Description**: Transcribe the audio from a video file.
- **Authentication**: Not required.
- **Request Body**:
  - `fileUrl` (string): URL or path to the video file.
  - `mimeType` (string): MIME type of the video.
- **Expected Response**:
  - `200 OK`: JSON response with the transcription result.
  - `400 Bad Request`: Invalid request data.
  - `401 Unauthorized`: User not logged in (if authentication is added in the future).

### Video Recording Start

- **Endpoint**: `POST /api/start-recording`
- **Description**: Start video recording (placeholder endpoint, implementation required).
- **Authentication**: Not required.
- **Expected Response**:
  - `200 OK`: Recording started (placeholder response).
  - `401 Unauthorized`: User not logged in (if authentication is added in the future).

### Video Recording Stop

- **Endpoint**: `POST /api/stop-recording`
- **Description**: Stop video recording (placeholder endpoint, implementation required).
- **Authentication**: Not required.
- **Expected Response**:
  - `200 OK`: Recording stopped (placeholder response).
  - `401 Unauthorized`: User not logged in (if authentication is added in the future).

## User Schema

The user schema includes the following fields:

- `username` (String, required, unique): The username of the user.
- `password` (String, required): The password of the user.

## Additional Notes

- Authentication is not included in this code, and endpoints are open.
- User data should be securely stored, and hashed passwords should be used for security.
- Configure the application for secure session management.

[Deepgram website]: https://deepgram.com/
[Live Link]: # Video Sharing and Transcription Backend

This Node.js backend server provides video management and transcription functionalities. Users can upload, manage, and transcribe video files using the Deepgram API.

## Getting Started

To set up and run the server:

- Clone this repository.
- Navigate to the project directory.
- Install the required dependencies using npm.
- Set up your Deepgram API key from the [Deepgram website].
- Start the server.

The server will run on port 3000 by default, but you can change the port by setting the `PORT` environment variable.

## API Endpoints

### Get a Video

- **Endpoint**: `GET /api/video/:filename.mp4`
- **Description**: Stream and serve a specific video by providing its filename.
- **Authentication**: Not required.
- **Expected Response**:
  - `200 OK`: The video file will be streamed in response.
  - `404 Not Found`: If the video file does not exist.

### List All Videos

- **Endpoint**: `GET /api/videos`
- **Description**: Get a list of all available video files.
- **Authentication**: Not required.
- **Expected Response**:
  - `200 OK`: JSON response with an array of video URLs.

### Upload a Video

- **Endpoint**: `POST /api/upload`
- **Description**: Upload a video file in MP4, AVI, or MKV format.
- **Authentication**: Not required.
- **Request Body**:
  - `video` (file): The video file to upload.
- **Expected Response**:
  - `200 OK`: JSON response with a success message and the link to the uploaded video.
  - `400 Bad Request`: No file uploaded.
  - `401 Unauthorized`: User not logged in (if authentication is added in the future).

### Transcribe Audio from Video

- **Endpoint**: `POST /api/videos/transcribe`
- **Description**: Transcribe the audio from a video file.
- **Authentication**: Not required.
- **Request Body**:
  - `fileUrl` (string): URL or path to the video file.
  - `mimeType` (string): MIME type of the video.
- **Expected Response**:
  - `200 OK`: JSON response with the transcription result.
  - `400 Bad Request`: Invalid request data.
  - `401 Unauthorized`: User not logged in (if authentication is added in the future).

### Video Recording Start

- **Endpoint**: `POST /api/start-recording`
- **Description**: Start video recording (placeholder endpoint, implementation required).
- **Authentication**: Not required.
- **Expected Response**:
  - `200 OK`: Recording started (placeholder response).
  - `401 Unauthorized`: User not logged in (if authentication is added in the future).

### Video Recording Stop

- **Endpoint**: `POST /api/stop-recording`
- **Description**: Stop video recording (placeholder endpoint, implementation required).
- **Authentication**: Not required.
- **Expected Response**:
  - `200 OK`: Recording stopped (placeholder response).
  - `401 Unauthorized`: User not logged in (if authentication is added in the future).

## User Schema

The user schema includes the following fields:

- `username` (String, required, unique): The username of the user.
- `password` (String, required): The password of the user.

## Additional Notes

- Authentication is not included in this code, and endpoints are open.
- User data should be securely stored, and hashed passwords should be used for security.
- Configure the application for secure session management.

[Deepgram website](https://deepgram.com/)

