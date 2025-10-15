import React, { useEffect, useRef, useState } from 'react';

interface GBAPlayerProps {
    width: number;
    height: number;
    romUrl: string;
}

export default function GBAPlayer(props: GBAPlayerProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeContent, setIframeContent] = useState('');

    useEffect(() => {
        // Get the base URL from the current window location
        const baseUrl = window.location.origin;
        const publicUrl = process.env.PUBLIC_URL || '';

        // Create a simple HTML page that loads GBA.js
        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            flex-direction: column;
            overflow: hidden;
        }
        #canvas-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        canvas {
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
            width: 960px !important;
            height: 640px !important;
            max-width: 95%;
            max-height: 95%;
        }
        #status {
            color: white;
            font-family: monospace;
            padding: 10px;
            position: absolute;
            top: 10px;
            z-index: 10;
        }
    </style>
</head>
<body>
    <div id="status">Loading GBA Emulator...</div>
    <div id="canvas-container">
        <canvas id="gba-canvas" width="240" height="160"></canvas>
    </div>
    <script src="${baseUrl}${publicUrl}/gbajs/js/util.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/core.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/arm.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/thumb.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/mmu.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/io.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/audio.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/video.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/video/proxy.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/video/software.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/irq.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/keypad.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/sio.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/savedata.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/gpio.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/js/gba.js"></script>
    <script src="${baseUrl}${publicUrl}/gbajs/resources/xhr.js"></script>
    <script>
        document.getElementById('status').textContent = 'Initializing emulator...';

        try {
            var gba = new GameBoyAdvance();
            gba.setLogger(function(level, error) {
                console.log('[GBA]', level, error);
                if (level > 0) {
                    document.getElementById('status').textContent = 'Log: ' + error;
                }
            });

            var canvas = document.getElementById('gba-canvas');

            // Create a target canvas for scaling
            var targetCanvas = document.createElement('canvas');
            targetCanvas.width = 960;
            targetCanvas.height = 640;
            targetCanvas.id = 'gba-target';
            targetCanvas.style.cssText = canvas.style.cssText;
            canvas.parentNode.replaceChild(targetCanvas, canvas);

            gba.setCanvas(targetCanvas);

            // Load BIOS first
            document.getElementById('status').textContent = 'Loading BIOS...';
            var biosXhr = new XMLHttpRequest();
            biosXhr.open('GET', '${baseUrl}${publicUrl}/gbajs/resources/bios.bin');
            biosXhr.responseType = 'arraybuffer';

            biosXhr.onload = function() {
                try {
                    // Try to set BIOS, but don't fail if it's incomplete
                    if (biosXhr.response && biosXhr.response.byteLength > 0) {
                        console.log('[GBA] BIOS loaded, size:', biosXhr.response.byteLength);
                        gba.setBios(biosXhr.response);
                    }
                } catch(e) {
                    console.warn('[GBA] BIOS load failed, will try HLE mode:', e);
                }

                // Load ROM after BIOS attempt
                loadROM();
            };

            biosXhr.onerror = function() {
                console.warn('[GBA] BIOS download failed, will try HLE mode');
                // Try to continue without BIOS
                loadROM();
            };

            function loadROM() {
                document.getElementById('status').textContent = 'Loading ROM...';

                var romXhr = new XMLHttpRequest();
                romXhr.open('GET', '${baseUrl}${publicUrl}/${props.romUrl}');
                romXhr.responseType = 'arraybuffer';

                romXhr.onload = function() {
                    try {
                        document.getElementById('status').textContent = 'Starting game...';
                        console.log('[GBA] ROM loaded, size:', romXhr.response.byteLength);

                        // Convert ArrayBuffer to Blob to simulate a File
                        var blob = new Blob([romXhr.response]);
                        var file = new File([blob], 'game.gba', { type: 'application/octet-stream' });

                        // Use loadRomFromFile like the original
                        gba.loadRomFromFile(file, function(result) {
                            if (result) {
                                console.log('[GBA] ROM loaded successfully');

                                gba.runStable();

                                // Hide status after successful start
                                setTimeout(function() {
                                    document.getElementById('status').style.display = 'none';
                                }, 1000);
                            } else {
                                console.error('[GBA] Failed to load ROM');
                                document.getElementById('status').textContent = 'Failed to load ROM';
                                document.getElementById('status').style.color = 'red';
                            }
                        });
                    } catch(e) {
                        console.error('Error loading ROM:', e);
                        document.getElementById('status').textContent = 'Error: ' + e.message;
                        document.getElementById('status').style.color = 'red';
                    }
                };

                romXhr.onerror = function() {
                    document.getElementById('status').textContent = 'Error downloading ROM';
                    document.getElementById('status').style.color = 'red';
                };

                romXhr.send();
            }

            // Start by loading BIOS
            biosXhr.send();

        } catch(e) {
            console.error('Error initializing GBA:', e);
            document.getElementById('status').textContent = 'Error: ' + e.message;
            document.getElementById('status').style.color = 'red';
        }
    </script>
</body>
</html>`;
        setIframeContent(html);
    }, [props.romUrl]);

    return (
        <div
            style={{
                width: props.width,
                height: props.height,
                backgroundColor: '#000',
            }}
        >
            {iframeContent && (
                <iframe
                    ref={iframeRef}
                    srcDoc={iframeContent}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    title="GBA Emulator"
                />
            )}
        </div>
    );
}
