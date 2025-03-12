export const apiRequest = async (url, body, method, setData?:Function, router?:any) => {
    fetch(url, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        method
    })
        .then(async(res) => await res.json())
        .then( async(data) => {
            console.log(data)
            setData ?setData(data):null
            data.token && router ? router.push('/chat/home') :null
            return 'data'
        })
        .catch((err) => alert(err))
}