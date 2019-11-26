import axios from 'axios'

class UploadService {
  public upload = async (fileData: any): Promise<string> => {
    const response = await axios.post('http://localhost:3000/upload', fileData)

    console.log(response)

    return response.data.filename
  }
}

export default new UploadService()
