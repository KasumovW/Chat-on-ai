import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestPayload = await request.json();

  const { text } = requestPayload;

  if (!text)
    return NextResponse.json({ error: "Text is required" }, { status: 400 });

  try {
    console.log("request");

    const response = await axios.post(
      "http://localhost:8001/v1/completions",
      {
        include_sources: true,
        prompt: text,
        stream: false,
        system_prompt:
          "Ты - чат бот помощник мобильных разработчиков RuStore. Твоя задача отвечать строго по документации. Твой язык - русский.",
        use_context: true,
      },
      {
        headers: {
          "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          Cookie:
            "favorites=; _ym_uid=1712839069707152295; _ym_d=1712839069; cted=modId=xyz;ya_client_id=1712839069707152295",
          Origin: "http://localhost:8001",
          Referer: "http://localhost:8001/docs",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          accept: "application/json",
          "sec-ch-ua":
            '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
        },
      }
    );
    console.log({
      data: response.data,
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      //@ts-ignore
      { message: "Internal server error", error: error?.message ?? "" },
      { status: 500 }
    );
  }
}
