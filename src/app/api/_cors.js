export default function cors(req) {
  const allowedOrigins = [
    "https://e-learning-oxg71xdhk-omaryassin22s-projects.vercel.app",
    "https://e-learning-o4h8w8rvb-omaryassin22s-projects.vercel.app",
  ];

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  return {
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  };
}
