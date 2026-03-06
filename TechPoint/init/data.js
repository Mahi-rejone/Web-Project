// data.js - Sample data for TechPilot database

const sampleData = {
    products: [
        ['PORX WIRELESS Gaming Mouse', 'GAMING', 'Wireless gaming mouse with RGB lighting and 16000 DPI', 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'],
        ['STREAMCAM Pro', 'GAMING', '4K premium webcam for streaming with autofocus', 'https://images.unsplash.com/photo-1587826080692-f439cd0bd70c?w=500'],
        ['LOGITECH G502 Hero', 'GAMING', 'High performance wired gaming mouse with 11 programmable buttons', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'],
        ['LINES OF DHAKA Gaming Headset', 'GAMING', 'Gaming headset with blue voice technology and 7.1 surround sound', 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500'],
        ['GAMING MOUSEPAD XL', 'GAMING', 'Extended RGB gaming mouse pad with waterproof surface', 'https://images.unsplash.com/photo-1605106223546-0d14502faa0b?w=500'],
        ['Pro Mechanical Keyboard', 'GAMING', 'RGB mechanical keyboard with blue switches', 'https://images.unsplash.com/photo-1595225476474-87563907f212?w=500'],
        ['Office Wireless Mouse', 'OFFICE&OTHERS', 'Ergonomic wireless mouse for office use', 'https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?w=500'],
        ['4K Monitor 27"', 'OFFICE&OTHERS', '27-inch 4K UHD monitor for professional work', 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500'],
        ['Laptop Stand', 'OFFICE&OTHERS', 'Adjustable aluminum laptop stand', 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500'],
        ['Webcam Cover', 'OFFICE&OTHERS', 'Privacy webcam cover slide for laptop/phone', 'https://images.unsplash.com/photo-1595231741194-2ab19f6d119f?w=500'],
        ['USB-C Hub', 'OFFICE&OTHERS', '7-in-1 USB-C hub with HDMI and SD card reader', 'https://images.unsplash.com/photo-1615219811340-7bdf4201a894?w=500'],
        ['RGB Gaming Chair', 'GAMING', 'Ergonomic gaming chair with RGB lighting', 'https://images.unsplash.com/photo-1586158775613-8c3ee053088b?w=500'],
        ['Stream Deck', 'GAMING', '15-key programmable macro pad for streaming', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500'],
        ['Microphone Arm', 'GAMING', 'Adjustable microphone suspension boom stand', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500'],
        ['Noise Cancelling Headphones', 'OFFICE&OTHERS', 'Wireless noise cancelling headphones for office', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
        ['Wireless Keyboard', 'OFFICE&OTHERS', 'Slim wireless keyboard for office use', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'],
        ['Green Screen', 'GAMING', 'Collapsible chroma key green screen for streaming', 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=500'],
        ['Desk Mat', 'OFFICE&OTHERS', 'Leather desk mat for office setup', 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=500'],
        ['Capture Card', 'GAMING', '4K HDMI capture card for game streaming', 'https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=500'],
        ['Ring Light', 'GAMING', '10" ring light with tripod for streaming', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500']
    ],

    productDetails: [
        [1, 49.99, 'Available', 'PORX', 'Wireless, 16000 DPI, RGB lighting, 50hr battery life'],
        [2, 89.99, 'Available', 'STREAMCAM', '4K resolution, Autofocus, 60fps, Built-in microphone'],
        [3, 79.99, 'Available', 'Logitech', '16000 DPI, 11 programmable buttons, RGB, Adjustable weights'],
        [4, 69.99, 'Available', 'LINES OF DHAKA', '7.1 surround sound, Blue Voice technology, Noise-cancelling mic'],
        [5, 29.99, 'Available', 'GAMING', 'Extended size, RGB lighting, Waterproof, Non-slip base'],
        [6, 89.99, 'Available', 'Mechanical', 'RGB backlit, Blue switches, Aluminum frame, Anti-ghosting'],
        [7, 29.99, 'Available', 'OfficePro', 'Wireless, Ergonomic design, 2.4GHz connection'],
        [8, 299.99, 'Available', 'ViewSonic', '4K UHD, 27-inch, HDMI/DP ports, Eye-care technology'],
        [9, 39.99, 'Available', 'Elevate', 'Aluminum, Adjustable height, Portable design'],
        [10, 9.99, 'Available', 'PrivacyGuard', 'Ultra-thin, Magnetic, Universal fit'],
        [11, 49.99, 'Available', 'Anker', '7-in-1, 4K HDMI, USB-C PD charging, SD/TF card slots'],
        [12, 199.99, 'Out of Stock', 'Racer', 'Ergonomic, RGB lighting, Reclining, Lumbar support'],
        [13, 149.99, 'Available', 'StreamMaster', '15 LCD keys, Programmable profiles, SDK support'],
        [14, 39.99, 'Available', 'MicArm', 'Full metal construction, Cable management, Universal mount'],
        [15, 199.99, 'Available', 'SoundBliss', 'Active noise cancellation, 30hr battery, Bluetooth 5.0'],
        [16, 59.99, 'Available', 'SlimType', 'Slim design, Wireless, Quiet keys, Multi-device pairing'],
        [17, 59.99, 'Available', 'Chromakey', 'Collapsible, 5x7ft, Wrinkle-resistant, Stand included'],
        [18, 24.99, 'Available', 'DeskMat', 'Leather surface, Waterproof, Anti-slip, Large size'],
        [19, 129.99, 'Available', 'GameCapture', '4K passthrough, Low latency, USB 3.0, Streaming software compatible'],
        [20, 39.99, 'Available', 'LitPro', '10" LED, 3 light modes, 10 brightness levels, Phone holder']
    ],

    messages: [
        'Is the PORX WIRELESS Gaming Mouse compatible with Mac?',
        'When will the RGB Gaming Chair be back in stock?',
        'Does the STREAMCAM come with a privacy cover?',
        'What is the warranty period for Logitech products?',
        'Can I use the gaming headset with Xbox?',
        'Do you offer international shipping?',
        'Is the 4K Monitor suitable for video editing?',
        'How long is the cable on the G502 mouse?',
        'Are there any discounts for bulk orders?',
        'Does the mechanical keyboard have macro keys?',
        'What payment methods do you accept?',
        'Can I return the product within 30 days?',
        'Is the microphone arm compatible with Blue Yeti?',
        'Do you have physical store in Dhaka?',
        'What is the refresh rate of the gaming monitor?',
        'Are the headphones suitable for running?',
        'Do you provide technical support?',
        'Is the USB-C hub compatible with M1 MacBooks?',
        'Can I track my order online?',
        'What is the estimated delivery time?',
        'Does the green screen require assembly?',
        'Are the key features customizable?',
        'Do you have student discounts?',
        'Is the ring light dimmable?',
        'Can I use the capture card with OBS?'
    ],
    user:[
        ['Mahi Rejone', 'mahirejone@gmail.com','$2a$13$CDRZxmCA/w/FpVobx2RSMOBCyPt45aOUww5ZEitug3DTsPQE5IzL2' , 'https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-1/583538155_1582533586508152_4067330714339813455_n.jpg?stp=c387.666.789.790a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=1d2534&_nc_ohc=XESzNRG_-pYQ7kNvwHre-9Z&_nc_oc=AdmU1-Pfm2MSHMnU3sOw4GJD_YAgrwhlBefwyMG4bdKVHKjFVaKJy1x_U-N_VUf4RN0&_nc_zt=24&_nc_ht=scontent.fdac134-1.fna&_nc_gid=z1jLmxPD3QbMSKpLrIYlnQ&_nc_ss=8&oh=00_Afwu-YRQwfnvBfy35mEor2TBSo-kUjKIMLzBmzt2t34isg&oe=69B07BA0']
    ]
};

 module.exports = sampleData;