import axios from "axios";

export const fetch = async (method: string, url: string) => {
    const response = await axios({
        method: method,
        url: url
    })

    return response.data
}