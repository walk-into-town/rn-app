export const baseFetch = async (route: string, method: "POST" | "GET" | "PUT" | "DELETE", body?: any) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    try {
        const res = await fetch(route, {
            credentials: "same-origin",
            method: method,
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            signal: controller.signal
        });
        if(res.ok === false){
            console.log(await res.text())
            throw new Error(`응답 코드 [${res.status}] 에러`)
        }

        return await res.json();
    } catch (e) {
        console.log("baseFetch 에러", e);
        return { result: "failed", error: e.toString() };
    } finally {
        clearTimeout(timeoutId);
    }
}