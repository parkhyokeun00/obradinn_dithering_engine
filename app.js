const { useState, useEffect, useRef } = React;

// --- ICON COMPONENTS ---
const Icon = ({ children, size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {children}
    </svg>
);
const Zap = (props) => <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></Icon>;
const Info = (props) => <Icon {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></Icon>;
const Layers = (props) => <Icon {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></Icon>;
const Video = (props) => <Icon {...props}><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></Icon>;
const Palette = (props) => <Icon {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></Icon>;
const Blend = (props) => <Icon {...props}><circle cx="9" cy="9" r="7"></circle><circle cx="15" cy="15" r="7"></circle></Icon>;
const RotateCcw = (props) => <Icon {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></Icon>;
const Maximize = (props) => <Icon {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></Icon>;
const Play = (props) => <Icon {...props}><polygon points="5 3 19 12 5 21 5 3"></polygon></Icon>;
const Pause = (props) => <Icon {...props}><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></Icon>;
const Monitor = (props) => <Icon {...props}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></Icon>;
const Camera = (props) => <Icon {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></Icon>;
const FileOutput = (props) => <Icon {...props}><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M3 15h6"></path><path d="M6 12l3 3-3 3"></path></Icon>;
const Save = (props) => <Icon {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></Icon>;
const Scaling = (props) => <Icon {...props}><path d="M21 3 9 15"></path><path d="M12 3H3v18h18v-9"></path><path d="M16 3h5v5"></path><path d="M14 15H9v-5"></path></Icon>;
const Terminal = (props) => <Icon {...props}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></Icon>;
const Folder = (props) => <Icon {...props}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></Icon>;
const LogIn = (props) => <Icon {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></Icon>;

// --- UTILITIES ---
const oklchToRgb = (l, c, h) => {
    const h_rad = (h * Math.PI) / 180;
    const a = c * Math.cos(h_rad);
    const b = c * Math.sin(h_rad);
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
    const l_3 = l_ * l_ * l_;
    const m_3 = m_ * m_ * m_;
    const s_3 = s_ * s_ * s_;
    const r = +4.0767416621 * l_3 - 3.3077115913 * m_3 + 0.2309699292 * s_3;
    const g = -1.2684380046 * l_3 + 2.6097574011 * m_3 - 0.3413193965 * s_3;
    const b_ = -0.0041960863 * l_3 - 0.7034186147 * m_3 + 1.707603131 * s_3;
    const gamma = (v) => v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(Math.max(0, v), 1 / 2.4) - 0.055;
    return [
        Math.max(0, Math.min(255, Math.round(gamma(r) * 255))),
        Math.max(0, Math.min(255, Math.round(gamma(g) * 255))),
        Math.max(0, Math.min(255, Math.round(gamma(b_) * 255)))
    ];
};

const rgbToOklch = (r, g, b) => {
    const invGamma = (v) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    const lr = invGamma(r / 255);
    const lg = invGamma(g / 255);
    const lb = invGamma(b / 255);
    const l_ = Math.pow(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb, 1 / 3);
    const m_ = Math.pow(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb, 1 / 3);
    const s_ = Math.pow(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb, 1 / 3);
    const l = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
    const c = Math.sqrt(a * a + b_ * b_);
    const h = (Math.atan2(b_, a) * 180) / Math.PI;
    return { l, c, h: h < 0 ? h + 360 : h };
};

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};

const rgbToHex = (r, g, b) => "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

// --- TUI COMPONENTS ---
const Pane = ({ children, title, className = "", noScroll = false }) => (
    <div className={`bg-gruv-surface border border-gruv-border flex flex-col shadow-lg ${className}`}>
        {title && (
            <div className="bg-gruv-bg border-b border-gruv-border px-3 py-1 text-xs flex justify-between items-center select-none">
                <span className="text-gruv-blue font-bold flex items-center gap-2">
                    <Folder size={12} className="text-gruv-yellow" /> {title}
                </span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gruv-red"></div>
                    <div className="w-2 h-2 rounded-full bg-gruv-yellow"></div>
                    <div className="w-2 h-2 rounded-full bg-gruv-green"></div>
                </div>
            </div>
        )}
        <div className={`flex-1 p-4 ${!noScroll ? 'overflow-y-auto custom-scrollbar' : 'overflow-hidden'}`}>
            {children}
        </div>
    </div>
);

const TerminalButton = ({ onClick, disabled, children, variant = "normal", className = "" }) => {
    let baseClass = "w-full py-3 px-4 border text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative group overflow-hidden";
    let colorClass = "";

    if (disabled) {
        colorClass = "border-gruv-bg text-gruv-gray cursor-not-allowed opacity-50 bg-gruv-bg";
    } else {
        if (variant === "primary") {
            colorClass = "border-gruv-yellow text-gruv-yellow hover:bg-gruv-yellow hover:text-gruv-bg cursor-pointer";
        } else if (variant === "accent") {
            colorClass = "border-gruv-aqua text-gruv-aqua hover:bg-gruv-aqua hover:text-gruv-bg cursor-pointer";
        } else {
            colorClass = "border-gruv-border text-gruv-text hover:bg-gruv-text hover:text-gruv-bg cursor-pointer";
        }
    }

    return (
        <button type="button" onClick={onClick} disabled={disabled} className={`${baseClass} ${colorClass} ${className}`}>
            {children}
        </button>
    );
};

const AssetUploader = ({ label, icon, active, onClick }) => (
    <button type="button" onClick={onClick} className={`w-full py-2 px-3 border flex items-center justify-between transition-all group ${active ? 'border-gruv-green bg-gruv-bg text-gruv-text' : 'border-dashed border-gruv-border text-gruv-gray hover:border-gruv-text hover:text-gruv-text'}`}>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
            <span className={active ? 'text-gruv-green' : 'text-gruv-gray'}>{icon}</span>
            <span>{label}</span>
        </div>
        {active && <span className="text-[8px] text-gruv-green">[LOADED]</span>}
    </button>
);


// --- INTRO SCREEN COMPONENT ---
const IntroScreen = ({ onEnter }) => {
    const gradientBgStyle = {
        background: 'linear-gradient(to right, rgba(29, 32, 33, 0), rgba(215, 153, 33, 0.15) 30%, rgba(215, 153, 33, 0.15) 70%, rgba(29, 32, 33, 0))' // Fades from transparent to yellow then back to transparent
    };

    const bloomImgStyle = {
        filter: 'drop-shadow(0 0 30px rgba(215, 153, 33, 0.7))', // Stronger bloom
        WebkitFilter: 'drop-shadow(0 0 30px rgba(215, 153, 33, 0.7))',
        height: '100%', // Fill vertical space
        width: 'auto',   // Adjust width proportionally
        objectFit: 'contain', // Ensure entire image is visible, no cropping
        objectPosition: 'center', // Center the image within its available space
    };

    return (
        <div className="h-full w-full relative flex items-center justify-center p-gap" style={gradientBgStyle}>
            {/* Image Layer - fills the background, with bloom */}
            <div className="absolute inset-0 flex items-center justify-center">
                 <img 
                    src="images/intro_bg.png" 
                    style={bloomImgStyle} 
                    className="" // Removed w-full h-full object-cover, now handled by style and flex parent
                    onError={(e) => { e.target.style.display = 'none'; }} 
                 />
            </div>

            {/* Pane Layer - absolutely centered on top */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-2xl text-center">
                <Pane title="[System Boot]" className="w-full">
                    <div className="flex flex-col items-center justify-center p-6 bg-gruv-surface">
                        <h1 className="text-2xl font-bold text-gruv-yellow tracking-widest">
                            Obra Dinn Dithering Lab
                        </h1>
                        <p className="text-gruv-gray max-w-md leading-relaxed mt-2 text-sm">
                            A real-time dithering tool inspired by 1-bit retro aesthetics.
                        </p>
                        <div className="w-full max-w-xs pt-4">
                             <TerminalButton onClick={onEnter} variant="primary">
                                <LogIn size={14} /> Enter Lab
                            </TerminalButton>
                        </div>
                    </div>
                </Pane>
            </div>
        </div>
    );
};


// --- MAIN DITHERING APPLICATION COMPONENT ---
const DitheringApp = () => {
    const [source, setSource] = useState(null);
    const [texture, setTexture] = useState(null);
    const [algorithm, setAlgorithm] = useState('bayer');
    const [blendMode, setBlendMode] = useState('multiply');
    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(1.2);
    const [pixelSize, setPixelSize] = useState(1);
    const [edgeStrength, setEdgeStrength] = useState(5);
    const [textureIntensity, setTextureIntensity] = useState(0.3);
    const [textureInvert, setTextureInvert] = useState(false);

    const [oklchDark, setOklchDark] = useState({ l: 0.05, c: 0, h: 0 });
    const [oklchMid, setOklchMid] = useState({ l: 0.35, c: 0.066, h: 204 });
    const [oklchLight, setOklchLight] = useState({ l: 0.47, c: 0.100, h: 60 });

    const [isPlaying, setIsPlaying] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const textureInputRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const loadImage = (path, setter) => {
            const img = new Image();
            img.src = path;
            img.onload = () => setter({ type: 'image', element: img });
            img.onerror = () => {
                console.warn(`Could not load default image from ${path}. Waiting for user upload.`);
                setter(null);
            };
        };
        
        let isInitialLoad = source === null;
        if (isInitialLoad) {
            loadImage('images/default_image.png', setSource);
            loadImage('images/default_texture.png', setTexture);
        }

    }, [source]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const animate = () => {
            if (source?.type === 'video' && isPlaying) {
                processFrame();
                requestRef.current = requestAnimationFrame(animate);
            }
        };

        if (source?.type === 'video' && isPlaying) {
            requestRef.current = requestAnimationFrame(animate);
        } else if (source) {
            processFrame();
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };

    }, [source, isPlaying, algorithm, blendMode, brightness, contrast, pixelSize, edgeStrength, textureIntensity, textureInvert, oklchDark, oklchMid, oklchLight, texture]);
    

    const bayerMatrix = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]].map(row => row.map(v => (v / 16) * 255));
    const blueNoiseMatrix = [
        [128, 48, 168, 88, 131, 51, 171, 91, 129, 49, 169, 89, 132, 52, 172, 92],
        [192, 16, 240, 64, 195, 19, 243, 67, 193, 17, 241, 65, 196, 20, 244, 68],
        [112, 208, 32, 144, 115, 211, 35, 147, 113, 209, 33, 145, 116, 212, 36, 148],
        [224, 80, 200, 160, 227, 83, 203, 163, 225, 81, 201, 161, 228, 84, 204, 164],
        [135, 55, 175, 95, 130, 50, 170, 90, 134, 54, 174, 94, 131, 51, 171, 91],
        [199, 23, 247, 71, 194, 18, 242, 66, 198, 22, 246, 70, 195, 19, 243, 67],
        [119, 215, 39, 151, 114, 210, 34, 146, 118, 214, 38, 150, 115, 211, 35, 147],
        [231, 87, 207, 167, 226, 82, 202, 162, 230, 86, 206, 166, 227, 83, 203, 163]
    ].map(row => row.map(v => (v / 256) * 255));

    const processFrame = () => {
        if (!source || !canvasRef.current) return;
        const element = source.element;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const scale = 1 / pixelSize;
        let sw = source.type === 'video' ? element.videoWidth : element.width;
        let sh = source.type === 'video' ? element.videoHeight : element.height;
        if (sw === 0 || sh === 0) return;
        const width = Math.floor(sw * scale);
        const height = Math.floor(sh * scale);
        if (canvas.width !== width) canvas.width = width;
        if (canvas.height !== height) canvas.height = height;
        ctx.drawImage(element, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        let texData = null;
        if (texture && texture.element) {
            const texCanvas = document.createElement('canvas');
            texCanvas.width = width; texCanvas.height = height;
            const texCtx = texCanvas.getContext('2d');
            texCtx.drawImage(texture.element, 0, 0, width, height);
            texData = texCtx.getImageData(0, 0, width, height).data;
        }
        const rgbDark = oklchToRgb(oklchDark.l, oklchDark.c, oklchDark.h);
        const rgbMid = oklchToRgb(oklchMid.l, oklchMid.c, oklchMid.h);
        const rgbLight = oklchToRgb(oklchLight.l, oklchLight.c, oklchLight.h);
        const grayData = new Float32Array(width * height);
        for (let i = 0; i < data.length; i += 4) {
            let base = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
            let finalVal = base;
            if (texData) {
                let texRaw = (0.299 * texData[i] + 0.587 * texData[i + 1] + 0.114 * texData[i + 2]) / 255;
                let tex = textureInvert ? (1 - texRaw) : texRaw;
                let blended = base;
                switch (blendMode) {
                    case 'multiply': blended = base * tex; break;
                    case 'screen': blended = 1 - (1 - base) * (1 - tex); break;
                    case 'overlay': blended = base < 0.5 ? 2 * base * tex : 1 - 2 * (1 - base) * (1 - tex); break;
                    case 'softlight': blended = (1 - 2 * tex) * (base * base) + 2 * tex * base; break;
                    case 'difference': blended = Math.abs(base - tex); break;
                    case 'dodge': blended = Math.min(1, base + tex); break;
                    default: blended = base * tex;
                }
                finalVal = base * (1 - textureIntensity) + blended * textureIntensity;
            }
            grayData[i / 4] = Math.max(0, Math.min(255, finalVal * 255 * contrast + brightness));
        }
        const finalGrayData = new Float32Array(grayData);
        if (edgeStrength > 0) {
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const idx = y * width + x;
                    const laplacian = (grayData[idx - 1] + grayData[idx + 1] + grayData[idx - width] + grayData[idx + width]) - (4 * grayData[idx]);
                    finalGrayData[idx] = Math.max(0, Math.min(255, grayData[idx] - (laplacian * (edgeStrength / 2))));
                }
            }
        }
        const outputData = ctx.createImageData(width, height);
        const getSplitRgb = (gray) => {
            if (gray < 85) return rgbDark;
            if (gray < 170) return rgbMid;
            return rgbLight;
        };
        if (algorithm === 'threshold') {
            for (let i = 0; i < finalGrayData.length; i++) setPixel(outputData.data, i, getSplitRgb(finalGrayData[i]));
        } else if (algorithm === 'bayer') {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = y * width + x;
                    const val = finalGrayData[idx] + (bayerMatrix[y % 4][x % 4] - 128) * 0.4;
                    setPixel(outputData.data, idx, getSplitRgb(val));
                }
            }
        } else if (algorithm === 'blue-noise') {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = y * width + x;
                    const threshold = blueNoiseMatrix[y % 8][x % 16];
                    const val = finalGrayData[idx] + (threshold - 128) * 0.4;
                    setPixel(outputData.data, idx, getSplitRgb(val));
                }
            }
        } else if (algorithm === 'floyd-steinberg') {
            const buffer = new Float32Array(finalGrayData);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = y * width + x;
                    const oldPixel = buffer[idx];
                    let rgb, standardRef;
                    if (oldPixel < 85) { rgb = rgbDark; standardRef = 0; }
                    else if (oldPixel < 170) { rgb = rgbMid; standardRef = 127; }
                    else { rgb = rgbLight; standardRef = 255; }
                    setPixel(outputData.data, idx, rgb);
                    const error = oldPixel - standardRef;
                    if (x + 1 < width) buffer[idx + 1] += error * 7 / 16;
                    if (y + 1 < height) {
                        if (x > 0) buffer[idx + width - 1] += error * 3 / 16;
                        buffer[idx + width] += error * 5 / 16;
                        if (x + 1 < width) buffer[idx + width + 1] += error * 1 / 16;
                    }
                }
            }
        }
        ctx.putImageData(outputData, 0, 0);
    };

    const setPixel = (data, idx, rgb) => {
        const i = idx * 4;
        data[i] = rgb[0]; data[i + 1] = rgb[1]; data[i + 2] = rgb[2]; data[i + 3] = 255;
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = url;
            video.loop = true;
            video.muted = true;
            video.onloadedmetadata = () => {
                setSource({ type: 'video', element: video });
                video.play();
                setIsPlaying(true);
            };
        } else {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                setSource({ type: 'image', element: img });
                setIsPlaying(false);
            };
        }
    };

    const handleTextureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => setTexture(img);
        }
    };

    const setObraDinnMode = () => {
        setAlgorithm('blue-noise');
        setPixelSize(2);
        setContrast(2.0);
        setBrightness(-10);
        setEdgeStrength(7);
        setOklchDark({ l: 0.05, c: 0, h: 0 });
        setOklchMid({ l: 0.35, c: 0.066, h: 204 });
        setOklchLight({ l: 0.47, c: 0.100, h: 60 });
    };

    const handleColorChange = (hex, setter) => {
        const [r, g, b] = hexToRgb(hex);
        setter(rgbToOklch(r, g, b));
    };

    const handleRawExport = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.download = `obradinn-raw-${Date.now()}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
    };

    const handleScreenshotExport = () => {
        if (!canvasRef.current || !source) return;
        const element = source.element;
        const originalWidth = source.type === 'video' ? element.videoWidth : element.width;
        const originalHeight = source.type === 'video' ? element.videoHeight : element.height;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = originalWidth;
        tempCanvas.height = originalHeight;
        const ctx = tempCanvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvasRef.current, 0, 0, originalWidth, originalHeight);
        const link = document.createElement('a');
        link.download = `obradinn-visual-${Date.now()}.png`;
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="h-full flex flex-col gap-gap">
            {/* Status Bar (Header) */}
            <header className="h-10 bg-gruv-surface border border-gruv-border flex justify-between items-center px-4 shrink-0 shadow-lg">
                <div className="flex items-center gap-4">
                    <span className="text-gruv-green font-bold flex items-center gap-2">
                        <Terminal size={14} /> user@obradinn-lab:~$
                    </span>
                    <span className="text-gruv-gray text-xs hidden md:inline-block">./init_dithering_engine.sh</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-gruv-blue flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gruv-blue animate-pulse"></span> ONLINE
                    </span>
                    <span className="text-gruv-text">{currentTime}</span>
                    <button onClick={() => setShowInfo(!showInfo)} className="text-gruv-yellow hover:text-gruv-text transition-colors">
                        <span className="underline">?</span> Help
                    </button>
                </div>
            </header>

            {/* Main Workspace (Tiling Layout) */}
            <main className="flex-1 flex gap-gap overflow-hidden">

                {/* Sidebar Pane (20%) */}
                <Pane title="~/config/controls/" className="w-[280px] shrink-0">

                    {/* Asset Loader Block */}
                    <div className="mb-6 space-y-3">
                        <div className="text-xs font-bold text-gruv-gray uppercase tracking-widest mb-1 border-b border-gruv-border/30 pb-1">Sources</div>
                        <div className="space-y-2">
                            <AssetUploader label="SOURCE (IMG/MOV)" icon={<Video size={14} />} active={!!source} onClick={() => fileInputRef.current.click()} />
                            <AssetUploader label="TEXTURE" icon={<Layers size={14} />} active={!!texture} onClick={() => textureInputRef.current.click()} />
                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,video/*" />
                            <input type="file" ref={textureInputRef} onChange={handleTextureUpload} className="hidden" accept="image/*" />

                            {source?.type === 'video' && (
                                <TerminalButton onClick={() => { setIsPlaying(!isPlaying); isPlaying ? source.element.pause() : source.element.play(); }} variant="accent">
                                    {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'PAUSE' : 'EXECUTE'}
                                </TerminalButton>
                            )}
                        </div>
                    </div>

                    {/* Obra Dinn Preset */}
                    <div className="mb-6">
                        <TerminalButton onClick={setObraDinnMode} variant="primary">
                            <Monitor size={14} /> LOAD OBRA_DINN.CFG
                        </TerminalButton>
                    </div>

                    {/* Colors */}
                    <div className="mb-6 space-y-3">
                        <div className="text-xs font-bold text-gruv-gray uppercase tracking-widest mb-1 border-b border-gruv-border/30 pb-1">Colors (OKLCH)</div>
                        <ColorPickerControl label="DARK_TONE" color={oklchDark} onChange={(hex) => handleColorChange(hex, setOklchDark)} />
                        <ColorPickerControl label="MID_TONE" color={oklchMid} onChange={(hex) => handleColorChange(hex, setOklchMid)} />
                        <ColorPickerControl label="LIGHT_TONE" color={oklchLight} onChange={(hex) => handleColorChange(hex, setOklchLight)} />
                    </div>

                    {/* Composite */}
                    <div className="mb-6 space-y-3">
                        <div className="text-xs font-bold text-gruv-gray uppercase tracking-widest mb-1 border-b border-gruv-border/30 pb-1">Composite</div>
                        <div className="grid grid-cols-2 gap-1 bg-gruv-bg p-1 border border-gruv-border">
                            {['multiply', 'screen', 'overlay', 'softlight', 'difference', 'dodge'].map(mode => (
                                <button key={mode} onClick={() => setBlendMode(mode)} className={`py-1 text-[10px] font-bold uppercase transition-all ${blendMode === mode ? 'bg-gruv-blue text-gruv-bg' : 'text-gruv-gray hover:text-gruv-text'}`}>
                                    {mode}
                                </button>
                            ))}
                        </div>
                        <TerminalButton onClick={() => setTextureInvert(!textureInvert)} className={`text-[10px] py-1 ${textureInvert ? 'bg-gruv-text text-gruv-bg' : ''}`}>
                            <RotateCcw size={10} /> INVERT_TEXTURE
                        </TerminalButton>
                        <MiniSlider label="INTENSITY" value={textureIntensity} min={0} max={1} step={0.05} onChange={setTextureIntensity} />
                    </div>

                    {/* Filter */}
                    <div className="mb-6 space-y-3">
                        <div className="text-xs font-bold text-gruv-gray uppercase tracking-widest mb-1 border-b border-gruv-border/30 pb-1">Filters</div>
                        <div className="grid grid-cols-2 gap-1 mb-2">
                            {['threshold', 'bayer', 'blue-noise', 'floyd-steinberg'].map(algo => (
                                <button key={algo} onClick={() => setAlgorithm(algo)} className={`py-1 px-1 text-[9px] font-bold border transition-all uppercase ${algorithm === algo ? 'border-gruv-yellow text-gruv-yellow' : 'border-gruv-border text-gruv-gray hover:border-gruv-text'}`}>
                                    {algo.replace('-', '_')}
                                </button>
                            ))}
                        </div>
                        <MiniSlider label="EDGE_DET" value={edgeStrength} min={0} max={10} onChange={setEdgeStrength} />
                        <MiniSlider label="RES_SCALE" value={pixelSize} min={1} max={4} step={0.5} onChange={setPixelSize} />
                        <div className="grid grid-cols-2 gap-2">
                            <MiniSlider label="BRIGHT" value={brightness} min={-100} max={100} onChange={setBrightness} />
                            <MiniSlider label="CONTRAST" value={contrast} min={0.5} max={3} step={0.1} onChange={setContrast} />
                        </div>
                    </div>

                    {/* Export */}
                    <div className="space-y-2 pt-2 border-t border-gruv-border border-dashed">
                        <button disabled={!source} onClick={handleScreenshotExport} className="w-full py-3 bg-gruv-green text-gruv-bg font-bold text-xs hover:bg-gruv-text transition-colors flex flex-col items-center gap-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                            <div className="flex items-center gap-2">
                                <Camera size={14} /> EXPORT_VISUAL
                            </div>
                        </button>
                        <button disabled={!source} onClick={handleRawExport} className="w-full py-2 border border-gruv-border text-gruv-gray text-[10px] font-bold hover:bg-gruv-border hover:text-gruv-bg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                <FileOutput size={12} /> EXPORT_RAW_DATA
                        </button>
                    </div>
                </Pane>

                {/* Viewport Pane (80%) */}
                <Pane title="~/viewport/render_buffer" className="flex-1 overflow-hidden relative" noScroll={true}>
                    <div className="w-full h-full bg-[#000] relative flex items-center justify-center overflow-hidden border border-gruv-border/30 scanlines">
                        {source?.type === 'video' && isPlaying && (
                            <div className="absolute top-2 right-2 z-20 bg-gruv-red text-gruv-text px-2 py-0.5 text-[9px] font-bold animate-pulse">
                                REC ●
                            </div>
                        )}

                        {!source ? (
                            <div className="flex flex-col items-center gap-4 opacity-20 text-gruv-text">
                                <div className="text-4xl font-mono animate-pulse">_</div>
                                <p className="text-sm tracking-widest uppercase">Waiting for input stream...</p>
                            </div>
                        ) : (
                            <canvas
                                ref={canvasRef}
                                className="max-w-full max-h-full object-contain pixelated"
                            />
                        )}
                    </div>

                    {/* Bottom Info Bar in Viewport */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                        <div className="bg-gruv-bg border border-gruv-border px-3 py-1 text-[10px] font-mono shadow-md">
                            <span className="text-gruv-gray">ALG:</span> <span className="text-gruv-yellow">{algorithm.toUpperCase()}</span> <span className="text-gruv-border mx-1">|</span>
                            <span className="text-gruv-gray">RES:</span> <span className="text-gruv-aqua">1/{pixelSize}x</span>
                        </div>
                    </div>
                </Pane>
            </main>

            {/* Modal Info */}
            {showInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm" onClick={() => setShowInfo(false)}>
                    <div className="bg-gruv-bg border border-gruv-border w-full max-w-2xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6 border-b border-gruv-border pb-2">
                            <h2 className="text-xl font-bold text-gruv-yellow flex items-center gap-2"><Info size={20} /> README.md</h2>
                            <button onClick={() => setShowInfo(false)} className="text-gruv-red hover:text-gruv-text">[x]</button>
                        </div>
                        <div className="space-y-4 text-sm text-gruv-text font-mono leading-relaxed">
                            <p><span className="text-gruv-blue"># Obra Dinn Dithering Lab</span></p>
                            <p>A technical demonstration of 1-bit dithering algorithms in a retro TUI environment.</p>

                            <p><span className="text-gruv-aqua">## Features</span></p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-gruv-gray">
                                <li><strong>Blue Noise:</strong> Advanced dithering for organic texture.</li>
                                <li><strong>OKLCH Colors:</strong> Perceptually uniform color grading.</li>
                                <li><strong>Composite:</strong> Blend external textures (multiply, overlay, etc).</li>
                            </ul>

                            <p><span className="text-gruv-orange">## Export</span></p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-gruv-gray">
                                <li><strong>Visual:</strong> Upscaled screenshot-style export (Recommended).</li>
                                <li><strong>Raw:</strong> 1:1 pixel data export.</li>
                            </ul>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gruv-border text-center text-xs text-gruv-gray">
                            Press 'ESC' or click outside to close buffer.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ColorPickerControl = ({ label, color, onChange }) => {
    const rgb = oklchToRgb(color.l, color.c, color.h);
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    return (
        <div className="flex items-center justify-between p-2 border border-gruv-border bg-gruv-bg">
            <span className="text-[10px] font-bold text-gruv-gray uppercase">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-[9px] text-gruv-gray font-mono">{hex}</span>
                <div className="relative w-6 h-6 border border-gruv-gray overflow-hidden cursor-pointer" style={{ backgroundColor: hex }}>
                    <input type="color" value={hex} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

const MiniSlider = ({ label, value, min, max, step = 1, onChange }) => {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-tight text-gruv-gray">
                <span>{label}</span>
                <span className="text-gruv-text">{typeof value === 'number' ? value.toFixed(step >= 1 ? 0 : 2) : value}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-transparent cursor-pointer"
            />
        </div>
    );
};


// --- TOP-LEVEL APP COMPONENT ---
const App = () => {
    const [showApp, setShowApp] = useState(false);

    if (showApp) {
        return <DitheringApp />;
    } else {
        return <IntroScreen onEnter={() => setShowApp(true)} />;
    }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);