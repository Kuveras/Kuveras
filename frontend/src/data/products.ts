import type { Product, Coupon, Testimonial } from '../types';
import { calculateRentalPrice } from '../utils/pricing';

const RAW_PRODUCTS: Product[] = [
  {
    "id": "kuveras-3805",
    "name": "Meharika Tara Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 11710,
    "salePrice": 8197,
    "shortDesc": "An intricate diamond-look collar set with layered marquise motifs and matching drop earrings.",
    "images": [
      "/images/05/IMG_2376-scaled-e1746799678318.jpg",
      "/images/05/IMG_2379-scaled.jpg",
      "/images/05/IMG_2378-scaled-e1746799648799.jpg",
      "/images/05/IMG_2373-scaled-e1746799575543.jpg",
      "/images/05/IMG_2377-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3804",
    "name": "Ishvika Chandrakanta Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 12500,
    "salePrice": 8750,
    "shortDesc": "A brilliant diamond-look collar set with jhumka earrings and a regal, lotus-inspired maang tikka.",
    "images": [
      "/images/05/IMG_2391-scaled-e1746798958973.jpg",
      "/images/05/IMG_2385-scaled-e1746798900512.jpg",
      "/images/05/IMG_2395-scaled.jpg",
      "/images/05/IMG_2400-scaled.jpg",
      "/images/05/IMG_2399-scaled.jpg",
      "/images/05/IMG_2398-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3801",
    "name": "Aarunya Tara Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 5000,
    "salePrice": 3500,
    "shortDesc": "An airy composition of silver and mint tones, designed for soft, radiant sophistication.",
    "images": [
      "/images/05/IMG_2416-scaled-e1746708501516.jpg",
      "/images/05/IMG_2421-scaled.jpg",
      "/images/05/IMG_2422-scaled.jpg",
      "/images/05/IMG_2417-scaled.jpg",
      "/images/05/IMG_2418-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3800",
    "name": "Ravya Gulnaar Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 5000,
    "salePrice": 3500,
    "shortDesc": "Delicate and striking, this rose-pink choker set captures the essence of refined grace.",
    "images": [
      "/images/05/IMG_2436-scaled-e1746707707253.jpg",
      "/images/05/IMG_2439-scaled.jpg",
      "/images/05/IMG_2430-scaled-e1746707600173.jpg",
      "/images/05/IMG_2438-scaled.jpg",
      "/images/05/IMG_2440-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3798",
    "name": "Saanvika Tara Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 4700,
    "salePrice": 3240,
    "shortDesc": "Delicate hues of blush and mint come together in this soft, radiant design inspired by evening starlight.",
    "images": [
      "/images/05/IMG_2443-scaled-e1746706011294.jpg",
      "/images/05/IMG_2442-scaled.jpg",
      "/images/05/IMG_2446-scaled.jpg",
      "/images/05/IMG_2441-scaled-e1746705969925.jpg",
      "/images/05/IMG_2445-scaled.jpg",
      "/images/05/IMG_2444-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3797",
    "name": "Nilaya Chandrika Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 7700,
    "salePrice": 5390,
    "shortDesc": "A radiant blend of crescent motifs and deep blue accents, this necklace echoes regal charm in every curve.",
    "images": [
      "/images/05/IMG_2449-scaled-e1746705546866.jpg",
      "/images/05/IMG_2448-scaled.jpg",
      "/images/05/IMG_2453-scaled.jpg",
      "/images/05/IMG_2451-scaled.jpg",
      "/images/05/IMG_2450-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3796",
    "name": "Charulata Crimson Necklace",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 6000,
    "salePrice": 4200,
    "shortDesc": "A bold, gem-rich necklace in deep crimson tones, framed with shimmering white accents for a timeless statement.",
    "images": [
      "/images/05/IMG_2455-scaled-e1746704750695.jpg",
      "/images/05/IMG_2458-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3795",
    "name": "Kumudini Ruby Necklace",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 6800,
    "salePrice": 4760,
    "shortDesc": "A radiant ruby-toned necklace set with glistening drops and floral accents in an antique-inspired finish.",
    "images": [
      "/images/05/IMG_2426-scaled.jpg",
      "/images/05/IMG_2427-scaled.jpg",
      "/images/05/IMG_2428-scaled.jpg",
      "/images/05/IMG_2425-scaled.jpg",
      "/images/05/IMG_2424-scaled-e1746704916868.jpg"
    ]
  },
  {
    "id": "kuveras-3794",
    "name": "Keyura Mint Necklace",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 9000,
    "salePrice": 6300,
    "shortDesc": "A delicate pastel-toned necklace set with hints of mint green and soft rose gold accents.",
    "images": [
      "/images/05/IMG_2460-scaled-e1746704164202.jpg",
      "/images/05/IMG_2461-scaled.jpg",
      "/images/05/IMG_2462-scaled.jpg",
      "/images/05/IMG_2463-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3793",
    "name": "Rasira Crystal Necklace",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 11750,
    "salePrice": 8225,
    "shortDesc": "A radiant rose gold necklace with elegant square-cut elements and shimmering teardrop stones.",
    "images": [
      "/images/05/IMG_2470-scaled.jpg",
      "/images/05/IMG_2473-scaled.jpg",
      "/images/05/IMG_2472-scaled.jpg",
      "/images/05/IMG_2471-scaled.jpg",
      "/images/05/IMG_2469-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3792",
    "name": "Ruhaniya Silver Choker",
    "category": "Cubic Zirconia",
    "price": 2775,
    "salePrice": 1942,
    "shortDesc": "A graceful silver-toned choker set with deep ruby red stones — refined, striking, and versatile.",
    "images": [
      "/images/05/IMG_2481-scaled.jpg",
      "/images/05/IMG_2480-scaled.jpg",
      "/images/05/IMG_2474-scaled-e1746703220353.jpg",
      "/images/05/IMG_2482-scaled.jpg",
      "/images/05/IMG_2479-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3790",
    "name": "Smrutiya Kundan Haar",
    "category": "Bridal",
    "subcategory": "Ethnic Jewellery",
    "price": 17500,
    "salePrice": 12250,
    "shortDesc": "A regal kundan necklace set adorned with emerald-green drops and fine detailing that commands a presence.",
    "images": [
      "/images/05/IMG_2488-scaled-e1746534355806.jpg",
      "/images/05/IMG_2495-scaled.jpg",
      "/images/05/IMG_2493-scaled.jpg",
      "/images/05/IMG_2494-scaled.jpg",
      "/images/05/IMG_2492-scaled.jpg",
      "/images/05/IMG_2489-scaled.jpg",
      "/images/05/IMG_2497-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-sheet-02",
    "slug": "padmashri-rose-necklace-set",
    "name": "Padmashri Rose Necklace Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace Set",
    "occasion": "Wedding / Festive",
    "price": 9395,
    "salePrice": 6577,
    "discount": 30,
    "rating": 4.8999999999999995,
    "reviewCount": 18,
    "description": "Featuring a rich arrangement of rose-pink stones set in a radiant gold-tone finish, this necklace set showcases intricate floral motifs and a beautifully detailed centre. The matching statement earrings, accented with shimmering stones and delicate teardrop drops, complete its luxurious appeal. Perfect for weddings, festive celebrations, and special occasions, this set adds a romantic touch of colour and refined elegance to traditional and contemporary ensembles.\n\nIncludes: Necklace and matching earrings.",
    "shortDescription": "A statement necklace set adorned with delicate rose-pink stones, intricate floral detailing, and sparkling accents, designed to bring graceful elegance to your occasion wear.",
    "images": [
      "/images/sheet/sheet-02-img_1539.jpg",
      "/images/sheet/sheet-02-img_1540.jpg",
      "/images/sheet/sheet-02-img_1542.jpg",
      "/images/sheet/sheet-02-img_1543.jpg",
      "/images/sheet/sheet-02-img_1559.jpg",
      "/images/sheet/sheet-02-img_1569.jpg"
    ],
    "tags": [
      "Necklace Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "Rhodium / Silver-White Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 6577,
    "rentalPrice": 1973,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": true,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "under-10000",
    "sku": "KVR-SHT-02",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Rose Pink / Silver",
    "seoTitle": "Padmashri Rose Necklace Set | Kuveras Luxury Jewellery",
    "metaDescription": "A statement necklace set adorned with delicate rose-pink stones, intricate floral detailing, and sparkling accents, designed to bring graceful elegance to your occasion wear."
  },
  {
    "id": "kuveras-sheet-03",
    "slug": "midnight-noir-necklace-set",
    "name": "Midnight Noir Necklace Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace Set",
    "occasion": "Evening / Party Wear",
    "price": 4730,
    "salePrice": 3311,
    "discount": 30,
    "rating": 4.8,
    "reviewCount": 20,
    "description": "This one doesn't glitter. It smoulders.\n\nThe chain is deliberately restrained — a fine line of small white stones that runs along the collarbone and then hands over, stone by stone, to deep charcoal-black ovals set in warm rose-gold tone. The alternation is what makes it work: light, dark, light, dark, so the necklace reads as a rhythm rather than a single block of colour.\n\nAt the centre, the design gathers into a small cluster of three haloed ovals, each ringed in tiny white stones and tilted at slightly different angles, so the group feels organic rather than geometric. Below them, a single dark drop hangs free — the only element that moves.\n\nThe earrings are long and linear: a haloed dark stone at the lobe, then a slender column of white stones falling in a soft zigzag, ending in a small dark drop. Together the set has a modern, almost architectural elegance — the kind of piece that looks expensive without ever trying to look rich.\n\nWhy you'll love it\n\nDeep charcoal-black stones against warm rose-gold tone\nFine alternating line of white stones along the collarbone\nCentral cluster of three haloed ovals\nSingle dark drop for movement\nLong linear earrings with a zigzag column and drop finish\nSlim, understated silhouette that works with modern and classic outfits alike\nStyle it with A black, charcoal, or deep wine gown for full drama, or an ivory or champagne outfit if you want the dark stones to stand out. Also striking with a crisp white shirt and a high neckline for evening. Beautiful for cocktail evenings, formal dinners, receptions, and modern festive wear.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "A slim rose-gold tone necklace of dark, faceted stones, gathered at the centre into a cluster of haloed ovals and finished with a single drop. Sleek, moody, and quietly luxurious.",
    "images": [
      "/images/sheet/sheet-03-img_1719---copy.jpg",
      "/images/sheet/sheet-03-img_1722---copy.jpg",
      "/images/sheet/sheet-03-img_1723---copy.jpg",
      "/images/sheet/sheet-03-img_1724---copy.jpg",
      "/images/sheet/sheet-03-img_1728.jpg"
    ],
    "tags": [
      "Necklace Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "22K Antique Gold Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 3311,
    "rentalPrice": 993,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": true,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "under-10000",
    "sku": "KVR-SHT-03",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Black / Rose Gold",
    "seoTitle": "Midnight Noir Necklace Set | Kuveras Luxury Jewellery",
    "metaDescription": "A slim rose-gold tone necklace of dark, faceted stones, gathered at the centre into a cluster of haloed ovals and finished with a single drop. Sleek, moody, and quietly luxurious."
  },
  {
    "id": "kuveras-sheet-04",
    "slug": "silver-bloom-long-set",
    "name": "Silver Bloom Long Set",
    "category": "Cubic Zirconia",
    "subcategory": "Long Set",
    "occasion": "Reception / Festive",
    "price": 10000,
    "salePrice": 7000,
    "discount": 30,
    "rating": 4.85,
    "reviewCount": 22,
    "description": "Some jewellery decorates. This one commands.\n\nTwo flowing strands of silver-white stones fall in a soft, deliberate sweep — emerald-cut and oval stones linked one to the next, each framed in a fine halo of sparkle so the light never stops travelling. Where the strands meet the shoulder, the design gathers into a blooming floral cluster, a quiet flourish that gives the piece its structure and its soul.\n\nAt the centre of each earring sits the same flower, opening outward in layered petals, with delicate drops suspended beneath that sway with every turn of the head. Worn together, the set lengthens the neck, frames the collarbone, and lends the whole silhouette a cool, luminous elegance.\n\nWhy you'll love it\n\nTwo-strand long necklace with emerald-cut and oval stones\nFloral cluster motifs at the shoulder and centre\nMatching chandelier earrings with soft hanging drops\nSilver-white palette that flatters every skin tone and every colour of outfit\nSubstantial presence without feeling heavy on the neck\nStyle it with A deep-toned gown, an ivory or pastel saree, or a classic black drape. Beautiful for receptions, engagements, cocktail evenings, and any occasion that calls for a little grandeur.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "Two graceful strands of silver-white brilliance, anchored by floral clusters and finished with matching chandelier earrings. A long set that moves like light — refined, regal, and made for the moment all eyes turn.",
    "images": [
      "/images/sheet/sheet-04-img_1653.jpg",
      "/images/sheet/sheet-04-img_1655.jpg",
      "/images/sheet/sheet-04-img_1652.jpg",
      "/images/sheet/sheet-04-img_1629.jpg",
      "/images/sheet/sheet-04-img_1651.jpg",
      "/images/sheet/sheet-04-img_1654.jpg"
    ],
    "tags": [
      "Long Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Long Necklace & Matching Chandelier Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "Rhodium / Silver-White Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 7000,
    "rentalPrice": 2100,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": true,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "under-10000",
    "sku": "KVR-SHT-04",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Silver / White",
    "seoTitle": "Silver Bloom Long Set | Kuveras Luxury Jewellery",
    "metaDescription": "Two graceful strands of silver-white brilliance, anchored by floral clusters and finished with matching chandelier earrings. A long set that moves like light — refined, regal, and made for the moment all eyes turn."
  },
  {
    "id": "kuveras-sheet-05",
    "slug": "mint-cascade-choker-set",
    "name": "Mint Cascade Choker Set",
    "category": "Cubic Zirconia",
    "subcategory": "Choker Set",
    "occasion": "Party Wear / Sangeet",
    "price": 12000,
    "salePrice": 8400,
    "discount": 30,
    "rating": 4.8999999999999995,
    "reviewCount": 24,
    "description": "There is a particular kind of beauty that feels like a deep breath — calm, clear, and impossible to look away from. This set is that feeling, made wearable.\n\nA row of mint-green stones crowns the choker, each one held in a fine halo of silver-white brilliance. Below it, the design opens into tiered drops — teardrop and petal shapes that fall in gentle rhythm, like water finding its way down a quiet stream. The effect is soft yet structured: light gathers at the top and spills downward, catching every movement of the neck.\n\nThe earrings carry the same language in miniature — a floral cluster at the lobe, mint stones layered beneath, and a delicate drop finishing the line. The maang tikka completes the set, tracing the parting of the hair with the same cool green glow, so the look reads as one continuous thought from crown to collarbone.\n\nWhy you'll love it\n\nMint-green stones with silver-white halo settings\nTiered teardrop and petal detailing across the choker\nComplete set: choker, matching earrings, and maang tikka\nCool tones that flatter both warm and cool skin tones\nLight enough to wear through a long celebration\nStyle it with A pastel saree, an ivory or mint lehenga, or a soft grey or powder-blue gown. Beautiful for engagements, mehendi, festive gatherings, and any occasion where you want to look fresh rather than heavy.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "Cool mint-green stones set in silver-white sparkle, falling in soft layered tiers with a matching maang tikka and earrings. Fresh, regal, and quietly unforgettable.",
    "images": [
      "/images/sheet/sheet-05-img_1657.jpg",
      "/images/sheet/sheet-05-img_1659.jpg",
      "/images/sheet/sheet-05-img_1660.jpg",
      "/images/sheet/sheet-05-img_1661.jpg",
      "/images/sheet/sheet-05-img_1662.jpg",
      "/images/sheet/sheet-05-img_1664.jpg"
    ],
    "tags": [
      "Choker Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "Rhodium / Silver-White Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 8400,
    "rentalPrice": 2520,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": false,
    "bestseller": true,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "above-10000",
    "sku": "KVR-SHT-05",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Mint Green / Silver",
    "seoTitle": "Mint Cascade Choker Set | Kuveras Luxury Jewellery",
    "metaDescription": "Cool mint-green stones set in silver-white sparkle, falling in soft layered tiers with a matching maang tikka and earrings. Fresh, regal, and quietly unforgettable."
  },
  {
    "id": "kuveras-sheet-06",
    "slug": "emerald-baguette-set",
    "name": "Emerald Baguette Set",
    "category": "Cubic Zirconia",
    "subcategory": "Collar Set",
    "occasion": "Cocktail / Reception",
    "price": 9350,
    "salePrice": 6545,
    "discount": 30,
    "rating": 4.8,
    "reviewCount": 26,
    "description": "This is jewellery with a spine. Where most sets soften, this one holds its line.\n\nA single row of deep emerald-green stones curves across the collarbone, each one cut in a clean rectangular step that catches light in sharp, glassy flashes. Around them runs a precise lattice of silver-white baguettes and tiny rounds, arranged in a repeating geometric rhythm — like a fine mosaic, or the grille of a palace window. The stones sit flush and even, giving the necklace a quiet, deliberate weight that reads as confidence rather than ornament.\n\nThe earrings take the same idea and let it fall. Five emerald stones descend in a vertical column, framed in the identical baguette lattice, so the line of the necklace continues downward and frames the face. Long, lean, and beautifully balanced — they move very little and say a great deal.\n\nWhy you'll love it\n\nDeep emerald-green stones in clean rectangular cuts\nFine baguette and round-stone lattice framing throughout\nStructured collar silhouette that sits flat and even\nMatching long column earrings for a complete, coordinated look\nStrong colour payoff — the green reads rich even in low light\nStyle it with A black gown or a deep emerald or wine drape for maximum drama. For a softer take, pair with an ivory or champagne saree and let the green be the only colour in the room. Beautiful for receptions, cocktail evenings, formal dinners, and festive occasions.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "Deep emerald-green stones bordered by a fine lattice of silver-white baguettes — a structured collar necklace with matching long earrings. Bold, architectural, and unmistakably regal.",
    "images": [
      "/images/sheet/sheet-06-img_1669.jpg"
    ],
    "tags": [
      "Collar Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "Rhodium / Silver-White Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 6545,
    "rentalPrice": 1964,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "under-10000",
    "sku": "KVR-SHT-06",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Emerald Green / Silver",
    "seoTitle": "Emerald Baguette Set | Kuveras Luxury Jewellery",
    "metaDescription": "Deep emerald-green stones bordered by a fine lattice of silver-white baguettes — a structured collar necklace with matching long earrings. Bold, architectural, and unmistakably regal."
  },
  {
    "id": "kuveras-sheet-07",
    "slug": "sapphire-cascade-long-set",
    "name": "Sapphire Cascade Long Set",
    "category": "Cubic Zirconia",
    "subcategory": "Long Set",
    "occasion": "Reception / Gala",
    "price": 21000,
    "salePrice": 14700,
    "discount": 30,
    "rating": 4.85,
    "reviewCount": 28,
    "description": "Some jewellery sits still. This one flows.\n\nThree strands of interlocking teardrop links fall in long, even lines, each link outlined in silver-white stones so the whole necklace reads as a ribbon of light rather than a chain. The pattern repeats with almost mathematical calm — open loops, tiny rounds, a rhythm you can follow with your eye all the way down.\n\nAt the centre, the design gathers itself. Deep sapphire-blue stones, cut in clean rectangles and ringed in white, sit one above the other in a quiet vertical line, drawing the eye inward and down. Below them, a single pear-shaped white stone hangs free — the one element that moves, catching light with every breath.\n\nThe earrings echo the centrepiece: a sapphire-blue rectangle framed in white, with a teardrop motif beneath. Together the set has the presence of an heirloom, but the lightness of something you can actually wear all evening.\n\nWhy you'll love it\n\nThree long strands of interlocking teardrop links\nDeep sapphire-blue rectangular stones at the centre\nSingle pear-shaped drop for movement and light\nMatching earrings with a teardrop motif\nLong, fluid silhouette that lengthens the neck and frames the torso\nSilver-white tone setting that reads bright and formal\nStyle it with A deep navy, midnight blue, or black gown for full drama — or an ivory or silver drape if you want the blue to be the only colour. Beautiful for receptions, sangeet nights, formal dinners, and evening celebrations.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "A long, layered silver-white necklace of interlocking teardrop links, centred on deep sapphire-blue stones and finished with a single pear-shaped drop. Regal, fluid, and made to move.",
    "images": [
      "/images/sheet/sheet-07-img_1687.jpg",
      "/images/sheet/sheet-07-img_1690.jpg",
      "/images/sheet/sheet-07-img_1691.jpg",
      "/images/sheet/sheet-07-img_1692.jpg"
    ],
    "tags": [
      "Long Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Long Necklace & Matching Chandelier Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "Rhodium / Silver-White Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 14700,
    "rentalPrice": 4410,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "above-10000",
    "sku": "KVR-SHT-07",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Sapphire Blue / Silver",
    "seoTitle": "Sapphire Cascade Long Set | Kuveras Luxury Jewellery",
    "metaDescription": "A long, layered silver-white necklace of interlocking teardrop links, centred on deep sapphire-blue stones and finished with a single pear-shaped drop. Regal, fluid, and made to move."
  },
  {
    "id": "kuveras-sheet-08",
    "slug": "blush-petal-choker-set",
    "name": "Blush Petal Choker Set",
    "category": "Cubic Zirconia",
    "subcategory": "Choker Set",
    "occasion": "Day Wedding / Festive",
    "price": 12100,
    "salePrice": 8470,
    "discount": 30,
    "rating": 4.8999999999999995,
    "reviewCount": 30,
    "description": "This is the quiet kind of beautiful — the sort that doesn't announce itself, but stays in the room long after you've left it.\n\nA close-set band of blush pink stones curves around the neck, each stone shaped like a small rounded petal and set in a fine silver-white frame. Below the band, the design opens into a cascade of teardrop motifs, tiered one beneath the other, so the choker finishes in a soft scalloped edge rather than a hard line. The effect is almost lace-like — light passes through the pink stones and the whole piece seems to glow rather than shine.\n\nThe earrings carry the same language downward: a slim pink stone at the top, a floral cluster at the centre, and two open teardrop loops that echo the necklace's scalloped rhythm. Long enough to frame the face, light enough to forget you're wearing them.\n\nWhy you'll love it\n\nBlush pink stones in soft petal and teardrop cuts\nFine silver-white stone framing throughout\nTiered scalloped edge for a lace-like finish\nMatching long earrings with floral and teardrop motifs\nLight, romantic palette that flatters most skin tones\nSits close to the neck — elegant with both high and low necklines\nStyle it with A blush, champagne, or powder-pink outfit for a soft monochrome look, or an ivory or pearl-white drape to let the pink lead. Also lovely against deep plum or emerald if you want contrast. Beautiful for engagements, mehendi, daytime celebrations, and elegant evening wear.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "A soft pink choker of layered petal drops, each one outlined in silver-white stones and finished with a fine scalloped edge. Romantic, delicate, and beautifully light.",
    "images": [
      "/images/sheet/sheet-08-img_1693.jpg",
      "/images/sheet/sheet-08-img_1700---copy.jpg",
      "/images/sheet/sheet-08-img_1701---copy.jpg",
      "/images/sheet/sheet-08-img_1702---copy.jpg",
      "/images/sheet/sheet-08-img_1706---copy.jpg"
    ],
    "tags": [
      "Choker Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "Rhodium / Silver-White Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 8470,
    "rentalPrice": 2541,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "above-10000",
    "sku": "KVR-SHT-08",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Blush Pink / Silver",
    "seoTitle": "Blush Petal Choker Set | Kuveras Luxury Jewellery",
    "metaDescription": "A soft pink choker of layered petal drops, each one outlined in silver-white stones and finished with a fine scalloped edge. Romantic, delicate, and beautifully light."
  },
  {
    "id": "kuveras-sheet-09",
    "slug": "mint-net-choker-set",
    "name": "Mint Net Choker Set",
    "category": "Cubic Zirconia",
    "subcategory": "Choker Set",
    "occasion": "Cocktail / Party Wear",
    "price": 9680,
    "salePrice": 6776,
    "discount": 30,
    "rating": 4.8,
    "reviewCount": 32,
    "description": "There's a crispness to this one — a piece that feels designed rather than decorated.\n\nThe band is the story here: a broad, even expanse of silver-white stones laid in a tight diamond lattice, like fine netting or a woven mesh. It sits flat and close against the neck, giving the choker real presence without weight. Nothing is fussy; the pattern does all the talking.\n\nAlong the lower edge, a single row of mint-green teardrops hangs in perfect rhythm, each one rounded and slightly translucent, so the light comes through them rather than bouncing off. The green is soft and cool — closer to sea glass than emerald — and it lifts the whole piece out of the ordinary.\n\nThe earrings repeat the idea in miniature: a small floral stud at the top, the same diamond net falling below, and two mint teardrops at the base. The maang tikka carries it further still, so the set reads as one continuous thought from hairline to collarbone.\n\nWhy you'll love it\n\nWide diamond-lattice band in silver-white stones\nRow of soft mint-green teardrop drops\nSits flat and close to the neck — comfortable for long wear\nMatching earrings with floral stud and teardrop finish\nComplete with maang tikka for a full bridal-adjacent look\nCool mint palette that stands out from the usual gold and red\nStyle it with A mint, sage, or ivory outfit for a soft tonal look, or a deep teal, navy, or black drape to make the green glow. Also beautiful with pastel pink or powder blue for daytime functions. Lovely for engagements, mehendi, sangeet, and elegant evening wear.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "A wide mint-green choker built from a fine diamond-patterned net of silver-white stones, finished with a row of soft teardrop drops. Clean, modern, and quietly striking.",
    "images": [
      "/images/sheet/sheet-09-img_1710.jpg",
      "/images/sheet/sheet-09-img_1715.jpg"
    ],
    "tags": [
      "Choker Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "Rhodium / Silver-White Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 6776,
    "rentalPrice": 2033,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "under-10000",
    "sku": "KVR-SHT-09",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Mint Green / Silver",
    "seoTitle": "Mint Net Choker Set | Kuveras Luxury Jewellery",
    "metaDescription": "A wide mint-green choker built from a fine diamond-patterned net of silver-white stones, finished with a row of soft teardrop drops. Clean, modern, and quietly striking."
  },
  {
    "id": "kuveras-sheet-10",
    "slug": "rajwadi-ruby-choker-set",
    "name": "Rajwadi Ruby Choker Set",
    "category": "Bridal",
    "subcategory": "Bridal Choker Set",
    "occasion": "Bridal / Wedding",
    "price": 13500,
    "salePrice": 9450,
    "discount": 30,
    "rating": 4.85,
    "reviewCount": 34,
    "description": "This is the piece that does the work of an entire bridal look on its own.\n\nThe band is wide and architectural, built in layers: a fine double row of pearls at the top, then a broad expanse of gold-tone metal set with clear kundan-style stones and deep red enamel work, its surface worked into floral medallions and scalloped frames. The craftsmanship reads in the detail — every petal, every curve, every tiny stone is placed with intent.\n\nBelow the band, the fringe begins. Ruby-red drops hang in a dense, even row, each one suspended from a small pearl and flanked by strands of deep green beads, so the whole lower edge moves with a rich, jewelled weight. It's the kind of fringe that catches every turn of the head.\n\nThe earrings are full chandeliers: a cluster of kundan stones at the lobe, a round floral medallion below, then a gold jhumka dome, green bead strands, and a final ruby drop. The maang tikka carries the same floral medallion, so the set frames the face completely — hairline, ears, and collarbone.\n\nWhy you'll love it\n\nWide gold-tone band with kundan-style stones and red enamel\nDouble pearl row along the upper edge\nDense fringe of ruby-red drops with green bead strands\nFull chandelier jhumka earrings\nMatching maang tikka with floral medallion\nComplete bridal set — necklace, earrings, and tikka together\nStyle it with A classic red, maroon, or deep green bridal lehenga or saree for the full traditional picture, or an ivory or gold outfit if you want the jewellery to carry all the colour. Beautiful for weddings, receptions, karwa chauth, and grand festive occasions.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "A broad gold-tone bridal choker of kundan-style stones and deep red enamel, edged in pearls and finished with a fringe of ruby drops and green beads. Regal, traditional, and made for the big day.",
    "images": [
      "/images/sheet/sheet-10-img_1736.jpg",
      "/images/sheet/sheet-10-img_1752.jpg",
      "/images/sheet/sheet-10-img_1763.jpg",
      "/images/sheet/sheet-10-img_1774.jpg",
      "/images/sheet/sheet-10-img_1780.jpg"
    ],
    "tags": [
      "Bridal Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / Uncut Kundan & Meenakari",
      "Plating": "22K Antique Gold Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 9450,
    "rentalPrice": 2835,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": false,
    "bestseller": true,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "above-10000",
    "sku": "KVR-SHT-10",
    "material": "Brass / Kundan",
    "stone": "Kundan & Ruby",
    "color": "Ruby Red / Antique Gold",
    "seoTitle": "Rajwadi Ruby Choker Set | Kuveras Luxury Jewellery",
    "metaDescription": "A broad gold-tone bridal choker of kundan-style stones and deep red enamel, edged in pearls and finished with a fringe of ruby drops and green beads. Regal, traditional, and made for the big day."
  },
  {
    "id": "kuveras-sheet-11",
    "slug": "heritage-kundan-collar-set",
    "name": "Heritage Kundan Collar Set",
    "category": "Bridal",
    "subcategory": "Collar Set",
    "occasion": "Bridal / Heritage",
    "price": 10500,
    "salePrice": 7350,
    "discount": 30,
    "rating": 4.8999999999999995,
    "reviewCount": 36,
    "description": "There's an old-world confidence to this piece — the kind of necklace that has been worn at weddings for generations and will be worn for many more.\n\nThe construction is a study in patience. Large rectangular kundan stones sit in gold-tone frames across the top, each one flat-backed and softly glowing rather than sparkling, and below them the design opens into concentric rows of smaller round stones, packed tight and even like a mosaic. The whole band curves to follow the collarbone, so it sits like a second skin rather than hanging loose.\n\nAlong the lower edge, a single row of smooth gold beads finishes the piece — no colour, no contrast, just the warmth of gold against gold. It's a restrained choice, and it's what makes the necklace feel so rich.\n\nThe earrings echo the centre of the collar: a single large kundan stone ringed by smaller ones, with a small cluster of gold beads below. Together they're quietly grand — the sort of set that doesn't need to shout.\n\nWhy you'll love it\n\nBroad gold-tone collar with uncut kundan stones\nLarge rectangular stones across the top row\nConcentric rows of smaller round stones below\nFringe of smooth gold beads along the lower edge\nMatching earrings with kundan centre and bead cluster\nWarm, all-gold palette that flatters every skin tone\nStyle it with A deep red, maroon, or emerald silk saree or lehenga for a classic bridal picture, or an ivory and gold outfit for something softer. Also beautiful with a black velvet blouse for a modern-traditional look. Lovely for weddings, receptions, and grand festive occasions.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "A broad gold-tone collar of uncut kundan stones, layered in rows and finished with a fringe of gold beads. Warm, weighty, and utterly traditional.",
    "images": [
      "/images/sheet/sheet-11-img_1784.jpg",
      "/images/sheet/sheet-11-img_1785.jpg",
      "/images/sheet/sheet-11-img_1788.jpg",
      "/images/sheet/sheet-11-img_1790.jpg",
      "/images/sheet/sheet-11-img_1798.jpg"
    ],
    "tags": [
      "Kundan Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / Uncut Kundan & Meenakari",
      "Plating": "22K Antique Gold Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 7350,
    "rentalPrice": 2205,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "above-10000",
    "sku": "KVR-SHT-11",
    "material": "Brass / Kundan",
    "stone": "Uncut Kundan",
    "color": "Antique Gold / Kundan",
    "seoTitle": "Heritage Kundan Collar Set | Kuveras Luxury Jewellery",
    "metaDescription": "A broad gold-tone collar of uncut kundan stones, layered in rows and finished with a fringe of gold beads. Warm, weighty, and utterly traditional."
  },
  {
    "id": "kuveras-sheet-12",
    "slug": "nilaya-panna-drop-set",
    "name": "Nilaya Panna Drop Set",
    "category": "Cubic Zirconia",
    "subcategory": "Drop Set",
    "occasion": "Party Wear / Evening",
    "price": 5200,
    "salePrice": 3640,
    "discount": 30,
    "rating": 4.8,
    "reviewCount": 38,
    "description": "This is the piece for the woman who wants green without the weight of a bridal set.\n\nThe chain is fine and open, alternating small white stones with mint-green ovals set in silver-white frames, so the necklace sits light on the collarbone and lets the skin show through. It's a design that reads as airy from a distance and detailed up close — exactly the kind of balance that makes a piece feel expensive.\n\nAt the centre, the necklace gathers into a single emerald-cut stone, then releases into a vertical drop: a pear-shaped green stone, a slender white bar, another pear-shaped stone, and finally a large pear-shaped pendant in a halo of white stones. The drop is long enough to draw the eye downward and lengthen the neck, but slim enough to stay elegant.\n\nThe earrings follow the same rhythm — an emerald-cut stone at the top, a column of white stones, and a pear-shaped green drop at the base. Worn together, the set is fresh and modern, with just enough green to feel distinctive.\n\nWhy you'll love it\n\nFine silver-tone chain with mint-green oval stones\nAlternating white stone accents for light and sparkle\nCentral emerald-cut stone leading into a long drop\nPear-shaped green stones with a halo pendant\nMatching earrings with the same emerald-cut and drop motif\nLightweight and comfortable for long wear\nStyle it with A pastel or ivory outfit for daytime elegance, or a deep green or black ensemble for evening contrast. Beautiful for engagements, receptions, mehendi, and festive gatherings where you want to look polished without going full bridal.\n\nCare Keep away from perfume, water, and moisture. Wipe gently with a soft dry cloth after wearing and store in the pouch or box provided.",
    "shortDescription": "A delicate silver-tone necklace of mint-green stones, ending in a long drop of emerald-cut and pear-shaped gems. Light, graceful, and quietly luxurious.",
    "images": [
      "/images/sheet/sheet-12-img_2279.jpg",
      "/images/sheet/sheet-12-img_2280.jpg",
      "/images/sheet/sheet-12-img_2284.jpg",
      "/images/sheet/sheet-12-img_2286.jpg"
    ],
    "tags": [
      "Drop Set",
      "Google Sheet Verified"
    ],
    "specifications": {
      "Set Includes": "Necklace & Matching Earrings",
      "Material": "Brass / High-Grade Cubic Zirconia",
      "Plating": "Rhodium / Silver-White Polish",
      "Closure": "Adjustable Dori / Thread",
      "Care Instructions": "Keep away from moisture, perfume, and direct spray.",
      "Origin": "Handcrafted in India"
    },
    "originalRentalPrice": 3640,
    "rentalPrice": 1092,
    "rentalPeriod": "1 Day",
    "stock": 12,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "popular": true,
    "budgetCategory": "under-10000",
    "sku": "KVR-SHT-12",
    "material": "Brass / Cubic Zirconia",
    "stone": "Cubic Zirconia",
    "color": "Mint Green / Silver",
    "seoTitle": "Nilaya Panna Drop Set | Kuveras Luxury Jewellery",
    "metaDescription": "A delicate silver-tone necklace of mint-green stones, ending in a long drop of emerald-cut and pear-shaped gems. Light, graceful, and quietly luxurious."
  },
  {
    "id": "kuveras-3363",
    "name": "Amritavasini",
    "category": "Kundan",
    "subcategory": "Necklace set",
    "price": 21000,
    "salePrice": 14700,
    "shortDesc": "A resplendent multi-layered necklace woven with pearls, deep-hued stones, and ornate jhumkas — echoing the grandeur of royal tradition.",
    "images": [
      "/images/04/IMG_2268-scaled.jpg",
      "/images/04/IMG_2272-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3360",
    "name": "Gulbadan Choker",
    "category": "Choker",
    "subcategory": "Ethnic Jewellery",
    "price": 10000,
    "salePrice": 10000,
    "shortDesc": "A soft mauve beaded choker crowned with a floral kundan panel and blush-toned droplets.",
    "images": [
      "/images/04/IMG_2261-scaled.jpg",
      "/images/04/IMG_2253-scaled.jpg",
      "/images/04/IMG_2267-scaled.jpg",
      "/images/04/IMG_2266-scaled.jpg",
      "/images/04/IMG_2258-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3333",
    "name": "Pancharatna Mala",
    "category": "Bridal",
    "subcategory": "Choker Set",
    "price": 9000,
    "salePrice": 6300,
    "shortDesc": "A five-layer kundan necklace that sits beautifully as both choker and necklace.",
    "images": [
      "/images/04/IMG_2246-scaled.jpg",
      "/images/04/IMG_2250-scaled.jpg",
      "/images/04/IMG_2251-scaled.jpg",
      "/images/04/IMG_2248-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3331",
    "name": "Shringarika",
    "category": "Bridal",
    "subcategory": "Choker Set",
    "price": 6025,
    "salePrice": 4217,
    "shortDesc": "A resplendent temple-style masterpiece with intricate motifs, antique gold finish, and lush green accents.",
    "images": [
      "/images/04/IMG_2234-scaled.jpg",
      "/images/04/IMG_2230-scaled.jpg",
      "/images/04/IMG_2239-scaled.jpg",
      "/images/04/IMG_2233-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3330",
    "name": "Rajvanta Ranjana Set",
    "category": "Bridal",
    "subcategory": "Ethnic Jewellery",
    "price": 19385,
    "salePrice": 13569,
    "shortDesc": "A striking Rajwadi ensemble with deep emerald tones, bold kundan work, and grand floral elements steeped in royal splendour.",
    "images": [
      "/images/04/IMG_2222-scaled.jpg",
      "/images/04/IMG_2220-scaled.jpg",
      "/images/04/IMG_2223-scaled.jpg",
      "/images/04/IMG_2228-scaled.jpg",
      "/images/04/IMG_2225-scaled.jpg",
      "/images/04/IMG_2227-scaled.jpg",
      "/images/04/IMG_2226-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3329",
    "name": "Sharvani Petalwork Set",
    "category": "Kundan",
    "subcategory": "Necklace set",
    "price": 3270,
    "salePrice": 2289,
    "shortDesc": "An antique-inspired floral necklace with a captivating central pendant, glowing in soft gold tones and garnet accents.",
    "images": [
      "/images/04/IMG_2216-scaled.jpg",
      "/images/04/IMG_2215-scaled.jpg",
      "/images/04/IMG_2219-scaled.jpg",
      "/images/04/IMG_2218-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3327",
    "name": "Varnika Meenakari Set",
    "category": "Kundan",
    "subcategory": "Necklace set",
    "price": 3125,
    "salePrice": 2187,
    "shortDesc": "A graceful blend of mint enamel and ruby-toned drops, this elegant necklace set echoes the charm of royal artistry.",
    "images": [
      "/images/04/IMG_2204-scaled.jpg",
      "/images/04/IMG_2201-scaled.jpg",
      "/images/04/IMG_2213-scaled.jpg",
      "/images/04/IMG_2210-scaled.jpg",
      "/images/04/IMG_2207-scaled.jpg",
      "/images/04/IMG_2209-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3326",
    "name": "Neelaraani Aadya Set",
    "category": "Kundan",
    "subcategory": "Necklace set",
    "price": 16000,
    "salePrice": 11200,
    "shortDesc": "A divine cascade of aqua and blue-hued stones, this regal choker evokes the calm grandeur of royal waters.",
    "images": [
      "/images/04/IMG_2195-scaled.jpg",
      "/images/04/IMG_2200-scaled.jpg",
      "/images/04/IMG_2197-scaled.jpg",
      "/images/04/IMG_2195-scaled.jpg",
      "/images/04/IMG_2194-scaled.jpg",
      "/images/04/IMG_2193-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3325",
    "name": "Ruhika Sutra Set",
    "category": "Choker",
    "subcategory": "Ethnic Jewellery",
    "price": 2775,
    "salePrice": 1942,
    "shortDesc": "A delicate crimson-beaded choker set in antique tones, blending grace with understated allure.",
    "images": [
      "/images/04/IMG_2190-scaled.jpg",
      "/images/04/IMG_2188-scaled.jpg",
      "/images/04/IMG_2191-scaled.jpg",
      "/images/04/IMG_2189-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3324",
    "name": "Devira Ashmika Choker Set",
    "category": "Bridal",
    "subcategory": "Choker Set",
    "price": 5525,
    "salePrice": 3867,
    "shortDesc": "A majestic choker set strung with silken grey pearls and intricate floral medallions, crafted for timeless grandeur.",
    "images": [
      "/images/04/IMG_2183-scaled.jpg",
      "/images/04/IMG_2182-scaled.jpg",
      "/images/04/IMG_2184-scaled.jpg",
      "/images/04/IMG_2186-scaled.jpg",
      "/images/04/IMG_2187-scaled.jpg",
      "/images/04/IMG_2185-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3323",
    "name": "Saanvika Veni Set",
    "category": "Bridal",
    "subcategory": "Choker Set",
    "price": 6025,
    "salePrice": 4217,
    "shortDesc": "An antique-finish choker set adorned with intricate motifs and soft ivory pearls, echoing timeless temple grace.",
    "images": [
      "/images/04/IMG_2175-scaled.jpg",
      "/images/04/IMG_2172-scaled.jpg",
      "/images/04/IMG_2173-scaled.jpg",
      "/images/04/IMG_2174-scaled.jpg",
      "/images/04/IMG_2176-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3322",
    "name": "Bhavaniya Choker Set",
    "category": "Choker",
    "price": 4000,
    "salePrice": 2800,
    "shortDesc": "A striking choker set with coral-toned beads and antique gold detailing, rich with traditional character.",
    "images": [
      "/images/04/IMG_2165-scaled.jpg",
      "/images/04/IMG_2163-scaled.jpg",
      "/images/04/IMG_2168-scaled.jpg",
      "/images/04/IMG_2166-scaled.jpg",
      "/images/04/IMG_2169-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3321",
    "name": "Kanakavalli Necklace Set",
    "category": "Kundan",
    "subcategory": "Necklace set",
    "price": 10000,
    "salePrice": 10000,
    "shortDesc": "A graceful kundan necklace framed with soft golden pearls, offering a radiant yet understated charm.",
    "images": [
      "/images/04/IMG_2159-scaled.jpg",
      "/images/04/IMG_2154-scaled.jpg",
      "/images/04/IMG_2162-scaled.jpg",
      "/images/04/IMG_2158-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3320",
    "name": "Agnikaasya Necklace Set",
    "category": "Kundan",
    "price": 7500,
    "salePrice": 5250,
    "shortDesc": "A richly structured necklace set in maroon and antique gold, adorned with angular kundan work and bold garnet-hued beads.",
    "images": [
      "/images/04/IMG_2149-scaled.jpg",
      "/images/04/IMG_2145-scaled.jpg",
      "/images/04/IMG_2148-scaled.jpg",
      "/images/04/IMG_2151-scaled.jpg",
      "/images/04/IMG_2147-scaled.jpg",
      "/images/04/IMG_2153-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3318",
    "name": "Mehernavaz Choker Set",
    "category": "Choker",
    "price": 4600,
    "salePrice": 3220,
    "shortDesc": "A majestic gold-tone choker set with deep blue stones, adorned with intricate kundan work and delicate pearl hangings — regal and enchanting.",
    "images": [
      "/images/04/IMG_2133-scaled.jpg",
      "/images/04/IMG_2129-scaled.jpg",
      "/images/04/IMG_2135-scaled.jpg",
      "/images/04/IMG_2138-scaled.jpg",
      "/images/04/IMG_2142-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3317",
    "name": "Vaidehi Tara",
    "category": "Kundan",
    "price": 4250,
    "salePrice": 2975,
    "shortDesc": "A rich double-layered kundan choker with ruby-red bead detailing and intricate enamelled work on the reverse.",
    "images": [
      "/images/04/IMG_2125-scaled.jpg",
      "/images/04/IMG_2122-scaled.jpg",
      "/images/04/IMG_2126-scaled.jpg",
      "/images/04/IMG_2124-scaled.jpg",
      "/images/04/IMG_2123-scaled.jpg",
      "/images/04/IMG_2128-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3315",
    "name": "Adira Tara Set",
    "category": "Cubic Zirconia",
    "subcategory": "Necklace set",
    "price": 11250,
    "salePrice": 7875,
    "shortDesc": "A radiant silver-finish necklace set adorned with shimmering white stones in a regal silhouette.",
    "images": [
      "/images/04/IMG_2115-scaled.jpg",
      "/images/04/IMG_2113-scaled.jpg",
      "/images/04/IMG_2119-scaled.jpg",
      "/images/04/IMG_2116-scaled.jpg",
      "/images/04/IMG_2120-scaled.jpg",
      "/images/04/IMG_2117-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3314",
    "name": "Ravya Close-Neck Set",
    "category": "Kundan",
    "price": 2250,
    "salePrice": 1575,
    "shortDesc": "A bold, intricately layered close-neck necklace with ruby accents and ornate detailing.",
    "images": [
      "/images/04/IMG_2105-scaled.jpg",
      "/images/04/IMG_2103-scaled.jpg",
      "/images/04/IMG_2110-scaled.jpg",
      "/images/04/IMG_2111-scaled.jpg",
      "/images/04/IMG_2106-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3209",
    "name": "Rudrani Set",
    "category": "Kundan",
    "price": 2000,
    "salePrice": 1400,
    "shortDesc": "A captivating red and gold set, intricately crafted to grace the modern woman with timeless elegance.",
    "images": [
      "/images/04/IMG_2093-scaled.jpg",
      "/images/04/IMG_2099-scaled.jpg",
      "/images/04/IMG_2101-scaled.jpg",
      "/images/04/IMG_2095-scaled.jpg",
      "/images/04/IMG_2096-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3207",
    "name": "Tarini Close-Neck Set",
    "category": "Kundan",
    "price": 2625,
    "salePrice": 1838,
    "shortDesc": "A graceful close-neck necklace adorned with petite bead accents and classic floral studs.",
    "images": [
      "/images/04/IMG_2083-scaled.jpg",
      "/images/04/IMG_2085-scaled.jpg",
      "/images/04/IMG_2086-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3180",
    "name": "Amvika Close-Neck Necklace",
    "category": "Kundan",
    "subcategory": "Temple Jewellery",
    "price": 3290,
    "salePrice": 2303,
    "shortDesc": "An elegant close-neck necklace with intricate beadwork and graceful antique tones.",
    "images": [
      "/images/04/IMG_2076-scaled.jpg",
      "/images/04/IMG_2075-scaled.jpg",
      "/images/04/IMG_2078-scaled.jpg",
      "/images/04/IMG_2080-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3179",
    "name": "Ragini Temple Drop Necklace",
    "category": "Kundan",
    "subcategory": "Temple Jewellery",
    "price": 3060,
    "salePrice": 2142,
    "shortDesc": "A bold, close-neck necklace with temple-style elements and ruby-hued accents.",
    "images": [
      "/images/04/IMG_2068-scaled.jpg",
      "/images/04/IMG_2067-scaled.jpg",
      "/images/04/IMG_2069-scaled.jpg",
      "/images/04/IMG_2070-scaled.jpg",
      "/images/04/IMG_2071-scaled.jpg",
      "/images/04/IMG_2072-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3176",
    "name": "Aalaya Floral Pendant Set",
    "category": "Kundan",
    "price": 3270,
    "salePrice": 2289,
    "shortDesc": "A graceful floral necklace set with delicate detailing and timeless charm.",
    "images": [
      "/images/04/IMG_2058-scaled.jpg",
      "/images/04/IMG_2053-scaled.jpg",
      "/images/04/IMG_2057-scaled.jpg",
      "/images/04/IMG_2059-scaled.jpg",
      "/images/04/IMG_2062-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3139",
    "name": "Vaishnavi Haaram Set",
    "category": "Temple",
    "price": 2250,
    "salePrice": 1575,
    "shortDesc": "A divine fusion of temple artistry and pearl elegance, this necklace set is steeped in regal heritage.",
    "images": [
      "/images/04/IMG_2046-scaled.jpg",
      "/images/04/IMG_2042-scaled.jpg",
      "/images/04/IMG_2044-scaled.jpg",
      "/images/04/IMG_2047-scaled.jpg",
      "/images/04/IMG_2049-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3131",
    "name": "Rajputana Gulmohar Set",
    "category": "Bridal",
    "subcategory": "Necklace set",
    "price": 6000,
    "salePrice": 4000,
    "shortDesc": "A grand floral necklace with golden bead detailing, crafted for timeless bridal elegance.",
    "images": [
      "/images/04/IMG_2032-scaled.jpg",
      "/images/04/IMG_2031-scaled.jpg",
      "/images/04/IMG_2033-scaled.jpg",
      "/images/04/IMG_2034-scaled.jpg",
      "/images/04/IMG_2035-scaled.jpg",
      "/images/04/IMG_2037-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3125",
    "name": "Kanchipuram Temple Necklace Set",
    "category": "Bridal",
    "price": 4500,
    "salePrice": 3150,
    "shortDesc": "Drawing from South India&#8217;s regal legacy, the Kanchipuram Temple Necklace Set celebrates divine artistry with its bold pendant and traditional temple motifs.",
    "images": [
      "/images/04/IMG_2015-scaled.jpg",
      "/images/04/IMG_2016-scaled.jpg",
      "/images/04/IMG_2018-scaled.jpg",
      "/images/04/IMG_2025-scaled.jpg",
      "/images/04/IMG_2023-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3119",
    "name": "Raktika Haar Set",
    "category": "Choker",
    "subcategory": "Rajwadi",
    "price": 4000,
    "salePrice": 2800,
    "shortDesc": "Bold and regal, the Raktika Haar Set captures the essence of royal grandeur with deep crimson beads and ornate gold motifs, echoing the magnificence of Rajputana heritage.",
    "images": [
      "/images/04/IMG_2006-scaled.jpg",
      "/images/04/IMG_2001-scaled.jpg",
      "/images/04/IMG_2004-scaled.jpg",
      "/images/04/IMG_2010-scaled.jpg",
      "/images/04/IMG_2012-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3111",
    "name": "Amara Phool Necklace Set",
    "category": "Kundan",
    "price": 3280,
    "salePrice": 2296,
    "shortDesc": "A graceful expression of floral artistry, the Amara Phool necklace set celebrates the charm of temple motifs and delicate pearls in a timeless golden palette.",
    "images": [
      "/images/04/IMG_1994-scaled.jpg",
      "/images/04/IMG_1989-scaled.jpg",
      "/images/04/IMG_1993-scaled.jpg",
      "/images/04/IMG_1985-scaled.jpg",
      "/images/04/IMG_1990-scaled.jpg",
      "/images/04/IMG_1999-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3103",
    "name": "Kanika Gulbandh Set",
    "category": "Kundan",
    "price": 4075,
    "salePrice": 2853,
    "shortDesc": "A graceful kundan-inspired set with floral motifs and antique gold tones — timeless in elegance, rooted in heritage.",
    "images": [
      "/images/04/IMG_1978-scaled.jpg",
      "/images/04/IMG_1977-scaled.jpg",
      "/images/04/IMG_1985-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3095",
    "name": "Aabha Phool Necklace Set",
    "category": "Kundan",
    "price": 7800,
    "salePrice": 5460,
    "shortDesc": "A radiant ensemble of meenakari greens, ruby tones, and mirror-polished stones — crafted in a blooming floral silhouette.",
    "images": [
      "/images/04/IMG_1963-scaled.jpg",
      "/images/04/IMG_1972-scaled.jpg",
      "/images/04/IMG_1966-scaled.jpg",
      "/images/04/IMG_1955-scaled.jpg",
      "/images/04/IMG_1960-scaled.jpg",
      "/images/04/IMG_1962-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3089",
    "name": "Chandrika Kundan Set",
    "category": "Bridal",
    "price": 11129,
    "salePrice": 7791,
    "shortDesc": "An opulent blend of polished pearls and mirror-polished kundan, capturing the timeless charm of ceremonial elegance.",
    "images": [
      "/images/04/IMG_1948-scaled.jpg",
      "/images/04/IMG_1949-scaled.jpg",
      "/images/04/IMG_1952-scaled.jpg",
      "/images/04/IMG_1951-scaled.jpg",
      "/images/04/IMG_1944-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3081",
    "name": "Midnight Sapphire Cubic Zirconia Choker Set",
    "category": "Cubic Zirconia",
    "price": 12000,
    "salePrice": 7200,
    "shortDesc": "A radiant silver choker set adorned with deep sapphire stones and brilliant cubic zirconia — crafted to capture the elegance of timeless fine jewellery",
    "images": [
      "/images/04/IMG_1937-scaled.jpg",
      "/images/04/IMG_1926-scaled.jpg",
      "/images/04/IMG_1932-scaled.jpg",
      "/images/04/IMG_1925-scaled.jpg",
      "/images/04/IMG_1935-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3075",
    "name": "Sitara Rang – Emerald &#038; Ruby Set",
    "category": "Bridal",
    "price": 11350,
    "salePrice": 7945,
    "shortDesc": "A radiant blend of ruby red and antique green, Sitara Rang is a statement of royalty with a whisper of old-world charm.",
    "images": [
      "/images/04/IMG_1912-scaled.jpg",
      "/images/04/IMG_1910-scaled.jpg",
      "/images/04/IMG_1914-scaled.jpg",
      "/images/04/IMG_1921-scaled.jpg",
      "/images/04/IMG_1916-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3074",
    "name": "Rajsi Netra – Heirloom Set",
    "category": "Bridal",
    "price": 9500,
    "salePrice": 6650,
    "shortDesc": "A luxurious jewellery set with antique gold finish and real-look detailing—Rajsi Netra brings royal charm to modern elegance.",
    "images": [
      "/images/04/IMG_1897-scaled.jpg",
      "/images/04/IMG_1894-scaled.jpg",
      "/images/04/IMG_1901-scaled.jpg",
      "/images/04/IMG_1903-scaled.jpg",
      "/images/04/IMG_1895-scaled.jpg",
      "/images/04/IMG_1886-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3059",
    "name": "SwarnSaaz Jewellery Set",
    "category": "Bridal",
    "price": 10299,
    "salePrice": 7210,
    "shortDesc": "An echo of regal charm, the SwarnSaaz Jewellery Set is crafted in gold-toned kundan brilliance — worn not just to be seen, but to be remembered.",
    "images": [
      "/images/04/IMG_1867-scaled.jpg",
      "/images/04/IMG_1882-scaled.jpg",
      "/images/04/IMG_1879-scaled.jpg",
      "/images/04/IMG_1871-scaled.jpg",
      "/images/04/IMG_1881-scaled.jpg",
      "/images/04/IMG_1873-scaled.jpg",
      "/images/04/IMG_1869-scaled.jpg",
      "/images/04/IMG_1885-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3050",
    "name": "Gulnoor Pastel Jewellery Set",
    "category": "Bridal",
    "price": 14525,
    "salePrice": 10168,
    "shortDesc": "Evoking the charm of royal heirlooms, this set features intricate meenakari, kundan-style stones, and timeless detailing for the Bride who honours tradition with grace.",
    "images": [
      "/images/04/IMG_1853-scaled.jpg",
      "/images/04/IMG_1852-scaled.jpg",
      "/images/04/IMG_1848-scaled.jpg",
      "/images/04/IMG_1859-scaled.jpg",
      "/images/04/IMG_1858-scaled.jpg",
      "/images/04/IMG_1855-scaled.jpg",
      "/images/04/IMG_1854-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-3043",
    "name": "Regal Blossom Jewellery Set",
    "category": "Bridal",
    "price": 12399,
    "salePrice": 8680,
    "shortDesc": "A heritage-inspired set with floral charm and intricate detailing.Perfect for weddings, who want tradition with a bold touch.",
    "images": [
      "/images/04/IMG_1824-scaled.jpg",
      "/images/04/IMG_1836-scaled.jpg",
      "/images/04/IMG_1843-scaled.jpg",
      "/images/04/IMG_1823-scaled.jpg",
      "/images/04/IMG_1829-scaled.jpg",
      "/images/04/IMG_1826-scaled.jpg"
    ]
  },
  {
    "id": "kuveras-2937",
    "name": "Gulnaar Pink Necklace Set",
    "category": "Cubic Zirconia",
    "price": 10549,
    "salePrice": 7384,
    "shortDesc": "Grace meets grandeur in the Rosé Elegance CZ Set. Adorned with radiant CZ diamonds and blush gemstones, this choker set with earrings and a maang tikka adds effortless charm to every celebration",
    "images": [
      "/images/sheet/sheet-01-img_1481.jpg",
      "/images/sheet/sheet-01-img_1491.jpg",
      "/images/sheet/sheet-01-img_1493.jpg",
      "/images/sheet/sheet-01-img_1497.jpg",
      "/images/sheet/sheet-01-img_1513.jpg",
      "/images/sheet/sheet-01-img_1515.jpg",
      "/images/sheet/sheet-01-img_1516.jpg",
      "/images/04/IMG_1809-scaled.jpg",
      "/images/04/IMG_1816-scaled.jpg"
    ],
    "slug": "gulnaar-pink-necklace-set",
    "discount": 30,
    "shortDescription": "A statement necklace set in dusky rose pink, adorned with shimmering silver-tone detailing for a graceful, luxurious finish.",
    "description": "Designed to captivate, this elegant necklace set features rich dusky rose pink stones in a striking blend of rectangular and elongated teardrop shapes. Intricate silver-tone accents and sparkling embellishments enhance its refined brilliance, while the matching drop earrings complete the look beautifully. A sophisticated choice for weddings, festive celebrations and evening occasions.\n\nIncludes: 1 Necklace and 1 Pair of Matching Earrings",
    "originalRentalPrice": 7384,
    "rentalPrice": 2215,
    "tags": [
      "Cubic Zirconia",
      "Necklace Set",
      "Google Sheet Verified"
    ]
  }
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((product) => {
  const p = { ...product };
  Object.defineProperty(p, 'rentalPrice', {
    get() {
      const selling = this.salePrice !== undefined && this.salePrice !== null ? this.salePrice : this.price;
      return calculateRentalPrice(selling);
    },
    set(v: number) {
      Object.defineProperty(this, 'rentalPrice', {
        value: v,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    },
    enumerable: true,
    configurable: true,
  });
  return p;
});

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'GET20',
    discountType: 'percent',
    value: 20,
    minAmount: 2999,
    description: 'Flat 20% OFF on orders above ₹2,999',
  },
  {
    code: 'KUVERAS400',
    discountType: 'fixed',
    value: 400,
    minAmount: 10000,
    description: 'Extra ₹400 OFF on orders above ₹10,000',
  },
  {
    code: 'ROYAL10',
    discountType: 'percent',
    value: 10,
    description: 'Flat 10% OFF on bridal & luxury sets',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Sharma',
    location: 'New Delhi',
    rating: 5,
    review:
      'The Meharika Kundan Set looked breathtaking on my wedding day! The craftsmanship and weight felt just like real heritage gold jewellery.',
    verified: true,
  },
  {
    id: 't2',
    name: 'Pooja Mehta',
    location: 'Mumbai',
    rating: 5,
    review:
      'Rented the Saanvika 5-Piece Bridal suite for my sister’s reception. Prompt doorstep delivery, perfectly sanitized, and unbelievable compliments!',
    verified: true,
  },
  {
    id: 't3',
    name: 'Sunita Rao',
    location: 'Bengaluru',
    rating: 5,
    review:
      'The Cubic Zirconia marquise choker shines brighter than real diamonds in evening light. Kuveras has become my go-to luxury jewellery brand.',
    verified: true,
  },
];

/**
 * Update product images dynamically (e.g. from Google Sheets synchronization)
 */
export function applyDynamicProductImages(
  imagesByProductId: Record<string, string[]>,
  imagesByProductName: Record<string, string[]>
) {
  let changed = false;
  PRODUCTS.forEach((product) => {
    const id = product.id;
    const normName = product.name.trim().toLowerCase();
    const newImages = imagesByProductId[id] || imagesByProductName[normName];
    if (newImages && newImages.length > 0) {
      const current = JSON.stringify(product.images);
      const incoming = JSON.stringify(newImages);
      if (current !== incoming) {
        product.images = [...newImages];
        changed = true;
      }
    }
  });
  return changed;
}
