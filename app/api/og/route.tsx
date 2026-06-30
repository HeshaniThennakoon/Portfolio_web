import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getHero, getOgSettings, getSettings, getProjectBySlug } from "@/lib/data";
import fs from "fs";
import path from "path";

export const revalidate = 0;

// Helper to convert public directory images to Base64 so ImageResponse loads them reliably
async function getImageDataUri(imagePath: string) {
  try {
    if (!imagePath) return null;
    
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      const response = await fetch(imagePath);
      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get("content-type") || "image/jpeg";
      return `data:${contentType};base64,${Buffer.from(buffer).toString("base64")}`;
    }
    
    // Safe local resolve
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    const filePath = path.join(process.cwd(), "public", cleanPath);
    
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(filePath).replace(".", "") || "png";
      const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
      return `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
    }
  } catch (err) {
    console.error("Error reading image for OG generator:", err);
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "portfolio";
    
    const [hero, ogSettings, settings] = await Promise.all([
      getHero(),
      getOgSettings(),
      getSettings(),
    ]);

    const primaryColor = settings.theme.primary || "#2563EB";
    const secondaryColor = settings.theme.secondary || "#06B6D4";
    const darkBg = settings.theme.darkBg || "#050505";
    
    if (type === "project") {
      const slug = searchParams.get("slug") || "";
      const project = slug ? await getProjectBySlug(slug) : null;
      
      const projectTitle = project?.title || searchParams.get("title") || "My Project";
      const projectDesc = project?.description || searchParams.get("description") || "Case study of a software engineering project.";
      const techStack: string[] = project?.technologies || [];
      
      // Render project preview card
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: darkBg,
              backgroundImage: `linear-gradient(135deg, ${darkBg} 40%, ${primaryColor}1a 100%)`,
              padding: "60px 80px",
              justifyContent: "space-between",
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#FFFFFF",
              position: "relative",
              border: `8px solid ${primaryColor}22`,
            }}
          >
            {/* Top Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: `${primaryColor}1d`,
                  border: `1px solid ${primaryColor}55`,
                  padding: "6px 16px",
                  borderRadius: "20px",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.5px", color: primaryColor }}>
                  Project Case Study
                </span>
              </div>
              <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: "500" }}>
                {ogSettings.siteName}
              </div>
            </div>

            {/* Middle Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1, justifyContent: "center" }}>
              <h1 style={{ fontSize: "52px", fontWeight: "800", margin: 0, padding: 0, color: "#FFFFFF", lineHeight: 1.2 }}>
                {projectTitle}
              </h1>
              <p style={{ fontSize: "22px", color: "rgba(255,255,255,0.8)", margin: 0, padding: 0, lineHeight: 1.5, maxHeight: "100px", overflow: "hidden" }}>
                {projectDesc.length > 150 ? `${projectDesc.slice(0, 150)}...` : projectDesc}
              </p>
            </div>

            {/* Tech Stack and Author */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", maxWidth: "70%" }}>
                {techStack.slice(0, 5).map((tech, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {tech}
                  </div>
                ))}
                {techStack.length > 5 && (
                  <div
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: secondaryColor,
                    }}
                  >
                    +{techStack.length - 5} more
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Developed By</span>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#FFFFFF" }}>{hero.name}</span>
              </div>
            </div>
            
            {/* Bottom Color Accent Bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }} />
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    // Default Portfolio layout
    const primaryRole = hero.roles[0] || "Software Engineer";
    const profileImgBase64 = ogSettings.showProfilePhoto ? await getImageDataUri(hero.profileImg) : null;
    const isAvailable = hero.availabilityStatus === "open" || hero.availabilityStatus === "available";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: darkBg,
            backgroundImage: `linear-gradient(135deg, ${darkBg} 50%, ${primaryColor}1a 100%)`,
            padding: "80px",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "#FFFFFF",
            position: "relative",
            border: `8px solid ${primaryColor}22`,
          }}
        >
          {/* Left Text details */}
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", flexGrow: 1, maxWidth: profileImgBase64 ? "60%" : "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Availability Badge */}
              {ogSettings.showAvailability && isAvailable && (
                <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", gap: "8px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "6px 14px", borderRadius: "20px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                  <span style={{ fontSize: "14px", fontWeight: "bold", color: "#10B981", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {hero.availabilityMessage || "Available For Hire"}
                  </span>
                </div>
              )}

              {/* Name and Role */}
              <div style={{ display: "flex", flexDirection: "column", marginTop: "16px" }}>
                <h1 style={{ fontSize: "56px", fontWeight: "900", margin: 0, padding: 0, color: "#FFFFFF", lineHeight: 1.1 }}>
                  {hero.name}
                </h1>
                <div style={{ fontSize: "24px", fontWeight: "600", color: primaryColor, marginTop: "6px" }}>
                  {primaryRole}
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div style={{ display: "flex", fontSize: "26px", fontWeight: "500", color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.4, margin: "24px 0", fontStyle: "italic" }}>
              {`"${ogSettings.tagline || hero.headline}"`}
            </div>

            {/* Domain Footer */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold", color: secondaryColor }}>
                {ogSettings.siteUrl.replace(/^https?:\/\//, "")}
              </span>
            </div>
          </div>

          {/* Right Profile Photo */}
          {profileImgBase64 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  borderRadius: "50%",
                  padding: "8px",
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src={profileImgBase64}
                  alt={hero.name}
                  style={{
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}

          {/* Dynamic Side Stripe */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }} />
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (error: any) {
    console.error("OG generation error:", error);
    return new Response(`Failed to generate image: ${error.message}`, { status: 500 });
  }
}
