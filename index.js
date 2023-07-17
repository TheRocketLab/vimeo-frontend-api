import axios from 'axios'

const getThumbnailUrl = async (videoId) => {

  axios
    .get(`/api/vimeoThumb?videoId=${videoId}`)
    .then((response) => {
      console.log('response', response)
      setThumbnailUrl(response.data.thumbnailUrl)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

getThumbnailUrl('123456789')
