import axios from 'axios'

export default async function handler(req, res) {
  const accessToken = process.env.VIMEO_PERSONAL_ACCESS_TOKEN

  const { videoId } = req.query

  try {
    // Make a request to Vimeo API to get the thumbnail
    const response = await axios.get(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
    })
    // [0] returns the 100x75 thumbnail
    // [1] returns the 200x150 thumbnail
    // [2] returns the 295x166 thumbnail
    // [3] returns the 640x360 thumbnail
    // [4] returns the 960x540 thumbnail
    // [5] returns the 1280x720 thumbnail
    // [6] returns the 1920x1080 thumbnail
    const thumbnailUrl = response.data.pictures.sizes[5].link_with_play_button

    res.status(200).json({ thumbnailUrl })
  } catch (error) {
    console.error('Error:', error)

    res.status(500).json({ error: 'Unable to retrieve thumbnail URL' })
  }
}
