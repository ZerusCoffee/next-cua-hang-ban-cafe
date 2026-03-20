import { baseUrl } from "@/constants/const";
import { LocalBusiness, WithContext } from "schema-dts";

export default function BusinessSchema() {
    const jsonLd: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        "@id": `${baseUrl}/#organization`,
        "name": "Tiệm Cà Phê Zerus",
        "url": baseUrl,
        "logo": `${baseUrl}/assets/images/logo-new.png`,
        "image": `${baseUrl}/assets/images/store-front.jpg`,
        "description": "Tiệm Cà Phê Zerus - Nơi thưởng thức cà phê đậm vị, trà sữa chuẩn gu và không gian chill tại Sài Gòn.",
        "telephone": "+84901234567",
        "priceRange": "25.000đ - 65.000đ",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Đường ABC, Phường X", // Địa chỉ cụ thể
            "addressLocality": "Quận 1",
            "addressRegion": "Thành phố Hồ Chí Minh",
            "postalCode": "700000",
            "addressCountry": "VN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 10.7769,
            "longitude": 106.7009
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "07:00",
                "closes": "22:00"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/zeruscafe",
            "https://www.instagram.com/zeruscafe",
            "https://www.tiktok.com/@zeruscafe"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}