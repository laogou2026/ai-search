export async function onRequest(context) {
    const token = context.env.GITHUB_TOKEN;
    const { query } = await context.request.json();
    const response = await fetch("https://models.github.ai/inference/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "openai/gpt-4.1-mini",
            messages: [{ role: "user", content: query }]
        })
    });
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "无响应";
    return new Response(JSON.stringify({ answer }), {
        headers: { "Content-Type": "application/json" }
    });
}
