import Format from '../models/Format'

class FormatService {
  public url = `http://localhost:3000/formats`

  public fetchFormats = async (): Promise<[Format]> => {
    const response = await fetch(this.url)
    const formatsJSON = await response.json()

    const formats = this.jsonToFormat(formatsJSON)

    return formats
  }

  public fetchFormat = async (id: number): Promise<Format> => {
    const response = await fetch(`${this.url}/${id}`)
    const formatsJSON = await response.json()

    const format: Format = {
      id: formatsJSON ? formatsJSON.id : null,
      description: formatsJSON ? formatsJSON.description : 'Indefinido'
    }

    return format
  }

  public createFormat = async (description: string): Promise<Format> => {
    console.log(description)
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({ description: description }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const formatJSON = await response.json()
    console.log(formatJSON)
    const format: Format = {
      id: formatJSON.id,
      description: formatJSON.description
    }
    return format
  }

  public updateFormat = async (format: Format): Promise<boolean> => {
    const response = await fetch(`${this.url}/${format.id}`, {
      method: 'PUT',
      body: JSON.stringify(format),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const res = await response.json()
    if (!res.error) {
      return true
    } else {
      return false
    }
  }

  public deleteFormat = async (format: Format): Promise<boolean> => {
    const response = await fetch(`${this.url}/${format.id}`, {
      method: 'DELETE',
      body: JSON.stringify(format),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const res = await response.json()
    if (!res.error) {
      return true
    } else {
      return false
    }
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
