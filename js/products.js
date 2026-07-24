/**
 * Dream Decorations - Products Dataset
 * Centralized catalog containing luxury home decor products.
 */

const PRODUCTS = [
    {
        id: 1,
        name: "Minimalist Brass Pendant Lamp",
        category: "Lighting",
        price: 340,
        originalPrice: 390,
        rating: 4.9,
        reviewsCount: 34,
        image: "assets/images/product-1.jpg",
        shortDescription: "A statement brass fixture designed to casting warm, ambient illumination across modern dining and living spaces.",
        description: "The Minimalist Brass Pendant Lamp combines timeless architectural geometry with hand-polished solid brass. Each arm holds a frosted opal glass globe, diffusing light to create a soft, inviting atmosphere. Perfectly balanced for suspended installation over dining tables, kitchen islands, or expansive entryways.",
        details: [
            "Hand-polished solid brass framework",
            "Frosted opal glass diffuser globes",
            "Adjustable drop height cable included",
            "Compatible with dimmable LED E26 bulbs",
            "Designed and assembled with artisan precision"
        ],
        dimensions: '38" W x 24" H (Adjustable drop 18" - 60")',
        material: "Solid Brass & Opal Glass",
        isFeatured: true,
        isNewArrival: false
    },
    {
        id: 2,
        name: "Aura Sculptural Ceramic Vase",
        category: "Vases",
        price: 185,
        originalPrice: null,
        rating: 4.8,
        reviewsCount: 22,
        image: "assets/images/product-2.jpg",
        shortDescription: "Organic curved silhouette crafted from matte-glazed stonework, blending minimalist art with functional decor.",
        description: "Inspired by soft natural topography, the Aura Sculptural Ceramic Vase is individually wheel-thrown and finished with a tactile chalky matte glaze. Its dramatic central aperture provides an artistic focal point, whether displayed empty as a sculpture or filled with dried botanical stems.",
        details: [
            "Handcrafted stoneware with chalky matte glaze",
            "Water-tight interior coating for fresh florals",
            "Felt base pad to prevent surface scratching",
            "Each piece features subtle organic variations"
        ],
        dimensions: '9.5" W x 14" H x 4.5" D',
        material: "High-Fired Stoneware Ceramic",
        isFeatured: true,
        isNewArrival: true
    },
    {
        id: 3,
        name: "Bas-Relief Abstract Wall Art",
        category: "Wall Décor",
        price: 460,
        originalPrice: 520,
        rating: 5.0,
        reviewsCount: 19,
        image: "assets/images/product-3.jpg",
        shortDescription: "Hand-rendered textured plaster artwork encased in an oak float frame, capturing light and shadow.",
        description: "Bring dimensional elegance to your wall spaces with this hand-rendered bas-relief plaster composition. Soft cascading geometric waves create dynamic interplay with room lighting throughout the day. Framed in sustainably sourced solid natural oak.",
        details: [
            "Original hand-sculpted plaster compound",
            "Solid natural oak float frame with satin finish",
            "Heavy-duty pre-installed french cleat hanging hardware",
            "UV-resistant matte protective seal"
        ],
        dimensions: '36" W x 48" H x 2" D',
        material: "Architectural Plaster & Solid Oak",
        isFeatured: true,
        isNewArrival: false
    },
    {
        id: 4,
        name: "Calacatta Marble Pedestal Bowl",
        category: "Sculptures",
        price: 290,
        originalPrice: null,
        rating: 4.7,
        reviewsCount: 15,
        image: "assets/images/product-4.jpg",
        shortDescription: "Carved from solid Italian Calacatta Viola marble with rich veining, ideal for credenza styling.",
        description: "A testament to raw geological beauty, this pedestal centerpiece bowl is carved from a single block of premium Italian Calacatta marble. Featuring distinct dramatic purple-burgundy veining against a creamy white ground, it serves as an instant conversation piece for dining tables or sideboards.",
        details: [
            "100% natural Italian Calacatta Viola marble",
            "Hand-honed satin velvet surface finish",
            "Subtle pedestal base for elevated profile",
            "Sealed against staining from dry decorative items"
        ],
        dimensions: '12" Diameter x 5.5" H',
        material: "Natural Calacatta Marble",
        isFeatured: true,
        isNewArrival: true
    },
    {
        id: 5,
        name: "Cedar & Wild Fig Scented Candle",
        category: "Candles",
        price: 75,
        originalPrice: 85,
        rating: 4.9,
        reviewsCount: 48,
        image: "assets/images/product-5.jpg",
        shortDescription: "Hand-poured coconut soy wax blend infused with rare botanical oils in heavy mouth-blown amber glass.",
        description: "Elevate your home fragrance ritual with our signature Cedar & Wild Fig candle. Grounding notes of Atlas cedarwood, sun-ripened fig leaves, and warm amber create a calm, luxurious atmosphere. Poured into a heavy amber glass vessel designed for re-use long after the final burn.",
        details: [
            "100% natural coconut soy wax blend",
            "Dual organic cotton wicks for clean, even burn",
            "Fragrance formulated with essential oils (phthalate-free)",
            "Approximate burn time: 75-80 hours",
            "Heavy reusable amber glass vessel with custom wooden lid"
        ],
        dimensions: '4.2" Diameter x 4.8" H (14.5 oz / 410g)',
        material: "Soy Wax & Mouth-Blown Glass",
        isFeatured: true,
        isNewArrival: false
    },
    {
        id: 6,
        name: "Brushed Brass Architectural Tray",
        category: "Accessories",
        price: 165,
        originalPrice: null,
        rating: 4.8,
        reviewsCount: 29,
        image: "assets/images/product-6.jpg",
        shortDescription: "Precision-milled brass tray with raised lip design, providing a refined anchor for coffee tables.",
        description: "Streamline table clutter with this sleek architectural brass tray. Featuring crisp raised edges and rounded corners, it creates a disciplined anchor for books, candles, and decorative objects. Finished with a brushed champagne patina that resists fingerprints.",
        details: [
            "Solid brass with anti-tarnish protective lacquer",
            "Non-slip suede undersurface protects furniture",
            "Seamless rolled edges for refined touch",
            "Wipe clean with soft damp cloth"
        ],
        dimensions: '18" L x 12" W x 1.2" H',
        material: "Solid Brushed Brass",
        isFeatured: true,
        isNewArrival: true
    },
    {
        id: 7,
        name: "Lumina Fluted Floor Lamp",
        category: "Lighting",
        price: 520,
        originalPrice: 580,
        rating: 4.9,
        reviewsCount: 14,
        image: "assets/images/product-7.jpg",
        shortDescription: "Slender fluted brass column paired with a natural linen drum shade for timeless ambient warmth.",
        description: "The Lumina Floor Lamp introduces understated luxury to reading nooks and living space corners. Its slender vertical brass column features crisp fluting detail, anchored by a heavy circular base and crowned with a hand-tailored Belgian linen shade.",
        details: [
            "Heavy brass base with fluted vertical column",
            "Natural textured Belgian linen drum shade",
            "Foot-step brass dimmer switch on fabric cord",
            "Accommodates up to 100W E26 bulb or LED equivalent"
        ],
        dimensions: '18" Shade Diameter x 64" Total Height',
        material: "Brass & Belgian Linen",
        isFeatured: false,
        isNewArrival: true
    },
    {
        id: 8,
        name: "Terra Ribbed Floor Vessel",
        category: "Vases",
        price: 240,
        originalPrice: null,
        rating: 4.7,
        reviewsCount: 18,
        image: "assets/images/product-8.jpg",
        shortDescription: "Tall textured earthenware vessel with subtle vertical ribbing, designed for entryway styling.",
        description: "Substantial in proportion and rich in surface texture, the Terra Ribbed Floor Vessel anchors room corners and entryway consoles. Crafted from warm terracotta clay with hand-carved linear ridges and a weathered chalk wash.",
        details: [
            "Hand-carved ribbed earthenware clay",
            "Weathered chalk matte exterior finish",
            "Ideal for pampas grass, monstera leaves, or tall branches",
            "Weighted bottom for stability"
        ],
        dimensions: '11" Diameter x 22" H',
        material: "Earthenware Clay",
        isFeatured: false,
        isNewArrival: false
    },
    {
        id: 9,
        name: "Solstice Convex Brass Mirror",
        category: "Wall Décor",
        price: 380,
        originalPrice: 420,
        rating: 4.9,
        reviewsCount: 31,
        image: "assets/images/product-9.jpg",
        shortDescription: "Statement circular mirror framed in hand-hammered antiqued brass with wide bevel edge.",
        description: "Reflect ambient room light with the Solstice Brass Mirror. Its subtle convex glass creates an intriguing painterly panorama of your living room space, enclosed within a wide antiqued brass frame with delicate hand-hammered detailing.",
        details: [
            "Convex optical glass mirror lens",
            "Solid brass frame with hand-hammered antique patina",
            "Dual point heavy-duty mounting bracket",
            "Distorted optical reflection adds artistic depth"
        ],
        dimensions: '28" Total Diameter x 2.5" Depth',
        material: "Antiqued Brass & Glass Mirror",
        isFeatured: false,
        isNewArrival: false
    },
    {
        id: 10,
        name: "Forma Abstract Bronze Sculpture",
        category: "Sculptures",
        price: 310,
        originalPrice: null,
        rating: 4.8,
        reviewsCount: 11,
        image: "assets/images/product-10.jpg",
        shortDescription: "Lost-wax cast bronze abstract form mounted on a solid Nero Marquina marble block.",
        description: "Celebrating mid-century modernist sculpture, Forma features fluid continuous bronze loops that shift gracefully as you walk around the room. Each piece is cast using the ancient lost-wax technique and patinated to a deep espresso tone.",
        details: [
            "Cast bronze with hand-applied dark bronze patina",
            "Solid Spanish Nero Marquina black marble base",
            "Felt padded base with engraved edition hallmark",
            "Hand-buffed with microcrystalline wax"
        ],
        dimensions: '8" W x 15" H x 6" D',
        material: "Bronze & Nero Marquina Marble",
        isFeatured: false,
        isNewArrival: true
    },
    {
        id: 11,
        name: "Ribbed Pillar Candle Set",
        category: "Candles",
        price: 65,
        originalPrice: 75,
        rating: 4.6,
        reviewsCount: 37,
        image: "assets/images/product-11.jpg",
        shortDescription: "Set of three sculptural fluted pillars in varying heights, unscented for dining environments.",
        description: "Designed for atmospheric table styling without overpowering culinary aromas. This curated trio of unscented pillar candles features sharp vertical fluting and is formulated from clean-burning soy wax that burns evenly down its core.",
        details: [
            "Set of 3 candles (Small 4\", Medium 6\", Large 8\")",
            "Clean-burning unscented natural soy wax",
            "Unscented – ideal for dinner parties and table settings",
            "Dripless formulation when kept away from direct drafts"
        ],
        dimensions: '3" Diameter (Heights: 4", 6", 8")',
        material: "Natural Soy Wax & Lead-Free Cotton Wicks",
        isFeatured: false,
        isNewArrival: false
    },
    {
        id: 12,
        name: "Travertine Geometric Bookends",
        category: "Accessories",
        price: 210,
        originalPrice: null,
        rating: 4.9,
        reviewsCount: 26,
        image: "assets/images/product-12.jpg",
        shortDescription: "Pair of solid Italian silver travertine bookends with unfilled porous textures.",
        description: "Bring architectural gravitas to your bookshelf or coffee table stack. Carved in precise geometric steps from unsealed Italian silver travertine, highlighting the natural pitted cavities and subtle grey-beige striations unique to natural stone.",
        details: [
            "Pair of heavy geometric bookends",
            "100% natural un-filled Italian Silver Travertine",
            "Substantial 8.5 lbs combined weight per pair",
            "Protective rubber footings keep heavy books securely upright"
        ],
        dimensions: '4.5" W x 7.5" H x 3.5" D (Each)',
        material: "Natural Italian Travertine",
        isFeatured: false,
        isNewArrival: false
    }
];

// Helper functions for dataset access
function getProductById(id) {
    return PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
    if (!category || category === "All") return PRODUCTS;
    return PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getFeaturedProducts() {
    return PRODUCTS.filter(p => p.isFeatured);
}

function getNewArrivals() {
    return PRODUCTS.filter(p => p.isNewArrival);
}
