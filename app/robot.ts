import { baseUrl } from "@/constants/const";
import { MetadataRoute } from "next";

export default function robots() : MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*", // all bots
            allow: "/", // bot can entry all routes of website 
            disallow: ["/cart", "/checkout", "/account", "/login", "/register", 
                        "/reset", "/forgot-password", "/reset-password" ] //except these routes :D
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}