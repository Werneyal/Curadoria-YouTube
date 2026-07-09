import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function unescapeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // API Route to extract YouTube video information
  app.post("/api/extract-youtube", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL é obrigatória." });
      }

      const videoId = getYouTubeId(url);
      if (!videoId) {
        return res.status(400).json({ error: "URL do YouTube inválida ou formato não suportado." });
      }

      // 1. Fetch details via YouTube oEmbed
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      
      let title = "";
      let channelName = "";
      let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // Fallback thumbnail URL

      try {
        const oembedRes = await fetch(oembedUrl);
        if (oembedRes.ok) {
          const oembedData: any = await oembedRes.json();
          title = oembedData.title || "";
          channelName = oembedData.author_name || "";
          if (oembedData.thumbnail_url) {
            thumbnailUrl = oembedData.thumbnail_url;
          }
        }
      } catch (e) {
        console.warn("Erro ao buscar oEmbed:", e);
      }

      // 2. Fetch watch page to extract description
      let description = "";
      try {
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const watchRes = await fetch(watchUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
          }
        });
        if (watchRes.ok) {
          const html = await watchRes.text();
          
          // Match meta description tag
          const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
          if (metaDescMatch && metaDescMatch[1]) {
            description = unescapeHtml(metaDescMatch[1]);
          } else {
            // Fallback to og:description
            const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
            if (ogDescMatch && ogDescMatch[1]) {
              description = unescapeHtml(ogDescMatch[1]);
            }
          }
        }
      } catch (e) {
        console.warn("Erro ao extrair descrição:", e);
      }

      // Clean up description and shorten it if too long
      if (!description) {
        description = "Sem descrição disponível. Você pode clicar no ícone de edição para personalizar as informações ou adicionar notas.";
      }

      if (description.length > 250) {
        description = description.slice(0, 250) + "...";
      }

      return res.json({
        url: `https://www.youtube.com/watch?v=${videoId}`,
        videoId,
        title: title || `Vídeo do YouTube (${videoId})`,
        channelName: channelName || "Canal desconhecido",
        description,
        thumbnailUrl
      });

    } catch (error: any) {
      console.error("Erro interno ao extrair informações do YouTube:", error);
      return res.status(500).json({
        error: "Ocorreu um erro ao processar o link do YouTube. Tente novamente.",
        details: error.message
      });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] rodando na porta ${PORT} (${process.env.NODE_ENV || "development"})`);
  });
}

startServer();
