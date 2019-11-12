import Format from '../models/Format'

class FormatService {
  public url = `http://localhost:3000/formats`

  public fetchFormats = async (): Promise<[Format]> => {
    const response = await fetch(this.url)
    const formatsJSON = await response.json()

    const formats = this.jsonToFormat(formatsJSON)

    return formats
  }

  public createFormat = async (format: Format): Promise<Format> => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(format),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const formats = this.jsonToFormat(await response.json())
    return formats[0]
  }

  public updateFormat = async (format: Format): Promise<Format> => {
    const response = await fetch(`${this.url}/${format.id}`, {
      method: 'PUT',
      body: JSON.stringify(format),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const formats = this.jsonToFormat(await response.json())
    return formats[0]
  }

  public deleteFormat = async (format: Format): Promise<Format> => {
    const response = await fetch(`${this.url}/${format.id}`, {
      method: 'DELETE',
      body: JSON.stringify(format),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const formats = this.jsonToFormat(await response.json())
    return formats[0]
  }

  private jsonToFormat = (json: any): [Format] => {
    const formats = json.map((u: any) => {
      const format: Format = {
        id: u.id,
        description: u.description
      }
      return format
    })

    return formats
  }
}

export default new FormatService()
